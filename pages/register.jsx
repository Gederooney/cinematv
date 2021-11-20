import { useState } from "react";
import Link from "next/Link";
import axios from "axios";

const createUser = async (username, password) => {
  try {
    const res = await axios.post("http://localhost:3000/api/auth/register", {
      username: username,
      password: password,
    });
    return;
  } catch (error) {
    console.log(error.message);
  }
};

const Register = () => {
  const hasSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const hasNumber = /\d/;
  const hasCapitalLetter = /[A-Z]/;

  const [formData, setFormData] = useState({
    username: {
      value: "",
      error: false,
      touched: false,
      isEmail: false,
      space: true,
    },
    password: {
      value: "",
      error: false,
      touched: false,
      hasSpecialChar: false,
      isEmail: false,
      hasNumber: false,
      hasCapitalLetter: false,
      length: 0,
    },
    password2: {
      value: "",
      error: false,
      touched: false,
      isIdentical: false,
    },
  });

  const { username, password, password2 } = formData;
  const handleChange = (e) => {
    const temp = formData[e.target.name];
    temp.value = e.target.value;
    if (!temp.touched) temp.touched = true;
    if (e.target.name === "username") {
      temp.isEmail = isEmail.test(temp.value);
      temp.error =
        !temp.isEmail || temp.value === "" || temp.value.trim().includes(" ");
    } else if (e.target.name === "password") {
      temp.hasSpecialChar = hasSpecialChar.test(temp.value);
      temp.hasNumber = hasNumber.test(temp.value);
      temp.hasCapitalLetter = hasCapitalLetter.test(temp.value);
      temp.isEmail = isEmail.test(temp.value);
      temp.length = temp.value.length;
      temp.error =
        (temp.value === formData.username.value && temp.value !== "") ||
        temp.value === "" ||
        !temp.hasCapitalLetter ||
        !temp.hasSpecialChar ||
        !temp.hasNumber ||
        temp.isEmail ||
        temp.length < 8;
    } else if (e.target.name === "password2") {
      temp.isIdentical =
        temp.value === formData.password.value && temp.value !== "";
      temp.error = !temp.isIdentical;
    }
    setFormData({ ...formData, [e.target.name]: temp });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.error && !password.error && !password2.error) {
      const res = await createUser(username.value, password.value);
    }
    return;
  };
  return (
    <div className="container wrapper">
      <div className="p-4 rounded-3 mx-auto col-lg-4 col-md-5 col-sm-8 loginform">
        <form className="mx-auto col-sm-12" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="py-2">Créer un compte</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nom d'utilisateur
            </label>
            <input
              className={
                username.error
                  ? "form-control py-2 border border-danger"
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
                  ? "form-control py-2 border border-danger"
                  : "form-control py-2"
              }
              type="password"
              name="password"
              value={password.value}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password2">
              Vérifier le mot de passe
            </label>
            <input
              className={
                password2.error
                  ? "form-control py-2 border border-danger"
                  : "form-control py-2"
              }
              type="password"
              name="password2"
              value={password2.value}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <div className="col-sm-10 col-lg-12 mx-auto row pt-3">
              <button
                className="btn col-lg-8 col-md-8 col-sm-12 form_btn"
                type="submit"
              >
                Envoyer
              </button>
              <small className="text-muted align-self-end text-small col-md-12 col-sm-12 d-flex justify-content-end">
                <Link href="/login">
                  <a>Connexion</a>
                </Link>
              </small>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
