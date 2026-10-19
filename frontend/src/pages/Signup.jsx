import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gmail: "",
    password: "",
    confirmPassword: "",
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

    if (!form.name || !form.gmail || !form.password || !form.confirmPassword) {
      setMessage("Please fill all fields");
      setIsError(true);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          gmail: form.gmail,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully! Please login.");
        setIsError(false);

        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        setMessage(data.message || "Signup failed");
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <p className="brand-name">ROYAL THREADS</p>

        <h1>
          CREATE YOUR <br />
          OWN <br />
          <span>STYLE</span>
        </h1>

        <div className="create-account">
          <p>Already have an account?</p>
          <button type="button" onClick={() => navigate("/")}>
            Login Here
          </button>
        </div>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>
          <h3>Create Your Account</h3>

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
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="gmail"
            placeholder="Email"
            value={form.gmail}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;