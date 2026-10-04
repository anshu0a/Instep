
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import {
    FiArrowLeft,
    FiUser,
    FiShield,
    FiLock,
    FiBell,
    FiGlobe,
    FiChevronRight,
    FiLogOut,
    FiTrash2,
    FiKey,
    FiSmartphone,
    FiMail,
    FiX,
    FiBookmark,
    FiUsers
} from "react-icons/fi";
import "./setting.css";
import {
    saveAccount,
    clearCurrentLogin,
    getSavedAccounts
} from "../help/accountStorage";

export default function Settings() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const name = user.name || "Instep User";
    const username = user.username || "username";
    const email = user.email || "No email available";

    const [showLogout, setShowLogout] = React.useState(false);
    const [showSwitch, setShowSwitch] = React.useState(false);

    function isAccountSaved() {

        const accounts = getSavedAccounts();

        return accounts.some(
            account =>
                account.username?.toLowerCase() ===
                username?.toLowerCase()
        );
    }

    function hasSavedAccounts() {

        const accounts = getSavedAccounts();

        return accounts.length > 0;
    }

    function handleLogout() {

        if (isAccountSaved()) {
            logout(false);
            return;
        }

        setShowLogout(true);
    }

    function handleSwitchAccount() {

        if (hasSavedAccounts()) {
            navigate("/recent");
            return;
        }

        setShowSwitch(true);
    }

    function logout(saveLogin) {

        if (saveLogin) {

            saveAccount(
                user,
                {
                    accessToken:
                        localStorage.getItem("accessToken"),
                    refreshToken:
                        localStorage.getItem("refreshToken"),
                    tokenType:
                        localStorage.getItem("tokenType"),
                    expiresIn:
                        localStorage.getItem("expiresIn")
                }
            );
        }

        clearCurrentLogin();

        window.location.href = "/recent";
    }

    function switchAccount(saveLogin) {

        if (saveLogin) {

            saveAccount(
                user,
                {
                    accessToken:
                        localStorage.getItem("accessToken"),
                    refreshToken:
                        localStorage.getItem("refreshToken"),
                    tokenType:
                        localStorage.getItem("tokenType"),
                    expiresIn:
                        localStorage.getItem("expiresIn")
                }
            );
        }

        clearCurrentLogin();

        if (saveLogin) {
            window.location.href = "/recent";
        } else {
            window.location.href = "/login";
        }
    }

    return (
        <main className="settings">

            <header className="settingsTopbar">

                <Link
                    to="/profile"
                    className="settingsBack"
                >
                    <FiArrowLeft />
                    <span>PROFILE</span>
                </Link>

                <div className="settingsTopTitle">
                    <span>INSTEP</span>
                    <strong>/ SETTINGS</strong>
                </div>

                <div className="settingsStatus">
                    <i></i>
                    ACTIVE
                </div>

            </header>

            <section className="settingsHero">

                <div className="settingsHeroInner">

                    <div>

                        <span className="settingsEyebrow">
                            ACCOUNT CONTROL
                        </span>

                        <h1>
                            Settings
                            <br />
                            <em>& preferences.</em>
                        </h1>

                        <p>
                            Manage your Instep identity, security,
                            privacy and account preferences.
                        </p>

                    </div>

                    <div className="settingsIdentity">

                        <div className="settingsAvatar">
                            {name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>
                                {name}
                            </strong>

                            <span>
                                @{username}
                            </span>
                        </div>

                    </div>

                </div>

            </section>

            <section className="settingsLayout">

                <div className="settingsMain">

                    <section className="settingsBlock">

                        <div className="settingsBlockHeading">

                            <div>
                                <span>
                                    01 / ACCOUNT
                                </span>

                                <h2>
                                    Account settings
                                </h2>
                            </div>

                        </div>

                        <div className="settingsList">

                            <Link
                                to="/profile"
                                className="settingsItem"
                            >

                                <div className="settingsItemIcon">
                                    <FiUser />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Personal information
                                    </strong>

                                    <span>
                                        Name, username, birthday and gender
                                    </span>
                                </div>

                                <FiChevronRight />

                            </Link>

                            <div className="settingsItem">

                                <div className="settingsItemIcon">
                                    <FiMail />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Email address
                                    </strong>

                                    <span>
                                        {email}
                                    </span>
                                </div>

                                <span className="settingsVerified">
                                    ACTIVE
                                </span>

                            </div>

                            <div className="settingsItem">

                                <div className="settingsItemIcon">
                                    <FiSmartphone />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Mobile number
                                    </strong>

                                    <span>
                                        {user.mobile || "Not added yet"}
                                    </span>
                                </div>

                                <FiChevronRight />

                            </div>

                        </div>

                    </section>

                    <section className="settingsBlock">

                        <div className="settingsBlockHeading">

                            <div>
                                <span>
                                    02 / SECURITY
                                </span>

                                <h2>
                                    Security & privacy
                                </h2>
                            </div>

                            <div className="settingsSecure">
                                <FiShield />
                                PROTECTED
                            </div>

                        </div>

                        <div className="settingsList">

                            <Link
                                to="/forgot"
                                className="settingsItem"
                            >

                                <div className="settingsItemIcon">
                                    <FiLock />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Change password
                                    </strong>

                                    <span>
                                        Update your account password
                                    </span>
                                </div>

                                <FiChevronRight />

                            </Link>

                            <div className="settingsItem">

                                <div className="settingsItemIcon">
                                    <FiKey />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Authentication
                                    </strong>

                                    <span>
                                        Instep authentication is active
                                    </span>
                                </div>

                                <span className="settingsVerified">
                                    ACTIVE
                                </span>

                            </div>

                            <div className="settingsItem">

                                <div className="settingsItemIcon">
                                    <FiShield />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Connected applications
                                    </strong>

                                    <span>
                                        Manage applications using your identity
                                    </span>
                                </div>

                                <Link
                                    to="/explore"
                                    className="settingsInlineAction"
                                >
                                    MANAGE
                                </Link>

                            </div>

                        </div>

                    </section>

                    <section className="settingsBlock">

                        <div className="settingsBlockHeading">

                            <div>
                                <span>
                                    03 / PREFERENCES
                                </span>

                                <h2>
                                    Preferences
                                </h2>
                            </div>

                        </div>

                        <div className="settingsList">

                            <div className="settingsItem">

                                <div className="settingsItemIcon">
                                    <FiBell />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Notifications
                                    </strong>

                                    <span>
                                        Manage account notifications
                                    </span>
                                </div>

                                <div className="settingsToggle active">
                                    <span></span>
                                </div>

                            </div>

                            <div className="settingsItem">

                                <div className="settingsItemIcon">
                                    <FiGlobe />
                                </div>

                                <div className="settingsItemContent">
                                    <strong>
                                        Language
                                    </strong>

                                    <span>
                                        English
                                    </span>
                                </div>

                                <FiChevronRight />

                            </div>

                        </div>

                    </section>

                    <section className="settingsDanger">

                        <div className="settingsBlockHeading">

                            <div>
                                <span>
                                    04 / DANGER ZONE
                                </span>

                                <h2>
                                    Account actions
                                </h2>
                            </div>

                        </div>

                        <button
                            className="settingsLogout"
                            onClick={handleSwitchAccount}
                        >
                            <FiUsers />
                            Switch Account
                        </button>

                        <button
                            className="settingsLogout"
                            onClick={handleLogout}
                        >
                            <FiLogOut />
                            Logout
                        </button>

                        <button className="settingsDelete">
                            <FiTrash2 />
                            Delete account
                        </button>

                    </section>

                </div>

                <aside className="settingsSidebar">

                    <div className="settingsSecurityCard">

                        <div className="settingsSecurityIcon">
                            <FiShield />
                        </div>

                        <span>
                            INSTeP SECURITY
                        </span>

                        <h3>
                            One account.
                            <br />
                            One secure identity.
                        </h3>

                        <p>
                            Your Instep account provides a central
                            authentication layer for all connected
                            applications.
                        </p>

                        <div className="settingsSecurityStatus">

                            <i></i>

                            <span>
                                Authentication active
                            </span>

                        </div>

                    </div>

                    <div className="settingsSessionCard">

                        <span>
                            CURRENT SESSION
                        </span>

                        <strong>
                            Active now
                        </strong>

                        <p>
                            You are currently signed in to Instep.
                        </p>

                        <div className="settingsSessionLine">
                            <span>
                                ACCOUNT
                            </span>

                            <strong>
                                @{username}
                            </strong>
                        </div>

                    </div>

                    <div className="settingsHelpCard">

                        <span>
                            NEED HELP?
                        </span>

                        <h3>
                            Manage your identity
                            <br />
                            with confidence.
                        </h3>

                        <Link to="/about">
                            Learn about Instep
                            <FiChevronRight />
                        </Link>

                    </div>

                </aside>

            </section>

            <section className="settingsBottom">

                <div>

                    <span>
                        INSTeP ACCOUNT
                    </span>

                    <h2>
                        Your identity.
                        <br />
                        <em>Your control.</em>
                    </h2>

                </div>

                <Link to="/profile">
                    Back to profile
                    <FiArrowLeft />
                </Link>

            </section>

            {showLogout && (
                <div
                    className="logoutOverlay"
                    onClick={() => setShowLogout(false)}
                >

                    <div
                        className="logoutModal"
                        onClick={e => e.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="logoutClose"
                            onClick={() => setShowLogout(false)}
                        >
                            <FiX />
                        </button>

                        <div className="logoutIcon">
                            <FiLogOut />
                        </div>

                        <span className="logoutEyebrow">
                            SAVE LOGIN?
                        </span>

                        <h2>
                            Keep this account
                            <br />
                            for next time?
                        </h2>

                        <p>
                            Save your login information on this device
                            so you can quickly sign in again later.
                        </p>

                        <br />

                        <div className="logoutActions">

                            <button
                                type="button"
                                className="logoutSave"
                                onClick={() => logout(true)}
                            >
                                <FiBookmark />
                                Save & Logout
                            </button>

                            <button
                                type="button"
                                className="logoutWithoutSave"
                                onClick={() => logout(false)}
                            >
                                Logout without saving
                            </button>

                            <button
                                type="button"
                                className="logoutCancel"
                                onClick={() => setShowLogout(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {showSwitch && (
                <div
                    className="logoutOverlay"
                    onClick={() => setShowSwitch(false)}
                >

                    <div
                        className="logoutModal"
                        onClick={e => e.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="logoutClose"
                            onClick={() => setShowSwitch(false)}
                        >
                            <FiX />
                        </button>

                        <div className="logoutIcon">
                            <FiUsers />
                        </div>

                        <span className="logoutEyebrow">
                            SWITCH ACCOUNT
                        </span>

                        <h2>
                            No saved accounts
                            <br />
                            on this device.
                        </h2>

                        <p>
                            There are no other saved login accounts
                            available on this device. Would you like
                            to save this account before switching?
                        </p>

                        <br />

                        <div className="logoutActions">

                            <button
                                type="button"
                                className="logoutSave"
                                onClick={() => switchAccount(true)}
                            >
                                <FiBookmark />
                                Save & Switch
                            </button>

                            <button
                                type="button"
                                className="logoutWithoutSave"
                                onClick={() => switchAccount(false)}
                            >
                                Switch without saving
                            </button>

                            <button
                                type="button"
                                className="logoutCancel"
                                onClick={() => setShowSwitch(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}
