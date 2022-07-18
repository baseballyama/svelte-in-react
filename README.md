# Using Svelte from React

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

### Create Svelte component (commit: [3c0b4e8](https://github.com/baseballyama/svelte-in-react/commit/3c0b4e8))

Create Svelte component.
```shell
echo "<h1>Hello Svelte</h1>" > ./src/SvelteComponent.svelte
```

Add type file for Svelte component.
```shell
curl https://raw.githubusercontent.com/sveltejs/language-tools/master/packages/svelte2tsx/svelte-shims.d.ts > ./src/svelte-shims.d.ts
```

Update React component.
```diff
import React, { useEffect, useRef } from "react";
+ import SvelteComponent from './SvelteComponent.svelte';
import logo from "./logo.svg";
import "./App.css";

function App() {

+  const divRef = useRef<HTMLDivElement>(null);
+  useEffect(() => {
+    const component = new SvelteComponent({
+      target: divRef.current!!,
+    });
+    return () => component.$destroy();
+  }, [divRef]);

  return (
    <div className="App">
+      <div ref={divRef}></div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```

### Sharing state between React and Svelte (commit: [68dc066](https://github.com/baseballyama/svelte-in-react/commit/68dc066))

Implement a way to share state between React and Svelte.

```svelte
// SvelteComponent.svelte

<script lang="ts">
  // define props and even handler for changing count.
  export let count: number = 1;
  export let onChangeCount: (count: number) => void;
  $: onChangeCount(count);
</script>
```

```tsx
// SvelteComponentWrapper.tsx

import { useEffect, useRef } from "react";
import SvelteComponent from './SvelteComponent.svelte';
import "./App.css";

// add props
+ function SvelteComponentWrapper(props: { count: number, onChangeCount: (count: number) => void }) {

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const component = new SvelteComponent({
      target: divRef.current!!,
      // add props
      props,
    });
    return () => component.$destroy();
  // add props
  }, [divRef, props]);

  return (
    <div className="svelte-wrapper" ref={divRef}></div>
  );
}

export default SvelteComponentWrapper;
```

```tsx
// App.tsx

import { useState } from 'react';
import SvelteComponentWrapper from './SvelteComponentWrapper';
import "./App.css";

function App() {
  // add state for count (and set them to <SvelteComponentWrapper>)
  const [count, setCount] = useState(10);
  return (
    <div className="App">
      <h1>This is React world</h1>
      <p>count: {count}</p>
      <SvelteComponentWrapper count={count} onChangeCount={setCount} />
    </div>
  );
}

export default App;

```