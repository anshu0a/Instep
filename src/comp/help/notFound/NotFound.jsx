
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowLeft } from "react-icons/fi";
import "./notFound.css";

export default function NotFound() {
    return (
        <main className="notFoundPage">

            <div className="notFoundHeader">
                <span>INSTEP</span>
                <span>PAGE / UNKNOWN</span>
            </div>

            <div className="notFoundMain">

                <div className="notFoundSide">
                    <span className="notFoundSideLine"></span>
                    <span>YOU ARE HERE</span>
                </div>

                <section className="notFoundContent">

                    <div className="notFoundTitle">
                        <span className="titleSmall">THIS PAGE</span>

                        <h1>
                            went
                            <br />
                            <em>somewhere.</em>
                        </h1>
                    </div>

                    <div className="notFoundDescription">
                        <p>
                            The page you're looking for isn't available
                            at this address.
                        </p>

                        <div className="notFoundActions">

                            <Link to="/" className="notFoundPrimary">
                                <span>Go home</span>
                                <FiArrowUpRight />
                            </Link>

                            <button
                                type="button"
                                className="notFoundSecondary"
                                onClick={() => window.history.back()}
                            >
                                <FiArrowLeft />
                                <span>Previous page</span>
                            </button>

                        </div>
                    </div>

                </section>

                <div className="notFoundNumber">
                    <span>0</span>
                    <span>4</span>
                    <span>?</span>
                </div>

            </div>

            <div className="notFoundFooter">

                <div>
                    <span className="notFoundStatus"></span>
                    <span>NOTHING TO SEE HERE</span>
                </div>

                <span>KEEP EXPLORING</span>

                <span>© 2026</span>

            </div>

        </main>
    );
}

