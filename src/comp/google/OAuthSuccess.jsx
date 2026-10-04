import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiCheckCircle, FiLoader } from "react-icons/fi";
import "./oauthSuccess.css";

const OAuthSuccess = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [status, setStatus] = useState("Signing you in...");

    useEffect(() => {

        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");
        const expiresIn = searchParams.get("expiresIn");
        const username = searchParams.get("username");

        if (!accessToken || !refreshToken || !username) {
            setStatus("Authentication failed");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);

            return;
        }

        try {

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("expiresIn", expiresIn || "");

            const existingUser = localStorage.getItem("user");

            let user = {
                username: username
            };

            if (existingUser) {
                try {
                    const parsedUser = JSON.parse(existingUser);

                    user = {
                        ...parsedUser,
                        username: username
                    };
                } catch {
                    user = {
                        username: username
                    };
                }
            }

            localStorage.setItem("user", JSON.stringify(user));

            setStatus("Login successful");

            setTimeout(() => {
                navigate(`/`, {
                    replace: true
                });
            }, 700);

        } catch {
            setStatus("Authentication failed");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);
        }

    }, [navigate, searchParams]);

    return (
        <div className="oauthSuccess">

            <div className="oauthSuccessGlow oauthSuccessGlowOne"></div>
            <div className="oauthSuccessGlow oauthSuccessGlowTwo"></div>

            <div className="oauthSuccessContent">

                {status === "Login successful" ? (
                    <FiCheckCircle className="oauthSuccessIcon success" />
                ) : (
                    <FiLoader className="oauthSuccessIcon loading" />
                )}

                <h2>{status}</h2>

                <p>
                    {status === "Login successful"
                        ? "Redirecting to your profile..."
                        : "Please wait while we complete your Google login."}
                </p>

            </div>

        </div>
    );
};

export default OAuthSuccess;