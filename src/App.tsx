import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./private/AuthContext"; // ✅ Import AuthProvider
import ArticleEditor from "./public/article";
import ArticleDetails from "./public/articledetails";
import Login from './public/login';
import RegisterPage from "./public/register";
import AllArticles from "./public/test";
import ChatPage from "./public/messages";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/article",
    element: <ArticleEditor />
  },
  {
    path: "/dashboard",
    element: <AllArticles />
  },
  {
    path: "/article/:id", // ✅ Dynamic route for viewing a single article
    element: <ArticleDetails />,
  },
  {
    path: "/messages", // ✅ Dynamic route for viewing a single article
    element: <ChatPage />,
  },
]);

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
