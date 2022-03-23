# node-onlykey-mnemonic

this package is a intended example to generate a mnemonic phrase that can be used to create a bitcoin wallet 

how?

using node-onlykey 3rd party api. we generate a shared secret, this secret gets hashed `secret->sha256->md5->Uint8Array(16)` and is used as bip39 entropy producing a 12 word mnemonic phrase

the mnemonic phrase can be used in [https://atomicwallet.io/](https://atomicwallet.io/) for wallet recovery. or any wallet that can use a 12word mnemonic phrase as recovery.

using additional data allowes onlykey to generate numberless phrases

NOTE: Best practice: Generate a mnemonic phrase and write it down (dont copy+paste), and type out the phrase into wallet recovery input.


DONATE: 

* Bitcoin -> 1GL3KTtUgMmmqHepZH183ZesNym8eooVeP
* Dogecoin -> DGdjT3s4y2Mjn17NsqnM4BNiN19c34bkJF
* Ethereum -> 0x464E5E15A7B89a4510102700094868a8b46f53E5
* Tezos -> tz1ZY9gcB56kD8vQ1XHZSH3sJGSghG1z456p
