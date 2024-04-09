import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    if (responseData.status === "success") {
      localStorage.setItem("token", responseData.authorisation.token);
    }
    console.log(responseData);
    navigate("/home");
    console.log(formData);
  };
  return (
    <div className="login flex">
      <div className="login-card">
        <div className="imge flex-center">
          <img src="insta.PNG" alt="logo" />
        </div>
        <form onSubmit={handleSubmit} className="flex column ">
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
          <button type="submit">Login</button>
        </form>
        <div className="orr flex-center">
          <span className="line"></span>
          <span className="or">OR</span>
          <span className="line"></span>
        </div>
        <div>
          <i className="fa-brands fa-square-facebook"></i>{" "}
          <span className="by-fb">Login with Facebook</span>
        </div>
        <div className="flex go-signup">
          <p>Don't have an account?</p>
          <span>
            <Link to={"/signup"}>Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
