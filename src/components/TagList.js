import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

import PageBar from './PageBar'
import Confirm from './Confirm'

const TagList = () => {

    const arrayTags = [
        {id:1, name: 'tag1', type: 'C'},
        {id:2, name: 'tag2', type: 'C'},
        {id:3, name: 'tag3', type: 'K'},
        {id:4, name: 'tag4', type: 'P'},
        {id:5, name: 'tag5', type: 'C'},
    ]

    const API_BASE = 'http://localhost:3003/'

    const [currentPage, setCurrentPage] = useState(3)
    const [maxPage, setMaxPage] = useState(5)
    const [tags, setTags] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [idSelected, setIdSelected] = useState(0)


    const getTags = async () => {
        let url = `${API_BASE}tags`
        const result = await axios(url)
        console.log(result.data.rows)
        setTags(result.data.rows)
    }

    useEffect(() => {
        getTags()
    }, [])

    const getTypeTag = (type) => {
        let text = ''
        switch (type) {
            case 'C':
                text = 'Context'
                break;
            case 'P':
                text = 'Page'
                break;
            case 'K':
                text = 'KeyWord'
                break;
            default:
                text = 'Other'
                break;
        }
        return text
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const deleteTag = async () => {
        const response = await axios.delete(`${API_BASE}tags/${idSelected}`)
        console.log(response)
        await getTags()
        setIdSelected(0)
        setIsOpen(false)
    }

    const openConfirm = (id) => {
        setIdSelected(id)
        setIsOpen(true)
    }

    const renderTable = (array) => {
        if (array.length) {
            return array.map(t => (
                <tr key={t.id}>
                    <td>
                    </td>
                    <td>{t.slug}</td>
                    <td>{getTypeTag(t.type)}</td>
                    <td>
                        <Link className="btn btn-info" to={`/cad/T/${t.id}`} ><FontAwesomeIcon icon="pencil-alt" /></Link>
                        <span className="btn btn-danger" onClick={()=> openConfirm(t.id)} ><FontAwesomeIcon icon="trash-alt" /></span>
                    </td>
                </tr>
            ))
        } else {
            return (
            <tr>
                <td colSpan="4">
                    Nenhuma tag adicionada
                </td>
            </tr>
            )
        }
    }

    return (
        <>
            <div className="row my-2">
                <Link className="btn btn-success" to={'/cad/T'} style={{marginBottom: '30px'}} ><FontAwesomeIcon icon="plus" /></Link>

                <div className="ml-auto">
                    <PageBar paginate={paginate} currentPage={currentPage} maxPage={maxPage} />
                </div>
            </div>
            <div className="row my-2">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tag</th>
                            <th>Type</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        renderTable(tags)
                    }
                    </tbody>
                </table>
            </div>
            <Confirm  isOpen={isOpen} hideModal={()=>setIsOpen(false)} confirmAction={async()=>await deleteTag()} />
        </>
    )
}

export default TagList
