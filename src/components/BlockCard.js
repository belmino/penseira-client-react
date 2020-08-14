
import React from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { SortableElement } from 'react-sortable-hoc'

import * as Constants from '../GlobalConstants'

const BlockCard = SortableElement((props) => {

    const API_BASE = Constants.API_BASE

    const imgStyle = {
        width: "171px",
        height: "300px"
    }

    let newText = props.block.paragraph.split('\n').map((item, i) => <p key={i}>{item}</p>)

    const renderCheckBox = () => {

        if (typeof props.handleCheckBlock !== 'undefined') {
            return (
                <div className="form-check checkbox">
                    <input type="checkbox" className="form-check-input" onChange={props.handleCheckBlock} value={props.block.id} checked={props.block.checked} />
                </div>
            )
        }
        return ''
    }

    return (
        <div className={'card border-primary d-flex p-2 flex-row '+(props.block.checked?'bg-primary':'')}>
            {renderCheckBox()}
            {props.block.url!==''
            ?<img src={API_BASE+props.block.url} style={imgStyle}  />
            :''}
            <div className="card-body"> {newText}</div>
            <div >
                <Link className="btn btn-info" to={`/block/${props.block.id}/${props.idpage}`} ><FontAwesomeIcon icon="pencil-alt" /></Link>
                <span className="btn btn-danger" onClick={()=>props.delClick()} ><FontAwesomeIcon icon="trash-alt" /></span>
            </div>
            {props.block.keywords!==''?
                <div className="card-footer"> {props.block.keywords}</div>
            :''}
        </div>
    )
})

export default BlockCard
