import { Header } from '@/components/layout/Header'
import { NavMenu } from '@/app/enums/NavMenuEnum'
import React from 'react'

const safe = () => {
    return (
        <div>
            <Header title={NavMenu.SAFE} />
            <div>safe</div>
        </div>
    )
}

export default safe