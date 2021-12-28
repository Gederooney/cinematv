import React, { useEffect } from "react";
import Link from "next/link";

import * as AiIcons from "react-icons/ai";
import styles from "../assets/css/Sidebar.module.css";

import { navItems } from "../data/navData";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const { display, showSidebar } = props;
  useEffect(() => {
    var body = document.body;
    if (display) {
      body.style["overflow"] = "hidden";
    } else {
      body.style["overflow"] = "scroll";
    }
  });
  return (
    <div
      className={
        display
          ? `${styles.sidebar_menu} ${styles.active} row col-md-5 col-sm-8 col-8 row-cols-1 d-flex`
          : `${styles.sidebar_menu} row row-cols-1 d-flex`
      }
    >
      <div
        className={`col-12 d-flex align-items-center justify-content-end ${styles.close_mobile}`}
      >
        <Link href="#">
          <a className={styles.menu_bars} onClick={(e) => showSidebar(e)}>
            <AiIcons.AiOutlineClose />
          </a>
        </Link>
      </div>
      <div className="col">
        <ul>
          {navItems.map((item) => {
            return (
              <li
                key={item.id}
                className={`${styles.sidebar_text} d-flex`}
                onClick={(e) => showSidebar(e)}
              >
                <Link href={item.path}>
                  <a className="d-flex">
                    <span className={`${styles.span}`}>{item.title}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  display: PropTypes.bool.isRequired,
  showSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
