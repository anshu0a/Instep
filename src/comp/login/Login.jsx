
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND;

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple, FaFacebookF } from "react-icons/fa";
import Info from "./Info";
import Star from "../help/star/Star";
import { saveAccount } from "../help/accountStorage";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });

    const [extra, setExtra] = useState({
        loading: false,
        errMsg: ""
    });

    function handleChange(e) {

        const { name, value } = e.target;

        const newValue =
            name === "username"
                ? value.replace(/\s/g, "")
                : value;

        setForm({
            ...form,
            [name]: newValue
        });

        setErrors({
            ...errors,
            [name]: ""
        });

        setExtra(pre => ({
            ...pre,
            errMsg: ""
        }));
    }

    function validateForm() {

        const newErrors = {
            username: "",
            password: ""
        };

        if (!form.username.trim()) {

            newErrors.username =
                "Username or email is required.";

        } else if (form.username.trim().length <= 4) {

            newErrors.username =
                "Username or email must be more than 4 characters.";
        }

        if (!form.password) {

            newErrors.password =
                "Password is required.";

        } else if (form.password.length <= 4) {

            newErrors.password =
                "Password must be more than 4 characters.";
        }

        setErrors(newErrors);

        return !newErrors.username && !newErrors.password;
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (extra.loading) return;

        if (!validateForm()) return;

        setExtra({
            loading: true,
            errMsg: ""
        });

        try {

            const res = await axios.post(
                `${BACKEND}/auth/login`,
                form
            );

            const result = res.data;

            if (result.success) {

                localStorage.setItem(
                    "accessToken",
                    result.accessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    result.refreshToken
                );

                localStorage.setItem(
                    "tokenType",
                    result.tokenType
                );

                localStorage.setItem(
                    "expiresIn",
                    result.expiresIn
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );

                if (rememberMe) {

                    saveAccount(
                        result.user,
                        {
                            accessToken: result.accessToken,
                            refreshToken: result.refreshToken,
                            tokenType: result.tokenType,
                            expiresIn: result.expiresIn
                        }
                    );
                }

                setForm({
                    username: "",
                    password: ""
                });

                setRememberMe(false);

                window.location.href = "/";
                return;
            }

            setExtra({
                loading: false,
                errMsg:
                    result.message ||
                    "Unable to sign in."
            });

        } catch (e) {

            setExtra({
                loading: false,
                errMsg:
                    e.response?.data?.message ||
                    e.response?.data?.error ||
                    e.message ||
                    "Unable to connect to the server."
            });

            return;
        }

        setExtra({
            loading: false,
            errMsg: ""
        });
    }

    return (

        <main className="loginPage wd isFlex flex-row flex-wrap">

            <Star count={100} />

            <div className="loginLayout wd g-2 isFlex flex-row justify-content-around flex-wrap">

                <Info typ="login" />

                <section className="loginFormArea isFlex align-items-start">

                    <div className="formTop isFlex wd flex-row justify-content-start gap-3">
                        <span>LOG IN</span>
                        <i></i>
                    </div>

                    {extra.errMsg && (
                        <div className="loginServerError">
                            {extra.errMsg}
                        </div>
                    )}

                    <form
                        className="isFlex wd"
                        onSubmit={handleSubmit}
                        noValidate
                    >

                        <div className="loginField wd mb-4">

                            <label
                                htmlFor="email"
                                className="d-block"
                            >
                                USERNAME OR EMAIL
                            </label>

                            <input
                                className={`form-control border-0 rounded-0 shadow-none ${
                                    errors.username
                                        ? "is-invalid"
                                        : ""
                                }`}
                                name="username"
                                id="email"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username or email address"
                                autoComplete="username"
                                disabled={extra.loading}
                            />

                            {errors.username && (
                                <div className="validationError">
                                    {errors.username}
                                </div>
                            )}

                        </div>

                        <div className="loginField wd mb-4">

                            <div className="passwordLabel d-flex justify-content-between align-items-center">

                                <label htmlFor="pass">
                                    PASSWORD
                                </label>

                                <Link
                                    to="/forgot"
                                    className={
                                        extra.loading
                                            ? "disabledLink"
                                            : ""
                                    }
                                >
                                    Forgot password?
                                </Link>

                            </div>

                            <div className="passwordBox position-relative">

                                <input
                                    className={`form-control border-0 rounded-0 shadow-none ${
                                        errors.password
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    name="password"
                                    id="pass"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    minLength={5}
                                    disabled={extra.loading}
                                />

                                <button
                                    type="button"
                                    className="showButton btn p-0"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    disabled={extra.loading}
                                >
                                    {showPassword
                                        ? "HIDE"
                                        : "SHOW"}
                                </button>

                            </div>

                            {errors.password && (
                                <div className="validationError">
                                    {errors.password}
                                </div>
                            )}

                        </div>

                        <div className="rememberRow wd mb-4">

                            <label className="remember">

                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={e =>
                                        setRememberMe(e.target.checked)
                                    }
                                    disabled={extra.loading}
                                />

                                <span className="rememberBox">
                                    {rememberMe && "✓"}
                                </span>

                                <span className="rememberText">
                                    Remember me
                                </span>

                            </label>

                            <Link
                                to="/recent"
                                className={
                                    extra.loading
                                        ? "disabledLink savedAccountsLink"
                                        : "savedAccountsLink"
                                }
                            >
                                Saved accounts
                            </Link>

                        </div>

                        <button
                            type="submit"
                            className="clk loginButton btn w-100 d-flex align-items-center justify-content-between"
                            disabled={extra.loading}
                        >

                            <span>
                                {extra.loading
                                    ? "SIGNING IN..."
                                    : "CONTINUE"}
                            </span>

                            {extra.loading && (
                                <span className="loginLoader"></span>
                            )}

                        </button>

                    </form>

                    <div className="createAccount d-flex gap-2 mt-4">

                        <span>
                            Don't have an account?
                        </span>

                        <Link
                            to="/register"
                            className={
                                extra.loading
                                    ? "disabledLink"
                                    : ""
                            }
                        >
                            Create one
                        </Link>

                    </div>

                </section>

                <div className="loginOptions isFlex flex-row flex-wrap">

                    <button
                        className="clk"
                        type="button"
                        disabled={extra.loading}
                    >
                        <FcGoogle />
                    </button>

                    <button
                        className="clk"
                        type="button"
                        disabled={extra.loading}
                    >
                        <FaGithub />
                    </button>

                    <button
                        className="clk"
                        type="button"
                        disabled={extra.loading}
                    >
                        <FaApple />
                    </button>

                    <button
                        className="clk"
                        type="button"
                        disabled={extra.loading}
                    >
                        <FaFacebookF />
                    </button>

                </div>

            </div>

        </main>
    );
}

