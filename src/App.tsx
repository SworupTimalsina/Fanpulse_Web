import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./private/AuthContext"; // ✅ Import AuthProvider
import ArticleEditor from "./public/article";
import HomePage from "./public/home";
import Login from './public/login';
import RegisterPage from "./public/register";
import AllArticlesPage from "./public/test";

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
    path: "/dashboard",
    element: <AllArticlesPage />
  },
  {
    path: "/article",
    element: <ArticleEditor />
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
