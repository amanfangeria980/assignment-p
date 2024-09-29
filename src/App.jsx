import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "/category",
                element: <CategoryPage />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
        ],
    },
]);
const App = () => {
    return (
        <RouterProvider router={router}>
            <div>{/*  */}</div>
        </RouterProvider>
    );
};

export default App;
