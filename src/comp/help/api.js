const server = import.meta.env.VITE_BACKEND;

export const request = async (url, options = {}, retry = true) => {

    let accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType") || "Bearer";

    const response = await fetch(`${server}${url}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(accessToken ? { Authorization: `${tokenType} ${accessToken}` } : {})
        }
    });

    if (response.status !== 401 || !retry) {
        return response;
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return response;
    }

    try {

        const tokenResponse = await fetch(`${server}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: refreshToken
        });

        if (!tokenResponse.ok) {
            localStorage.clear();
            window.location.href = "/login";
            return response;
        }

        const tokenData = await tokenResponse.json();

        if (!tokenData.accessToken) {
            localStorage.clear();
            window.location.href = "/login";
            return response;
        }

        localStorage.setItem("accessToken", tokenData.accessToken);

        if (tokenData.refreshToken) {
            localStorage.setItem("refreshToken", tokenData.refreshToken);
        }

        if (tokenData.tokenType) {
            localStorage.setItem("tokenType", tokenData.tokenType);
        }

        if (tokenData.expiresIn) {
            localStorage.setItem("expiresIn", tokenData.expiresIn);
        }

        return request(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `${tokenData.tokenType || "Bearer"} ${tokenData.accessToken}`
            }
        }, false);

    } catch {
        localStorage.clear();
        window.location.href = "/login";
        return response;
    }
};