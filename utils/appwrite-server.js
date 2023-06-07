// This code creates a client for the Appwrite API, which will be used to access the API.

const sdk = require("node-appwrite");

const client = new sdk.Client();

const ENDPOINT = process.env.APPWRITE_ENDPOINT_URL;
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const SECRET_KEY = process.env.APPWRITE_SECRET_KEY;

client
    .setEndpoint(ENDPOINT) // Your API Endpoint
    .setProject(PROJECT_ID) // Your project ID
    .setKey(
        SECRET_KEY
    ) // Your secret API key
    .setSelfSigned(); // Enable this if you're using a self-signed certificate for local development

module.exports = client;
