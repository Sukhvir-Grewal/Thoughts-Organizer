import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function AddThoughScreen({
    setShowAddThoughScreen,
    setThoughts,
    currentIndex,
    currentTitle,
    currentDescription,
    isEditing,
    setIsEditing,
}) {
    const mainContainerRef = useRef(null);
    const descriptionRef = useRef(null);
    const textRef = useRef(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: isEditing ? currentTitle : "",
            description: isEditing ? currentDescription : "",
            color: "black",
        },
    });

    // I made it reusable for future additions in fields
    const InputField = ({ label, register, name, isTestArea = false }) => {
        return (
            <>
                <div className={`${name}Container`}>
                    <p style={{ color: "white" }}>{label}</p>
                    {isTestArea ? (
                        <textarea
                            ref={descriptionRef}
                            className="description"
                            type="text"
                            id={name}
                            {...register(name)}
                            placeholder="Now let's add some details"
                        />
                    ) : (
                        <input
                            ref={textRef}
                            className="text"
                            type="text"
                            id={name}
                            {...register(name)}
                            required
                            autoFocus
                            placeholder="Keep It Simple"
                        />
                    )}
                </div>
            </>
        );
    };

    const handleButtonClick = () => {
        mainContainerRef.current.classList.add("popOut");
        setTimeout(() => {
            mainContainerRef.current.classList.remove("popOut");
            setShowAddThoughScreen(false);
        }, 300);
        setIsEditing(false);
    };

    const submitForm = (data, e) => {
        const newData = { title: data.title, description: data.description };
        if (isEditing) {
            setThoughts((prevThoughts) =>
                prevThoughts.map((item, index) =>
                    index === currentIndex ? { ...item, ...newData } : item
                )
            );
        } else {
            setThoughts((prevThoughts) => [...prevThoughts, newData]);
        }
        handleButtonClick();
    };
    return (
        <>
            <div className="backgroundBlur">
                <form
                    ref={mainContainerRef}
                    className="mainAddContainer"
                    onSubmit={handleSubmit(submitForm)}
                >
                    <InputField
                        label="Title"
                        register={register}
                        name="title"
                    />
                    <InputField
                        label="Description"
                        register={register}
                        name="description"
                        isTestArea
                    />

                    <div className="controlContainer">
                        <Button
                            onClick={handleButtonClick}
                            className="btnMargin"
                            variant="danger"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="btnMargin"
                            variant="success"
                        >
                            {isEditing ? <p>Edit</p> : <p>Add</p>}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
