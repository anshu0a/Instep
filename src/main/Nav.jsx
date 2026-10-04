import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FiMoon,
    FiSun,
    FiHome,
    FiUser,
    FiSettings,
    FiInfo,
    FiUsers,
    FiStar,
    FiLogIn,
    FiUserPlus,
    FiLogOut,
    FiMenu,
    FiX
} from "react-icons/fi";
import "./nav.css";

export default function Nav() {

    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(true);
    const [menu, setMenu] = useState(false);

    const isLoggedIn = !!localStorage.getItem("accessToken");

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const username = user?.username || "";

    useEffect(() => {

        const mode = localStorage.getItem("darkmode");

        const isDark = mode === null ? true : mode === "true";

        setDarkMode(isDark);

        localStorage.setItem("darkmode", String(isDark));

        document.documentElement.classList.toggle(
            "darkMode",
            isDark
        );

    }, []);

    function toggleDarkMode() {

        setDarkMode(prev => {

            const next = !prev;

            localStorage.setItem(
                "darkmode",
                String(next)
            );

            document.documentElement.classList.toggle(
                "darkMode",
                next
            );

            return next;

        });

    }

    function logout() {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenType");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("user");

        navigate("/login");
    }

    const publicLinks = [
        {
            name: "HOME",
            path: "/",
            icon: FiHome
        },
        {
            name: "ABOUT",
            path: "/about",
            icon: FiInfo
        },
        {
            name: "PEOPLE",
            path: "/people",
            icon: FiUsers
        },
        // {
        //     name: "REVIEWS",
        //     path: "/reviews",
        //     icon: FiStar
        // },
    ];

    const accountLinks = [
        {
            name: "LOGIN",
            path: "/login",
            icon: FiLogIn
        },
        {
            name: "REGISTER",
            path: "/register",
            icon: FiUserPlus
        }
    ];

    const loggedLinks = [
        {
            name: "PROFILE",
            path: `/profile/${username}`,
            icon: FiUser
        },
        {
            name: "SETTINGS",
            path: "/settings",
            icon: FiSettings
        }
    ];

    return (
        <header className="nav wd glass topper">

            <NavLink
                to="/"
                className="navLogo"
            >

                <img
                    className="loginLogo img"
                    src="/favicon.svg"
                    alt="logo"
                />

                <img
                    className="loginLogotext img"
                    src="/svg/logo/l1.svg"
                    alt="logo"
                />

            </NavLink>

            <div className="navActions">

                <div className="navLinks">

                    {publicLinks.map(item => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `navItem ${isActive ? "navActive" : ""}`
                                }
                                title={item.name}
                            >
                                <Icon />
                                <span>
                                    {item.name}
                                </span>
                            </NavLink>
                        );

                    })}

                    <div className="navDivider"></div>

                    {!isLoggedIn && (
                        <>
                            {accountLinks.map(item => {

                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `navItem ${
                                                item.name === "REGISTER"
                                                    ? "navRegister"
                                                    : ""
                                            } ${isActive ? "navActive" : ""}`
                                        }
                                        title={item.name}
                                    >
                                        <Icon />
                                        <span>
                                            {item.name}
                                        </span>
                                    </NavLink>
                                );

                            })}
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                            {loggedLinks.map(item => {

                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `navItem ${isActive ? "navActive" : ""}`
                                        }
                                        title={item.name}
                                    >
                                        <Icon />
                                        <span>
                                            {item.name}
                                        </span>
                                    </NavLink>
                                );

                            })}

                            {/* <button
                                className="navItem navLogout"
                                onClick={logout}
                                title="LOGOUT"
                            >
                                <FiLogOut />
                                <span>
                                    LOGOUT
                                </span>
                            </button> */}
                        </>
                    )}

                </div>

                <button
                    className="navTheme"
                    onClick={toggleDarkMode}
                    title={
                        darkMode
                            ? "Light mode"
                            : "Dark mode"
                    }
                >

                    {darkMode ? (
                        <FiSun />
                    ) : (
                        <FiMoon />
                    )}

                    <span>
                        {darkMode ? "LIGHT" : "DARK"}
                    </span>

                </button>

                <button
                    className={`navMenu ${menu ? "navMenuActive" : ""}`}
                    onClick={() => setMenu(!menu)}
                    title={menu ? "Close menu" : "More"}
                >

                    {menu ? (
                        <FiX />
                    ) : (
                        <FiMenu />
                    )}

                </button>

            </div>

            {menu && (
                <div className="navMobile">

                    {publicLinks.map(item => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                onClick={() => setMenu(false)}
                                className={({ isActive }) =>
                                    isActive ? "navMobileActive" : ""
                                }
                            >
                                <Icon />
                                {item.name}
                            </NavLink>
                        );

                    })}

                    {!isLoggedIn && (
                        <>
                            {accountLinks.map(item => {

                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMenu(false)}
                                        className={({ isActive }) =>
                                            isActive ? "navMobileActive" : ""
                                        }
                                    >
                                        <Icon />
                                        {item.name}
                                    </NavLink>
                                );

                            })}
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                            {loggedLinks.map(item => {

                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMenu(false)}
                                        className={({ isActive }) =>
                                            isActive ? "navMobileActive" : ""
                                        }
                                    >
                                        <Icon />
                                        {item.name}
                                    </NavLink>
                                );
                            })}

                            {/* <button onClick={logout}>
                                <FiLogOut />
                                LOGOUT
                            </button> */}
                        </>
                    )}

                </div>
            )}

        </header>
    );
}