import React from "react";
import { useRoutes } from "react-router-dom";
import { Home } from './Pages/Home/Home'
import { About } from "./Pages/About/About";
import { NotFound } from "./Pages/NotFound/NotFound";
import { SignIn } from "./Pages/Signin/Signin";
import { SignUp } from "./Pages/SignUp/SignUp";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Home />},
        {path: '/about', element: <About />},
        {path: '/signin', element: <SignIn />},
        {path: '/signup', element: <SignUp />},
        {path:'*', element: <NotFound />}
    ])
}