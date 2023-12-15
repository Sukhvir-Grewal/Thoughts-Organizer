import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function AddThoughScreen({
    setShowAddThoughScreen,
    setThoughts,
}) {
    const mainContainerRef = useRef(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            description: "",
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
                            className="description"
                            type="text"
                            id={name}
                            {...register(name)}
                        />
                    ) : (
                        <input
                            className="text"
                            type="text"
                            id={name}
                            {...register(name)}
                            required
                            autoFocus
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
    };

    const submitForm = (data, e) => {
        const newData = { title: data.title, description: data.description };
        setThoughts((prevThoughts) => [...prevThoughts, newData]);
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
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
