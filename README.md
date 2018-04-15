# @isomorphic-git/openpgp-plugin

OpenPGP.js plugin for isomorphic-git

## Usage

```js
const { GitOpenPGP } = require('@isomorphic-git/openpgp-plugin')
const git = require('isomorphic-git')

git.use(GitOpenPGP)

// Now you can use git.sign() and git.verify()
```

## Tests

TBD