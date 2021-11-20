import { useState, useEffect } from "react";
import Link from "next/Link";
import { signIn, getSession } from "next-auth/client";

const Login = () => {
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [formData, setFormData] = useState({
    username: {
      value: "",
      error: false,
      touched: false,
      isEmail: false,
    },
    password: {
      value: "",
      error: false,
      touched: false,
    },
  });
  const { username, password } = formData;
  const handleChange = (e) => {
    const temp = formData[e.target.name];

    if (!temp.touched) temp.touched = true;
    temp.value = e.target.value;

    if (e.target.name === "username") {
      temp.isEmail = isEmail.test(temp.value);

      temp.error = !temp.isEmail;
    }

    setFormData({ ...formData, [e.target.name]: temp });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        username: username.value,
        password: password.value,
      });
      console.log(res);
      if (!res.error && res.ok) window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getSession();
      setIsLoading(false);
      if (res) window.location.href = "/";
    })();
  }, [loadedSession]);
  if (isLoading) return <div>IsLoading...</div>;
  return (
    !isLoading && (
      <div className="container wrapper">
        <div className="p-4 rounded-3 mx-auto col-lg-4 col-md-5 col-sm-8 loginform">
          <form className="mx-auto col-sm-12" onSubmit={(e) => handleSubmit(e)}>
            <h2 className="py-2">Connexion</h2>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nom d'utilisateur
              </label>
              <input
                className={
                  username.error
                    ? "form-control border border-danger py-2"
                    : "form-control py-2"
                }
                type="email"
                name="username"
                value={username.value}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Mot de passe
              </label>
              <input
                className={
                  password.error
                    ? "form-control border border-danger py-2"
                    : "form-control py-2"
                }
                type="password"
                name="password"
                value={password.value}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="col-sm-10 col-lg-12 mx-auto row pt-3">
                <button
                  className="mb-1 btn form_btn col-lg-8 col-md-8 col-sm-12"
                  type="submit"
                >
                  Connexion
                </button>
                <small className="text-muted align-self-end text-small col-md-12 col-sm-12 d-flex justify-content-end">
                  <Link href="/register">
                    <a>Créer un compte</a>
                  </Link>
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Login;
