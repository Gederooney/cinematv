import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import GhostContentAPI from "@tryghost/content-api";

import Layout from "../src/components/Layout";
import Homepagepost from "../src/components/Homepagepost";
import { AiOutlineConsoleSql } from "react-icons/ai";

const postAPI = new GhostContentAPI({
  url: "https://cinematv-dashboard.herokuapp.com",
  key: "6bd2a72b398d9d7375300217b5",
  version: "v3",
});

const getPost = async () => {
  const res = await fetch(
    `https://cinematv-dashboard.herokuapp.com/ghost/api/v3/content/posts/?key=6bd2a72b398d9d7375300217b5&limit=4`
  ).then((res) => res.json());
  return res.posts;
};
const getMovies = async () => {};

function HomePage({ movies, posts }) {
  useEffect(() => {
    console.log(posts);
  }, []);
  return (
    (
      <Layout>
			
        <div className="container">
          <div className="card my-3">
            <h2 className="my-3 ms-3">Histoires Vecues</h2>
            <div className="card-body">
              <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2  g-2 g-lg-3 g-md-2">
                {posts.map((post) => (
                  <Link href={`posts/${post.slug}`} key={post.id}>
                    <a className="my-2">
                      <Homepagepost post={post} />
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="card">
            <h2 className="my-3 ms-3">Films</h2>
            <div className="card-body">
              <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2  g-2 g-lg-3 g-md-2">
                {movies &&
                  movies.slice(0, 15).map((movie) => {
                    return (
                      <div className="col" key={movie.id}>
                        <div className="card single_movie_card p-2">
                          <Link href={`/movies/${movie.id}`}>
                            <a>
                              <div className="col single_movie_img my-2">
                                <img
                                  className="card-img-top"
                                  src={
                                    (movie.isIframe &&
                                      `https://img.youtube.com/vi/${movie.poster}/0.jpg`) ||
                                    `https://cdn.videas.fr/v-medias/${movie.poster}`
                                  }
                                  alt={`${movie.title} Nollywood film nigérian en français`}
                                  title={movie.title.toUpperCase()}
                                />
                              </div>
                            </a>
                          </Link>
                          <Link href={`/movies/${movie.id}`}>
                            <a
                              className="card mb-2 movie_infos"
                              title={movie.title.toUpperCase()}
                            >
                              <span className="home_movie_title">
                                <span></span>
                                <span>
                                  {(movie.title.length > 12 &&
                                    `${movie.title
                                      .toUpperCase()
                                      .slice(0, 12)}...`) ||
                                    movie.title.toUpperCase()}
                                </span>
                              </span>
                              <span className="home_movie_title">
                                <span></span>
                                <span>{movie.type.toUpperCase()}</span>
                              </span>
                              <span className="home_movie_title">
                                <span>Durée:</span>
                                <span>{`${Math.floor(movie.duration / 60)}h${
                                  movie.duration - 60
                                }min`}</span>
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    ) || <div>Loading</div>
  );
}
HomePage.propTypes = {
  movies: PropTypes.array.isRequired,
  posts: PropTypes.array,
};

export async function getServerSideProps() {
  try {
    const posts = await getPost();
    const res = await fetch(`https://ronystv.com/api/movies`);
    const { data } = await res.json();
    return { props: { movies: data, posts: posts } };
  } catch (error) {
    console.log(error.message);
    return { props: { data: [] } };
  }
}

export default HomePage;
