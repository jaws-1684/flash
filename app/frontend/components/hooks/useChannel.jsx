import { useState, useCallback, useEffect, useRef } from "react";
export default function useChannel(actionCable) {
  const [connected, setConnected] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const channelRef = useRef(null);

  const subscribe = (data, callbacks) => {
    console.log(`useChannel - INFO: Connecting to ${data.channel}`);
    const channel = actionCable.subscriptions.create(data, {
      received: (message) => {
        if (callbacks.received) {
          callbacks.received(message);
        }
      },
      initialized: () => {
        console.log("useChannel - INFO: Init " + data.channel);
        setSubscribed(true);
        if (callbacks.initialized) {
          callbacks.initialized();
        }
      },
      connected: () => {
        console.log("useChannel - INFO: Connected to " + data.channel);
        setConnected(true);
        if (callbacks.connected) {
          callbacks.connected();
        }
      },
      disconnected: () => {
        console.log("useChannel - INFO: Disconnected");
        setConnected(false);
        if (callbacks.disconnected) {
          callbacks.disconnected();
        }
      },
    });
    channelRef.current = channel;
  };

  const unsubscribe = useCallback(() => {
    setSubscribed(false);
    if (channelRef.current) {
      console.log(
        "useChannel - INFO: Unsubscribing from " +
          channelRef.current.identifier,
      );
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, [unsubscribe]);

  const send = (action, payload) => {
    if (subscribed && !connected) {
      throw "useChannel - ERROR: not connected";
    }

    if (!subscribed) {
      throw "useChannel - ERROR: not subscribed";
    }

    try {
      channelRef?.current?.perform(action, payload);
    } catch (e) {
      throw "useChannel - ERROR: " + e;
    }
  };

  return { subscribe, unsubscribe, send };
}
