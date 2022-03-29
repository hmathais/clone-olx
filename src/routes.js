import React from "react";
import { useRoutes } from "react-router-dom";
import { Home } from './Pages/Home/Home'
import { About } from "./Pages/About/About";
import { NotFound } from "./Pages/NotFound/NotFound";
import { SignIn } from "./Pages/Signin/Signin";
import { SignUp } from "./Pages/SignUp/SignUp";
import { AdPage } from "./Pages/AdPage/AdPage";
import { RequiredAuth } from "./RequiredAuth";
import { AddAd } from "./Pages/AddAd/AddAd";
import { Ads } from "./Pages/Ads/Ads";

export const MainRoutes = () => {
    return useRoutes([
        {path: '/', element: <Home />},
        {path: '/about', element: <About />},
        {path: '/signin', element: <SignIn />},
        {path: '/signup', element: <SignUp />},
        {path: '/ad/:id', element: <AdPage />},
        {path: '/post-an-ad', element: <RequiredAuth><AddAd /></RequiredAuth>},
        {path: '/ads', element: <Ads />},
        {path:'*', element: <NotFound />}
    ])
}