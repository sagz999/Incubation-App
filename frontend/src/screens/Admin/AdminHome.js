import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import axios from 'axios'
import { Button, Table, Modal, Tabs, Tab } from 'react-bootstrap'
import './AdminHome.css'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import MainScreenContent from '../../components/MainScreenContent/MainScreenContent'



const AdminHome = () => {

    const [pendingRequests, setPendingRequests] = useState([])
    const [processedRequests, setProcessedRequests] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [singleReq, setSingleReq] = useState({})
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [key, setKey] = useState('home');


    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const navigate = useNavigate()


    const handleAccept = (id) => {

        axios.put(`api/admin/changeReqStatus?id=${id}&status=processing`).then(() => {

            fetchRequests();

        }).catch((err) => {

            handleClose();
            setError(err.response.data.message)

        })


        handleClose();

    }

    const handleReject = (id) => {





        axios.put(`api/admin/changeReqStatus?id=${id}&status=rejected`).then(() => {

            fetchRequests();

        }).catch((err) => {

            handleClose();
            setError(err.response.data.message)

        })


        handleClose();
    }

    const fetchRequests = async () => {


        setLoading(true)
        setError(null)

        axios.get('api/admin/fetchAllReq').then(({ data }) => {

            const allReq = data
            const pendingReq = allReq.filter((req) => req.status === 'pending')
            const processedReq = allReq.filter((req) => req.status === 'processing')

            setPendingRequests(pendingReq)
            setProcessedRequests(processedReq)

        }).catch((error) => {

            setError(error.response.data.message)
            setLoading(false);

        })

        setLoading(false)

        const appId = await JSON.parse(localStorage.getItem('appId'))

        if (appId) {
            setKey("profile")
            localStorage.removeItem("appId");
            
        } else {
            setKey("home")
        }

        
    }

    const setCount = async () => {

        const count =   pendingRequests.length()
        console.log(count)
        localStorage.setItem("count", count)
    }

    const storeAppData = (id) => {

        localStorage.setItem("appId", JSON.stringify(id));
    }

    useEffect(() => {

        fetchRequests();
        setCount();

    }, [])

    return (
        <MainScreenContent title='QUICK-VIEW' >

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="home" title="PENDING-REQUESTS">
                        {
                            pendingRequests.length !== 0 ?
                                <Table responsive="sm" striped bordered hover >

                                    <thead>
                                        <tr>
                                            <th>Sl.No</th>
                                            <th>Application Id</th>
                                            <th>Company Name</th>
                                            <th>Client Name</th>
                                            <th>Incubation Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            pendingRequests.map((Req, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{Req._id}</td>
                                                        <td>{Req.companyName}</td>
                                                        <td>{Req.name}</td>
                                                        <td>{Req.incubationType}</td>
                                                        <td>{Req.status}</td>
                                                        <td><Button variant="primary" size="sm" onClick={() => {
                                                            setSingleReq(Req)
                                                            setShow(true)
                                                        }
                                                        }>View</Button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>View Application: {singleReq._id}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {
                                                Object.keys(singleReq).map((key) => {
                                                    return (
                                                        key !== '__v' ?
                                                            <>
                                                                <span className='modalBody'>
                                                                    <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>{key} </strong> <br /> {singleReq[key]}
                                                                </span>
                                                                <hr />
                                                            </>
                                                            : ""
                                                    )
                                                })
                                            }
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="success" onClick={() => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "Request once accepted cannot be rejected!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            handleAccept(singleReq._id);
                                                        }
                                                    });
                                            }} >
                                                Accept
                                            </Button>
                                            <Button variant="danger" onClick={() => {
                                                swal({
                                                    title: "Reject this Request?",
                                                    text: "Once Rejected, you will not be able to recover this request!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            handleReject(singleReq._id);
                                                        }
                                                    });
                                            }}>
                                                Reject
                                            </Button>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Table>
                                :
                                <div className='text-center' style={{ marginTop: "25px" }}>
                                <img src="https://www.pinclipart.com/picdir/big/187-1876862_survey-clipart.png" style={{height:"200px",width:"200px"}} alt="" />
                                <h3  style={{ color: "red",marginTop:"18px" }}>No pending requests</h3>
                                </div>
                            
                        }
                    </Tab>
                    <Tab eventKey="profile" title="ACCEPTED-REQUESTS">
                        {
                            processedRequests.length !== 0 ?

                                <Table responsive="sm" striped bordered hover>

                                    <thead>
                                        <tr>
                                            <th>Sl.No</th>
                                            <th>Application Id</th>
                                            <th>Company Name</th>
                                            <th>Client Name</th>
                                            <th>Incubation Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            processedRequests.map((Req, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{Req._id}</td>
                                                        <td>{Req.companyName}</td>
                                                        <td>{Req.name}</td>
                                                        <td>{Req.incubationType}</td>
                                                        <td>{Req.status}</td>
                                                        <td><Button variant="primary" size="sm" onClick={() => {
                                                            setSingleReq(Req)
                                                            setShow1(true)
                                                        }
                                                        }>View</Button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                    <Modal show={show1} fullscreen={true} onHide={() => setShow1(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>View Application: {singleReq._id}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {
                                                Object.keys(singleReq).map((key) => {
                                                    return (
                                                        key !== '__v' ?
                                                            <>
                                                                <span className='modalBody'>
                                                                    <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>{key} </strong> <br /> {singleReq[key]}
                                                                </span>
                                                                <hr />
                                                            </>
                                                            :
                                                            ""
                                                    )
                                                })
                                            }
                                        </Modal.Body>
                                        <Modal.Footer>

                                            <Button variant="danger" onClick={() => {
                                                storeAppData(singleReq._id)
                                                navigate('/bookSlot')
                                            }}>

                                                Book Slot

                                            </Button>
                                            <Button variant="secondary" onClick={handleClose1}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Table>
                                :
                                <div className='text-center' style={{ marginTop: "25px" }}>
                                    <img src="https://www.pinclipart.com/picdir/big/140-1409228_complete-order-place-shopping-success-tick-icon-order.png" style={{ height: "250px", width: "200px" }} alt="" />
                                    <h3 style={{ color: "red", marginTop: "18px" }}>No Accepted requests</h3>
                                </div>

                        }
                    </Tab>

                </Tabs>
            </div>

        </MainScreenContent>
    )

}
export default AdminHome

