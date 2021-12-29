import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Homepagepost = ({ post }) => {
  useEffect(() => {
    console.log(post.id);
  });
  return (
    <div className="col">
      <div className="w-100 d-flex flex-column">
        <div className="post_img w-100" style={{background:`url(${post.feature_image}`}}></div>
			  <div className="post_title">{ post.title}</div>
      </div>
    </div>
  );
};

Homepagepost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Homepagepost;
