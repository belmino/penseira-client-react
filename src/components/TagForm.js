import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const TagForm = (props) => {

    const API_BASE = 'http://localhost:3003/'

    const [tag, setTag] = useState({slug: '', title: '', type: 'C'})

    const { id, type, spid } = useParams()

    const getTag = async (id) => {

        if ((typeof id !== 'undefined') && (id !== '0')) {
            const result = await axios(`${API_BASE}tags/${id}`)
            console.log(result.data.rows[0])
            setTag(result.data.rows[0])
        }
    }

    useEffect(() => {
        getTag(id)
    }, [id])



    useEffect(() => {
        if (type !== 'T') {
            setTag(tag => ({...tag, type: type}))
        }
    }, [])

    const handleSubmit = async e => {
        if (e) {
            e.preventDefault()
        }
        console.log('submeteu')

        let params
        if (typeof spid !== 'undefined') {
            params = {...tag, spid}
        } else {
            params = tag
        }

        if ((typeof id !== 'undefined') && (id !== '0')) {
            console.log('edit')
            const response = await axios.put(`${API_BASE}tags/${id}`, params)
            console.log(response)
        }else{
            console.log('add')
            console.log(params)
            const response = await axios.post(`${API_BASE}tags`, params)
            console.log(response)
        }

        // if (typeof type !== 'undefined') {
        if (type !== 'T') {
            if (type === 'C') {
                props.history.push('/contexts')
            } else {
                if (typeof spid !== 'undefined') {
                    props.history.push(`/pages/${spid}`)
                }
            }
        } else {
            props.history.push('/')
        }
    }

    const handleInputChange = e => {
        const {name, value} = e.target
        setTag(tag => ({...tag, [name]:value}))
    }

    const renderTypes = () => {
        // if (typeof type !== 'undefined') {
        if (type !== 'T') {
            if (type === 'P') {
                return (
                    <option value="P">Page</option>
                )
            } else {
                return (
                    <option value="C">Context</option>
                )
            }
        } else {
            return (
                <>
                    <option value="C">Context</option>
                    <option value="P">Page</option>
                    <option value="K">Keyword</option>
                </>
            )
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="row my-2">
                    <div className="form-group col-xs-12 col-md-6">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="slug"
                            value={tag.slug}
                            onChange={handleInputChange}
                            autoFocus={true}
                        />
                    </div>

                    <div className="form-group col-xs-12 col-md-6">
                        <select name="type" className="form-control" value={tag.type} onChange={handleInputChange} >
                            {renderTypes()}
                        </select>
                    </div>

                    <div className="form-group col-xs-12 col-md-12">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Título(Opcional)"
                            name="title"
                            value={tag.title===null?'':tag.title}
                            onChange={handleInputChange}
                        />
                    </div>


                    <button className="btn btn-primary" ><FontAwesomeIcon icon="save" /> Salvar</button>
                

                </div>
            </form>  
        </>
    )
}

export default TagForm
