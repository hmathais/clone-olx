import React from "react";
import { useRoutes } from "react-router-dom";
import { Home } from './Pages/Home/Home'
import { About } from "./Pages/About/About";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Page } from "./Pages/Signin/Signin";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Home />},
        {path: '/about', element: <About />},
        {path: '/signin', element: <Page />},
        {path:'*', element: <NotFound />}
    ])
}