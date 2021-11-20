import { useEffect } from "react";
import Layout from "../src/components/Layout";

import "bootstrap/dist/css/bootstrap.css";

import "../src/assets/css/global.css";

const App = ({ Component, pageProps }) => {

  return (
    <Layout className="container">
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
