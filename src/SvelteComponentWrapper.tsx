import { useEffect, useRef } from "react";
import SvelteComponent from './SvelteComponent.svelte';
import "./App.css";

function SvelteComponentWrapper() {

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const component = new SvelteComponent({
      target: divRef.current!!,
    });
    return () => component.$destroy();
  }, [divRef]);

  return (
    <div className="svelte-wrapper" ref={divRef}></div>
  );
}

export default SvelteComponentWrapper;
