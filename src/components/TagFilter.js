import React,  {useState, useEffect} from 'react'
import axios from 'axios'

import * as Constants from '../GlobalConstants'
import TagBlockList from './TagBlockList'

const TagFilter = () => {
    const API_BASE = Constants.API_BASE

    // const [keyWord, setKeyWord] = useState('')
    const [tags, setTags] = useState([])
    const [idTag, setIdTag] = useState(0)

    const getTags = async () => {
        let url = `${API_BASE}tags`
        const result = await axios(url)
        console.log(result.data.rows)
        setTags(result.data.rows)
    }

    useEffect(() => {
        getTags()
    }, [])

    const handleSubmitAddKeyWord = async e => {
        if (e) {
            e.preventDefault()
        }
        // refazer consulta de blocos vai ser no submit?
        // setIdTag(keyWord)
    }


    const handleKeyWordChange = e => {
        const {value} = e.target
        // setKeyWord(value)
        setIdTag(value)
    }

    return (
        <>
            <div className="container">

                <div className="row my-2 d-flex justify-content-between">
                    <form onSubmit={handleSubmitAddKeyWord} >
                        <div className="input-group">
                            <select name="type" className="form-control" onChange={handleKeyWordChange} >
                                {tags.map((t, i) => (
                                     <option key={i} value={t.id}>{(t.title===''||t.title===null)?t.slug:t.title}</option>
                                ))}
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-primary" > Filtrar</button>
                            </div>
                        </div>
                    </form>
                </div>

                <TagBlockList id_tag={idTag} />

            </div>
            
        </>
    )
}

export default TagFilter
