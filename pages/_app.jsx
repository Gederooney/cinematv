import React from "react";
import Layout from "../src/components/Layout";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.css";

import "../src/assets/css/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <Layout className="container">
      <Component {...pageProps} />
    </Layout>
  );
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default App;
