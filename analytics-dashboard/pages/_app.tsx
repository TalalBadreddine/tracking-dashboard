import RootLayout from './layout';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { WebSocketProvider } from './context/Socket';

function MyApp({ Component, pageProps }) {

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
