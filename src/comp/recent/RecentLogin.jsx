import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getSavedAccounts,
    restoreAccount,
    removeSavedAccount
} from "../help/accountStorage";
import {
    FiArrowRight,
    FiPlus,
    FiUser,
    FiShield,
    FiLogIn,
    FiTrash2
} from "react-icons/fi";
import Star from "../help/star/Star"
import "./recent.css";

export default function RecentLogin() {

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        setAccounts(getSavedAccounts());
    }, []);

    function getProfileImage(account) {
        if (!account?.profilePic && !account?.photo) {
            return null;
        }

        const image = account.profilePic || account.photo;

        if (
            typeof image === "string" &&
            image.startsWith("data:")
        ) {
            return image;
        }

        return `data:${account.profilePicType || "image/jpeg"};base64,${image}`;
    }

    function getInitial(account) {
        return (
            String(account?.username || "U")
                .trim()
                .charAt(0)
                .toUpperCase() || "U"
        );
    }

    function handleLogin(account) {
        restoreAccount(account);
        navigate("/");
    }

    function handleRemove(account, e) {
        e.stopPropagation();

        removeSavedAccount(account.username);

        const updatedAccounts = getSavedAccounts();

        setAccounts(updatedAccounts);

        if (!updatedAccounts.length) {
            navigate("/login", { replace: true });
        }
    }

    return (
        <div className="recentLoginPage">
            <Star />

            <div className="recentLoginMain">

                <div className="recentTop">

                    <div className="recentLogo">
                        <FiUser />
                    </div>

                    <div className="recentHeaderText">
                        <span className="recentEyebrow">
                            INSTEP ACCOUNT
                        </span>

                        <h1>
                            Welcome back<span>.</span>
                        </h1>

                        <p>
                            Pick up where you left off
                        </p>
                    </div>

                </div>

                <div className="recentContent">

                    <div className="recentSectionHead">

                        <div>

                            <h2>Your accounts</h2>

                            <p>
                                {accounts.length > 0
                                    ? `${accounts.length} saved account${accounts.length > 1 ? "s" : ""}`
                                    : "No saved accounts yet"}
                            </p>

                        </div>

                        {accounts.length > 0 && (
                            <div className="recentSecure">
                                <FiShield />
                                <span>Saved securely</span>
                            </div>
                        )}

                    </div>

                    {accounts.length > 0 ? (

                        <div className="recentAccounts">

                            {accounts.map((account, index) => {

                                const image =
                                    getProfileImage(account);

                                return (

                                    <div
                                        className="recentAccount"
                                        key={
                                            account.username ||
                                            account.id ||
                                            index
                                        }
                                        onClick={() =>
                                            handleLogin(account)
                                        }
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={e => {

                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                e.preventDefault();
                                                handleLogin(account);
                                            }

                                        }}
                                    >

                                        <div className="recentAvatarWrap">

                                            <div className="recentAvatar">

                                                {image ? (

                                                    <img
                                                        src={image}
                                                        alt={
                                                            account.username
                                                        }
                                                        onError={e => {

                                                            e.currentTarget.style.display =
                                                                "none";

                                                            if (
                                                                e.currentTarget
                                                                    .nextElementSibling
                                                            ) {
                                                                e.currentTarget
                                                                    .nextElementSibling
                                                                    .style.display =
                                                                    "flex";
                                                            }

                                                        }}
                                                    />

                                                ) : null}

                                                <span
                                                    style={{
                                                        display: image
                                                            ? "none"
                                                            : "flex"
                                                    }}
                                                >
                                                    {getInitial(account)}
                                                </span>

                                            </div>

                                            <div className="recentOnline"></div>

                                        </div>

                                        <div className="recentAccountInfo">

                                            <strong>
                                                {account.name ||
                                                    account.username}
                                            </strong>

                                            <span>
                                                @{account.username}
                                            </span>

                                            {account.email && (
                                                <small>
                                                    {account.email}
                                                </small>
                                            )}

                                        </div>

                                        <div className="recentAccountActions">

                                            <button
                                                type="button"
                                                className="recentRemove"
                                                title="Remove account"
                                                onClick={e =>
                                                    handleRemove(
                                                        account,
                                                        e
                                                    )
                                                }
                                            >
                                                <FiTrash2 />
                                            </button>

                                            <div className="recentLoginAction">
                                                <FiArrowRight />
                                            </div>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                    ) : (

                        <div className="recentEmpty">

                            <div className="recentEmptyIcon">
                                <FiUser />
                            </div>

                            <h3>
                                No saved accounts
                            </h3>

                            <p>
                                Choose “Remember me” when logging in
                                and your account will appear here.
                            </p>

                        </div>

                    )}

                    <div className="recentBottom">

                        <Link
                            to="/login"
                            className="recentAnother"
                        >

                            <span className="recentAnotherIcon">
                                <FiLogIn />
                            </span>

                            <span>
                                Login to another account
                            </span>

                            <FiArrowRight />

                        </Link>

                        <Link
                            to="/register"
                            className="recentCreate"
                        >
                            <FiPlus />
                            Create new account
                        </Link>

                    </div>

                </div>

                <div className="recentFooter">

                    <span>
                        Your accounts are only stored on this device.
                    </span>

                </div>

            </div>

        </div>
    );
}