import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreenContent from '../../components/MainScreenContent/MainScreenContent'
import './MyBookings.css'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import swal from 'sweetalert';

const MyBookings = () => {

    const [applications, setApplications] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false);

    const fetchApplications = async () => {

        setLoading(true)


        const userId = await JSON.parse(localStorage.getItem('userInfo'))._id

        axios.get(`/api/users/fetchDatas?userId=${userId}`).then(({ data }) => {

            setApplications(data)

        }).catch((error) => {

            setError(error.response.data.message)
            setLoading(false);

        })

        setLoading(false)
        setMessage(null)
        setError(null)

    }

    useEffect(() => {
        fetchApplications();
    }, [])

    const cancelHandler = async (id) => {

        setLoading(true)

        axios.put(`/api/users/cancelApplication?id=${id}`).then((response) => {

            setMessage(response.data.message)
            setLoading(false)
            setError(false)
            fetchApplications();

        }).catch((error) => {

            setLoading(false);
            setMessage(null)
            setError(error.response.data.message)

        })

    }

    return (

        <MainScreenContent title='YOUR BOOKINGS'>

            <Link to='/apply'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="md">
                    Apply
                </Button>
            </Link>
            {message && <ErrorMessage variant="success">{message}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}

            {
                applications.map(application => (

                    <Accordion key={application._id} defaultActiveKey="none" flush>
                        <Accordion.Item >
                            <Card style={{ margin: 10 }}>

                                <Card.Header style={{ display: "flex" }}>
                                    <span style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1,
                                        cursor: "pointer",
                                        alignSelf: "center",
                                        fontSize: 18
                                    }}><Accordion.Header >{application.companyName}</Accordion.Header></span>
                                    <div>
                                        {application.status === "cancelled" ?
                                            <Button variant='danger' size="sm" disabled>Cancel</Button>
                                            : application.status === "approved" ?
                                                <Button variant='danger' size="sm" disabled>Cancel</Button>
                                                : <Button variant='danger' size="sm" onClick={() => {
                                                    swal({
                                                        title: "Are you sure?",
                                                        text: "Application once cancelled cannot be recovered!",
                                                        icon: "warning",
                                                        buttons: true,
                                                        dangerMode: true,
                                                    }).then((willDelete) => {
                                                        if (willDelete) {
                                                            cancelHandler(application._id)
                                                        }
                                                    });

                                                }}>Cancel</Button>
                                        }

                                    </div>
                                </Card.Header>

                                <Accordion.Body>
                                    <Card.Body>
                                        <h6>
                                            {
                                                application.status === "pending" ?
                                                    <Badge pill bg="warning">
                                                        Status-{application.status}
                                                    </Badge>
                                                    : application.status === "processing" ? <Badge pill bg="primary">
                                                        Status-{application.status}
                                                    </Badge> : application.status === "approved" ? <Badge pill bg="success">
                                                        Status-{application.status}
                                                    </Badge> : <Badge pill bg="danger">
                                                        Status-{application.status}
                                                    </Badge>
                                            }

                                        </h6> 
                                        <h5>
                                            {
                                                application.status === "approved" ?
                                                    <Badge bg="dark">
                                                        Slot No: {application.seatNo}
                                                    </Badge>
                                                    : <></>
                                            }

                                        </h5>
                                        <blockquote className="blockquote mb-0">
                                            <br />
                                            <p style={{ fontSize: 17, color: "black", lineHeight: 0.5 }}>Name: {application.name}</p>
                                            <span style={{ display: "flex" }}><p style={{ fontSize: 17, color: "black", lineHeight: 0.5 }}>Ph: {application.phoneNum}</p><p style={{ fontSize: 17, color: "black", lineHeight: 0.5, marginLeft: "30px" }}>Email: {application.email}</p></span>
                                            <p style={{ fontSize: 17, color: "black", lineHeight: 0.5 }}>Address: {application.address}</p>
                                            <p style={{ fontSize: 17, color: "black", lineHeight: 0.5 }}>Incubation Type: {application.incubationType}</p>
                                            <br />
                                            <footer className="blockquote-footer">
                                                Submitted on - {application.createdAt}
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Accordion.Body>
                            </Card>
                        </Accordion.Item>
                    </Accordion>

                ))
            }

        </MainScreenContent>

    )
}

export default MyBookings
