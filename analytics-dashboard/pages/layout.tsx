import { Inter } from "next/font/google";
import Head from "next/head";
import { MainLayout } from "../layouts/main.layout";
import { Toaster } from "../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <>
          <Head>
            <script type="text/javascript" src="/static/script.js?projectName=theDashboard" async />
          </Head>
          <MainLayout>
          <Toaster />
            {children}
        </MainLayout>
      </>
  );
}
