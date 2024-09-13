
'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import UserProfileCard from "./components/UserProfileCard";
import { Header } from "../components/customsComponents/layout/Header";
import { NavMenu } from "../enums/NavMenuEnum";
import { UserType } from "../../types/UserType";
import { fetchCurrentUser } from "@/api/services/userService";
import { isAuthenticated } from "../../utils/Auth";
import { redirect } from "next/navigation";

const ProfilePage: React.FC = () => {
    const didMountRef = useRef(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<UserType[]>([]);

    const user = {
        name: "Jane Doe",
        username: "janedoe",
        mail: "placeholder@test.com",
        avatarUrl: "/images/avatar3.jpg",
        colocName: "Rue Malbec",
        joinedDate: new Date("2023-01-15T00:00:00Z"),
    };


    useLayoutEffect(() => {
        const isAuth = isAuthenticated;
        if (!isAuth) {
            redirect("/")
        }
    }, [])

    /* ----- GET user data ----- */
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                console.log('avant fetch');

                const data = await fetchCurrentUser();
                console.log('data====>', data);

                if (Array.isArray(data)) {
                    setCurrentUser(data);
                } else {
                    setError("Données reçues incorrectes.");
                }
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                console.log("nooon");

            }
        };
        getCurrentUser();
    }, []);

    return (
        <div>
            <Header title={NavMenu.PROFIL} />
            <UserProfileCard
                name={user.name}
                username={user.username}
                email={user.mail}
                avatarUrl={user.avatarUrl}
                colocName={user.colocName}
                joinedDate={user.joinedDate}
            />
        </div>
    );
};

export default ProfilePage;
function setError(arg0: string) {
    throw new Error("Function not implemented.");
}

