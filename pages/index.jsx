import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function HomePage(props) {
  const { data } = props;
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    (async () => {
      
      setIsloading(false);
    })();
  }, []);
  return (
    !isLoading && (
      <div className="container">
        <div className="card mt-4 py-3">
          <div className="card-body">
            <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2  g-2 g-lg-3 g-md-2">
              {data.map((movie) => {
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
    )
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/movies`);
    if (!res.data) {
      const data = [];
      return { props: data };
    }
    return { props: res.data };
  } catch (error) {
    console.log(error.message);
  }
}

export default HomePage;
