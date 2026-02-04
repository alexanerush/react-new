import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          email: cred.user.email,
          createdAt: serverTimestamp(),
        });

        localStorage.setItem("isAuthenticated", "true");
        navigate("/order");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/order");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>

        {error && (
          <p style={{ margin: 0, color: "crimson" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        {mode === "login" ? (
          <button
            type="button"
            onClick={() => setMode("register")}
            style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
          >
            No account? Register
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
          >
            Already have an account? Log in
          </button>
        )}
      </div>
    </div>
  );
}
