import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import ArticleEditor from "./public/article";
import HomePage from "./public/home";
import Login from './public/login';
import RegisterPage from "./public/register";



const queryClient = new QueryClient();

const router = createBrowserRouter(
  [

    {
      path: "/",
      element: <Login />
    },

    {
      path: "/register",
      element: <RegisterPage />
    },

    {
      path: "/dashboard",
      element: <HomePage />
    },
    {
      path: "/article",
      element: <ArticleEditor />
    },

  ]
)
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  )
}
export default App
