import {
    FiInstagram,
    FiGithub,
    FiTwitter,
    FiHeart,
    FiArrowUp
} from "react-icons/fi";

import { FaLinkedinIn } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./footer.css";

export default function Footer({ scrollRef }) {

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const username = user?.username || "";

    return (
        <footer className="instepFooter position-relative w-100">

            <div className="instepFooterTop">

                <div className="instepFooterBrand">
                    <img
                        src="/svg/logo/l1.svg"
                        className="instepLogo img"
                        alt="Instep"
                    />

                    <p>
                        One account. <br />
                        Every project.
                    </p>

                    <div className="instepSocial isFlex flex-row flex-wrap justify-content-start">
                        <a className="clk" href="#" aria-label="GitHub">
                            <FiGithub />
                        </a>

                        <a className="clk" href="#" aria-label="Twitter">
                            <FiTwitter />
                        </a>

                        <a className="clk" href="#" aria-label="Linkedin">
                            <FaLinkedinIn />
                        </a>

                        <a className="clk" href="#" aria-label="Instagram">
                            <FiInstagram />
                        </a>
                    </div>
                </div>

                <div className="instepFooterColumn">
                    <h4>Platform</h4>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/"
                        end
                    >
                        Home
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to={`/profile/${username}`}
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/settings"
                    >
                        Settings
                    </NavLink>
                </div>

                <div className="instepFooterColumn">
                    <h4>Discover</h4>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/about"
                    >
                        About
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/people"
                    >
                        People
                    </NavLink>

                    {/* <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/reviews"
                    >
                        Reviews
                    </NavLink> */}
                </div>

                <div className="instepFooterColumn">
                    <h4>Account</h4>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/login"
                    >
                        Login
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/register"
                    >
                        Register
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/forgot"
                    >
                        Forgot Password
                    </NavLink>
                </div>

                <div className="instepFooterColumn">
                    <h4>Support</h4>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/privacy"
                    >
                        Privacy
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/terms"
                    >
                        Terms
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => isActive ? "clk footerActive" : "clk"}
                        to="/help"
                    >
                        Help Center
                    </NavLink>
                </div>

            </div>

            <div className="instepFooterBottom">

                <span>
                    © 2026 Instep
                </span>

                <span className="instepMade">
                    Your security, our <FiHeart />
                </span>

                <button
                    type="button"
                    className="instepTopButton clk"
                    onClick={() =>
                        scrollRef.current?.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })
                    }
                    aria-label="Back to top"
                >
                    <FiArrowUp />
                </button>

            </div>

        </footer>
    );
}