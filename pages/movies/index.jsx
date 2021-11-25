import React from "react";
import axios from "axios";

import PropTypes from "prop-types";

const Movies = (props) => {
  const { data } = props;
  return (
    <div className="container">
      <div className="row banner my-4">
        <div className="card d-flex align-items-center justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col mx-auto my-auto text-center">
            Cette page est encore sous developpement, je la partagerai avec vous
            une fois qu&apos;elle sera terminée. Mercii
          </div>
        </div>
      </div>
    </div>
  );
};

Movies.propTypes = {
  data: PropTypes.object,
};

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/api`);
    return { props: { data: data } };
  } catch (error) {
    console.log(error.message);
    return { props: { data: { message: error.message } } };
  }
}

export default Movies;
