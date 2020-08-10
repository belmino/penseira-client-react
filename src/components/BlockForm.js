import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const BlockForm = (props) => {

    const API_BASE = 'http://localhost:3003/'

    const [selectedFile, setSelectedFile] = useState('')
    const [preview, setPreview] = useState()
    const [block, setBlock] = useState({url: '', link: '', paragraph: '', type: 'N'})

    const { id, spid } = useParams()


    const getBlock = async (id) => {

        if ((typeof id !== 'undefined') && (id !== '0')) {
            const result = await axios(`${API_BASE}blocks/${id}`)
            console.log(result.data.rows[0])
            setBlock(result.data.rows[0])
            setSelectedFile(result.data.rows[0].url)
        }
    }

    useEffect(() => {
        getBlock(id)
    }, [id])



    useEffect(() => {
        if (typeof selectedFile === 'object'){
            const objectUrl = URL.createObjectURL(selectedFile)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreview(API_BASE+selectedFile)
        }
    }, [selectedFile])

    const handleSubmit = async e => {
        if (e) {
            e.preventDefault()
        }

        console.log('submetendo!')

        const formData = new FormData()
        // if (selectedFile !== '')

        if (typeof selectedFile === 'object'){
            formData.append('image', selectedFile)
        }
        formData.append('type', block.type)
        formData.append('paragraph', block.paragraph)
        formData.append('link', block.link)
        if (typeof spid !== 'undefined') {
            formData.append('spid', spid)
        }

        const config = {headers: {'content-type': 'multipart/form-data'}}
        

        let response = null
        if ((typeof id !== 'undefined') && (id !== '0')) {
            response = await axios.put(`${API_BASE}blocks/${id}`, formData, config)
        } else {
            response = await axios.post(`${API_BASE}blocks`, formData, config)
        }

        console.log(response)
        props.history.push(`/page/${spid}`)

    }

    const handleInputChange = e => {
        const {name, value} = e.target
        setBlock(block => ({...block, [name]:value}))
    }

    
    const handleChangeImg = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }


    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="row my-2">
                    <div className="col-md-4 col-xs-12" >
                        <label htmlFor="file-upload" className="btn btn-primary"> Upload</label>
                        <input type="file" id="file-upload" style={{display: 'none'}} onChange={handleChangeImg}/>
                        {selectedFile && <img src={preview} alt={'upload imagem'} className='img-responsive' /> }
                    </div>
                    <div className="col-md-8 col-xs-12">
                        <h3>Cadastro de Blocos</h3>

                        <div className="form-group">
                            <label >Conteúdo:</label>
                            <textarea 
                                className="form-control" 
                                rows="3" 
                                value={block.paragraph} 
                                name="paragraph"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label >Link:</label>
                            <textarea 
                                className="form-control" 
                                rows="3"
                                value={block.link}
                                name="link"
                                onChange={handleInputChange}  
                            />
                        </div>

                        <div className="form-group">
                            <select name="type" className="form-control" value={block.type} onChange={handleInputChange} >        
                                <option value="N">Neutro</option>
                                <option value="P">Pendente</option>
                                <option value="R">Resolvido</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" ><FontAwesomeIcon icon="save" /> Salvar</button>
                    </div>
                </div>


            </form>
            
        </>
    )
}

export default BlockForm
