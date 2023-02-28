import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export default function UserLogin() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLoginBtnClick = async (option: object) => {
    const res = await axios.post("http://localhost:3000/auth/login", option);
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("currentUserId", res.data.id)
    if (res.status === 201) {
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Logged In!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/posts");
    } else {
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Login failed!",
      });
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const userLogin = {
              email: email,
              password: password,
            };
            onLoginBtnClick(userLogin);
          }}
        >
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                placeholder="user@email.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </li>
          </ul>
          <button type="submit">LogIn</button>
        </form>
      </div>
    </>
  );
}
