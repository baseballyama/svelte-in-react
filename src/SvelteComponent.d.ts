import {
  GetDispatcherPublisherType,
  GetDispatcherReceiverType,
} from "./svelte-type-helper";

export declare module "./SvelteComponent.svelte" {
  type Props = {
    count: number;
  };
  type DispatcherPublisher = GetDispatcherPublisherType<Props>;
  type DispatcherReceiver = GetDispatcherReceiverType<Props>;
  type WrapperProps = GetSvelteWrapperProps<Props>;
  type $on = GetDispatcherReceiverType<Props>;
}