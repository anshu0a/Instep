import Star from "../help/star/Star";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../login/login.css";
import "./register.css";

const BACKEND = import.meta.env.VITE_BACKEND;

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple, FaFacebookF } from "react-icons/fa";
import { FiShield, FiArrowLeft } from "react-icons/fi";
import Info from "../login/Info";

export default function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [extra, setExtra] = useState({ page: 1, approvalMessage: "", approvalMessageType: "", askingApproval: false, checkingApproval: false, resendSeconds: 0, resendingApproval: false });
    const [form, setForm] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });
    const [checking, setChecking] = useState({ username: false, email: false });
    const [available, setAvailable] = useState({ username: false, email: false });

    function handleChange(e) {

        const { name, value } = e.target;

        let newValue = value;

        if (name === "username") {
            newValue = value.replace(/[\s@]/g, "");
        }

        if (name === "email") {
            newValue = value.replace(/\s/g, "");
        }

        setForm(prev => ({ ...prev, [name]: newValue }));

        setErrors(prev => ({ ...prev, [name]: "" }));

        if (name === "username") {
            setAvailable(prev => ({ ...prev, username: false }));
        }

        if (name === "email") {
            setAvailable(prev => ({ ...prev, email: false }));
        }
    }

    useEffect(() => {

        const username = form.username.trim();

        if (!username) {
            setChecking(prev => ({ ...prev, username: false }));
            setAvailable(prev => ({ ...prev, username: false }));
            return;
        }

        if (username.length < 3) {
            setAvailable(prev => ({ ...prev, username: false }));
            return;
        }

        if (/[@\s]/.test(username)) {
            setAvailable(prev => ({ ...prev, username: false }));
            setErrors(prev => ({ ...prev, username: "Username cannot contain @ or spaces." }));
            return;
        }

        const timer = setTimeout(async () => {

            setChecking(prev => ({ ...prev, username: true }));

            try {

                const response = await axios.get(`${BACKEND}/user/${encodeURIComponent(username)}`);
                const data = response.data;

                if (data?.success === false) {

                    setErrors(prev => ({ ...prev, username: data.message || "Username is already taken." }));
                    setAvailable(prev => ({ ...prev, username: false }));

                } else {

                    setErrors(prev => ({ ...prev, username: "" }));
                    setAvailable(prev => ({ ...prev, username: true }));
                }

            } catch (error) {

                if (error.response?.status === 409) {

                    setErrors(prev => ({ ...prev, username: error.response.data?.message || "Username is already taken." }));
                    setAvailable(prev => ({ ...prev, username: false }));

                } else if (error.response?.status === 404) {

                    setErrors(prev => ({ ...prev, username: "" }));
                    setAvailable(prev => ({ ...prev, username: true }));

                } else {

                    setErrors(prev => ({ ...prev, username: error.response?.data?.message || "Unable to check username." }));
                    setAvailable(prev => ({ ...prev, username: false }));
                }

            } finally {

                setChecking(prev => ({ ...prev, username: false }));
            }

        }, 500);

        return () => clearTimeout(timer);

    }, [form.username]);

    useEffect(() => {

        const email = form.email.trim();

        if (!email) {
            setChecking(prev => ({ ...prev, email: false }));
            setAvailable(prev => ({ ...prev, email: false }));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setAvailable(prev => ({ ...prev, email: false }));
            return;
        }

        const timer = setTimeout(async () => {

            setChecking(prev => ({ ...prev, email: true }));

            try {

                const response = await axios.get(`${BACKEND}/user/${encodeURIComponent(email)}`);
                const data = response.data;

                if (data?.success === false) {

                    setErrors(prev => ({ ...prev, email: data.message || "Email is already registered." }));
                    setAvailable(prev => ({ ...prev, email: false }));

                } else {

                    setErrors(prev => ({ ...prev, email: "" }));
                    setAvailable(prev => ({ ...prev, email: true }));
                }

            } catch (error) {

                if (error.response?.status === 409) {

                    setErrors(prev => ({ ...prev, email: error.response.data?.message || "Email is already registered." }));
                    setAvailable(prev => ({ ...prev, email: false }));

                } else if (error.response?.status === 404) {

                    setErrors(prev => ({ ...prev, email: "" }));
                    setAvailable(prev => ({ ...prev, email: true }));

                } else {

                    setErrors(prev => ({ ...prev, email: error.response?.data?.message || "Unable to check email." }));
                    setAvailable(prev => ({ ...prev, email: false }));
                }

            } finally {

                setChecking(prev => ({ ...prev, email: false }));
            }

        }, 500);

        return () => clearTimeout(timer);

    }, [form.email]);

    useEffect(() => {

        if (extra.page !== 2 || extra.resendSeconds <= 0) return;

        const timer = setInterval(() => {

            setExtra(prev => ({
                ...prev,
                resendSeconds: prev.resendSeconds > 0 ? prev.resendSeconds - 1 : 0
            }));

        }, 1000);

        return () => clearInterval(timer);

    }, [extra.page, extra.resendSeconds]);

    function validatePageOne() {

        const newErrors = { name: "", username: "", email: "", password: "", confirmPassword: "" };

        let valid = true;

        if (!form.name.trim()) {

            newErrors.name = "Name is required.";
            valid = false;

        } else if (form.name.trim().length <= 2) {

            newErrors.name = "Name must be more than 2 characters.";
            valid = false;
        }

        if (!form.username.trim()) {

            newErrors.username = "Username is required.";
            valid = false;

        } else if (/[@\s]/.test(form.username)) {

            newErrors.username = "Username cannot contain @ or spaces.";
            valid = false;

        } else if (form.username.length < 3) {

            newErrors.username = "Username must be at least 3 characters.";
            valid = false;

        } else if (!available.username) {

            newErrors.username = errors.username || "Username is not available.";
            valid = false;
        }

        if (!form.email.trim()) {

            newErrors.email = "Email is required.";
            valid = false;

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {

            newErrors.email = "Enter a valid email address.";
            valid = false;

        } else if (!available.email) {

            newErrors.email = errors.email || "Email is not available.";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    }

    function validateForm() {

        const newErrors = { name: "", username: "", email: "", password: "", confirmPassword: "" };

        let valid = true;

        if (!form.name.trim()) {

            newErrors.name = "Name is required.";
            valid = false;

        } else if (form.name.trim().length <= 2) {

            newErrors.name = "Name must be more than 2 characters.";
            valid = false;
        }

        if (!form.username.trim()) {

            newErrors.username = "Username is required.";
            valid = false;

        } else if (/[@\s]/.test(form.username)) {

            newErrors.username = "Username cannot contain @ or spaces.";
            valid = false;

        } else if (form.username.length < 3) {

            newErrors.username = "Username must be at least 3 characters.";
            valid = false;

        } else if (!available.username) {

            newErrors.username = errors.username || "Username is not available.";
            valid = false;
        }

        if (!form.email.trim()) {

            newErrors.email = "Email is required.";
            valid = false;

        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {

            newErrors.email = "Enter a valid email address.";
            valid = false;

        } else if (!available.email) {

            newErrors.email = errors.email || "Email is not available.";
            valid = false;
        }

        if (!form.password) {

            newErrors.password = "Password is required.";
            valid = false;

        } else if (form.password.length <= 4) {

            newErrors.password = "Password must be more than 4 characters.";
            valid = false;
        }

        if (!form.confirmPassword) {

            newErrors.confirmPassword = "Please confirm your password.";
            valid = false;

        } else if (form.password !== form.confirmPassword) {

            newErrors.confirmPassword = "Passwords do not match.";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    }

    async function handleNext(e) {

        e.preventDefault();

        if (!form.name.trim()) {

            setErrors(prev => ({ ...prev, name: "Name is required." }));
            return;
        }

        if (form.name.trim().length <= 2) {

            setErrors(prev => ({ ...prev, name: "Name must be more than 2 characters." }));
            return;
        }

        if (!form.email.trim()) {

            setErrors(prev => ({ ...prev, email: "Email is required." }));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {

            setErrors(prev => ({ ...prev, email: "Enter a valid email address." }));
            return;
        }

        if (!form.username.trim()) {

            setErrors(prev => ({ ...prev, username: "Username is required." }));
            return;
        }

        if (form.username.trim().length < 3) {

            setErrors(prev => ({ ...prev, username: "Username must be at least 3 characters." }));
            return;
        }

        if (/[@\s]/.test(form.username)) {

            setErrors(prev => ({ ...prev, username: "Username cannot contain @ or spaces." }));
            return;
        }

        if (checking.username || checking.email) {
            return;
        }

        if (!validatePageOne()) {
            return;
        }

        setExtra(prev => ({ ...prev, askingApproval: true, approvalMessage: "", approvalMessageType: "" }));

        try {

            const response = await axios.post(`${BACKEND}/auth/aproval`, { email: form.email, name: form.name, username: form.username });
            const data = response.data;

            setExtra(prev => ({ ...prev, page: 2, approvalMessage: data?.message || "Approval request sent to your Gmail.", approvalMessageType: data?.success === true ? "success" : "error", askingApproval: false, resendSeconds: 50 }));

        } catch (error) {

            setExtra(prev => ({ ...prev, askingApproval: false, approvalMessage: error.response?.data?.message || "Unable to send approval request.", approvalMessageType: "error" }));
        }
    }

    async function handleResend() {

        if (extra.resendSeconds > 0 || extra.resendingApproval) {
            return;
        }

        setExtra(prev => ({ ...prev, resendingApproval: true, approvalMessage: "", approvalMessageType: "" }));

        try {

            const response = await axios.post(`${BACKEND}/auth/aproval`, { email: form.email, name: form.name, username: form.username });
            const data = response.data;

            setExtra(prev => ({ ...prev, resendingApproval: false, resendSeconds: 50, approvalMessage: data?.message || "Approval request sent again to your Gmail.", approvalMessageType: data?.success === true ? "success" : "error" }));

        } catch (error) {

            setExtra(prev => ({ ...prev, resendingApproval: false, approvalMessage: error.response?.data?.message || "Unable to resend approval request.", approvalMessageType: "error" }));
        }
    }

    async function handleFinalTouch() {

        setExtra(prev => ({ ...prev, checkingApproval: true, approvalMessage: "", approvalMessageType: "" }));

        try {

            const response = await axios.get(`${BACKEND}/auth/checkaproval?email=${encodeURIComponent(form.email)}`);
            const data = response.data;

            if (data?.success === true) {

                setExtra(prev => ({ ...prev, page: 3, checkingApproval: false, approvalMessage: data?.message || "Email approval verified successfully.", approvalMessageType: "success" }));

            } else {

                setExtra(prev => ({ ...prev, checkingApproval: false, approvalMessage: data?.message || "You have not approved yet.", approvalMessageType: "error" }));
            }

        } catch (error) {

            setExtra(prev => ({ ...prev, checkingApproval: false, approvalMessage: error.response?.data?.message || "You have not approved yet.", approvalMessageType: "error" }));
        }
    }

    function handleBack() {

        setExtra(prev => ({ ...prev, page: 1, approvalMessage: "", approvalMessageType: "", checkingApproval: false, resendSeconds: 0, resendingApproval: false }));

        setErrors(prev => ({ ...prev, password: "", confirmPassword: "" }));
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (extra.loading) return;

        if (!validateForm()) return;

        setExtra(prev => ({
            ...prev,
            loading: true,
            approvalMessage: "",
            approvalMessageType: ""
        }));

        try {

            const res = await axios.post(`${BACKEND}/auth/register`, {
                name: form.name,
                username: form.username,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            });

            const result = res.data;

            if (result.success) {

                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("refreshToken", result.refreshToken);
                localStorage.setItem("tokenType", result.tokenType);
                localStorage.setItem("expiresIn", result.expiresIn);
                localStorage.setItem("user", JSON.stringify(result.user));

                setForm({
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                window.location.href = "/";

                return;
            }

            setExtra(prev => ({
                ...prev,
                loading: false,
                approvalMessage: result.message || "Unable to create account.",
                approvalMessageType: "error"
            }));

        } catch (e) {

            setExtra(prev => ({
                ...prev,
                loading: false,
                approvalMessage: e.response?.data?.message || e.response?.data?.error || e.message || "Unable to connect to the server.",
                approvalMessageType: "error"
            }));

            return;
        }

        setExtra(prev => ({
            ...prev,
            loading: false
        }));
    }

    return (
        <main className="loginPage wd isFlex flex-row flex-wrap">

            <Star count={100} />

            <div className="loginLayout wd g-2 isFlex flex-row justify-content-around flex-wrap">

                <Info typ="register" />

                <section className="loginFormArea isFlex align-items-start">

                    <div className="formTop isFlex wd flex-row justify-content-start gap-3"><span>CREATE ACCOUNT</span><i></i>{extra.page !== 1 && <button type="button" onClick={handleBack} className="approvalBack btn p-0 d-flex align-items-center gap-1"><FiArrowLeft size={15} /> BACK</button>}</div>

                    <form className="isFlex gap-0 wd" onSubmit={extra.page === 1 ? handleNext : extra.page === 3 ? handleSubmit : (e) => e.preventDefault()} noValidate>

                        {extra.page === 1 && (
                            <>

                                <div className="loginField wd">

                                    <label className="d-block">NAME</label>

                                    <input className={`form-control border-0 rounded-0 shadow-none ${errors.name ? "is-invalid" : ""}`} name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" autoComplete="name" />

                                    {errors.name && <div className="validationError">{errors.name}</div>}

                                </div>

                                <div className="loginField wd">

                                    <label className="d-block">EMAIL</label>

                                    <input className={`form-control border-0 rounded-0 shadow-none ${errors.email ? "is-invalid" : ""}`} name="email" type="email" value={form.email} onChange={handleChange} placeholder="username@example.com" autoComplete="email" />

                                    {checking.email && <div className="validationError">Checking email...</div>}

                                    {errors.email && !checking.email && <div className="validationError">{errors.email}</div>}

                                    {available.email && !checking.email && !errors.email && <div className="validationSuccess">Email is available.</div>}

                                </div>

                                <div className="loginField wd">

                                    <label className="d-block">USERNAME</label>

                                    <input className={`form-control border-0 rounded-0 shadow-none ${errors.username ? "is-invalid" : ""}`} name="username" type="text" value={form.username} onChange={handleChange} placeholder="who.is.anshu" autoComplete="username" />

                                    {checking.username && <div className="validationError">Checking username...</div>}

                                    {errors.username && !checking.username && <div className="validationError">{errors.username}</div>}

                                    {available.username && !checking.username && !errors.username && <div className="validationSuccess">Username is available.</div>}

                                </div>

                                <button type="submit" disabled={extra.askingApproval || checking.username || checking.email} className="clk loginButton btn w-100 d-flex align-items-center justify-content-between"><span>{extra.askingApproval ? "SENDING..." : checking.username || checking.email ? "CHECKING..." : "NEXT"}</span></button>

                            </>
                        )}

                        {extra.page === 2 && (
                            <>

                                <div className="approvalBox wd">

                                    <div className="approvalIcon"><FiShield size={26} /></div>

                                    <div className="approvalContent">

                                        <div className="approvalMainText">Check your email</div>

                                        <div className="approvalSubText">We have sent an approval request to your registered email address.</div>

                                        <div className="approvalSubText">Approve the request from your email and then click <strong>MOVE FORWARD</strong>. </div>
                                        <button type="button"
                                            onClick={handleResend} disabled={extra.resendSeconds > 0 || extra.resendingApproval}
                                            className="clk resendButtonx btn w-100 d-flex align-items-center justify-content-between">
                                            <span>
                                                {extra.resendingApproval ? "SENDING..." : extra.resendSeconds > 0 ? `RESEND IN ${extra.resendSeconds}s` : "RESEND EMAIL"}
                                            </span>
                                        </button>

                                    </div>

                                </div>

                                {extra.approvalMessage && <div className={`approvalMessage wd ${extra.approvalMessageType === "success" ? "approvalSuccess" : "approvalError"}`}><span className="approvalMessageIcon">{extra.approvalMessageType === "success" ? "✓" : "!"}</span><span>{extra.approvalMessage}</span></div>}
                                <button type="button" onClick={handleFinalTouch} disabled={extra.checkingApproval} className="clk loginButton btn w-100 d-flex align-items-center justify-content-between"><span>{extra.checkingApproval ? "CHECKING..." : "MOVE FORWARD"}</span></button>

                            </>
                        )}

                        {extra.page === 3 && (
                            <>

                                <div className="loginField wd">

                                    <label className="d-block">PASSWORD</label>

                                    <div className="passwordBox position-relative">

                                        <input className={`form-control border-0 rounded-0 shadow-none ${errors.password ? "is-invalid" : ""}`} name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Create a password" autoComplete="new-password" minLength={5} />

                                        <button type="button" className="showButton btn p-0" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "HIDE" : "SHOW"}</button>

                                    </div>

                                    {errors.password && <div className="validationError">{errors.password}</div>}

                                </div>

                                <div className="loginField wd">

                                    <label className="d-block">RE-PASSWORD</label>

                                    <div className="passwordBox position-relative">

                                        <input className={`form-control border-0 rounded-0 shadow-none ${errors.confirmPassword ? "is-invalid" : ""}`} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" autoComplete="new-password" minLength={5} />

                                        <button type="button" className="showButton btn p-0" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "HIDE" : "SHOW"}</button>

                                    </div>

                                    {errors.confirmPassword && <div className="validationError">{errors.confirmPassword}</div>}

                                </div>

                                <button type="submit" className="clk loginButton btn w-100 d-flex align-items-center justify-content-between"><span className="d-flex align-items-center gap-2"><FiShield size={15} /> CREATE ACCOUNT</span></button>

                            </>
                        )}

                    </form>

                    <div className="createAccount d-flex gap-2 mt-4"><span>Already have an account?</span><Link to="/login">Log in</Link></div>

                </section>

                <div className="loginOptions isFlex flex-row flex-wrap">

                    <button className="clk" type="button"><FcGoogle /></button>
                    <button className="clk" type="button"><FaGithub /></button>
                    <button className="clk" type="button"><FaApple /></button>
                    <button className="clk" type="button"><FaFacebookF /></button>

                </div>

            </div>

        </main>
    );
}