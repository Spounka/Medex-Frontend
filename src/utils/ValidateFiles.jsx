export const validateFileExtensions = (files, allowedExtensions) => {
    const invalidFiles = files.filter((file) => {
        const fileExtension = getFileExtension(file.name);
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

const getFileExtension = (filename) => {
    return filename.split(".").pop().toLowerCase();
};
