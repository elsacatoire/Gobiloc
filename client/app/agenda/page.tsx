import { Header } from '@/components/layout/Header'
import { NavMenu } from '@/enums/NavMenu'
import React from 'react'

const agenda = () => {
    return (
        <div>
            <Header title={NavMenu.AGENDA} />
            agenda
        </div>
    )
}

export default agenda