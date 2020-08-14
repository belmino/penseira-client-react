import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import * as Constants from '../GlobalConstants'

const ContextList = () => {
    const API_BASE = Constants.API_BASE

    const [contexts, setContexts] = useState([])

    const getContexts = async () => {
        let url = `${API_BASE}tags?type=C`
        const result = await axios(url)
        console.log(result.data.rows)
        setContexts(result.data.rows)
    }

    useEffect(() => {
        getContexts()
    }, [])

    const renderContexts = () => {
        return contexts.map(c => (
            <Link className="card border-primary" key={c.id} to={`/pages/${c.id}`} >
                <h5 className="card-header"> {c.slug}</h5>
            </Link>
        ))
    }

    return (
        <>
            <div className="row my-2">
                <Link className="btn btn-success" to={'/cad/C'} style={{marginBottom: '30px'}} ><FontAwesomeIcon icon="plus" /></Link>

                {/* <div className="ml-auto">
                    <PageBar paginate={paginate} currentPage={currentPage} maxPage={maxPage} />
                </div> */}
            </div>
            <div className="row my-2">
                <div className="list-cards" >
                    {renderContexts()}
                </div>
            </div>
        </>
    )
}

export default ContextList
