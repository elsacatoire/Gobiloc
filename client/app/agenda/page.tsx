'use client'

import { Header } from '@/app/components/customsComponents/layout/Header'
import { NavMenu } from '@/app/enums/NavMenuEnum'
import React from 'react'
import isAuth from '@/utils/auth/isAuth';

const agenda = () => {

    return (
        <div>
            <Header title={NavMenu.AGENDA} />
            <div>
                agenda
            </div>
        </div>
    )
}

export default isAuth(agenda)
