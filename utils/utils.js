// Utility function to create response object with status code and body
const createResponse = (body, status, headers = {}) => {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json",
            ...headers
        }
    });
};

// Utility function to handle errors and create error response
const handleErrorResponse = (error) => {
    let status = 500;
    let errorMessage = "Internal Server Error";

    if (error) {
        // Handle specific error type
        status = 400;
        errorMessage = error.message;
    }

    const errorBody = { error: errorMessage };
    return createResponse(errorBody, status);
};

export { createResponse, handleErrorResponse };