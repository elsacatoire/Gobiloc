'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import UserProfileCard from "./components/UserProfileCard";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import { UserType } from "../../types/UserType";
import { fetchCurrentUser } from "@/api/services/userService";
import { useAuth } from "../../utils/useAuth";
import { redirect } from "next/navigation";

const ProfilePage: React.FC = () => {
    const didMountRef = useRef(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const { user, isAuthenticated } = useAuth();

    useLayoutEffect(() => {
        if (!isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated]);

    /* ----- GET user data ----- */
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const data = await fetchCurrentUser();
                if (Array.isArray(data)) {
                    setCurrentUser(data[0]);
                } else {
                    setError("Données reçues incorrectes.");
                }
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
            }
        };
        getCurrentUser();
    }, []);

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }


    return (
        <div>
            <Header title={NavMenu.PROFIL} />
            <UserProfileCard
                username={currentUser?.username}
                email={currentUser?.email}
                avatarUrl={"/images/avatar3.jpg"}
                colocName={"Rue Malbec"}
                joinedDate={currentUser?.date_joined}
            />
        </div>
    );
};

export default ProfilePage;
