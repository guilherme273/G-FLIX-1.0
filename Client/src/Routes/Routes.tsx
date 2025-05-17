import IsAdmin from "../Guards/IsAdmin";
import LoggedIn from "../Guards/LoggedIn";
import CategoriesPage from "../Pages/Admin/Categories/Categories";
import MoviesPage from "../Pages/Admin/Movies/Movies";
import Overview from "../Pages/Admin/Overview/Overview";
import UsersPage from "../Pages/Admin/Users/Users";
import ViewsPage from "../Pages/Admin/Views/View";
import Favorites from "../Pages/Favorites/Favorites";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound404 from "../Pages/NotFound404/NotFound404";
import Register from "../Pages/Register/Register";
import Search from "../Pages/Search/Search";
import Watch from "../Pages/Watch/Watch";

export const Routes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/search",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Search />,
      },
    ],
  },
  {
    path: "/favorites",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/watch/:id/:category_id",
    element: <LoggedIn />,
    children: [
      {
        path: "",
        element: <Watch />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <IsAdmin />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
    ],
  },
  {
    path: "/dashboard/users",
    element: <IsAdmin />,
    children: [
      {
        path: "",
        element: <UsersPage />,
      },
    ],
  },
  {
    path: "/dashboard/movies",
    element: <IsAdmin />,
    children: [
      {
        path: "",
        element: <MoviesPage />,
      },
    ],
  },
  {
    path: "/dashboard/categories",
    element: <IsAdmin />,
    children: [
      {
        path: "",
        element: <CategoriesPage />,
      },
    ],
  },
  {
    path: "/dashboard/views",
    element: <IsAdmin />,
    children: [
      {
        path: "",
        element: <ViewsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <LoggedIn />,
    children: [
      {
        path: "*",
        element: <NotFound404 />,
      },
    ],
  },
];
