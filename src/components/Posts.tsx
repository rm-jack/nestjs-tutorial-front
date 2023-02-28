import { useQueries, useQuery } from "react-query";
import TableItem from "./TableItem";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import jwtDecode, { JwtPayload } from "jwt-decode";
// import createConnection from './utils/db';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Posts() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const getPostsOption = {
    method: "GET",
    url: "http://localhost:3000/posts",
  };
  const getPosts = async () => {
    return (await axios(getPostsOption)).data;
  };

  // const getPostQuery = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getPosts,
  // });

  // const getUserOption = {
  //   method: "GET",
  //   url: "http://localhost:3000/users/check",
  // };
  // const getUser = async () => {
  //   return await axios(getUserOption);
  // };

  // const getUserQuery = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getUser,
  // });
  const [postQuery] = useQueries([
    {
      queryKey: ["posts"],
      queryFn: getPosts,
    },
  ]);

  const onCreate = () => {
    navigate("/posts/create");
  };
  const CreateBtnOption = {
    border: "10",
    color: "grey",
    height: "100",
    onClick: onCreate,
    radius: "10",
    width: "10",
  };
  const onJoin = () => {
    navigate("/user/create");
  };
  const JoinBtnOption = {
    border: "10",
    color: "yellow",
    height: "100",
    onClick: onJoin,
    radius: "10",
    width: "10",
  };
  const onLogin = () => {
    navigate("/user/login");
  };
  const LoginBtnOption = {
    border: "10",
    color: "yellow",
    height: "100",
    onClick: onLogin,
    radius: "10",
    width: "10",
  };
  const onLogout = async () => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("currentUserId", "");
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Logged out!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/posts");
  };
  const LogoutBtnOption = {
    border: "10",
    color: "yellow",
    height: "100",
    onClick: onLogout,
    radius: "10",
    width: "10",
  };
  const onTest = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token !== null)
      console.log(jwtDecode<JwtPayload>(access_token));
  };
  const TestBtnOption = {
    border: "10",
    color: "yellow",
    height: "100",
    onClick: onTest,
    radius: "10",
    width: "10",
  };

  return (
    <>
      {postQuery.isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>Board</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>title</td>
                <td>content</td>
              </tr>
            </tbody>
            {postQuery.data.map((post: Post) => {
              return (
                <TableItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                ></TableItem>
              );
            })}
          </table>
          {localStorage.getItem("access_token") ? (
            <>
              <Button {...CreateBtnOption}>Create Post</Button>
              <Button {...LogoutBtnOption}>Sign out</Button>
            </>
          ) : (
            <>
              <Button {...JoinBtnOption}>Sign up</Button>
              <Button {...LoginBtnOption}>Sign in</Button>
            </>
          )}
          <Button {...TestBtnOption}>Test</Button>
        </div>
      )}
    </>
  );
}
