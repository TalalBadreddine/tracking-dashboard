import RootLayout from './layout';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { WebSocketProvider } from 'context/Socket';
import "./globals.css";
import "react-day-picker/style.css";

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, [])

  return (
    <WebSocketProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </WebSocketProvider>
  );
}
export default MyApp;
