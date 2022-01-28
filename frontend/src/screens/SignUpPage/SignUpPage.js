import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MainScreenContent from '../../components/MainScreenContent/MainScreenContent'
import './SignUpPage.css'
import Loading from '../../components/Loading'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage'


const SignUpPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password mismatch")
        } else {
            setError(null)

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                }

                setLoading(true)

                const { data } = await axios.post('/api/users/signup', { name, email, password }, config)

                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false)
                setError(null)
                navigate('/bookings')


            } catch (error) {
                setError(error.response.data.message)
                setLoading(false);
            }
        }
    }

    return (

        <MainScreenContent title='SIGN-UP'>
            <div className="loginContainer">

                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

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
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="mt-2" variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreenContent>

    )
}

export default SignUpPage
