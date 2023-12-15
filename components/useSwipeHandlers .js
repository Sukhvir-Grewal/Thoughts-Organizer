import { useState } from 'react';

const useSwipeHandlers = () => {
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const maxSwipeDistance = 100;

    const startHandler = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setIsDragging(true);
    };

    const moveHandler = (e) => {
        if (!isDragging) return;
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        let deltaX = currentX - startX;

        if (deltaX > maxSwipeDistance) deltaX = maxSwipeDistance;
        else if (deltaX < -maxSwipeDistance) deltaX = -maxSwipeDistance;

        e.target.style.transform = `translateX(${deltaX}px)`;
    };

    const endHandler = (e) => {
        if (!isDragging) return;
        setIsDragging(false);
        const currentX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

        if (Math.abs(currentX - startX) >= maxSwipeDistance) {
            const finalTransform = currentX - startX > 0 ? `translateX(${maxSwipeDistance}px)` : `translateX(${-maxSwipeDistance}px)`;
            e.target.style.transform = finalTransform;
        } else {
            e.target.style.transform = '';
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

export default useSwipeHandlers;
