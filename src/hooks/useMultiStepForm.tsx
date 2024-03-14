import { ReactNode, useState } from "react";

interface StepsType {
    form: ReactNode;
    title: string;

}

interface MultiStepFormType {
    currentStepIndex: number,
    goTo: (index: number) => void,
    next: () => void,
    previous: () => void,
    steps: StepsType[],
    step: StepsType,
    isFirstStep: boolean,
    isLastStep: boolean,
}

const useMultiStepForm = (steps: StepsType[] = []): MultiStepFormType => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const next = () => {
        setCurrentStepIndex((currentIndex) => currentIndex >= steps.length - 1 ? currentIndex : currentIndex + 1);
    };

    const previous = () => {
        setCurrentStepIndex((currentIndex) => currentIndex <= 0 ? currentIndex : currentIndex - 1);
    };

    const goTo = (index: number) => {
        setCurrentStepIndex(index);
    };

    const step = steps[currentStepIndex];

    return {
        currentStepIndex,
        goTo,
        next,
        previous,
        steps,
        step,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
    };
};

export default useMultiStepForm;
