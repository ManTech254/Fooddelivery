const adminApi = async (url, options = {}) => {
  let accessToken = localStorage.getItem("adminAccess");
  const refreshToken = localStorage.getItem("adminRefresh");

  const makeRequest = async (token) => {
    const headers = {
      ...(options.headers || {}),
    };

    // Only use JSON content type for normal JSON requests.
    // FormData must allow the browser to set multipart/form-data
    // with the correct boundary.
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let response = await makeRequest(accessToken);

  // Access token expired
  if (response.status === 401 && refreshToken) {
    try {
      const refreshResponse = await fetch(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        }
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();

        localStorage.setItem("adminAccess", refreshData.access);

        if (refreshData.refresh) {
          localStorage.setItem("adminRefresh", refreshData.refresh);
        }

        accessToken = refreshData.access;

        response = await makeRequest(accessToken);
      } else {
        localStorage.removeItem("adminAccess");
        localStorage.removeItem("adminRefresh");
        localStorage.removeItem("adminUser");

        window.location.href = "/admin-login";
      }
    } catch (error) {
      console.error("Token refresh error:", error);

      localStorage.removeItem("adminAccess");
      localStorage.removeItem("adminRefresh");
      localStorage.removeItem("adminUser");

      window.location.href = "/admin-login";
    }
  }

  return response;
};

export default adminApi;