import React, { useState } from "react";
import { Eye, Facebook } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import "./LoginModal.css";

const LoginModal = ({ onSubmit, onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the email and password back to the parent for login processing
    onSubmit({ email, password });
  };

  return (
    // The overlay covers the entire screen.
    // When clicked, it calls onClose to hide the modal.
    <div className="modal-overlay" onClick={onClose}>
      {/* Prevent clicks inside the modal from propagating to the overlay */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="login-logo">
          <img src="./logo2.png" alt="HomeHive Logo" />
        </div>
        <h1 className="login-title">Welcome to HomeHive</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Eye className="toggle-eye" onClick={togglePasswordVisibility} />
          </div>
          <div className="forgot-password">Forgot your password?</div>
          <button type="submit" className="login-button">
            Log in
          </button>
          <div className="divider">
            <span>OR</span>
          </div>
          <button type="button" className="social-button facebook-button">
            <Facebook className="social-icon" /> Continue with Facebook
          </button>
          <button type="button" className="social-button google-button">
            <FcGoogle className="social-icon" size={20} /> Continue with Google
          </button>
          <p className="terms-text">
            By continuing, you agree to HomeHive’s{" "}
            <a href="#">Terms of Service</a> and acknowledge you’ve read our{" "}
            <a href="#">Privacy Policy</a>.
            <br />
            <a href="#">Notice at Collection</a>.
          </p>
          <div className="signup-text">
            Not on HomeHive yet? <a href="#">Sign up</a>
          </div>
          <div className="business-text">
            Are you a business? <a href="#">Get started here!</a>
          </div>
          <button type="button" className="close-button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
