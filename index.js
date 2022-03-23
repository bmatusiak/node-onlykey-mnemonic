var crypto = require("crypto");
var bip39 = require("bip39");
var onlykey = require("@trustcrypto/node-onlykey");

module.exports = function(additionalData) {

    var wordCounr_12 = true; //  12 or 24
    // wordCounr_12 = false;  //  12 or 24


    return new Promise((resolve) => {

        var onlykey_keytype = 1;

        onlykey(function(onlykey3rd) {
            
            var ONLYKEY = onlykey3rd(onlykey_keytype);
            
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
