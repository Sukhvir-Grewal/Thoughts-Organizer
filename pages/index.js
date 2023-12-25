import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import AddThoughScreen from "@/components/AddThoughScreen";
import Swipeable from "@/components/useSwipeHandlers ";

export default function Home() {
    const [showAddThoughScreen, setShowAddThoughScreen] = useState(false);
    const [showColorSelector, setShowColorSelector] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeColorIndex, setActiveColorIndex] = useState(null);
    const [thoughts, setThoughts] = useState([]);
    const [animationState, setAnimationState] = useState({});
    const [currentIndex, setCurrentIndex] = useState(-1);

    const colors = [
        { name: "urgent", color: "red" },
        { name: "important", color: "orange" },
        { name: "moderate", color: "lightBlue" },
        { name: "fine", color: "lightGreen" },
        { name: "minor", color: "green" },
    ];

    const colorPriority = {
        red: 1,
        orange: 2,
        lightBlue: 3,
        lightGreen: 4,
        green: 5,
        black: 6,
    };

    const colorSelectorContainerRef = useRef(null);

    useEffect(() => {
        if (colorSelectorContainerRef.current) {
            colorSelectorContainerRef.current.classList.add("pop");
            setTimeout(() => {
                colorSelectorContainerRef.current.classList.remove("pop");
            }, 300);
        }
    }, [showColorSelector]);

    // useEffect(() => {
    //     sortThoughts();
    // }, []);

    useEffect(() => {
        // Clean up the animation state after the fade-in completes
        const timer = setTimeout(() => {
            setAnimationState({});
        }, 600); // Set timeout to match your fade-in animation duration

        return () => clearTimeout(timer);
    }, [animationState]);

    const renderThoughts = () => {
        return (
            <div className="thoughts-list">
                {thoughts.map((data, index) => (
                    <div
                        key={data.id}
                        className={`${styles.mainThoughtContainer} ${
                            animationState[data.id] || ""
                        }`}
                    >
                        <div
                            onClick={() => {
                                setCurrentIndex(index);
                                setShowColorSelector(true);
                                setActiveColorIndex(index);
                            }}
                            className={styles.colorContainer}
                            style={{
                                zIndex: activeColorIndex === index ? 6 : 4,
                            }}
                        >
                            {/* Color logo */}
                            <i
                                style={{ color: data.color }}
                                className="fa-solid fa-o fa-2x"
                            ></i>
                        </div>
                        <div className={styles.thoughtContainer}>
                            <div
                                onClick={() => {
                                    handleDeleteThought(index);
                                }}
                                className={styles.deleteThough}
                            >
                                {/* Delete logo */}
                                <i className="fa-solid fa-trash"></i>
                            </div>

                            <Swipeable index={index} data={data} />

                            <div
                                onClick={() => {
                                    setIsEditing(true);
                                    setCurrentIndex(index);
                                    setShowAddThoughScreen(true);
                                    resetSwipeablePosition();
                                }}
                                className={styles.editThough}
                            >
                                {/* Edit logo */}
                                <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const handleDeleteThought = (index) => {
        const swipeableElements = document.querySelectorAll(
            `.${styles.swipeable}`
        );
        const mainThoughtContainer = document.querySelectorAll(
            `.${styles.mainThoughtContainer}`
        );
        if (swipeableElements[index]) {
            swipeableElements[index].style.transform = "";
        }
        if (mainThoughtContainer[index]) {
            mainThoughtContainer[index].classList.add("deleteAnimation");
        }

        const updatedThoughts = thoughts.filter((_, i) => i !== index);
        setTimeout(() => {
            mainThoughtContainer[index].classList.remove("deleteAnimation");
            setThoughts(updatedThoughts);
        }, 500);
    };

    const renderColorOptions = () => {
        return (
            <>
                {resetSwipeablePosition()}
                <div
                    className="backgroundBlur"
                    onClick={() => {
                        if (colorSelectorContainerRef.current) {
                            colorSelectorContainerRef.current.classList.add(
                                "popOut"
                            );
                        }
                        setTimeout(() => {
                            if (colorSelectorContainerRef.current)
                                colorSelectorContainerRef.current.classList.remove(
                                    "popOut"
                                );
                            setActiveColorIndex(null);
                            setShowColorSelector(false);
                        }, 200);
                    }}
                >
                    <div
                        ref={colorSelectorContainerRef}
                        className={styles.colorSelectorContainer}
                    >
                        {colors.map((color, i) => (
                            <div
                                onClick={() => {
                                    resetSwipeablePosition();
                                    handleColorChange(color);
                                    if (colorSelectorContainerRef.current) {
                                        colorSelectorContainerRef.current.classList.add(
                                            "popOut"
                                        );
                                    }
                                    setTimeout(() => {
                                        colorSelectorContainerRef.current.classList.remove(
                                            "popOut"
                                        );
                                        setActiveColorIndex(null);
                                        setShowColorSelector(false);
                                    }, 200);
                                }}
                                className={styles.colorSelector}
                            >
                                <i
                                    style={{ color: color.color }}
                                    className="fa-solid fa-o fa-2x"
                                ></i>
                                <span style={{ marginLeft: "10px" }}>
                                    {color.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    const resetSwipeablePosition = () => {
        const swipeableElements = document.querySelectorAll(
            `.${styles.swipeable}`
        );
        swipeableElements.forEach((element) => {
            element.style.transform = "";
        });
    };

    // const sortThoughts = () => {
    //     // Trigger fade-out animation
    //     setAnimationState(
    //         thoughts.reduce((acc, thought, index) => {
    //             acc[thought.id] = "fadeOut";
    //             return acc;
    //         }, {})
    //     );

    //     // Sort thoughts
    //     const sortedThoughts = [...thoughts].sort((a, b) => {
    //         return colorPriority[a.color] - colorPriority[b.color];
    //     });

    //     // Trigger fade-in animation after sorting
    //     setTimeout(() => {
    //         setAnimationState(
    //             sortedThoughts.reduce((acc, thought) => {
    //                 acc[thought.id] = "fadeIn";
    //                 return acc;
    //             }, {})
    //         );
    //     }, 300); // Set timeout to match your fade-out animation duration

    //     setThoughts(sortedThoughts);
    // };

    const handleColorChange = (color) => {
        setThoughts((currentThoughts) => {
            const updatedThoughts = currentThoughts.map((thought, index) =>
                index === currentIndex
                    ? { ...thought, color: color.color }
                    : thought
            );

            shiftThought();

            return updatedThoughts;
        });

        setActiveColorIndex(currentIndex);
    };

    function shiftThought() {
        var prev = currentIndex - 1;
        if (prev >= 0 && prev < currentIndex) {
        }
    }

    // return [...updatedThoughts].sort((a, b) => {
    //     return colorPriority[a.color] - colorPriority[b.color];
    // });

    // const handleColorChange = (color) => {
    //     setThoughts((currentThoughts) => {
    //         const updatedThoughts = currentThoughts.map((thought, index) =>
    //             index === currentIndex
    //                 ? { ...thought, color: color.color }
    //                 : thought
    //         );

    //         // Identify thoughts that have changed positions
    //         const changedIndices = updatedThoughts.reduce((acc, thought, index) => {
    //             if (thought !== currentThoughts[index]) {
    //                 acc.push(index);
    //             }
    //             return acc;
    //         }, []);

    //         // Trigger fade-out animation for changed thoughts
    //         setAnimationState(
    //             changedIndices.reduce((acc, index) => {
    //                 acc[currentThoughts[index].id] = "fadeOut";
    //                 return acc;
    //             }, {})
    //         );

    //         // Sort thoughts
    //         const sortedThoughts = [...updatedThoughts].sort((a, b) => {
    //             return colorPriority[a.color] - colorPriority[b.color];
    //         });

    //         // Trigger fade-in animation for changed thoughts after sorting
    //         setTimeout(() => {
    //             setAnimationState(
    //                 changedIndices.reduce((acc, index) => {
    //                     acc[sortedThoughts[index].id] = "fadeIn";
    //                     return acc;
    //                 }, {})
    //             );
    //         }, 300); // Set timeout to match your fade-out animation duration

    //         setActiveColorIndex(currentIndex);

    //         return sortedThoughts;
    //     });
    // };

    return (
        <>
            <div className={styles.mainContainer}>
                {/* This is to display the priority selector */}
                {showColorSelector && renderColorOptions()}

                {/* This is to add new though */}
                {showAddThoughScreen && (
                    <AddThoughScreen
                        setShowAddThoughScreen={setShowAddThoughScreen}
                        setThoughts={setThoughts}
                        currentIndex={currentIndex}
                        currentTitle={thoughts[currentIndex]?.title}
                        currentDescription={thoughts[currentIndex]?.description}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                )}
                <div className={styles.topTextContainer}>
                    <span>Let's Organize It</span>
                </div>

                {renderThoughts()}

                <div
                    style={{ cursor: "pointer" }}
                    className={styles.addThoughContainer}
                    onClick={() => {
                        resetSwipeablePosition();
                        setShowAddThoughScreen(true);
                    }}
                >
                    <i className="fa-solid fa-plus fa-lg"></i>
                </div>
            </div>
        </>
    );
}
