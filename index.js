var crypto = require("crypto");
var bip39 = require("bip39");

module.exports = function(additionalData) {

    var wordCounr_12 = true; //  12 or 24
    // wordCounr_12 = false;  //  12 or 24


    return new Promise((resolve) => {

        var onlykey_keytype = 1;

        var plugins = [];

        plugins.push(require("@trustcrypto/node-onlykey/src/window.js")); //load replacement onlykey need for plugin

        plugins.push(require("@trustcrypto/node-onlykey/src/onlykey-fido2/plugin.js")); //load onlykey plugin for testing

        plugins.push(require("@trustcrypto/node-onlykey/src/console/console.js")); //load replacement onlykey need for plugin

        var EventEmitter = require("events").EventEmitter;

        var architect = require("@trustcrypto/node-onlykey/libs/architect.js");


        plugins.push({
            provides: ["app"],
            consumes: ["hub"],
            setup: function(options, imports, register) {
                register(null, {
                    app: new EventEmitter()
                });
            }
        });

        architect.createApp(plugins, function(err, app) {

            if (err) return console.error(err);
            app.services.app.core = app.services;
            for (var i in app.services) {
                app.services.app[i] = app.services[i];
            }
            for (var i in app.services) {
                if (app.services[i].init) app.services[i].init(app);
            }

            var ONLYKEY = app.services.onlykey3rd(onlykey_keytype);

            ONLYKEY.derive_public_key(additionalData, onlykey_keytype, true, async function(err, key) {
                ONLYKEY.derive_shared_secret(additionalData, key, onlykey_keytype, true, async function(err, sharedSecret) {
                    var hex_secret = crypto.createHash('sha256').update(sharedSecret).digest();
                    hex_secret = crypto.createHash(wordCounr_12 ? 'md5' : 'sha256').update(hex_secret).digest();
                    resolve(bip39.entropyToMnemonic(hex_secret));
                });
            });


        });


    });
};


// module.exports("test").then(console.log);
