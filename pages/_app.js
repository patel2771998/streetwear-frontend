import Head from "next/head";
import { StoreProvider } from "../context/store-context";
import { DisplayProvider } from "../context/display-context";
import Layout from "../components/layout/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <DisplayProvider>
        <Head>
          <title>Stret Wear</title>
          <meta name="description" content="Street wear" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DisplayProvider>
    </StoreProvider>
  );
}

export default MyApp;
