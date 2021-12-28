import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";

import Link from "next/link";
import Image from "next/image";
import Createmovie from "../../src/components/Createmovie";
import Editmovies from "../../src/components/Editmovies";
import Layout from "../../src/components/Layout";
import styles from "../../src/assets/css/admin.module.css";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("edit");
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getSession();
      if (!res) window.location.href = "/login";
      else {
        const { data } = await axios.get(
          `https://ronystv.com/api/users/${res.user.email}`
        );
        if (data.sucess) setUser(data.user);
        !data.user.isAdmin && (window.location.href = "/");
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    !isLoading &&
    user.isAdmin && (
      <Layout>
        <div className="row">
          <div
            className={`${styles.side} d-flex flex-column flex-shrink-0 p-3 text-white col`}
          >
            <Link href="/">
              <a className=" ps-2 col-12 d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <Image src="/favicon.png" width="50" height="50" />
              </a>
            </Link>
            <hr />
            <ul className="list-unstyled ps-2">
              <li className="mb-1">
                <Link href="#">
                  <a
                    className="btn-toggle rounded collapsed btn-dark border-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#movie-collapse"
                    aria-expanded="false"
                  >
                    Movies
                  </a>
                </Link>

                <div className="collapse" id="movie-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal p-3 small">
                    <li onClick={(e) => setSelected("create")}>Create</li>
                    <li onClick={(e) => setSelected("edit")}>Edit</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className={`${styles.rightcontent} col-9`}>
            {selected === "create" ? <Createmovie /> : <Editmovies />}
          </div>
        </div>
      </Layout>
    )
  );
};

export default Admin;
