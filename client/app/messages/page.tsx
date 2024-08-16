import { Header } from '@/app/components/customsComponents/layout/Header'
import { NavMenu } from '@/app/enums/NavMenuEnum'
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