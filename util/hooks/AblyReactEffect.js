import Ably from "ably/promises";
import { useEffect } from "react";

const baseURL = process.env.VERCEL_URL || "http://localhost:3000";

const ably = new Ably.Realtime.Promise({
  authUrl: `${baseURL}/api/createTokenRequest`,
});
console.log("REQUEST");

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
