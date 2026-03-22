const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const apiKey = process.env.API_KEY;
    const apiBaseUrl = "https://api.poiskkino.dev";

    if (!apiKey) {
      console.error("Нет ключа API");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Ошибка сервера" }),
      };
    }

    const { path: _, ...queryParams } = event.queryStringParameters || {};

    const endpoint = event.queryStringParameters?.path || "/v1.5/movie";

    const url = `${apiBaseUrl}${endpoint}`;

    console.log(`Proxying to: ${url}`);
    console.log("Query params:", queryParams);

    const response = await axios({
      method: "GET",
      url: url,
      params: queryParams,
      headers: {
        accept: "application/json, text/plain, */*",
        "x-api-key": apiKey,
      },
      timeout: 30000,
    });

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Proxy Error:", error.message);

    if (error.response) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          error: error.response.data || "API request failed",
        }),
      };
    } else if (error.request) {
      return {
        statusCode: 504,
        body: JSON.stringify({
          error: "No response from API server",
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Internal server error",
        }),
      };
    }
  }
};
