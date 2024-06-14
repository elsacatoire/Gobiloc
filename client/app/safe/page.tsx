import { Header } from '@/components/layout/Header'
import { NavMenu } from '@/enums/NavMenu'
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