import { Header } from '@/components/layout/Header'
import { NavMenu } from '@/app/enums/NavMenu'
import React from 'react'

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

export default agenda