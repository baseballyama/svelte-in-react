import { useEffect, useRef } from "react";
import SvelteComponent, { WrapperProps, $on } from './SvelteComponent.svelte';
import "./App.css";

function SvelteComponentWrapper(props: WrapperProps) {

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!divRef.current) return;
    const component = new SvelteComponent({
      target: divRef.current,
      props,
    });

    // TODO: remove `as`.
    (component.$on as $on)('change', (event) => {
      const { type, value } = event.detail;
      if (type === 'count') props.onChangeCount(value);
    });
    return () => component.$destroy();
  }, [divRef, props]);

  return (
      <div className="svelte-wrapper" ref={divRef}></div>
  );
}

export default SvelteComponentWrapper;
