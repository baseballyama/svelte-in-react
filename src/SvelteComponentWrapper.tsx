import { useEffect, useRef } from "react";
import SvelteComponent from './SvelteComponent.svelte';
import "./App.css";

function SvelteComponentWrapper(props: { count: number, onChangeCount: (count: number) => void }) {

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const component = new SvelteComponent({
      target: divRef.current!!,
      props,
    });
    return () => component.$destroy();
  }, [divRef, props]);

  return (
    <div className="svelte-wrapper" ref={divRef}></div>
  );
}

export default SvelteComponentWrapper;
