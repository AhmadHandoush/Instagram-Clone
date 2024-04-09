import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  window.localStorage.clear();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = response.json();

    navigate("/");
  };
  return (
    <div className="signup flex-center">
      <div className="signup-card">
        <div className="img flex-center">
          <img src="insta.PNG" alt="logo" />
        </div>
        <p className="top-p">
          Sign up to see photos and videos from your friends.
        </p>
        <div className="orr flex-center">
          <span className="line"></span>
          <span className="or">OR</span>
          <span className="line"></span>
        </div>
        <form onSubmit={handleSubmit} className="form flex column">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email..."
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <p className="people">
            People who use our service may have uploaded your contact
            information to Instagram. <span className="learn">Learn more</span>
          </p>
          <button type="submit">Signup</button>
        </form>
        <p className="login">
          Have an account? <Link to={"/"}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
