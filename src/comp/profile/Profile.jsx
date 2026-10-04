import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FiArrowLeft,
    FiEdit3,
    FiMail,
    FiCalendar,
    FiSmartphone,
    FiShield,
    FiKey,
    FiClock,
    FiGlobe,
    FiChevronRight,
    FiExternalLink,
    FiCheckCircle,
    FiUser,
    FiLock,
    FiArrowRight,
    FiCopy,
    FiX
} from "react-icons/fi";
import { QRCodeSVG } from "qrcode.react";
import { request } from "../help/api";
import "./profile.css";

export default function Profile() {

    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [copied, setCopied] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {

        const checkOwner = () => {

            try {

                const storedUser = JSON.parse(
                    localStorage.getItem("user") || "null"
                );

                const loggedInUsername =
                    storedUser?.username ||
                    storedUser?.user?.username ||
                    localStorage.getItem("username") ||
                    "";

                setIsMyProfile(
                    loggedInUsername.trim().toLowerCase() ===
                    String(username || "").trim().toLowerCase()
                );

            } catch {
                setIsMyProfile(false);
            }

        };

        checkOwner();

    }, [username]);

    useEffect(() => {

        const loadUser = async () => {

            try {

                setLoading(true);
                setError("");
                setUser(null);
                setImageError(false);

                const response = await request(
                    `/user/get/${encodeURIComponent(username)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error("Profile API Error:", data);
                    setError(data?.message || "Unable to load this profile.");
                    return;
                }

                setUser(data);

            } catch (error) {

                console.error("Profile Request Error:", error);
                setError("Unable to connect to the server. Please try again.");

            } finally {

                setLoading(false);

            }

        };

        if (username) {
            loadUser();
        } else {

            const error = "No username was provided.";

            console.error("Profile Error:", error);
            setError(error);
            setLoading(false);

        }

    }, [username]);

    const copyProfileLink = async () => {

        const profileUrl =
            `${window.location.origin}/profile/${encodeURIComponent(username)}`;

        try {

            await navigator.clipboard.writeText(profileUrl);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2500);

        } catch {
            setCopied(false);
        }

    };

    const getOrdinal = (value) => {

        const number = Number(value);

        if (!number || number < 1) {
            return "Instep";
        }

        const mod100 = number % 100;

        if (mod100 >= 11 && mod100 <= 13) {
            return `${number}th`;
        }

        switch (number % 10) {
            case 1:
                return `${number}st`;
            case 2:
                return `${number}nd`;
            case 3:
                return `${number}rd`;
            default:
                return `${number}th`;
        }

    };

    if (loading) {
        return (
            <main className="profile">
                <div className="profileEmpty">
                    <FiUser />
                    <h2>Loading profile</h2>
                    <p>Getting profile information...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="profile">
                <div className="profileEmpty profileError">

                    <div className="profileErrorIcon">
                        <FiUser />
                    </div>

                    <span className="profileErrorLabel">
                        PROFILE ERROR
                    </span>

                    <h2>
                        Unable to open profile
                    </h2>

                    <p>
                        {error}
                    </p>

                    <div className="profileErrorActions">

                        <Link to="/people">
                            Find people
                            <FiArrowRight />
                        </Link>

                        <Link to="/">
                            Home
                            <FiArrowRight />
                        </Link>

                    </div>

                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="profile">
                <div className="profileEmpty">

                    <FiUser />

                    <h2>
                        Profile not found
                    </h2>

                    <p>
                        The requested Instep profile could not be found.
                    </p>

                    <Link to="/people">
                        Find people
                        <FiArrowRight />
                    </Link>

                </div>
            </main>
        );
    }

    const name = user.name || "Instep User";
    const userUsername = user.username || username;
    const email = user.email || "No email available";
    const mobile = user.mobile || "Not added";
    const birthday = user.birthday || "Not added";
    const gender = user.gender || "Not added";
    const bio = user.bio || "No bio available.";
    const active = user.active ?? user.isActive;
    const enabled = user.enabled;

    const profilePic = user.profilePic
        ? `data:${user.profilePicType || "image/jpeg"};base64,${user.profilePic}`
        : null;

    const avatarLetter =
        String(userUsername || "U").trim().charAt(0).toUpperCase() || "U";

    const createdAt = user.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "Not available";

    const updatedAt = user.updatedAt
        ? new Date(user.updatedAt).toLocaleString()
        : "Not available";

    const profileCompletion = Math.round(
        [
            user.name,
            user.username,
            user.email,
            user.mobile,
            user.birthday,
            user.gender,
            user.bio,
            user.profilePic
        ].filter(Boolean).length / 8 * 100
    );

    const profileUrl =
        `${window.location.origin}/profile/${encodeURIComponent(userUsername)}`;

    const apps = [
        {
            name: "Merkit",
            type: "MEMORY",
            description: "Create and preserve memories.",
            letter: "M"
        },
        {
            name: "Taskly",
            type: "PRODUCTIVITY",
            description: "Plan and manage your work.",
            letter: "T"
        },
        {
            name: "Skilla",
            type: "LEARNING",
            description: "Build skills through learning.",
            letter: "S"
        },
        {
            name: "Instax",
            type: "SOCIAL",
            description: "Share and connect with people.",
            letter: "I"
        }
    ];

    return (
        <main className="profile">

            <header className="profileTopbar">

                <Link
                    to="/"
                    className="profileBack"
                >
                    <FiArrowLeft />
                    <span>HOME</span>
                </Link>

                <div className="profileTopTitle">
                    <span>INSTEP</span>
                    <strong>/ PROFILE</strong>
                </div>

                {isMyProfile ? (

                    <div className="profileTopActions">
                        <Link to="/settings" className="profileSettings"  >
                            <FiEdit3 />
                            <span>EDIT</span>
                        </Link>
                        <button type="button" className="profileQrBtn" onClick={() => setShowQR(true)}  >
                            <span>SHARE PROFILE</span>
                        </button>
                    </div>

                ) : (

                    <button type="button" className="profileQrBtn" onClick={() => setShowQR(true)} >
                        <span>SHARE PROFILE</span>
                    </button>

                )}

            </header>

            <section className="profileHero">

                <div className="profileHeroInner">

                    <div className="profileHeroIdentity">

                        <div className="profileAvatar">

                            {profilePic && !imageError ? (

                                <img
                                    src={profilePic}
                                    alt={name}
                                    onError={() => setImageError(true)}
                                />

                            ) : (

                                <span>
                                    {avatarLetter}
                                </span>

                            )}

                            <div className="profileAvatarStatus">
                                <FiCheckCircle />
                            </div>

                        </div>

                        <div className="profileHeroText">

                            <span className="profileLabel">
                                {isMyProfile
                                    ? "YOUR INSTEP IDENTITY"
                                    : "INSTeP IDENTITY"}
                            </span>

                            <h1>
                                {name}
                            </h1>

                            <p className="profileUsername">
                                @{userUsername}
                            </p>

                            <div className="profileVerified">
                                <FiCheckCircle />

                                {isMyProfile
                                    ? "Identity verified"
                                    : "Instep member"}
                            </div>

                        </div>

                    </div>

                    <div className="profileHeroRight">

                        <span>ACCOUNT STATUS</span>

                        <strong>
                            <i></i>
                            {active === false || enabled === false
                                ? "INACTIVE"
                                : "ACTIVE"}
                        </strong>

                        <p>
                            {isMyProfile
                                ? "Your Instep identity is currently available across connected applications."
                                : `${name} is an active member of the Instep community.`}
                        </p>

                    </div>

                </div>

            </section>

            {!isMyProfile ? (

                <>

                    <section className="profilePublicIntro">

                        <div className="profilePublicIntroInner">

                            <span className="profilePublicIntroLabel">
                                PUBLIC PROFILE
                            </span>

                            <h2>
                                {name}
                            </h2>

                            <p>
                                {bio}
                            </p>

                            <div className="profilePublicMeta">

                                <span>
                                    USERNAME
                                    <strong>
                                        @{userUsername}
                                    </strong>
                                </span>

                                {user.createdAt && (
                                    <span>
                                        MEMBER SINCE
                                        <strong>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </strong>
                                    </span>
                                )}

                                {user.id && (
                                    <span>
                                        COMMUNITY
                                        <strong>
                                            {getOrdinal(user.id)} member
                                        </strong>
                                    </span>
                                )}

                            </div>

                        </div>

                    </section>

                    <section className="profileShareCard">

                        <div className="profileShareCardInner">

                            <div className="profileShareCardText">

                                <span>
                                    PROFILE QR CODE
                                </span>

                                <h3>
                                    Open this profile anywhere.
                                </h3>

                                <p>
                                    Scan the QR code to open @{userUsername}'s Instep profile.
                                </p>

                            </div>

                            <div className="profileShareActions">

                                <button
                                    type="button"
                                    onClick={() => setShowQR(true)}
                                >
                                    QR CODE
                                </button>

                                <button
                                    type="button"
                                    onClick={copyProfileLink}
                                >
                                    <FiCopy />
                                    {copied ? "COPIED" : "COPY LINK"}
                                </button>

                            </div>

                        </div>

                    </section>

                    <section className="profileVisitorBottom">

                        <div className="profileVisitorMember">

                            <FiCheckCircle />

                            <span>
                                He is the{" "}
                                <strong>
                                    {getOrdinal(user.id)}
                                </strong>{" "}
                                member on Instep.
                            </span>

                        </div>

                    </section>

                </>

            ) : (

                <>

                    <section className="profileStats">

                        <div className="profileStat">

                            <span>CONNECTED APPS</span>

                            <strong>
                                04
                            </strong>

                            <p>
                                Applications connected
                            </p>

                        </div>

                        <div className="profileStat">

                            <span>IDENTITY</span>

                            <strong>
                                {active === false ? "INACTIVE" : "ACTIVE"}
                            </strong>

                            <p>
                                Instep identity status
                            </p>

                        </div>

                        <div className="profileStat">

                            <span>SECURITY</span>

                            <strong>
                                {enabled === false ? "LIMITED" : "PROTECTED"}
                            </strong>

                            <p>
                                Authentication enabled
                            </p>

                        </div>

                        <div className="profileStat">

                            <span>ACCOUNT AGE</span>

                            <strong>
                                {user.createdAt ? "ACTIVE" : "NEW"}
                            </strong>

                            <p>
                                Instep account
                            </p>

                        </div>

                    </section>

                    <section className="profileLayout">

                        <div className="profileMain">

                            <section className="profileBlock">

                                <div className="profileBlockHeading">

                                    <div>

                                        <span>
                                            01 / PERSONAL INFORMATION
                                        </span>

                                        <h2>
                                            About you
                                        </h2>

                                    </div>

                                    <Link to="/settings">
                                        Edit
                                        <FiEdit3 />
                                    </Link>

                                </div>

                                <div className="profileInformation">

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiUser />
                                        </div>

                                        <div>
                                            <span>FULL NAME</span>
                                            <strong>{name}</strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiMail />
                                        </div>

                                        <div>
                                            <span>EMAIL ADDRESS</span>
                                            <strong>{email}</strong>
                                        </div>

                                    </div>

                                    {/* <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiSmartphone />
                                        </div>

                                        <div>
                                            <span>MOBILE NUMBER</span>
                                            <strong>{mobile}</strong>
                                        </div>

                                    </div> */}

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiCalendar />
                                        </div>

                                        <div>
                                            <span>BIRTHDAY</span>
                                            <strong>{birthday}</strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiGlobe />
                                        </div>

                                        <div>
                                            <span>GENDER</span>
                                            <strong>{gender}</strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiUser />
                                        </div>

                                        <div>
                                            <span>USERNAME</span>
                                            <strong>@{userUsername}</strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiUser />
                                        </div>

                                        <div>
                                            <span>MEMBER NUMBER</span>
                                            <strong>
                                                {getOrdinal(user.id)} member
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem profileInfoBio">

                                        <div className="profileInfoIcon">
                                            <FiGlobe />
                                        </div>

                                        <div>
                                            <span>BIO</span>
                                            <strong>{bio}</strong>
                                        </div>

                                    </div>

                                </div>

                            </section>

                            <section className="profileBlock">

                                <div className="profileBlockHeading">

                                    <div>

                                        <span>
                                            02 / ACCOUNT INFORMATION
                                        </span>

                                        <h2>
                                            Account details
                                        </h2>

                                    </div>

                                </div>

                                <div className="profileInformation">

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiShield />
                                        </div>

                                        <div>
                                            <span>ROLE</span>
                                            <strong>
                                                {user.role || "USER"}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiCheckCircle />
                                        </div>

                                        <div>
                                            <span>ACCOUNT ENABLED</span>
                                            <strong>
                                                {enabled === false ? "NO" : "YES"}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiCheckCircle />
                                        </div>

                                        <div>
                                            <span>ACCOUNT ACTIVE</span>
                                            <strong>
                                                {active === false ? "NO" : "YES"}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiClock />
                                        </div>

                                        <div>
                                            <span>CREATED AT</span>
                                            <strong>{createdAt}</strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiClock />
                                        </div>

                                        <div>
                                            <span>LAST UPDATED</span>
                                            <strong>{updatedAt}</strong>
                                        </div>

                                    </div>

                                    <div className="profileInfoItem">

                                        <div className="profileInfoIcon">
                                            <FiUser />
                                        </div>

                                        <div>
                                            <span>PROFILE PHOTO</span>
                                            <strong>
                                                {user.profilePic
                                                    ? `${user.profilePicSize || 0} bytes`
                                                    : "Not added"}
                                            </strong>
                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* <section className="profileBlock">

                                <div className="profileBlockHeading">

                                    <div>

                                        <span>
                                            03 / CONNECTED APPLICATIONS
                                        </span>

                                        <h2>
                                            Your ecosystem
                                        </h2>

                                    </div>

                                    <span className="profileConnectedCount">
                                        04 CONNECTED
                                    </span>

                                </div>

                                <div className="profileApps">

                                    {apps.map((app, index) => (

                                        <Link
                                            to={
                                                app.name === "Merkit"
                                                    ? "/merkit"
                                                    : "#"
                                            }
                                            className="profileApp"
                                            key={app.name}
                                        >

                                            <span className="profileAppNumber">
                                                0{index + 1}
                                            </span>

                                            <div className="profileAppIcon">
                                                {app.letter}
                                            </div>

                                            <div className="profileAppDetails">

                                                <span>
                                                    {app.type}
                                                </span>

                                                <strong>
                                                    {app.name}
                                                </strong>

                                                <p>
                                                    {app.description}
                                                </p>

                                            </div>

                                            <div className="profileAppConnection">

                                                <i></i>

                                                CONNECTED

                                            </div>

                                            <FiExternalLink />

                                        </Link>

                                    ))}

                                </div>

                            </section> */}

                            {/* <section className="profileBlock">

                                <div className="profileBlockHeading">

                                    <div>

                                        <span>
                                            04 / ACCOUNT ACTIVITY
                                        </span>

                                        <h2>
                                            Recent activity
                                        </h2>

                                    </div>

                                </div>

                                <div className="profileActivity">

                                    <div className="profileActivityItem">

                                        <div className="profileActivityIcon">
                                            <FiKey />
                                        </div>

                                        <div>
                                            <strong>
                                                Account authenticated
                                            </strong>

                                            <span>
                                                Your Instep session is active
                                            </span>
                                        </div>

                                        <time>
                                            NOW
                                        </time>

                                    </div>

                                    <div className="profileActivityItem">

                                        <div className="profileActivityIcon">
                                            <FiShield />
                                        </div>

                                        <div>
                                            <strong>
                                                Security protection active
                                            </strong>

                                            <span>
                                                Authentication layer is enabled
                                            </span>
                                        </div>

                                        <time>
                                            ACTIVE
                                        </time>

                                    </div>

                                    <div className="profileActivityItem">

                                        <div className="profileActivityIcon">
                                            <FiGlobe />
                                        </div>

                                        <div>
                                            <strong>
                                                Instep identity available
                                            </strong>

                                            <span>
                                                Connected applications can use your identity
                                            </span>
                                        </div>

                                        <time>
                                            LIVE
                                        </time>

                                    </div>

                                </div>

                            </section> */}

                        </div>

                        <aside className="profileSidebar">

                            <div className="profileCompletion">

                                <div className="profileCompletionTop">

                                    <span>
                                        PROFILE COMPLETION
                                    </span>

                                    <strong>
                                        {profileCompletion}%
                                    </strong>

                                </div>

                                <div className="profileProgress">

                                    <span
                                        style={{
                                            width: `${profileCompletion}%`
                                        }}
                                    ></span>

                                </div>

                                <p>
                                    Complete your profile to keep your
                                    Instep identity up to date.
                                </p>

                                <Link to="/settings">
                                    Complete profile
                                    <FiChevronRight />
                                </Link>

                            </div>

                            <div className="profileSecurityCard">

                                <div className="profileSecurityHeader">

                                    <div className="profileSecurityIcon">
                                        <FiShield />
                                    </div>

                                    <span>
                                        SECURITY
                                    </span>

                                </div>

                                <h3>
                                    Your account is protected.
                                </h3>

                                <p>
                                    Instep manages authentication centrally
                                    so your connected applications don't
                                    need separate credentials.
                                </p>

                                <div className="profileSecurityStatus">

                                    <FiCheckCircle />

                                    <span>
                                        Authentication active
                                    </span>

                                </div>

                                <Link to="/settings">
                                    Security settings
                                    <FiChevronRight />
                                </Link>

                            </div>

                            <div className="profileSession">

                                <div className="profileSessionIcon">
                                    <FiClock />
                                </div>

                                <div>

                                    <span>
                                        CURRENT SESSION
                                    </span>

                                    <strong>
                                        Active now
                                    </strong>

                                    <p>
                                        You are currently signed in.
                                    </p>

                                </div>

                            </div>

                            <div className="profileQuickActions">

                                <span>
                                    QUICK ACTIONS
                                </span>

                                <Link to="/settings">
                                    <FiLock />
                                    Security & privacy
                                    <FiChevronRight />
                                </Link>

                                <Link to="/settings">
                                    <FiEdit3 />
                                    Edit profile
                                    <FiChevronRight />
                                </Link>

                                <Link to="/">
                                    <FiArrowLeft />
                                    Back to Home
                                    <FiChevronRight />
                                </Link>

                            </div>

                        </aside>

                    </section>

                    <section className="profileBottom">

                        <div>

                            <span>
                                YOUR INSTEP IDENTITY
                            </span>

                            <h2>
                                One identity.
                                <br />
                                <em>Everywhere.</em>
                            </h2>

                        </div>

                        <Link to="/people">
                            Find InStep Users
                            <FiArrowRight />
                        </Link>

                    </section>

                </>

            )}

            {showQR && (

                <div
                    className="profileQrOverlay"
                    onClick={() => setShowQR(false)}
                >

                    <div
                        className="profileQrModal"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="profileQrClose"
                            onClick={() => setShowQR(false)}
                        >
                            <FiX />
                        </button>

                        <span className="profileQrLabel">
                            PROFILE QR CODE
                        </span>

                        <h3>
                            @{userUsername}
                        </h3>

                        <p>
                            Scan to open this Instep profile.
                        </p>

                        <div className="profileQrCode">

                            <QRCodeSVG
                                value={profileUrl}
                                size={190}
                                level="H"
                            />

                        </div>

                        <div className="profileQrUrl">
                            {profileUrl}
                        </div>

                        <div className="profileQrActions">

                            <button
                                type="button"
                                onClick={copyProfileLink}
                            >
                                <FiCopy />
                                {copied ? "COPIED" : "COPY LINK"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {copied && !showQR && (

                <div className="profileShareToast">
                    <FiCheckCircle />
                    Profile link copied
                </div>

            )}

        </main>
    );
}