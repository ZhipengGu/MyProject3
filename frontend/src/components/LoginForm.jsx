//a log in form render on LoginPage

import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContextProvider";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/me");
    }
  }, [user]);

  const usernameInp = useRef();
  const passwordInp = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const username = usernameInp.current.value;
    const password = passwordInp.current.value;
    axios
      .post(
        `${API_BASE_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <div className="flex flex-col px-6 text-2xl max-sm:text-base">
      <form
        onSubmit={submitHandler}
        className="mt-20 self-center "
        onChange={() => setError(null)}
      >
        <label htmlFor="username ">Username</label>
        <input
          type="text"
          id="username"
          ref={usernameInp}
          className="inputField"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          ref={passwordInp}
          className="inputField"
        />

        <input
          type="text"
          placeholder={error}
          className="placeholder:text-red-500"
        />
        <button className="submitBtn">Log in</button>
      </form>
      <div className="self-center mt-2.5 leading-6 text-sky-500 ">
        Don't have an account?{" "}
        <Link to="/signup" className="underline hover:text-emerald-300">
          Sign up now
        </Link>
      </div>
    </div>
  );
}
