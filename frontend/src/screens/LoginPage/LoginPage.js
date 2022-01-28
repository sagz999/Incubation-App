import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import MainScreenContent from '../../components/MainScreenContent/MainScreenContent'
import Loading from '../../components/Loading'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage'


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()



    const submitHandler = async (e) => {

        e.preventDefault()
        setError(false);
        setLoading(false);

        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            setLoading(true);

            const { data } = await axios.post('/api/users/login',
                {
                    email,
                    password
                },
                config)


            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            setError(false);

            if (data.isAdmin) {

                navigate('/adminHome')

            } else {

                navigate('/bookings')
            }


        } catch (error) {
            setError(error.response.data.message)
            setLoading(false);
            
        }
    }


    return (

        <MainScreenContent title='LOG-IN'>
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="mt-2">Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="mt-2" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/signup">Register Here</Link>
                    </Col>
                </Row>

            </div>
        </MainScreenContent>


    )

}

export default LoginPage
