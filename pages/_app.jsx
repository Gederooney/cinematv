import React, { useState } from "react";
import Layout from "../src/components/Layout";
import PropTypes from "prop-types";

// redux
import { Provider } from "react-redux";
import store from "../redux/store";

//context
import AppContext from "../appContexte";

//styles
import "../src/assets/css/global.css";

const App = ({ Component, pageProps }) => {
  const [movies, setMovies] = useState(null);
  const [metaTags, setMetaTags] = useState({ pageTitle: "" });
  return (
    <AppContext.Provider
      value={{
        state: {
          movies: movies,
          metaTags: { pageTitle: "" },
        },
        setMovies: setMovies,
        setMetaTags: setMetaTags,
      }}
    >
      <>
        <Component {...pageProps} />
      </>
    </AppContext.Provider>
  );
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
  movies: PropTypes.array,
};

export default App;
