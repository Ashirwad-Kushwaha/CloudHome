import "../../globalStyle.css";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            login({ email, password });
        }
        else {
            alert("Validation failed");
        }
    }

    return (
        <div className="auth-page-container">
        <div className="auth-page">
        <h1>Login</h1>
        <div className="input-label">
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-label">
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Login</button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
        </div>
    )
}

export default LoginPage;