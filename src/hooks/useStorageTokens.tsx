function useStorageTokens() {
    const localStorageToken = localStorage.getItem("authTokens");
    const sessionStorageToken = sessionStorage.getItem("authTokens");

    return [localStorageToken, sessionStorageToken];

}

export default useStorageTokens;