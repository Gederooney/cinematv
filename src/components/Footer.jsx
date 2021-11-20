import React from "react";

const Footer = () => {
  return (
    <div className="footer card py-4 mt-5">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          Copyright &copy; Cinéma TV {new Date().getFullYear()} Tous les droits
          sont réservés. 
        </div>
      </div>
    </div>
  );
};

export default Footer;
