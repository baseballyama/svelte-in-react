import {
  GetDispatcherPublisherType,
  GetDispatcherSubscriberType,
} from "./svelte-type-helper";

declare module "./SvelteComponent.svelte" {
  type Props = {
    count: number;
  };
  type DispatcherPublisher = GetDispatcherPublisherType<Props>;
  type DispatcherSubscriber = GetDispatcherSubscriberType<Props>;
  type WrapperProps = GetSvelteWrapperProps<Props>;
  type $on = GetDispatcherSubscriberType<Props>;
}
