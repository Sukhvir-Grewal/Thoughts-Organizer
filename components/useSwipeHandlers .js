import React from "react";
import styles from "@/styles/Home.module.css"; // Adjust the import path as necessary

const Swipeable = ({ index, data, handleDeleteThought }) => {
    const createSwipeHandlers = (index) => {
        let startX, currentX;
        let isDragging = false;
        const maxSwipeDistance = 100;

        const startHandler = (e) => {
            startX = e.touches ? e.touches[0].clientX : e.clientX;
            isDragging = true;
        };

        const moveHandler = (e) => {
            if (!isDragging) return;
            currentX = e.touches ? e.touches[0].clientX : e.clientX;
            let deltaX = currentX - startX;

            if (deltaX > maxSwipeDistance) deltaX = maxSwipeDistance;
            else if (deltaX < -maxSwipeDistance) deltaX = -maxSwipeDistance;

            e.target.style.transform = `translateX(${deltaX}px)`;
        };

        const endHandler = (e) => {
            if (!isDragging) return;
            isDragging = false;

            if (Math.abs(currentX - startX) >= maxSwipeDistance) {
                let finalTransform =
                    currentX - startX > 0
                        ? `translateX(${maxSwipeDistance}px)`
                        : `translateX(${-maxSwipeDistance}px)`;
                e.target.style.transform = finalTransform;
            } else {
                e.target.style.transform = "";
            }
        };

        return {
            onMouseDown: startHandler,
            onMouseMove: moveHandler,
            onMouseUp: endHandler,
            onTouchStart: startHandler,
            onTouchMove: moveHandler,
            onTouchEnd: endHandler,
        };
    };

    const swipeHandlers = createSwipeHandlers(index);

    return (
        <div className={styles.swipeable} {...swipeHandlers}>
            <span>{data.title}</span>
        </div>
    );
};

export default Swipeable;