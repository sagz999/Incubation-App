import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './MainScreenContent.css'

const MainScreenContent = ({title,children}) => {
    return (
        <div className='mainScreenContent'>
            <Container>
                <Row>
                    <div className='page'>
                        {title && (
                            <>
                                <h1 className='heading'>{title}</h1>
                                <hr />
                            </>
                        )}
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default MainScreenContent
