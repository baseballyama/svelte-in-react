# Using Svelte from React

## Setup

### Install React

```sh
npx create-react-app svelte-in-react --template typescript
cd svelte-in-react
npm i
# to configure about Svelte, I need to modify webpack config.
npm run eject
```

### Install Svelte

```sh
npm install --save svelte svelte-loader
```

And add svelte-loader config at `config/webpack.config.js`.

```js
module.exports = function (webpackEnv) {
  module: {
    rules: [
      {
        oneOf: [
          // add this.
          {
            test: [/\.svelte$/],
            loader: require.resolve("svelte-loader"),
          },
        ]
      }
    ]
  }
}
```
