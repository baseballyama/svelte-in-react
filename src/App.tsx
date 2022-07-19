import { useState } from 'react';
import SvelteComponentWrapper from './SvelteComponentWrapper';
import "./App.css";

function App() {
  const [count, setCount] = useState(10);

  const onClickButton = () => {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <h1>This is React world</h1>
      <p>count: {count}</p>
      <button onClick={onClickButton}>Click From React World. Count: {count}</button>
      <SvelteComponentWrapper count={count} onChangeCount={setCount} />
    </div>
  );
}

export default App;
