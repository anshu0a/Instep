import "./star.css"
import { useEffect } from "react";

export default function Star({ count = 100 }) {

        useEffect(() => {
            const container = document.querySelector(".dotBackground");
            if (!container) return;
            const dots = [];
    
            for (let i = 0; i < count; i++) {
                const dot = document.createElement("span");
    
                dot.className = "dot";
    
                dot.style.left = `${Math.random() * count}%`;
                dot.style.top = `${Math.random() * count}%`;
    
                const size = 1 + Math.random() * 3;
    
                dot.style.width = `${size}px`;
                dot.style.height = `${size}px`;
    
                dot.style.opacity = `${0.3 + Math.random() * 0.4}`;
    
                dot.style.animationDelay = `${Math.random() * 8}s`;
                dot.style.animationDuration = `${6 + Math.random() * 9}s`;
    
                dots.push(dot);
                container.appendChild(dot);
            }
    
            const interval = setInterval(() => {
                const randomDot =
                    dots[Math.floor(Math.random() * dots.length)];
    
                randomDot.classList.add("activeDot");
    
                setTimeout(() => {
                    randomDot.classList.remove("activeDot");
                }, 1000);
            }, 550);
    
            return () => {
                clearInterval(interval);
                dots.forEach(dot => dot.remove());
            };
        }, []);

    return (
        <>
            <div className="dotBackground"></div>
            <div className="ambientLight lightOne"></div>
            <div className="ambientLight lightTwo"></div>
        </>
    )
}