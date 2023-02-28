import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface Post {
  id: number;
  title: string;
  content: string;
}
interface InewPost {
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
}

export default function PostUpdate() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [updatedPostTitle, setUpdatedPostTitle] = useState<Post["title"]>();
  const [updatedPostContent, setUpdatedPostContent] =
    useState<Post["content"]>();
  const getPostsOption = {
    method: "GET",
    url: `http://localhost:3000/posts/${postId}`,
  };
  const fetchPost = async (): Promise<Post> => {
    return (await axios(getPostsOption)).data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", postId],
    queryFn: fetchPost,
  });

  const queryClient = useQueryClient();

  const updatePost = useMutation({
    mutationFn: async (newPost: InewPost) => {
      const res = await axios.patch(
        `http://localhost:3000/posts/${postId}`,
        newPost,
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("access_token"),
          },
        }
      );
      if (res.status === 201) console.log("success");
      console.log("fail");
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/posts/${postId}`);
    },
  });
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div>ID: {postId}</div>
          <div>
            <form
              method="patch"
              onSubmit={(e) => {
                e.preventDefault();
                const newTitle = new FormData(e.currentTarget).get("title");
                const newContent = new FormData(e.currentTarget).get("content");
                const newPost = {
                  title: newTitle,
                  content: newContent,
                  id: Number(localStorage.getItem("currentUserId")),
                };
                updatePost.mutate(newPost);
              }}
            >
              <ul>
                <li>
                  <label htmlFor="title">title update</label>
                  <div>Original Post Title: {data?.title}</div>
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
                  <label htmlFor="content">content update</label>
                  <div>Original Post Content: {data?.content}</div>
                  <div>
                    <input
                      type="text"
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
              <button type="submit">Update</button>
            </form>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
}
