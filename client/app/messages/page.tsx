import { Header } from '@/components/layout/Header'
import { NavMenu } from '@/app/enums/NavMenu'
import React from 'react'

const messages = () => {
    return (
        <div>
            <Header title={NavMenu.MESSAGES} />
            <div>messages</div>
        </div>

    )
}

export default messages