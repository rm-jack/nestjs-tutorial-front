import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface InewUser {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
}

export default function UserCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<number>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onCreateBtnClick = async (newUser: InewUser) => {
    await axios.post("http://localhost:3000/users/create", newUser);
  };
  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newUser = {
              name: name,
              age: age,
              email: email,
              password: password,
            };
            onCreateBtnClick(newUser);
            navigate("/posts");
          }}
        >
          <ul>
            <li>
              <label htmlFor="name"></label>
              <input
                name="name"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="email"></label>
              <input
                name="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="age"></label>
              <input
                name="age"
                type="number"
                placeholder="age"
                onChange={(e) => setAge(Number(e.target.value))}
              ></input>
            </li>
            <li>
              <label htmlFor="password"></label>
              <input
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </li>
            <button type="submit">Create</button>
          </ul>
        </form>
      </div>
    </>
  );
}
