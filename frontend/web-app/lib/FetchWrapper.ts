import { auth } from "@/auth";

const baseUrl = 'http://localhost:6001/';


function isFormDataBody(body: any): boolean {
    if (!body) return false;

    if (body instanceof FormData) return true;

    return Object.values(body).some((v) => {
        if (typeof File !== "undefined" && v instanceof File) return true;
        if (typeof FileList !== "undefined" && v instanceof FileList && v.length > 0)
            return true;
        return false;
    });
}

/**
 * Builds request headers dynamically
 */
async function getHeaders(isFormData = false): Promise<Headers> {
    const session = await auth();
    const headers = new Headers();

    if (!isFormData) {
        headers.set("Content-Type", "application/json");
    }

    if (session) {
        headers.set("Authorization", "Bearer " + session.accessToken);
    }

    return headers;
}


/**
 * Unified response handler
 */
async function handleResponse(response: Response) {
  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (response.ok) return data || response.statusText;

  return {
    error: {
      status: response.status,
      message: typeof data === "string" ? data : response.statusText,
    },
  };
}


/**
 * Generic reusable request function
 */
async function request(method: string, url: string, body?: any) {
  const hasFile = isFormDataBody(body);
  const headers = await getHeaders(hasFile);

  let options: RequestInit = { method, headers };

  if (body !== undefined && body !== null) {
    if (hasFile) {
      const formData = new FormData();

      for (const key in body) {
        const value = body[key];
        if (typeof File !== "undefined" && value instanceof File) {
          formData.append(key, value);
        } else if (typeof FileList !== "undefined" && value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }

      options.body = formData;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  const response = await fetch(baseUrl + url, options);
  return handleResponse(response);
}

/**
 * Public API methods
 */
export const FetchWrapper = {
  get: (url: string) => request("GET", url),
  post: (url: string, body?: any) => request("POST", url, body),
  put: (url: string, body?: any) => request("PUT", url, body),
  del: (url: string) => request("DELETE", url),
};


