import React, { useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css"; // Adjust the import path as necessary

// Global variable to keep track of the currently active element
let activeElement = null;

const Swipeable = ({ index, data }) => {
    const elementRef = useRef(null);
    let startX, currentX;
    let isDragging = false;
    const maxSwipeDistance = 100;

    const resetOtherElements = () => {
        // Reset transform of all elements except the active one
        document.querySelectorAll(`.${styles.swipeable}`).forEach(el => {
            if (el !== activeElement) {
                el.style.transform = "";
            }
        });
    };

    const startHandler = (e) => {
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        isDragging = true;
        activeElement = elementRef.current;
        resetOtherElements();
    };

    const moveHandler = (e) => {
        if (!isDragging) return;
        currentX = e.touches ? e.touches[0].clientX : e.clientX;
        let deltaX = currentX - startX;

        if (deltaX > maxSwipeDistance) deltaX = maxSwipeDistance;
        else if (deltaX < -maxSwipeDistance) deltaX = -maxSwipeDistance;

        elementRef.current.style.transform = `translateX(${deltaX}px)`;
    };

    const endHandler = (e) => {
        if (!isDragging) return;
        isDragging = false;

        if (Math.abs(currentX - startX) >= maxSwipeDistance) {
            let finalTransform =
                currentX - startX > 0
                    ? `translateX(${maxSwipeDistance}px)`
                    : `translateX(${-maxSwipeDistance}px)`;
            elementRef.current.style.transform = finalTransform;
        } else {
            elementRef.current.style.transform = "";
        }
    };

    // Register global event listeners for mouseup and touchend
    useEffect(() => {
        const stopDragging = () => {
            if (isDragging) {
                isDragging = false;
                // Optional: reset transform here if needed
            }
        };

        window.addEventListener("mouseup", stopDragging);
        window.addEventListener("touchend", stopDragging);

        // Cleanup
        return () => {
            window.removeEventListener("mouseup", stopDragging);
            window.removeEventListener("touchend", stopDragging);
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={styles.swipeable}
            onMouseDown={startHandler}
            onMouseMove={moveHandler}
            onMouseUp={endHandler}
            onTouchStart={startHandler}
            onTouchMove={moveHandler}
            onTouchEnd={endHandler}
        >
            <div className={styles.textContent}>
                <span>{data.title}</span>
            </div>
        </div>
    );
};

export default Swipeable;
