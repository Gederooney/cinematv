import React from "react";
import PropTypes from "prop-types";
import Layout from "../../src/components/Layout";
import Head from "next/head";

const getPost = async (slug) => {
  const res = await fetch(
    `https://cinematv-dashboard.herokuapp.com/ghost/api/v3/content/posts/slug/${slug}?key=6bd2a72b398d9d7375300217b5`
  ).then((res) => res.json());
  const { posts } = res;
  return posts[0];
};
const Post = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{`Rony's Tv ${post.title}`}</title><meta
            name="og:title"
            content={`${post.title.toUpperCase()} | Cinema TV`}
          />
          <meta property="og:image" content="/favicon.png" />
          <meta
            property="og:url"
            content={`https://ronystv.com/posts/${post.slug}`}
          />
      </Head>
      <div className="container">
        <div className="d-flex flex-column">
          <div className="article_title col-lg-8 mx-auto">
            <h1 className="">{post.title}</h1>
            <hr />
            <div className="infos"></div>
          </div>
          <div
            className="w-100 article_image my-4"
            style={{ background: `url(${post.feature_image})` }}
          ></div>
          <div className="col-lg-8 mx-auto my-4">
            <div
              className="article_body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post } };
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
