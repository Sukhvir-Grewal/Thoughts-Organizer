import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import AddThoughScreen from "@/components/AddThoughScreen";
import Swipeable from "@/components/useSwipeHandlers ";

export default function Home() {
    const [showAddThoughScreen, setShowAddThoughScreen] = useState(false);
    const [showColorSelector, setShowColorSelector] = useState(false);
    const [thoughts, setThoughts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const colors = [
        { name: "urgent", color: "red" },
        { name: "important", color: "orange" },
        { name: "moderate", color: "lightBlue" },
        { name: "fine", color: "lightGreen" },
        { name: "minor", color: "green" },
    ];

    const colorSelectorContainerRef = useRef(null);

    useEffect(() => {
        if (colorSelectorContainerRef.current) {
            colorSelectorContainerRef.current.classList.add("pop");
            setTimeout(() => {
                colorSelectorContainerRef.current.classList.remove("pop");
            }, 300);
        }
    }, [showColorSelector]);

    const renderThoughts = () => {
        return thoughts.map((data, index) => (
            <div key={index} className={styles.mainThoughtContainer}>
                <div
                    onClick={() => {
                        setCurrentIndex(index);
                        setShowColorSelector(true);
                    }}
                    className={styles.colorContainer}
                >
                    {/* Color logo */}
                    <i
                        style={{ color: thoughts[index].color }}
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

                    <div onClick={() => {}} className={styles.editThough}>
                        {/* Edit logo */}
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
            </div>
        ));
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
            <div className="backgroundBlur">
                <div
                    ref={colorSelectorContainerRef}
                    className={styles.colorSelectorContainer}
                >
                    {colors.map((color, i) => (
                        <div
                            onClick={() => {
                                setThoughts((currentThoughts) =>
                                    currentThoughts.map((thought, index) =>
                                        index === currentIndex
                                            ? { ...thought, color: color.color }
                                            : thought
                                    )
                                );
                                if (colorSelectorContainerRef.current) {
                                    colorSelectorContainerRef.current.classList.add(
                                        "popOut"
                                    );
                                }
                                setTimeout(() => {
                                    colorSelectorContainerRef.current.classList.remove(
                                        "popOut"
                                    );
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
        );
    };

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
                    />
                )}
                <div className={styles.topTextContainer}>
                    <span>Let's Organize It</span>
                </div>

                {renderThoughts()}

                <div
                    style={{ cursor: "pointer" }}
                    className={styles.addThoughContainer}
                    onClick={() => setShowAddThoughScreen(true)}
                >
                    <i className="fa-solid fa-plus fa-lg"></i>
                </div>
            </div>
        </>
    );
}
