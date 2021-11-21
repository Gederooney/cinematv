import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";

import Createmovie from "../../src/components/Createmovie";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getSession();
      if (!res) window.location.href = "/login";
      else {
        const { data } = await axios.get(
          `https://cinematv-ten.vercel.app/api/users/${res.user.email}`
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
      <div className="container">
        <Createmovie />
      </div>
    )
  );
};
export default Admin;
