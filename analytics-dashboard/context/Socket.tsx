import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

type WebSocketContextType = {
  sendMessage: (type: string, data: any) => void;
  metrics: EventModel | undefined;
  handleProjectNameChange: (e: string) => void
};


const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};


export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<EventModel>();
  const socketRef = useRef<WebSocket | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:8080/ws");
      socketRef.current = socket;

      socket.onopen = () => {
        if (projectName) {
          socket.send(JSON.stringify({ type: 'update_data', data: { projectName } }));
        }
      };

      socket.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          if (parsedData?.projectName == projectName && parsedData?.message?.type == 'event_analysis') {
            setMetrics(parsedData?.message?.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };


      socket.onclose = () => {
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
      socketRef.current = null;
    };
  }, [projectName]);

  const sendMessage = (type: string, data: any) => {
    const socket = socketRef.current;
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type, data }));
      } else if (socket.readyState === WebSocket.CONNECTING) {
        const onOpenHandler = () => {
          socket.send(JSON.stringify({ type, data }));
          socket.removeEventListener('open', onOpenHandler);
        };
        socket.addEventListener('open', onOpenHandler);
      }
    } else {
      console.error('WebSocket is not initialized');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage: (type: string, data: any) => sendMessage(type, data), metrics, handleProjectNameChange: (e: string) => setProjectName(e) }}>
      {children}
    </WebSocketContext.Provider>
  );
};
