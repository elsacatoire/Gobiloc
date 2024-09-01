'use client'

import { isAuthenticated } from "@/utils/Auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";

// Higher Order Component (HOC), which is a cleaner way to secure your route on the client side.
// Higher Order Component (isAuth) checks the user's authentication status. 
// If the user is not authenticated, it prevents the rendering of the protected component and redirects them to the homepage.
export default function isAuth(Component: any) {

    return function IsAuth(props: any) {
        const auth = isAuthenticated;

        useEffect(() => {
            if (!auth) {
                return redirect("/");
            }
        }, []);

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}