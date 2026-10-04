

import "./info.css";

export default function Info({ typ }) {
    const data = {
        login: {
            top: "WELCOME BACK",
            title: <>Welcome<br /><em>back to Instep.</em></>,
            text: <>Your moments are waiting.<br />Sign in and continue your journey.</>,
            number: "01",
            meta: "YOUR JOURNEY"
        },
        register: {
            top: "WELCOME TO INSTEP",
            title: <>Start your<br /><em>Instep journey.</em></>,
            text: <>Create your space.<br />Share moments and make them yours.</>,
            number: "02",
            meta: "YOUR STORY"
        },
        forgot: {
            top: "ACCOUNT RECOVERY",
            title: <>Get back to<br /><em>your Instep.</em></>,
            text: <>Forgot your password?<br />We'll help you get back in.</>,
            number: "03",
            meta: "ACCOUNT RECOVERY"
        }
    }[typ];

    return (
        <section className="info">
            <div className="infoContent isFlex align-items-start">
                <div className="infoTop isFlex flex-row justify-content-start gap-2">
                    <span className="infoDot"></span>
                    <span>{data.top}</span>
                </div>
                <h1>{data.title}</h1>
                <p>{data.text}</p>
                <div className="infoMeta"><span>{data.number}</span><div></div><span>{data.meta}</span></div>
            </div>
            <div className="infoShape infoShapeOne"></div>
            <div className="infoShape infoShapeTwo"></div>
        </section>
    );
}