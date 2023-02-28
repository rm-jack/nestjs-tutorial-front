// import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostComponent() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const deleteOption = {
    method: "DELETE",
    url: `http://localhost:3000/posts/${postId}`,
  };

  const onDelete = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios(deleteOption);
        MySwal.fire("Deleted!", "Your post has been deleted.", "success");
        navigate("/posts");
      }
    });
  };
  const onUpdate = () => {
    navigate(`update`);
  };
  const onList = () => {
    navigate("/posts");
  };
  const DeleteBtnOption = {
    border: "10",
    color: "red",
    height: "100",
    onClick: onDelete,
    radius: "10",
    width: "10",
  };
  const UpdateBtnOption = {
    border: "10",
    color: "yellow",
    height: "100",
    onClick: onUpdate,
    radius: "10",
    width: "10",
  };
  const ListBtnOption = {
    border: "10",
    color: "yellow",
    height: "100",
    onClick: onList,
    radius: "10",
    width: "10",
  };

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
  if (isLoading)
    return (
      <>
        <div>"Loading"</div>
      </>
    );
  if (error)
    return (
      <>
        <div>"An error has occured"</div>
      </>
    );

  return (
    <>
      <div>
        <div>ID: {postId}</div>
        <div>TITLE : {data?.title}</div>
        <div>CONTENT: {data?.content}</div>
        <Button {...DeleteBtnOption}>DELETE</Button>
        <Button {...UpdateBtnOption}>UPDATE</Button>
        <Button {...ListBtnOption}>POSTS LIST</Button>
      </div>
    </>
  );
}
