import "../../globalStyle.css";
import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useSignup();

  const handleSubmit = () => {
    const validation = true;
    if (validation) {
      signup({ name, email, password });
    } else {
      alert("Validation failed");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page">
        <h1>Signup</h1>
        <div className="input-label">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-label">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-label">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>SignUp</button>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
