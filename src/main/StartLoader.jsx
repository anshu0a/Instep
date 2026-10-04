import { useEffect, useState } from "react";
import "./startLoader.css";

export default function StartLoader() {

    const [show, setShow] = useState(() => {
        return !sessionStorage.getItem("instepStarted");
    });

    useEffect(() => {

        if (!show) {
            return;
        }

        sessionStorage.setItem("instepStarted", "true");

        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => clearTimeout(timer);

    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <div className="start">

            <div className="startAurora">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="startLogo">
                <img
                    src="/svg/logo/l1.svg"
                    alt="Instep"
                />
            </div>

        </div>
    );
}