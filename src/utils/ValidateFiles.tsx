export const validateFileExtensions = (files: File[], allowedExtensions: string[]) => {
    const invalidFiles = files.filter((file) => {
        const fileExtension = getFileExtension(file.name);
        if (!fileExtension) {
            return false;
        }
        return !allowedExtensions.includes(fileExtension);
    });

    if (invalidFiles.length > 0) {
        return {
            isValid: false,
            invalidFiles,
        };
    } else {
        return {
            isValid: true,
            invalidFiles: [],
        };
    }
};

const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase();
};
