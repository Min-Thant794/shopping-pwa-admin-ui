export const setItemToLocalStorage = (key, payload) => {
    return localStorage.setItem(key, JSON.stringify(payload))
}

export const getItemFromLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return JSON.parse(data)
}

export const removeItemFromLocalStorage = () => {
    return localStorage.clear();
}

export const resolveImageUrl = (url, baseUrl) => {
    if (!url) return "";
    if (/^(https?:)?\/\//i.test(url) || url.startsWith("data:") || url.startsWith("blob:")) {
        return url;
    }
    const base = baseUrl || "";
    if (!base) return url;
    return `${base.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
}
