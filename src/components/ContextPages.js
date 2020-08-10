import React,  {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const PageList = () => {
    const API_BASE = 'http://localhost:3003/'


    const [pages, setPages] = useState([])
    const [context, setContext] = useState({})

    const { id } = useParams()


    const getPages = async (id) => {

        if (typeof id !== 'undefined') {
            const result = await axios(`${API_BASE}tags?type=P&spid=${id}`)
            console.log(result.data)
            setPages(result.data.rows)
            setContext(result.data.supertag[0])
        }
    }

    useEffect(() => {
        getPages(id)
    }, [id])



    const renderPages = () => {
        return pages.map(c => (
            <Link className="card border-primary" key={c.id} to={`/page/${c.id}`} >
                <h5 className="card-header"> {c.slug}</h5>
            </Link>
        ))
    }


    return (
        <>
            <div className="row my-2">
                <h1>{context.title===''?context.slug:context.title}</h1>
            </div>
            <div className="row my-2">
                <Link className="btn btn-success" to={`/cad/P/0/${id}`} style={{marginBottom: '30px'}} ><FontAwesomeIcon icon="plus" /></Link>

                {/* <div className="ml-auto">
                    <PageBar paginate={paginate} currentPage={currentPage} maxPage={maxPage} />
                </div> */}
            </div>
            <div className="row my-2">
                <div className="list-cards" >
                    {renderPages()}
                </div>
            </div>

        </>
    )
}

export default PageList
