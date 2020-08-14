import React,  {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { SortableContainer , arrayMove} from 'react-sortable-hoc'

import * as Constants from '../GlobalConstants'
import Confirm from './Confirm'
import BlockCard from './BlockCard'

const TagBlockList = (props) => {
    const API_BASE = Constants.API_BASE

    const [blocks, setBlocks] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [idSelected, setIdSelected] = useState(0)
    const [keyWord, setKeyWord] = useState('')
    const [quantity, setQuantity] = useState(0)
    
    const { id } = useParams()


    const getBlocks = async (id) => {

        if (typeof id !== 'undefined') {
            const result = await axios(`${API_BASE}blocks?spid=${id}`)
            console.log(result.data)


            let arrayBlocks = []
            arrayBlocks = result.data.rows.map(i=>{
                let nt = i
                nt.checked = false
                return nt
            })
            setBlocks(arrayBlocks)
            // setBlocks(result.data.rows)
            // setPage(result.data.supertag[0])
            setQuantity(result.data.countRows[0].quant)
            // setContexts(result.data.contexts)
        }
    }


    useEffect(() => {
        getBlocks(props.id_tag)
    }, [props.id_tag])

    const deleteBlock = async () => {
        const response = await axios.delete(`${API_BASE}blocks/${idSelected}`)
        console.log(response)
        await getBlocks(id)
        setIdSelected(0)
        setIsOpen(false)
    }



    const handleSubmitAddKeyWord = async e => {
        if (e) {
            e.preventDefault()
        }

        if (keyWord !== '') {
            const selectedBlocks = blocks.filter(i=>i.checked).map(i=>i.id)
            if (selectedBlocks.length > 0) {
                const ids = selectedBlocks.join(',')
                const response = await axios.post(`${API_BASE}blocks/keyword`, {'ids':ids, 'tag': keyWord})
                console.log(response)
                setKeyWord('')
                await getBlocks(id)
            }
        }

    }


    const handleKeyWordChange = e => {
        const {value} = e.target
        setKeyWord(value)
    }

    const handleCheckBlock = e => {
        const id = Number(e.target.value)
        const blocksUpdated = blocks.map(i=>{
            if (i.id === id){
                i.checked = !i.checked
            }
            return i
        })
        setBlocks(blocksUpdated)
    }


    const onSortEnd = async ({oldIndex, newIndex}) => {
        if (oldIndex !== newIndex) {
            let blocksCopy = [...blocks]
            console.log(blocksCopy)
            console.log({oldIndex, newIndex})
            blocksCopy = arrayMove(blocksCopy, oldIndex, newIndex)
            console.log(blocksCopy)
            setBlocks(blocksCopy)
    
            const blocksIds = blocksCopy.map((b) => b.id_block_page)
            const result = await axios.put(`${API_BASE}blocks/sort`, {blocksIds})
            console.log(result)
        }
    }

    // const imgStyle = {
    //     minWidth: "171px",
    //     minHeight: "300px",
    //     maxWidth: "100%",
    //     height: "auto"
    // }

    const imgStyle = {
        width: "171px",
        height: "300px"
    }

    function openConfirm(id){
        setIdSelected(id)
        setIsOpen(true)
    }

    const ContainerBlock = SortableContainer(({blocks, idpage, handleCheckBlock2 }) => {
        return (
                <div className="list-cards" >
                    {blocks.map((c, index) => (
                            <BlockCard index={index} key={c.id} block={c} idpage={idpage} delClick={()=> openConfirm(c.id_block_page)} handleCheckBlock={handleCheckBlock}  />
                            )
                    )}
                </div>
        )
    })

    return (
        <>
            <div className="container">
                <div className="row my-2 d-flex justify-content-between">
                    <h1>{quantity} Registros</h1>
                </div>


                <div className="row my-2 d-flex justify-content-between">
                    <Link className="btn btn-success" to={`/block/0/${id}`} style={{marginBottom: '30px'}} ><FontAwesomeIcon icon="plus" /></Link>

                    {/* <div className="ml-auto">
                        <PageBar paginate={paginate} currentPage={currentPage} maxPage={maxPage} />
                    </div> */}

                    {/* <div className="row mb-3"> */}
                        <form onSubmit={handleSubmitAddKeyWord} >
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="KeyWord"    
                                    name="keyword"
                                    value={keyWord}
                                    onChange={handleKeyWordChange} 
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" > Salvar</button>
                                </div>
                            </div>
                        </form>
                    {/* </div> */}
                </div>
                
                <div className="container">
                    <div className="row my-2">
                            <ContainerBlock blocks={blocks} onSortEnd={onSortEnd}  idpage={id} distance={1} />
                    </div>  
                </div>
                <Confirm  isOpen={isOpen} hideModal={()=>setIsOpen(false)} confirmAction={async()=>await deleteBlock()} />

            </div>
        </>
    )
}

export default TagBlockList
