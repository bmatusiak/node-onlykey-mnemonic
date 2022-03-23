# node-onlykey-mnemonic

this package is a intended example to generate a mnemonic phrase that can be used to create a bitcoin wallet 

how?

using node-onlykey 3rd party api. we generate a shared secret, this secret gets hashed secret->sha256->md5->Uint8Array(16) and is used as bip39 entropy producing a 12 word mnemonic phrase

