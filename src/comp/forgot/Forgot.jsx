import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../login/login.css";
import "./forgot.css";
import Info from "../login/Info";
import axios from "axios";
import Star from "../help/star/Star";

const BACKEND = import.meta.env.VITE_BACKEND;

export default function Forgot() {
    const [type, setType] = useState("username");
    const [form, setForm] = useState({ username: "", email: "" });
    const [errors, setErrors] = useState({ username: "", email: "" });
    const [extra, setExtra] = useState({ good: false, checking: false, loading: false });
    const [success, setSuccess] = useState({ show: false, message: "", email: "" });

    useEffect(() => {
        if (success.show) return;

        const value = type === "username" ? form.username : form.email;

        setExtra(pre => ({
            ...pre,
            good: false,
            checking: false
        }));

        if (!value.trim()) {
            setErrors({
                username: "",
                email: ""
            });
            return;
        }

        const valid = validateForm();

        if (!valid) {
            setExtra(pre => ({
                ...pre,
                checking: false,
                good: false
            }));
            return;
        }

        setExtra(pre => ({
            ...pre,
            checking: true,
            good: false
        }));

        const timer = setTimeout(() => {
            checkAvailability(value.trim());
        }, 700);

        return () => {
            clearTimeout(timer);

            setExtra(pre => ({
                ...pre,
                checking: false
            }));
        };
    }, [form.username, form.email, type]);

    function handleChange(e) {
        const { name, value } = e.target;

        const newValue =
            name === "username"
                ? value.replace(/[\s@]/g, "")
                : value;

        setForm(pre => ({
            ...pre,
            [name]: newValue
        }));

        setErrors(pre => ({
            ...pre,
            [name]: ""
        }));

        setExtra(pre => ({
            ...pre,
            good: false
        }));
    }

    function changeType(value) {
        setType(value);

        setForm({
            username: "",
            email: ""
        });

        setErrors({
            username: "",
            email: ""
        });

        setExtra({
            good: false,
            checking: false,
            loading: false
        });
    }

    function validateForm() {
        const newErrors = {
            username: "",
            email: ""
        };

        if (type === "username") {
            if (!form.username.trim()) {
                newErrors.username = "Username is required.";
            } else if (form.username.includes("@") || /\s/.test(form.username)) {
                newErrors.username = "Username cannot contain @ or spaces.";
            } else if (form.username.trim().length < 3) {
                newErrors.username =
                    "Username must be at least 3 characters.";
            }
        }

        if (type === "email") {
            if (!form.email.trim()) {
                newErrors.email = "Email is required.";
            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    form.email.trim()
                )
            ) {
                newErrors.email =
                    "Enter a valid email address.";
            }
        }

        setErrors(newErrors);

        return (
            !newErrors.username &&
            !newErrors.email
        );
    }

    async function checkAvailability(value) {
        try {
            const res = await axios.get(
                `${BACKEND}/user/${encodeURIComponent(value)}`
            );

            const result = res.data;

            if (result.success) {
                setErrors(pre => ({
                    ...pre,
                    [type]:
                        result.message ||
                        "This account was not found."
                }));

                setExtra(pre => ({
                    ...pre,
                    good: false,
                    checking: false
                }));

                return;
            }

            setErrors(pre => ({
                ...pre,
                [type]: ""
            }));

            setExtra(pre => ({
                ...pre,
                good: true,
                checking: false
            }));

        } catch (e) {
            const message =
                e.response?.data?.message ||
                "Unable to check availability.";

            setErrors(pre => ({
                ...pre,
                [type]: message
            }));

            setExtra(pre => ({
                ...pre,
                good: false,
                checking: false
            }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            extra.loading ||
            extra.checking ||
            !extra.good
        ) {
            return;
        }

        if (!validateForm()) {
            return;
        }

        setExtra(pre => ({
            ...pre,
            loading: true
        }));

        try {
            const value =
                type === "username"
                    ? form.username.trim()
                    : form.email.trim();

            const endpoint =
                `/auth/forgot/${encodeURIComponent(value)}`;

            const res = await axios.get(
                `${BACKEND}${endpoint}`
            );

            const result = res.data;

            setSuccess({
                show: true,
                message:
                    result.message ||
                    "A secure password reset link has been sent to the email associated with your account.",
                email:
                    result.email ||
                    result.maskedEmail ||
                    ""
            });

        } catch (e) {
            setErrors(pre => ({
                ...pre,
                [type]:
                    e.response?.data?.message ||
                    "Unable to process your request."
            }));

            setExtra(pre => ({
                ...pre,
                good: false
            }));

        } finally {
            setExtra(pre => ({
                ...pre,
                loading: false
            }));
        }
    }

    const currentError =
        type === "username"
            ? errors.username
            : errors.email;

    return (
        <main className="loginPage wd isFlex flex-row flex-wrap">
            <Star count={100} />
            <div className="loginLayout wd g-2 isFlex flex-row justify-content-around flex-wrap">
                <Info typ="forgot" />
                <section className="loginFormArea isFlex align-items-start">
                    <div className="formTop isFlex wd flex-row justify-content-start gap-3">
                        <span>FORGOT PASSWORD</span>
                        <i></i>
                    </div>

                    {!success.show ? (
                        <>
                            <form className="isFlex wd" onSubmit={handleSubmit} noValidate>
                                <div className="forgotOptions wd d-flex mb-4">
                                    <button
                                        type="button"
                                        className={`forgotOption ${type === "username" ? "active" : ""}`}
                                        onClick={() => changeType("username")}
                                    >
                                        USERNAME
                                    </button>

                                    <button
                                        type="button"
                                        className={`forgotOption ${type === "email" ? "active" : ""}`}
                                        onClick={() => changeType("email")}
                                    >
                                        EMAIL
                                    </button>
                                </div>

                                {type === "username" && (
                                    <div className="loginField wd mb-4">
                                        <label htmlFor="usnm" className="d-block">
                                            USERNAME
                                        </label>

                                        <div className="position-relative">
                                            <input
                                                className={`form-control border-0 rounded-0 shadow-none ${errors.username ? "is-invalid" : extra.good ? "is-valid" : ""}`}
                                                name="username"
                                                id="usnm"
                                                type="text"
                                                value={form.username}
                                                onChange={handleChange}
                                                placeholder="Enter your username"
                                                autoComplete="username"
                                            />

                                            {extra.checking && (
                                                <span className="fieldStatus checking">
                                                    CHECKING
                                                </span>
                                            )}

                                            {extra.good && !extra.checking && (
                                                <span className="fieldStatus available">
                                                    AVAILABLE
                                                </span>
                                            )}
                                        </div>

                                        {errors.username && (
                                            <div className="validationError">
                                                {errors.username}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {type === "email" && (
                                    <div className="loginField wd mb-4">
                                        <label htmlFor="email" className="d-block">
                                            EMAIL
                                        </label>

                                        <div className="position-relative">
                                            <input
                                                className={`form-control border-0 rounded-0 shadow-none ${errors.email ? "is-invalid" : extra.good ? "is-valid" : ""}`}
                                                name="email"
                                                id="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="username@example.com"
                                                autoComplete="email"
                                            />

                                            {extra.checking && (
                                                <span className="fieldStatus checking">
                                                    CHECKING
                                                </span>
                                            )}

                                            {extra.good && !extra.checking && (
                                                <span className="fieldStatus available">
                                                    AVAILABLE
                                                </span>
                                            )}
                                        </div>

                                        {errors.email && (
                                            <div className="validationError">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    disabled={!extra.good || extra.checking || extra.loading}
                                    type="submit"
                                    className="clk loginButton btn w-100 d-flex align-items-center justify-content-between"
                                >
                                    <span>
                                        {extra.checking
                                            ? "CHECKING..."
                                            : extra.loading
                                                ? "PROCESSING..."
                                                : "CONTINUE"}
                                    </span>

                                    {!extra.checking && !extra.loading && (
                                        <span>→</span>
                                    )}
                                </button>
                            </form>

                            <div className="createAccount d-flex gap-2 mt-4">
                                <span>Remember your password?</span>
                                <Link to="/login">Log in</Link>
                            </div>
                        </>
                    ) : (
                        <div className="resetSuccess wd">
                            <div className="successEyebrow">
                                <span className="successLine"></span>
                                <span>YOU'RE ALL SET</span>
                            </div>

                            <div className="successMain">
                                <h2>
                                    Check your <br />
                                    <em>inbox.</em>
                                </h2>

                                <p>{success.message}</p>

                                {success.email && (
                                    <div className="successMail">
                                        <span className="mailDot"></span>
                                        <span>{success.email}</span>
                                    </div>
                                )}
                            </div>

                            <div className="successBottom">
                                <div className="successHint">
                                    <span>LINK EXPIRES SOON</span>
                                    <span className="hintArrow">↗</span>
                                </div>

                                <Link to="/login" className="successLogin clk">
                                    <span>RETURN TO LOGIN</span>
                                    <span className="successArrow">→</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}