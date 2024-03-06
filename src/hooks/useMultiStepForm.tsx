import { useState } from "react";

const useMultiStepForm = (steps = []) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const next = () => {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    };

    const previous = () => {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    };

    const goTo = (index) => {
        setCurrentStepIndex(index);
    };

    return {
        currentStepIndex,
        goTo,
        next,
        previous,
        steps,
        step: steps[currentStepIndex],
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
    };
};

export default useMultiStepForm;
