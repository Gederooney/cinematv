import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Layout from "../../src/components/Layout";
import PropTypes from "prop-types";
import Head from "next/head";

const Movie = ({ movie }) => {
  return (
    (movie && (
      <Layout>
        <Head>
          <title>{`${movie.title.toUpperCase()} | Cinema TV`}</title>
          <link rel="shortcut icon" type="image/png" href="/favicon.png" />
          <meta
            name="og:title"
            content={`${movie.title.toUpperCase()} | Cinema TV`}
          />
          <meta property="og:image" content="/favicon.png" />
          <meta
            property="og:url"
            content={`https://ronystv.com/movies/${movie.id}`}
          />
        </Head>
        <div className="container">
          <div className="col-lg-12 card my-3 py-3">
            <div className="row row-cols-1">
              <div className="row my-2 mx-auto">
                <div className="col-lg-8 mx-auto">
                  <div className="card p-2 col mx-auto">
                    {(movie && movie.isIframe && (
                      <iframe
                        className="col-12 my-auto"
                        src={`https://www.youtube-nocookie.com/embed/${movie.media}`}
                      ></iframe>
                    )) ||
                      (movie && (
                        <video
                          controls
                          poster={`https://cdn.videas.fr/v-medias/${movie.poster}`}
                        >
                          <source
                            src={`https://cdn.videas.fr/v-medias/${movie.media}`}
                          ></source>
                        </video>
                      ))}
                  </div>
                </div>
              </div>
              <div className="row my-2 mx-auto">
                <div className="col-lg-8 mx-auto">
                  <div className="card col details_wrapper">
                    <div className="row">
                      <div className="col text-muted px-5 py-2 disclaimer">
                        <span>Disclaimer:</span> This content is provided and
                        hosted on a distant server. Cinema TV helps you discover
                        publicly available material throughout Internet and as a
                        search engine does not host or upload this material and
                        is not responsible for the content.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )) || <div>Loading</div>
  );
};
Movie.propTypes = {
  id: PropTypes.string,
  movie: PropTypes.object,
};

export async function getStaticProps({ params }) {
  try {
    const { data } = await axios.get(`https://ronystv.com/api/movies/${params.id}`, {
      method: "GET",
      mode: "cors",
      headers: {},
    });
    return {
      props: { id: params.id, movie: data.movie, pageTitle: data.movie.title },
    };
  } catch (err) {
    console.log(err.message);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { id: "1637521358889" },
      },
      {
        params: { id: "1637584256007" },
      },
      {
        params: { id: "1637926659410" },
      },
      {
        params: { id: "1637926659410" },
      },
    ],
    fallback: true,
  };
}

export default Movie;
