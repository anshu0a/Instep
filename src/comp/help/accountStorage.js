const ACCOUNTS_KEY = "instepAccounts";

export function getSavedAccounts() {
    try {
        return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
    } catch {
        return [];
    }
}

export function saveAccount(user, auth = {}) {
    if (!user?.username) return;

    const accounts = getSavedAccounts();

    const account = {
        id: user.id,
        username: user.username,
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || user.profilePic || null,
        profilePic: user.profilePic || null,
        profilePicType: user.profilePicType || null,
        accessToken: auth.accessToken || localStorage.getItem("accessToken") || "",
        refreshToken: auth.refreshToken || localStorage.getItem("refreshToken") || "",
        tokenType: auth.tokenType || localStorage.getItem("tokenType") || "",
        expiresIn: auth.expiresIn || localStorage.getItem("expiresIn") || ""
    };

    const index = accounts.findIndex(
        item => item.username?.toLowerCase() === user.username?.toLowerCase()
    );

    if (index >= 0) {
        accounts[index] = {
            ...accounts[index],
            ...account
        };
    } else {
        accounts.push(account);
    }

    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function removeSavedAccount(username) {
    const accounts = getSavedAccounts().filter(
        item => item.username?.toLowerCase() !== username?.toLowerCase()
    );

    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function clearCurrentLogin() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("user");
}

export function restoreAccount(account) {
    localStorage.setItem("accessToken", account.accessToken || "");
    localStorage.setItem("refreshToken", account.refreshToken || "");
    localStorage.setItem("tokenType", account.tokenType || "");
    localStorage.setItem("expiresIn", account.expiresIn || "");
    localStorage.setItem(
        "user",
        JSON.stringify({
            id: account.id,
            username: account.username,
            name: account.name,
            email: account.email,
            photo: account.photo,
            profilePic: account.profilePic,
            profilePicType: account.profilePicType
        })
    );
}