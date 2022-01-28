import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MainScreenContent from '../../components/MainScreenContent/MainScreenContent'
import { Button, Container, Modal } from 'react-bootstrap'
import './BookSlot.css'

const ViewSlots = () => {

    const [slots, setSlots] = useState([])
    const [singleApp, setSingleApp] = useState({})
    const [show, setShow] = useState(false)
    


    const fetchSlots = () => {
        axios.get('api/admin/fetchSlots').then(({ data }) => {

            const slotData = data.data

            setSlots(slotData)

        }).catch((error) => {
            console.log("Error occured while fetching slots : ", error)
        })
    }

    const handleAddSlot = () => {

        try {
            const config = {
                "Content-Type": "application/json"
            }
            axios.post('/api/admin/addSlot', config).then(() => {

                fetchSlots()

            })
        } catch (err) {
            console.log("Error occured while adding seat : ", err)
        }

    }

    const handleViewApplication = (appId) => {

        axios.get(`api/admin/viewApplication?appId=${appId}`).then(({ data }) => {
            
            setSingleApp(data)
            setShow(true)

        }).catch((err) => {

            console.log("Error occured while adding seat : ", err)
        })
    }

    useEffect(() => {

        fetchSlots()

    }, [])

    return (
        <MainScreenContent title='MANAGE-SLOTS' >
            <Container>
                <Button onClick={handleAddSlot}>Add Slot</Button>
                <br />
                <br />

                {
                    slots.length !== 0 ?
                        slots.map((slot, index) => {
                            return (
                                <>
                                    <Button key={slot._id} id={slot._id}
                                        className={slot.isActive ? 'slot ' : "slot disabled"}
                                        style={slot.isActive ? { backgroundColor: 'red' } : { backgroundColor: '' }}
                                        onClick={() => {

                                            handleViewApplication(slot.applicationId)
                                            
                                        }}
                                    >
                                        {`IN-${index + 1}`}
                                    </Button>

                                </>
                            )

                        })
                        :
                        <div className='text-center' style={{ marginTop: "25px" }}>
                            <img src="https://www.pinclipart.com/picdir/big/124-1244160_appointment-calendar-event-working-schedule-icon-schedule-png.png" style={{ height: "200px", width: "200px" }} alt="" />
                            <h3 style={{ color: "red", marginTop: "18px" }}>No Slots availabe</h3>
                        </div>
                }

                <Modal fullscreen={true} className='text-center' show={show}  onHide={() => {

                    setShow(false);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">View Application : {singleApp._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {

                            Object.keys(singleApp).map(key => {
                                return (
                                    <>
                                        <span className='modalBody'>
                                            <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>{key} </strong> <br /> {singleApp[key]}
                                        </span>
                                        <hr />
                                    </>
                                )
                            }
                            )

                        }
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={() => {
                            setShow(false);
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>

        </MainScreenContent>
    )
}

export default ViewSlots
