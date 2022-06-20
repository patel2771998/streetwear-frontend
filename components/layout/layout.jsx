import React, { useContext } from "react";
import NavBar from "./nav-bar";
import Blur from "./blur";
import CartView from "../cart-view/cart-view";
import DisplayContext from "../../context/display-context";
import styles from "../../styles/layout.module.css";
import Footer from "./Footer.jsx";
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';


const Layout = ({ children }) => {
  const { cartView } = useContext(DisplayContext);
  const store = configureStore()


  return (
    <Provider store={store}>
      <div className={cartView ? styles.noscroll : null}>
          <CartView />
          
          <Blur />
          <NavBar />
          <main>{children}</main>
          <Footer />
    </div>
  </Provider>
  );
};

export default Layout;
