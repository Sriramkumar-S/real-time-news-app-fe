import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const BE_URL = import.meta.env.VITE_BE_URL;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login with:', { email, password });

          fetch(`${BE_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })
            .then((res) => {
              if (res.ok) {
                localStorage.setItem("userEmail", email)
                navigate("/");
              } else {
                console.error("Subscription failed");
              }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-4">
            <h2 style={{ marginLeft: '28rem'}}>Login</h2>
            <form onSubmit={handleLogin} style={{ width: '50%', margin: '0 auto' }}>
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign up</button>
            </form>
        </div>
    );
}

export default Login;