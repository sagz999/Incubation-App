import React, { useEffect, useState } from 'react'
import MainScreenContent from '../../components/MainScreenContent/MainScreenContent'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import axios from 'axios'
import { ProgressBar, Table } from 'react-bootstrap'

const RequestStatus = () => {


    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [allReq, setAllReq] = useState([])

    const fetchRequests = () => {


        setLoading(true)
        setError(null)

        axios.get('api/admin/fetchAllReq').then(({ data }) => {

            const allReqData = data
            setAllReq(allReqData)

        }).catch((error) => {

            setError(error.response.data.message)
            setLoading(false);

        })

        setLoading(false)
    }

    useEffect(() => {
        fetchRequests()
    }, [])
    return (
        <MainScreenContent title='ALL-REQUESTS' >
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            {
                allReq.length !== 0 ?
                    <Table responsive="sm" striped bordered hover >
                        <thead className='text-center'>
                            <tr>
                                <th>Sl.No</th>
                                <th>Company Name</th>
                                <th>Client Name</th>
                                <th>Incubation Type</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody className='text-center'>

                            {
                                allReq.map((Req, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{Req.companyName}</td>
                                            <td>{Req.name}</td>
                                            <td>{Req.incubationType}</td>
                                            <td >
                                                {
                                                    Req.status !== 'cancelled' ?
                                                        (
                                                            Req.status !== 'rejected' ?

                                                                (<Table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Pending</th>
                                                                            <th>Accepted</th>
                                                                            <th>Approved</th>
                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan={3}>
                                                                                {Req.status !== 'rejected' ?
                                                                                    <ProgressBar style={{ width: '45em' }} animated now={Req.status === 'pending' ? 7 : Req.status === 'processing' ? 50 : 100} /> :
                                                                                    <span>Rejected</span>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>) : <h5 style={{ color: 'red' }}>Rejected</h5>
                                                        ) : <h5 style={{ color: 'red' }}>Cancelled</h5>

                                                }
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    :
                    <div className='text-center' style={{ marginTop: "25px" }}>
                        <img src="https://www.pinclipart.com/picdir/big/7-70017_university-application-png-clipart.png" style={{ height: "250px", width: "200px" }} alt="" />
                        <h3 style={{ color: "red", marginTop: "18px" }}>No Requests found</h3>
                    </div>
            }


        </MainScreenContent>
    )
}

export default RequestStatus
