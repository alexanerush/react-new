import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store/store";
import { login } from "../store/authSlice";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import "../styles/LoginPage.css";

type Mode = "login" | "register";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          email: cred.user.email, // может быть null — для Firestore это ок
          createdAt: serverTimestamp(),
        });

        dispatch(login());
        navigate("/order");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      dispatch(login());
      navigate("/order");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">{mode === "login" ? "Login" : "Register"}</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </label>

          <label className="login-label">
            Password
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              minLength={6}
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        <p className="login-switch">
          {mode === "login" ? (
            <span
              role="button"
              tabIndex={0}
              onClick={() => setMode("register")}
              onKeyDown={(e) => e.key === "Enter" && setMode("register")}
            >
              No account? <b>Register</b>
            </span>
          ) : (
            <span
              role="button"
              tabIndex={0}
              onClick={() => setMode("login")}
              onKeyDown={(e) => e.key === "Enter" && setMode("login")}
            >
              Already have an account? <b>Log in</b>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
