import { Header } from '@/components/layout/Header'
import { NavMenu } from '@/app/enums/NavMenuEnum'
import React from 'react'
import { getCategoryName } from '../enums/TodoCategoryEnum';

const agenda = () => {
    const todo = {
        id: 3,
        flat_share_id: 1,
        name: "Raclette",
        updateDate: "2024-08-09T08:54:34.078218Z",
        category_id: 3
    };

    const categoryName = getCategoryName(todo.category_id);
    console.log(categoryName);


    return (
        <div className='mt-20'>
            <Header title={NavMenu.AGENDA} />
            <div>
                agenda
                <p>{categoryName}</p>
            </div>
        </div>
    )
}

export default agenda