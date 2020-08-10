import React from 'react'

const PageBar = (props) => {

    const renderPageItem = (value, label) => {
        return (
            <li className='page-item'>
                <p className='page-link' onClick={() => props.paginate(value)}  >{label}</p>
            </li>
        )
    }

    return (
        <nav>
            <ul className='pagination'>
                {props.currentPage>1?renderPageItem(1, 1):''}
                {props.currentPage>2?renderPageItem(props.currentPage-1, '<'):''}

                <li className='page-item active'>
                    <p className='page-link' >{props.currentPage}</p>
                </li>

                {props.currentPage<(props.maxPage-1)?renderPageItem(props.currentPage+1, '>'):''}
                {props.currentPage<props.maxPage?renderPageItem(props.maxPage, props.maxPage):''}
            </ul>
        </nav>
    )
}

export default PageBar
