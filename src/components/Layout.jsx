import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cinema Tv</title>
      </Head>
      <Navbar />
      <div className="content">{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
