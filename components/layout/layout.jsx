import React, { useContext } from "react";
import NavBar from "./nav-bar";
import Blur from "./blur";
import CartView from "../cart-view/cart-view";
import DisplayContext from "../../context/display-context";
import styles from "../../styles/layout.module.css";
import Footer from "./Footer.jsx";
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import { theme } from '../../utils/theme';
import { GlobalStyles } from '../../utils/globalStyles';
import { AppProvider } from '../../contexts/app/AppContext';



const Layout = ({ children }) => {
  const { cartView } = useContext(DisplayContext);
  const store = configureStore()
  const App = ({ Component, pageProps }) => {
    let Layout = Component.layout || Fragment;
  
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            property="og:url"
            content="https://bonik-react.vercel.app/landing"
          />
          {/* thumbnail And title for social media */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="React Next JS Ecommerce Template" />
          <meta
            property="og:description"
            content="Minimal, clean and Fast Next js ecommerce template. Build Super store, Grocery delivery app, Multivendor store and niche market"
          />
          <meta
            property="og:image"
            content="/assets/images/landing/preview.png"
          />
  
          {/* Google analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-SGG7GE7HZC"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SGG7GE7HZC');
            `,
            }}
          ></script>
        </Head>
        <GlobalStyles />
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ThemeProvider>
    );
  };


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <div className={cartView ? styles.noscroll : null}>
            <CartView />
            <Blur />
            <NavBar />
            <main>{children}</main>
            <Footer />
      </div>
    </Provider>
  </ThemeProvider>
  );
};

export default Layout;
