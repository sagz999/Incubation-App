import React, { useEffect } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo) {

            if (userInfo.isAdmin) {

                navigate("/adminHome");

            } else {

                navigate("/bookings");

            }
            
        }

    },[])


    return (

        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to incubator</h1>
                            <p className='subtitle'>Sign-in to submit your application to book a slot.</p>
                        </div>
                        <div className='buttonContainer'>
                            <Link to='/login'>
                                <Button size='lg' className='landingButton'>Login</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button size='lg' className='landingButton' variant='outline-primary'>Signup</Button>
                            </Link>

                        </div>
                    </div>
                </Row>
            </Container>

        </div>

    )
}

export default LandingPage
