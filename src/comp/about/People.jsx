
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiSearch,
    FiUserPlus,
    FiArrowRight
} from "react-icons/fi";
import { request } from "../help/api";
import "./people.css";

export default function People() {

    const [search, setSearch] = useState("");
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    const loadRandomPeople = async () => {

        try {

            setLoading(true);

            const response = await request("/user/random?limit=8");

            if (!response.ok) {
                setPeople([]);
                return;
            }

            const data = await response.json();

            setPeople(Array.isArray(data) ? data.slice(0, 8) : []);

        } catch {
            setPeople([]);
        } finally {
            setLoading(false);
        }
    };

    const searchPeople = async value => {

        try {

            setSearching(true);

            const response = await request(
                `/user/search?query=${encodeURIComponent(value)}&limit=6`
            );

            if (!response.ok) {
                setPeople([]);
                return;
            }

            const data = await response.json();

            setPeople(Array.isArray(data) ? data.slice(0, 6) : []);

        } catch {
            setPeople([]);
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        loadRandomPeople();
    }, []);

    useEffect(() => {

        const value = search.trim();

        if (!value) {
            loadRandomPeople();
            return;
        }

        const timer = setTimeout(() => {
            searchPeople(value);
        }, 350);

        return () => clearTimeout(timer);

    }, [search]);

    const clearSearch = () => {
        setSearch("");
    };

    const getProfileImage = person => {

        if (person.profilePic) {

            if (
                typeof person.profilePic === "string" &&
                person.profilePic.startsWith("data:")
            ) {
                return person.profilePic;
            }

            return `data:${person.profilePicType || "image/jpeg"};base64,${person.profilePic}`;
        }

        if (person.image) {
            return person.image;
        }

        return null;
    };

    const getAvatarLetter = person => {

        return (
            String(person.username || "U")
                .trim()
                .charAt(0)
                .toUpperCase() || "U"
        );

    };

    return (
        <main className="peoplePage">

            <section className="peopleTop">

                <div className="peopleIntro">

                    <div className="peopleLabel">
                        <span></span>
                        PEOPLE
                    </div>

                    <h1>
                        Find your
                        <em> people.</em>
                    </h1>

                    <p>
                        Discover people and connect with the Instep community.
                    </p>

                </div>

                <div className="peopleSearchArea">

                    <div className="peopleSearch">

                        <FiSearch />

                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name or username . . ."
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                aria-label="Clear search"
                            >
                                ×
                            </button>
                        )}

                    </div>

                    <div className="peopleSearchMeta">

                        <span>
                            {search.trim() ? "SEARCHING COMMUNITY" : "PEOPLE"}
                        </span>

                        <strong>
                            {searching ? "..." : people.length}
                        </strong>

                    </div>

                </div>

            </section>

            <section className="peopleSection">

                <div className="peopleSectionTop">

                    <div>

                        <span>
                            {search.trim() ? "MATCHES" : "DISCOVER"}
                        </span>

                        <h2>
                            {search.trim() ? (
                                <>
                                    People matching <em>"{search}"</em>
                                </>
                            ) : (
                                <>
                                    People you <em>may know.</em>
                                </>
                            )}
                        </h2>

                    </div>

                </div>

                {loading ? (

                    <div className="peopleEmpty">

                        <div>
                            <FiSearch />
                        </div>

                        <h3>Finding people</h3>

                        <p>
                            Loading people from the community...
                        </p>

                    </div>

                ) : people.length > 0 ? (

                    <div className="peopleGrid">

                        {people.map(person => {

                            const profileImage = getProfileImage(person);
                            const avatarLetter = getAvatarLetter(person);

                            return (
                                <article
                                    className="personCard"
                                    key={person.id}
                                >

                                    <div className="personCardTop">

                                        <Link
                                            to={`/profile/${person.username}`}
                                            className="personImageWrap"
                                        >

                                            {profileImage ? (

                                                <img
                                                    src={profileImage}
                                                    alt={person.name || person.username}
                                                    className="personImage"
                                                    onError={e => {
                                                        e.currentTarget.style.display = "none";

                                                        const fallback =
                                                            e.currentTarget.parentElement.querySelector(
                                                                ".personImageFallback"
                                                            );

                                                        if (fallback) {
                                                            fallback.style.display = "flex";
                                                        }
                                                    }}
                                                />

                                            ) : null}

                                            <span
                                                className="personImageFallback"
                                                style={{
                                                    display: profileImage ? "none" : "flex"
                                                }}
                                            >
                                                {avatarLetter}
                                            </span>

                                            <span className="personOnline"></span>

                                        </Link>

                                    </div>

                                    <div className="personInfo">

                                        <div className="personIdentity">

                                            <div>

                                                <h3>
                                                    {person.name || "Instep User"}
                                                </h3>

                                                <span className="personUsername">
                                                    @{person.username}
                                                </span>

                                            </div>

                                            <button
                                                type="button"
                                                className="personFollow clk"
                                                aria-label={`Follow ${person.name || person.username}`}
                                            >
                                                <FiUserPlus />
                                            </button>

                                        </div>

                                        <p>
                                            {person.bio || "No bio available."}
                                        </p>

                                        <Link
                                            to={`/profile/${person.username}`}
                                            className="personProfile"
                                        >
                                            View profile
                                            <FiArrowRight />
                                        </Link>

                                    </div>

                                </article>
                            );

                        })}

                    </div>

                ) : (

                    <div className="peopleEmpty">

                        <div>
                            <FiSearch />
                        </div>

                        <h3>No people found</h3>

                        <p>
                            Try searching with another name or username.
                        </p>

                        <button
                            type="button"
                            onClick={clearSearch}
                        >
                            Show everyone
                        </button>

                    </div>

                )}

            </section>

            {!search.trim() && (

                <section className="peopleBottom">

                    <span>CONNECT WITH PEOPLE</span>

                    <h2>
                        Every profile
                        <br />
                        has a <em>story.</em>
                    </h2>

                    <p>
                        Explore different people, discover new perspectives,
                        and make your own journey part of the Instep community.
                    </p>

                </section>

            )}

        </main>
    );
}


