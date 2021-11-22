# LinkedTo

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


## Tech

Use the [Gatsby example of @mui-org/material-ui](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)

Login Page uses the template of [Sign-in Side Template](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side)

Add [ESLint](https://eslint.org/) for to check syntax, find problems, and enforce code style.

Use [Commitizen](https://commitizen-tools.github.io/commitizen/) along with [Husky](https://typicode.github.io/husky/#/) for better commit message with `pre-commit` hook.

## Usage

### Clone this repo
```sh
git clone git@github.com:LinkedTo-dev/LinkedTo.git
cd LinkedTo
```

### Install the dependencies
```sh
yarn install
```

### Start a dev server
```sh
yarn run develop
```

### For production build
```sh
yarn run build
```

### When commit

Use

```sh
git cz
```

instead of

```sh
git commit
```

to generate better commit messages.

*(Perhaps you need to globally install `cz-cli` to enjoy full commitizen support)*
