# Using Svelte from React with TypeScript

This repository was created based on [Tan Li Hau's video](https://www.youtube.com/watch?v=6MI9mirMh6w).
And I added TypeScript support.

DEMO: https://baseballyama.github.io/svelte-in-react-ts/

This repository supported below features.

- Reactive props between React and Svelte / Two-way data binding
- Reactive context between React and Svelte
- Calling Svelte functions from React

## Setup

### Install React (commit: [286de46](https://github.com/baseballyama/svelte-in-react/commit/286de46), [a722fec](https://github.com/baseballyama/svelte-in-react/commit/a722fec))

```sh
npx create-react-app svelte-in-react --template typescript
cd svelte-in-react
npm i
# to configure about Svelte, I need to modify webpack config.
npm run eject
```

### Install Svelte (commit: [4009d74](https://github.com/baseballyama/svelte-in-react/commit/4009d74))

```sh
npm install --save svelte svelte-loader svelte-preprocess
# for TypeScript.
curl https://raw.githubusercontent.com/sveltejs/language-tools/master/packages/svelte2tsx/svelte-shims.d.ts > ./src/svelte-shims.d.ts
```

And add svelte-loader config at `config/webpack.config.js`.

```js
// add this
const sveltePreprocess = require("svelte-preprocess");

module.exports = function (webpackEnv) {
  module: {
    rules: [
      {
        oneOf: [
          // add this.
          {
            test: [/\.svelte$/],
            loader: require.resolve("svelte-loader"),
            options: {
              preprocess: sveltePreprocess()
            }
          },
        ]
      }
    ]
  }
}
```
