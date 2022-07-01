import Footer from "@component/footer/Footer";
import Header from "@component/header/Header";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
import Topbar from "@component/topbar/Topbar";
import Head from "next/head";
import React from "react";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
};

const AppLayout () = ({
  children,
  navbar,
  title = "React Next.js Ecommerce Template",
}) => (
  <StyledAppLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Topbar />

    <Sticky fixedOn={0}>
      <Header />
    </Sticky>

    {navbar && <div className="section-after-sticky">{navbar}</div>}
    {!navbar ? (
      <div className="section-after-sticky">{children}</div>
    ) : (
      children
    )}
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    {/* Same as ß*/}
    <ToastContainer />
    <MobileNavigationBar />
    <Footer />
  </StyledAppLayout>
);

export default AppLayout;
