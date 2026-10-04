import { Link } from "react-router-dom";
import {
    FiArrowUpRight,
    FiShield,
    FiKey,
    FiLayers,
    FiLock,
    FiCheck,
    FiChevronRight
} from "react-icons/fi";
import "./home.css";

export default function Home() {

    const apps = [
        {
            name: "Merkit",
            type: "MEMORY",
            text: "Preserve moments and create memories for the future.",
            letter: "M"
        },
        {
            name: "Taskly",
            type: "PRODUCTIVITY",
            text: "Organize your work and keep your goals moving.",
            letter: "T"
        },
        {
            name: "Skilla",
            type: "LEARNING",
            text: "Build skills with intelligent learning experiences.",
            letter: "S"
        },
        {
            name: "Instax",
            type: "SOCIAL",
            text: "Share moments and connect with people.",
            letter: "I"
        }
    ];

    return (
        <main className="home">

            <section className="homeHero">

                <div className="homeHeroContent">

                    <span className="homeEyebrow">
                        INSTeP / IDENTITY PLATFORM
                    </span>

                    <h1>
                        One account.
                        <br />
                        <em>Every project.</em>
                    </h1>

                    <p>
                        Instep is the identity layer connecting your
                        applications through one secure account.
                    </p>

                    <div className="homeHeroButtons">

                        {!localStorage.getItem("accessToken") && (
                            <>
                                <Link
                                    to="/login"
                                    className="homePrimaryBtn"
                                >
                                    Login
                                    <FiArrowUpRight />
                                </Link>

                                <Link
                                    to="/register"
                                    className="homeSecondaryBtn"
                                >
                                    Create your account
                                </Link>
                            </>
                        )}

                        {localStorage.getItem("accessToken") && (
                            <>
                                <Link
                                    to="/profile"
                                    className="homePrimaryBtn"
                                >
                                    My Profile
                                    <FiArrowUpRight />
                                </Link>

                                <Link
                                    to="/people"
                                    className="homeSecondaryBtn"
                                >
                                    Explore People
                                </Link>
                            </>
                        )}

                    </div>

                    <div className="homeHeroNote">
                        <FiShield />
                        <span>
                            One identity · Multiple applications · One place
                        </span>
                    </div>

                </div>

                {/* <div className="homeHeroVisual">

                    <div className="heroWindow">

                        <div className="windowTop">
                            <span>INSTeP</span>

                            <div>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                        </div>

                        <div className="windowBody">

                            <span className="windowLabel">
                                YOUR IDENTITY
                            </span>

                            <div className="windowIdentity">

                                <div className="windowAvatar">
                                    I
                                </div>

                                <div>
                                    <strong>Instep Account</strong>
                                    <span>One identity, everywhere.</span>
                                </div>

                            </div>

                            <div className="windowLine"></div>

                            <div className="windowApps">

                                <div>
                                    <b>M</b>
                                    <span>Merkit</span>
                                </div>

                                <div>
                                    <b>T</b>
                                    <span>Taskly</span>
                                </div>

                                <div>
                                    <b>S</b>
                                    <span>Skilla</span>
                                </div>

                                <div>
                                    <b>I</b>
                                    <span>Instax</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div> */}

            </section>

            {/* <section className="homeApps">

                <div className="homeSectionHeading">

                    <div>
                        <span>THE ECOSYSTEM</span>

                        <h2>
                            Built to
                            <em> connect.</em>
                        </h2>
                    </div>

                    <p>
                        One Instep account can become the entry point
                        to everything you build.
                    </p>

                </div>

                <div className="homeAppGrid">

                    {apps.map((app, index) => (
                        <div
                            className="homeApp"
                            key={app.name}
                        >

                            <div className="homeAppTop">

                                <span>
                                    0{index + 1}
                                </span>

                                <FiArrowUpRight />

                            </div>

                            <div className="homeAppLetter">
                                {app.letter}
                            </div>

                            <div className="homeAppContent">

                                <span>
                                    {app.type}
                                </span>

                                <h3>
                                    {app.name}
                                </h3>

                                <p>
                                    {app.text}
                                </p>

                            </div>

                            <div className="homeAppBottom">
                                CONNECTED TO INSTEP
                            </div>

                        </div>
                    ))}

                </div>

            </section>

            <section className="homeFeatures">

                <div className="homeFeatureIntro">

                    <span>WHY INSTEP</span>

                    <h2>
                        Identity should
                        <br />
                        feel <em>simple.</em>
                    </h2>

                </div>

                <div className="homeFeatureList">

                    <div className="homeFeature">

                        <div className="homeFeatureIcon">
                            <FiKey />
                        </div>

                        <div>
                            <span>01 / SINGLE SIGN-ON</span>

                            <h3>
                                One account across your projects.
                            </h3>

                            <p>
                                Users create one Instep account instead
                                of maintaining separate credentials for
                                every connected application.
                            </p>
                        </div>

                    </div>

                    <div className="homeFeature">

                        <div className="homeFeatureIcon">
                            <FiShield />
                        </div>

                        <div>
                            <span>02 / CENTRAL IDENTITY</span>

                            <h3>
                                Your identity has one home.
                            </h3>

                            <p>
                                Profile and authentication information
                                can be managed centrally through Instep.
                            </p>
                        </div>

                    </div>

                    <div className="homeFeature">

                        <div className="homeFeatureIcon">
                            <FiLayers />
                        </div>

                        <div>
                            <span>03 / CONNECTED ECOSYSTEM</span>

                            <h3>
                                Your applications stay independent.
                            </h3>

                            <p>
                                Each project can have its own experience
                                while relying on the same authentication
                                platform.
                            </p>
                        </div>

                    </div>

                </div>

            </section> */}

            <section className="homeSecurity">

                <div className="securityVisual">

                    <div className="securityBox">

                        <div className="securityBoxTop">
                            <span>AUTHENTICATION</span>
                            <FiLock />
                        </div>

                        <div className="securityCheck">
                            <FiCheck />
                        </div>

                        <strong>
                            Identity verified
                        </strong>

                        <span>
                            Access granted through Instep
                        </span>

                    </div>

                </div>

                <div className="securityText">

                    <span>SECURITY FIRST</span>

                    <h2>
                        Your credentials.
                        <br />
                        <em>Our responsibility.</em>
                    </h2>

                    <p>
                        Authentication is kept centralized so your
                        connected applications can focus on what they
                        were built to do.
                    </p>

                    <div className="securityPoints">

                        <div>
                            <FiCheck />
                            Secure authentication
                        </div>

                        <div>
                            <FiCheck />
                            Token-based access
                        </div>

                        <div>
                            <FiCheck />
                            Centralized identity
                        </div>

                    </div>

                </div>

            </section>

            <section className="homeFlow">

                <div className="homeFlowHeading">

                    <span>HOW IT WORKS</span>

                    <h2>
                        Simple from
                        <br />
                        <em>the beginning.</em>
                    </h2>

                </div>

                <div className="flowSteps">

                    <div>
                        <span>01</span>
                        <strong>Create</strong>
                        <p>
                            Create your Instep account once.
                        </p>
                    </div>

                    <FiChevronRight />

                    <div>
                        <span>02</span>
                        <strong>Connect</strong>
                        <p>
                            Connect with supported applications.
                        </p>
                    </div>

                    <FiChevronRight />

                    <div>
                        <span>03</span>
                        <strong>Use</strong>
                        <p>
                            Move between your projects seamlessly.
                        </p>
                    </div>

                </div>

            </section>

        </main>
    );
}