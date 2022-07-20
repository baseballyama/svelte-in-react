import React, { useState, useRef } from 'react';
import SvelteComponentWrapper from './SvelteComponentWrapper';
import "./App.css";
import { Context } from './context';

function App() {
  const svelteComponentWrapperRef = useRef < React.ElementRef<typeof SvelteComponentWrapper>>(null)
  const [count, setCount] = useState(10);
  const [context, setContext] = useState("This is React context");

  const onClickButton = () => {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <Context.Provider value={context}>
        <h1>This is React world</h1>
        <p>count: {count}</p>
        <button onClick={onClickButton}>Click From React World. Count: {count}</button>
        <input type="text" value={context} onChange={(e) => setContext(e.currentTarget.value)}></input>
        <p>context: {context}</p>
        <button onClick={() => svelteComponentWrapperRef.current?.reset()}>Reset</button>
        <div className="margin"></div>
        <SvelteComponentWrapper count={count} onChangeCount={setCount} ref={svelteComponentWrapperRef} />
      </Context.Provider>
    </div>
  );
}

export default App;
