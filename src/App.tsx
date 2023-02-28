import Posts from "./components/Posts";
import Post from "./components/Post";
import PostUpdate from "./components/PostUpdate";
import PostCreate from "./components/PostCreate";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import UserCreate from "./components/UserCreate";
import UserProfile from "./components/UserProfile";
import UserLogin from "./components/UserLogin";

const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/posts/:postId" element={<Post />}></Route>
            <Route
              path="/posts/:postId/update"
              element={<PostUpdate />}
            ></Route>
            <Route path="/posts/create" element={<PostCreate />}></Route>
            <Route path="/user/create" element={<UserCreate />}></Route>
            <Route path="/user/profile" element={<UserProfile />}></Route>
            <Route path="/user/login" element={<UserLogin/>}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
