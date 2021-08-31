import Ably from "ably/promises";
import { useEffect } from "react";

const baseURL = "https://beer-bulletin.vercel.app";

// consider adding echoMessages: false
const ably = new Ably.Realtime.Promise({
  authUrl: `${baseURL}/api/createTokenRequest`,
});

export function useChannel(channelName, callbackOnMessage) {
  const channel = ably.channels.get(channelName);

  const onMount = () => {
    channel.subscribe((msg) => {
      callbackOnMessage(msg);
    });
  };

  const onUnmount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  useEffect(useEffectHook);

  return [channel, ably];
}
