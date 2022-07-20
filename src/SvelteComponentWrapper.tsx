import React, { useEffect, useRef, useContext, useImperativeHandle, Ref } from "react";
import SvelteComponent, { WrapperProps, Handlers, $on } from './SvelteComponent.svelte';
import "./App.css";
import { Context, KEY } from './context';
import { writable, Writable } from 'svelte/store';

const SvelteComponentWrapper: React.ForwardRefRenderFunction<Handlers, WrapperProps> = ((props, ref: Ref<unknown>) => {
  const context = useContext(Context);
  const divRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<SvelteComponent>();
  const storeRef = useRef<Writable<string>>(writable(context));

  useEffect(() => {
    storeRef.current.set(context);
  }, [storeRef, context]);

  useEffect(() => {
    if (!divRef.current) return;
    const component = new SvelteComponent({
      target: divRef.current,
      props,
      context: new Map([[KEY, storeRef.current]])
    });
    componentRef.current = component;

    // TODO: remove `as`.
    (component.$on as $on)('change', (event) => {
      const { type, value } = event.detail;
      if (type === 'count') props.onChangeCount(value);
    });
    return () => component.$destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef]);

  useEffect(() => {
    componentRef.current?.$set(props);
  }, [props]);

  useImperativeHandle(ref, () => {
    const funcNames = Object.getOwnPropertyNames(SvelteComponent.prototype);
    const obj: Record<string, unknown> = {};
    for (const funcName of funcNames) {
      if (funcName === 'constructor') continue;
      obj[funcName] = (...args: unknown[]) => componentRef.current?.[funcName](args);
    }
    return obj;
  })

  return (
    <div className="svelte-wrapper" ref={divRef}></div>
  );
});

export default React.forwardRef(SvelteComponentWrapper);
