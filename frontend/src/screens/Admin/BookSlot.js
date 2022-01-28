import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'
import MainScreenContent from '../../components/MainScreenContent/MainScreenContent'
import './BookSlot.css'

const BookSlot = () => {

    const navigate = useNavigate()
    const [slots, setSlots] = useState([])
    
    const fetchSlots = () => {
        axios.get('api/admin/fetchSlots').then(({ data }) => {

            const slotData = data.data

            setSlots(slotData)

        }).catch((error) => {
            console.log("Error occured while adding seat : ", error)
        })
    }

   

    const handleSlotAllocation = async (slot, index) => {

        const slotNo = `IN-${index + 1}`;

        const appId = await JSON.parse(localStorage.getItem('appId'))

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        axios.patch('api/admin/allotSlot', { slot, appId, slotNo }, config).then(() => {
            fetchSlots()
            navigate('/adminHome')
        }).catch((err) => {
            console.log("Error occured while adding seat : ", err)
        })

    }

    

    useEffect(() => {
        fetchSlots()
    }, [])

    return (
        <MainScreenContent title='BOOK-SLOT' >
            <Container>
                
                <div className='seatContainer'>
                    {
                        slots.length !== 0 ?
                            slots.map((slot, index) => {
                                return (
                                    <>
                                        <Button key={slot._id} id={slot._id}
                                            className={slot.isActive ? 'slot disabled' : "slot"}
                                            style={slot.isActive ? { backgroundColor: 'red'} : { backgroundColor: '' }}
                                            onClick={() => {

                                                swal({
                                                    title: "Are you sure?",
                                                    text: "Slot once booked cannot be recovered!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                }).then((willDelete) => {
                                                    if (willDelete) {
                                                        handleSlotAllocation(slot, index)
                                                    }
                                                });

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
                </div>
            </Container>

        </MainScreenContent>
    )
}

export default BookSlot
