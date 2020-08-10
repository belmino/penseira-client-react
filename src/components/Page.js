import React,  {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Navbar, NavbarBrand, Nav, Container} from 'react-bootstrap'

import TagBlockList from './TagBlockList'

const Page = () => {
    const API_BASE = 'http://localhost:3003/'

    const [page, setPage] = useState({})
    const [contexts, setContexts] = useState([])
    
    const { id } = useParams()

    const getBlocks = async (id) => {

        if (typeof id !== 'undefined') {
            const result = await axios(`${API_BASE}tags/${id}`)
            console.log(result.data)
            setPage(result.data.row[0])
            setContexts(result.data.contexts)
        }
    }

    useEffect(() => {
        getBlocks(id)
    }, [id])

    return (
        <>
            <div className="container">
                <div className="row my-2 d-flex justify-content-between">
                    <h1>Página: {page.title===''?page.slug:page.title}</h1>
                </div>

                <div className="row my-2">
                    <Navbar bg="primary" expand="sm" variant="dark" className="p-3">
                        <Container>
                            <NavbarBrand href="/contexts" >
                            <i className="material-icons">
                                    </i> CONTEXTOS
                            </NavbarBrand>
                            <Navbar.Toggle aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" ></Navbar.Toggle>
                            <Navbar.Collapse id="navbarNav">
                                <Nav className="ml-auto">
                                {
                                    contexts.map((c, i) => (
                                        <Nav.Link  key={i} href={`/pages/${c.id}`}>
                                            {`${c.title===''?c.slug:c.title}`}
                                        </Nav.Link>
                                        ))
                                }
                                    
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                <TagBlockList id_tag={id} />

            </div>
        </>
    )
}

export default Page
