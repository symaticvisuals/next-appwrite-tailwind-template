
import React from "react";
import { Account, Avatars, Client, Databases } from "appwrite";

const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const ENDPOINT = process.env.APPWRITE_ENDPOINT_URL;

// Create a client that connects to our Appwrite instance
const useAppwrite = () => {
    return React.useMemo(() => {
        const client = new Client();
        client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

        return {
            client,
            account: new Account(client),
            database: new Databases(client),
            avatars: new Avatars(client),
        };
    }, []);
};

export default useAppwrite;
