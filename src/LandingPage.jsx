import { useState } from "react";
const LandingPage = () => {
    const [formData, setFormData] = useState({
        total: "",
        conducted: "",
        attended: "",
        cutoff: "",
    });

    const [isCalculated, setIsCalculated] = useState(false);
    const [percentage, setPercentage] = useState(0.0);
    const [days, setDays] = useState(0);
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        setIsError(false)
        e.preventDefault();
        let total = parseInt(formData.total);
        let attended = parseInt(formData.attended);
        let conducted = parseInt(formData.conducted);
        let cutoff = parseInt(formData.cutoff);
        console.log(total + " " + attended + " " + conducted + " " + cutoff);

        if (
            isNaN(total) ||
            isNaN(conducted) ||
            isNaN(attended) ||
            isNaN(cutoff)
        ) {
            setIsError(true)
            setError("Enter valid number");
            return false;
        }
        if (conducted > total) {
            setIsError(true)
            setError("Conducted classes cannot exceed total classes");
            return false;
        }
        if (attended > conducted) {
            setIsError(true)
            setError("Attended classes cannot exceed conducted classes");
            return false;
        }
        if (cutoff >= 100) {
            setIsCalculated(true);
            setDays(0);
            return false;
        }

        let p = ((attended / conducted) * 100).toFixed(2);
        setPercentage(p);
        console.log("Percentage : " + p);

        let minRequired = (cutoff / 100) * total;
        let requiredClasses = minRequired - attended;
        let result = Math.ceil(requiredClasses);
        console.log("Need to attend : " + result);

        if (result <= 0) {
            setIsCalculated(true);
            setDays(0);
        } else {
            setIsCalculated(true);
            setDays(result);
        }
    };

    const resultHandler = () => {
        if (isCalculated && !isError) {
            return (
                <div className="max-w-sm lg:max-w-full lg:p-20 mx-auto flex flex-col lg:flex-row lg:gap-44 items-center my-20 p-10 space-y-10">
                    <div className="text-white bg-transparent max-w-md my-10 p-2 flex flex-col space-y-10">
                        <h1 className="text-6xl text-start">
                            Attendene Percentage Calculator
                        </h1>
                        <p className="w-full ">
                            Worried about attendance shortages? This attendance
                            percentage calculator helps you know exactly where
                            you stand. With quick inputs and instant results,
                            you can plan ahead, avoid last-minute surprises, and
                            stay on track with academic requirements.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-10 max-w-lg w-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] p-10 rounded-3xl">
                        <h1 className="lg:text-3xl text-2xl font-thin text-white">Percentage : {percentage}%</h1>
                        <h1 className="lg:text-3xl text-2xl font-thin text-white">Classes you must attend : {days}</h1>
                        <button className="bg-white text-xl font-semibold w-full p-2 rounded-bl-full hover:bg-black hover:text-white transition-all duration-200 hover:scale-105" onClick={() => setIsCalculated(false)}>Re-Calculate</button>
                    </div>
                    
                </div>
            )

        } 
        else if(isError) {
            return (
                <div className="grid md:grid-cols-3 items-start px-16 py-20">
                    <div className="text-white w-full max-w-xl mx-auto my-20 p-2 flex flex-col space-y-10">
                        <h1 className="text-6xl text-start">
                            Attendene Percentage Calculator
                        </h1>
                        <p className="w-full ">
                            Worried about attendance shortages? This attendance
                            percentage calculator helps you know exactly where
                            you stand. With quick inputs and instant results,
                            you can plan ahead, avoid last-minute surprises, and
                            stay on track with academic requirements.
                        </p>
                    </div>
                    <div className="w-full max-w-lg mx-auto flex justify-center text-white shadow-[0_16px_40px_rgba(0,0,0,0.65)] rounded-3xl col-span-2 mt-4 p-10">
                        <form
                            className="w-full max-w-sm flex flex-col space-y-8"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="">
                                    Total Number of Classes Scheduled
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 120"
                                    value={formData.total}
                                    onChange={handleChange}
                                    name="total"
                                />
                            </div>
                            <div>
                                <label htmlFor="">
                                    Number of classes conducted so far
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 85"
                                    value={formData.conducted}
                                    onChange={handleChange}
                                    name="conducted"
                                />
                            </div>
                            <div>
                                <label htmlFor="">
                                    Number of classes attended so far
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 72"
                                    value={formData.attended}
                                    onChange={handleChange}
                                    name="attended"
                                />
                            </div>
                            <div>
                                <label htmlFor="">
                                    Cut-off percentage (e.g. 75 (for 75%))
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 75"
                                    value={formData.cutoff}
                                    onChange={handleChange}
                                    name="cutoff"
                                />
                            </div>
                            <button className="bg-white p-2 text-black font-semibold text-xl shadow-2xl rounded-tl-full transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white">
                                Calculate
                            </button>
                            <h1 className="text-red-700 font-semibold text-center text-xl">Error: {error}</h1>
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="grid md:grid-cols-3 items-start px-16 py-20">
                    <div className="text-white w-full max-w-xl mx-auto my-20 p-2 flex flex-col space-y-10">
                        <h1 className="text-6xl text-start">
                            Attendene Percentage Calculator
                        </h1>
                        <p className="w-full ">
                            Worried about attendance shortages? This attendance
                            percentage calculator helps you know exactly where
                            you stand. With quick inputs and instant results,
                            you can plan ahead, avoid last-minute surprises, and
                            stay on track with academic requirements.
                        </p>
                    </div>
                    <div className="w-full max-w-lg mx-auto flex justify-center text-white shadow-[0_16px_40px_rgba(0,0,0,0.65)] rounded-3xl col-span-2 mt-4 p-10">
                        <form
                            className="w-full max-w-sm flex flex-col space-y-8"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="">
                                    Total Number of Classes Scheduled
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 120"
                                    value={formData.total}
                                    onChange={handleChange}
                                    name="total"
                                />
                            </div>
                            <div>
                                <label htmlFor="">
                                    Number of classes conducted so far
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 85"
                                    value={formData.conducted}
                                    onChange={handleChange}
                                    name="conducted"
                                />
                            </div>
                            <div>
                                <label htmlFor="">
                                    Number of classes attended so far
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 72"
                                    value={formData.attended}
                                    onChange={handleChange}
                                    name="attended"
                                />
                            </div>
                            <div>
                                <label htmlFor="">
                                    Cut-off percentage (e.g. 75 (for 75%))
                                </label>
                                <input
                                    className="w-full p-2 mt-2 rounded-r-full shadow-[0_16px_40px_rgba(0,0,0,0.65)] bg-transparent transition-all duration-200 hover:scale-105"
                                    type="text"
                                    placeholder="e.g. 75"
                                    value={formData.cutoff}
                                    onChange={handleChange}
                                    name="cutoff"
                                />
                            </div>
                            <button className="bg-white p-2 text-black font-semibold text-xl shadow-2xl rounded-tl-full transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white">
                                Calculate
                            </button>
                        </form>
                    </div>
                </div>
            );
        }
    };

    return <div>{resultHandler()}</div>;
};

export default LandingPage;
