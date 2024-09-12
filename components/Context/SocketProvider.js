'use client';

import { createContext, useContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";
import { socketUrl } from "@/lib/constant";

export const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    const socketStore = io(socketUrl, {
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay before reconnection attempts (ms)
      reconnectionDelayMax: 5000, // Maximum delay between reconnections (ms)
      timeout: 20000, // Connection timeout (ms)
      transports: ['websocket'], // Specify transports (WebSocket preferred)
      secure: true, // Whether to use HTTPS
    });
    return socketStore;
  }, []);

  useEffect(() => {
    // Log when the socket connects
    socket.on('connect', () => {
      console.log(`Socket connected: ${socket.id}`);
    });

    // Manage the disconnect event (but do not log the default disconnection message)
    socket.on('disconnect', (reason) => {
      if (reason !== 'io client disconnect') {
        console.log(`Socket disconnected due to: ${reason}`);
      }
    });

    // Log when the socket reconnects
    socket.on('reconnect', (attempt) => {
      console.log(`Socket reconnected on attempt: ${attempt}`);
    });

    // Log when reconnection attempt fails
    socket.on('reconnect_failed', () => {
      console.log('Socket reconnection failed');
    });

    // Clean up the socket connection on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
