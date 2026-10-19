import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password) {
      setMessage("Please enter Email and Password");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gmail: form.username.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        setIsError(true);
        return;
      }

      if (!data.user) {
        setMessage("Login response is missing user details");
        setIsError(true);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login Successful!");
      setIsError(false);

      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }, 700);
    } catch (error) {
      console.error(error);
      setMessage("Server Error. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <p className="brand-name">SMART CART</p>

        <h1>
          SMART <br />
          SHOPPING <br />
          <span>MADE EASY</span>
        </h1>

        <div className="create-account">
          <p>Don't have an account?</p>
          <br />

          <button
            type="button"
            onClick={() => navigate("/signup")}
          >
            Create Account ✨
          </button>
        </div>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>
          <h3>Login to SmartCart</h3>

          {message && (
            <div
              className={`login-message ${
                isError ? "error-message" : "success-message"
              }`}
            >
              {message}
            </div>
          )}

          <input
            type="email"
            name="username"
            placeholder="Email"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="forgot-password">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;