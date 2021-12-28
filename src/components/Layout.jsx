import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cinema TV</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta
          name="description"
          content="Film (Nollywood) nigérian complet en français"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta property="og:url" content="https://ronystv.com/" />
        <meta property="og:type" content="videos" />
        <meta property="og:title" content="Films nigérian en français" />
        <meta
          property="og:description"
          content="Regardez le meilleur du cinéma nollywood sur notre site et passez de bon moments"
        />
        <meta
          property="og:image"
          content="https://ronystv.com/favicon.png"
        />
      </Head>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
};

export default Layout;
