import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();

    let data = new FormData();
    data.append("name", name);

    data.append("profile_image", imageData);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (res) {
        if (res.status === "200") {
          window.localStorage.setItem("token", res.data.authorisation.token);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    setimageData(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  }
  const [name, setName] = useState("");
  const [imageData, setimageData] = useState();
  const [image, setImage] = useState();

  return (
    <div className="profile flex">
      <div className="left">
        <div className="image">
          <img src={image} alt="profile_image" />
        </div>
        <div className="info flex column">
          <div className="name">
            <h3>USernam:</h3>
            <p>ahmad</p>
          </div>
          <div className="email">
            <h3>EMail:</h3>
            <p>ahamd@gmil.com</p>
          </div>
          <div className="bio">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </div>
        </div>
      </div>
      <div className="right">
        <form className="form flex column" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="im"> + Change image</label>
          <input
            type="file"
            id="im"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
            name="profile_image"
            value={imageData}
            className="hidden"
          />
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
