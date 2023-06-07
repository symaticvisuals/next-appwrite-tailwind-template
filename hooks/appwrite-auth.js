import { useState, useEffect } from "react";
import axios from "axios";
import useAppwrite from "@utils/appwrite";


export const useAppwriteApi = () => {
    const { account } = useAppwrite();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        checkSession();
    }, []);
    const checkSession = async () => {
        try {
            // Get user from session
            const user = await account.get();
            if (user) {
                // Get sessions from user
                const sessions = await account.listSessions();
                if (sessions.sessions.length > 0) {
                    // Check if user is logged in with Google
                    if (Object.keys(user.prefs).length === 0) {
                        const access_token = sessions.sessions[0].providerAccessToken;
                        // Get Google profile
                        let response = await getGoogleProfile(access_token);
                        setProfile(response.prefs.picture);
                        setIsUserLoggedIn(true)
                        let data = {
                            ...user,
                            picture: profile
                        }
                        console.log("Creating user with data:", data);
                        // Create user in database
                        let createUser = await axios({
                            method: "post",
                            url: "/api/user",
                            data
                        })
                        console.log("User created:", createUser);
                    }
                    else {
                        setProfile(user.prefs.picture);
                    }
                }
                setIsUserLoggedIn(true)
            } else {
                console.log("User is not logged in");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getGoogleProfile = async (access_token) => {
        try {
            // Fetch Google profile with access token
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
            );
            // Update the user's profile image
            if (response.status === 200) {
                const updateUserPreferences = await account.updatePrefs({
                    ...response.data,
                });
                console.log(updateUserPreferences);
                setProfile(response.data.picture);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const createAccountUsingGoogle = async (e) => {
        try {
            // Prevent form submission
            e.preventDefault();

            const redirectURL = `http://localhost:3000`;

            const promise = await account.createOAuth2Session("google", redirectURL);
            const session = await promise.json();

            if (!promise.ok) {
                throw new Error(session.error_description);
            }

            // After creating the session, store the user data in local storage or perform other actions
        } catch (err) {
            console.log(err);
        }
    };

   const logoutSession = async (e) => {
        try {
            // Prevent form submission
            e.preventDefault();
            if (account) {
                const sessions = await account.listSessions();
                const session = sessions.sessions[0].$id;
                await account.deleteSession(session);
            }
            setIsUserLoggedIn(false);
            setProfile(null);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        isUserLoggedIn,
        profile,
        createAccountUsingGoogle,
        logoutSession,
    };
};
