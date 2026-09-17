import React, { useState, useEffect } from "react";

export default function AuthModule({
  initialMode = "login",
  onLoginSuccess
}) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  useEffect(() => {
    const authElem = document.getElementById("auth-section");
    if (authElem) {
      authElem.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialMode, isLogin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert("Please enter your email and password.");
        return;
      }
      alert(`Logged in successfully with ${formData.email}`);
      if (onLoginSuccess) onLoginSuccess();
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please fill in all the fields.");
        return;
      }
      alert(`RVU student registered successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}`);
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const switchMode = (mode) => {
    window.location.hash = mode;
    setIsLogin(mode === "login");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="auth-card">
      {/* Top Banner connected directly to the card */}
      <div className="auth-card-header">
        <div className="rv-banner-title">RV UNIVERSITY</div>
        <div className="rv-banner-subtitle">Excellence in Education</div>
      </div>

      <div className="auth-card-body">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Login to access your RVU Campus Connect account"
              : "Register as an RVU student"}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLogin ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button type="button" onClick={() => switchMode("register")}>
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => switchMode("login")}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}