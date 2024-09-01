'use client'

import React from 'react'
import isAuth from "@/components/isAuth"

function Welcome() {
    return (
        <p>
            You are logged in
        </p>
    )
}

export default isAuth(Welcome)
