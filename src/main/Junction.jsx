import { Route, Routes, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./junction.css";

import Home from "../comp/home/Home";
import Login from "../comp/login/Login";
import Register from "../comp/register/Register";
import Forgot from "../comp/forgot/Forgot";
import About from "../comp/about/About";
import Privacy from "../comp/about/Privacy";
import Reviews from "../comp/about/Review";
import People from "../comp/about/People";
import Terms from "./Terms";
import Profile from "../comp/profile/Profile";
import NotFound from "../comp/help/notFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";
import Settings from "../comp/setting/Setting";
import Nav from "./Nav";
import StartLoader from "./StartLoader";
import RecentLogin from "../comp/recent/RecentLogin";

import OAuthSuccess from "../comp/google/OAuthSuccess";

export default function Junction() {
    const scrollRef = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
        }
    }, [pathname]);

    return (
        <div className="junction isFlex w-100 position-relative">

            <Nav />
            <div ref={scrollRef} className="mainPrt isFlex justify-content-start wd">
                <div className="routebox isFlex wd">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot" element={<Forgot />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/people" element={<People />} />
                        {/* <Route path="/reviews" element={<Reviews />} /> */}
                        <Route path="/recent" element={<RecentLogin/>} />
                        <Route path="/profile/:username" element={<Profile />} />

                        <Route path="/oauth-success" element={<OAuthSuccess />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/settings" element={<Settings />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer scrollRef={scrollRef} />
            </div>
            <StartLoader />
        </div>
    );
}