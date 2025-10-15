import { auth } from "@/auth";

const baseUrl = 'http://localhost:6001/';

async function handleFileInput(value: any): Promise<FormData> {
    if (value instanceof File) {
        const formData = new FormData();
        formData.append("file", value);
        return formData;
    } else if (value instanceof FileList && value.length > 0) {
        const formData = new FormData();
        formData.append("file", value[0]); // only first file
        return formData;
    }
    return new FormData();
}

async function get(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: await getHeaders()
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function put(url: string, body: unknown) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function post(url: string, body: any) {
    // ✅ Robust detection for File or FileList
    const hasFile = Object.values(body).some((v) => {
        if (typeof File !== "undefined" && v instanceof File) return true;
        if (typeof FileList !== "undefined" && v instanceof FileList && v.length > 0) return true;
        return false;
    });

    const headers = await getHeaders(hasFile);
    let requestOptions: RequestInit;

    if (hasFile) {
        // ✅ Build FormData manually
        const formData = new FormData();
        for (const key in body) {
            const value = body[key];

            if (typeof File !== "undefined" && value instanceof File) {
                formData.append(key, value);
            } else if (typeof FileList !== "undefined" && value instanceof FileList) {
                if (value.length > 0) formData.append(key, value[0]); // only first file
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        }

        requestOptions = {
            method: "POST",
            headers, // ⚠️ DO NOT set Content-Type manually
            body: formData,
        };
    } else {
        requestOptions = {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        };
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}






async function del(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    };
    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

async function handleResponse(response: Response) {
    const text = await response.text();
    let data;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (response.ok) {
        return data || response.statusText;
    } else {
        const error = {
            status: response.status,
            message: typeof data === 'string' ? data : response.statusText
        }
        return { error }
    }
}


async function getHeaders(isFormData = false): Promise<Headers> {
    const session = await auth();
    const headers = new Headers();

    // ✅ only for JSON
    if (!isFormData) {
        headers.set("Content-Type", "application/json");
    }

    if (session) {
        headers.set("Authorization", "Bearer " + session.accessToken);
    }

    return headers;
}




export const FetchWrapper = {
    get,
    put,
    post,
    del
};