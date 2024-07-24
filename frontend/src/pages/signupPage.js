import "../../globalStyle.css";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {

    const SignupPageStyle = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '24px',
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signup} = useSignup();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            signup({email, password});
        }
        else{
            alert("Validation failed");
        }
    }

    return (
        <div className="auth-page">
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>SignUp</button>
        </div>
    )
}

export default SignupPage;