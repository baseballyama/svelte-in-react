import React, { useEffect, useRef } from "react";
import SvelteComponent from './SvelteComponent.svelte';
import logo from "./logo.svg";
import "./App.css";

function App() {

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const component = new SvelteComponent({
      target: divRef.current!!,
    });
    return () => component.$destroy();
  }, [divRef]);

  return (
    <div className="App">
      <div ref={divRef}></div>
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
