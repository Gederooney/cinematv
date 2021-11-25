import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../appContexte";
import axios from "axios";
import { getSession, signOut } from "next-auth/client";

import Sidebar from "./Sidebar";
import Link from "next/link";

import styles from "../assets/css/Nav.module.css";

import * as AiIcons from "react-icons/ai";

import { navItems } from "../data/navData";

const Navbar = () => {
  const value = useContext(AppContext);
  const [isLoading, setIsloading] = useState(true);
  const [user, setUser] = useState(null);
  const [display, setDisplay] = useState(false);

  const showSidebar = (e) => {
    setDisplay(!display);
  };
  const handleLogout = async (e) => {
    await signOut({});
  };
  useEffect(() => {
    (async () => {
      const res = await getSession();
      if (res) {
        const { data } = await axios.get(
          `https://cinematv-ten.vercel.app/api/users/${res.user.email}`
        );
        if (data.sucess) setUser(data.user);
      }
      if (window.location.href === "https://cinematv-ten.vercel.app")
        navItems[0].active = true;
      setIsloading(false);
    })();
  }, []);
  return (
    !isLoading && (
      <>
        <header
          className={`${styles.navbar} navbar navbar-expand-lg fixed-top flex-wrap justify-content-between align-items-center  py-3`}
        >
          <div className="container">
            <Link href="/">
              <a className={`${styles.logo} d-flex`}>
                <h2>
                  Cinema <span className={styles.tv}>TV</span>
                </h2>
              </a>
            </Link>
            <span
              className={`${styles.menu_bars} navbar-toggler`}
              onClick={(e) => showSidebar(e)}
            >
              <AiIcons.AiOutlineMenu />
            </span>
            <div className={`collapse navbar-collapse ms-auto`}>
              <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                {navItems.map((item) => {
                  return (
                    <li className={`${item.cName}`} key={item.id}>
                      <Link href={item.path}>
                        <a
                          className={
                            (item.active &&
                              "nav-link px-3 link-secondary active") ||
                            "nav-link px-3 link-secondary"
                          }
                        >
                          {item.title}
                        </a>
                      </Link>
                    </li>
                  );
                })}
                {user && user.isAdmin && (
                  <li className="nav-item">
                    <Link href="/admin">
                      <a className="nav-link px-2 link-secondary">Admin</a>
                    </Link>
                  </li>
                )}
              </ul>
              <div className="ms-auto me-auto input-group">
                <span className="input-group-text" id="basic-addon1">
                  <AiIcons.AiOutlineSearch />
                </span>
                <input
                  type="text"
                  name="search"
                  className="search_bar form-control py-2"
                  onChange={(e) => {
                    const res = value.state.movies.filter((movie) =>
                      movie.title
                        .toLowerCase()
                        .includes(e.target.value.toLocaleLowerCase())
                    );
                    console.log(res);
                  }}
                />
              </div>
              {!isLoading && !user && (
                <div className="col-md-3 text-end">
                  <button
                    type="button"
                    className={`${styles.nav_cta} btn me-2`}
                  >
                    <Link href="/login">
                      <a>Connexion</a>
                    </Link>
                  </button>
                </div>
              )}
              {!isLoading && user && (
                <div className="col-md-3 text-end">
                  <button
                    type="button"
                    className={`${styles.nav_cta} btn me-2`}
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <Sidebar display={display} showSidebar={showSidebar} />
      </>
    )
  );
};
export default Navbar;
