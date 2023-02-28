import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface Post {
  id: number;
  title: string;
  content: string;
}
interface InewPost {
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  userId: number | null;
}
interface IUser {
  id: number;
}

export default function PostCreate() {
  const navigate = useNavigate();
  const [updatedPostTitle, setUpdatedPostTitle] = useState<Post["title"]>();
  const [updatedPostContent, setUpdatedPostContent] =
    useState<Post["content"]>();
  // const createPostOption = {
  //   method: "POST",
  //   url: "http://localhost:3000/posts/",
  // };
  const onCreate = async (newPost: InewPost) => {
    const res = await axios.post("http://localhost:3000/posts", newPost, {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("access_token"),
      },
    });
    if (res.status === 201) {
      navigate("/posts");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newTitle = new FormData(e.currentTarget).get("title");
          const newContent = new FormData(e.currentTarget).get("content");
          console.log(typeof localStorage.getItem("currentUserId"))
          console.log(localStorage.getItem("currentUserId"))
          const newPost = {
            title: newTitle,
            content: newContent,
            userId: Number(localStorage.getItem("currentUserId"))
          };
          onCreate(newPost);
        }}
      >
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <div>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => {
                  setUpdatedPostTitle(e.target.value);
                }}
                style={{ width: "500px", height: "20px" }}
              ></input>
            </div>
          </li>
          <li>
            <label htmlFor="content">Content</label>
            <div>
              <input
                type="textarea"
                id="content"
                name="content"
                onChange={(e) => {
                  setUpdatedPostContent(e.target.value);
                }}
                style={{ width: "700px", height: "100px" }}
              ></input>
            </div>
          </li>
        </ul>
        <button type="submit">Create</button>
      </form>
    </>
  );
}
