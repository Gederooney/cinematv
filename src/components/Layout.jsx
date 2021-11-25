import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children, pageTitle }) => {
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
        <meta property="og:locale" content="fr" />
        <meta property="og:type" content="video" />
        <meta name="og:title" content="CINEMA TV FILMS AFRICAINS" />
        <meta
          name="og:description"
          content="Streaming de films africains en français. FIlms Nigérian nollywood"
        />
      </Head>
      <Navbar />
      <div className="content">{children}</div>

      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
};

export default Layout;
