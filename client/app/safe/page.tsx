'use client'

import { Header } from '@/app/components/customsComponents/layout/Header'
import { NavMenu } from '@/app/enums/NavMenuEnum'
import isAuth from '@/utils/auth/isAuth'
import React from 'react'

const Safe = () => {
    return (
        <div>
            <Header title={NavMenu.SAFE} />
            <div>safe</div>
        </div>
    )
}

export default isAuth(Safe);