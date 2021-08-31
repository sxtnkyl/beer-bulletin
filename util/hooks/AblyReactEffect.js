import Ably from "ably/promises";
import { useEffect } from "react";

// const baseURL = process.env.VERCEL_URL || "http://localhost:3000";

// consider adding echoMessages: false
const ably = new Ably.Realtime.Promise({
  authUrl: `${process.env.VERCEL_URL}/api/createTokenRequest`,
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
