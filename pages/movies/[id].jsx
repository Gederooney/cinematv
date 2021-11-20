import axios from "axios";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";

const Movie = (props) => {
  const { res } = props;
  const { movie } = res;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const res = getSession();
    setIsLoading(false);
  });
  return (
    !isLoading && (
      <div className="container">
        <div className="col-lg-12 card my-3 py-3">
          <div className="row row-cols-1">
            <div className="row my-2 mx-auto">
              <div className="col-lg-8 mx-auto">
                <div className="card p-2 col mx-auto">
                  {(movie.isIframe && (
                    <iframe
                      className="col-12 my-auto"
                      src={`https://www.youtube-nocookie.com/embed/${movie.media}`}
                    ></iframe>
                  )) || (
                    <video
                      controls
                      poster={`https://cdn.videas.fr/v-medias/${movie.poster}`}
                    >
                      <source
                        src={`https://cdn.videas.fr/v-medias/${movie.media}`}
                      ></source>
                    </video>
                  )}
                </div>
              </div>
            </div>
            <div className="row my-2 mx-auto">
              <div className="col-lg-8 mx-auto">
                <div className="card col details_wrapper">
                  <div className="row">
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  try {
    const res = await axios.get(
      `http://localhost:3000/api/movies/${params.id}`
    );
    return { props: { res: res.data } };
  } catch (err) {
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { id: "1636371777683" },
      },
    ],
    fallback: "blocking",
  };
}

export default Movie;
