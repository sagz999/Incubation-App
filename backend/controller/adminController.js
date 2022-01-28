const asyncHandler = require('express-async-handler')
const Application = require('../models/applicationModel');
const Slot = require('../models/slotmodel');
const ObjectId = require('mongoose').Types.ObjectId;

const fetchAllReq =  (req, res) => {
    
    Application.find().then((allReq) => {

        res.status(200)
        res.json(allReq)
        
    }).catch(() => {

        res.status(400);
        throw new Error('Failed to fetch Requests');

    })
}

const changeReqStatus = (req, res) => {
   
    const id = req.query.id;
    const status = req.query.status;

    Application.updateOne({ _id: ObjectId(id) },
        {
            $set: {
                status:status
            }
        }
        
    ).then(() => {

        res.status(200)
        res.json({
            message: "Updated status"
        });

    }).catch(() => {

        res.status(400);
        throw new Error('Failed to fetch pending Requests');

    })
}

const addSlot = (req, res) => {

    Slot.create({}).then(() => {

        res.status(201)
        res.json({
            message: "Created new Slot"
        })

    }).catch(() => {

        res.status(400);
        throw new Error('Failed to create new slot');
        
    })

}

const fetchSlots = (req, res) => {

    Slot.find().then((data) => {

        res.status(200)
        res.json({ data })
        
    }).catch(() => {

        res.status(400)
        throw new Error('Failed to fetch slots');

    })
}

const allotSlot = async (req, res) => {

    const slotId = await req.body.slot._id
    const appId = await req.body.appId
    const slotNo = await req.body.slotNo

    Slot.updateOne({ _id: ObjectId(slotId) }, { $set: { applicationId: appId, seatNumber: slotNo, isActive: true } }).then(() => {
        Application.updateOne({ _id: ObjectId(appId) }, { $set: { seatNo: slotNo, seatId: slotId, status: "approved" } }).then(() => {
            res.status(201)
            res.json({
                message: "Allocated Slot"
            })
        }).catch(() => {
            res.status(400)
            throw new Error('Failed to allot slots');
        })
    }).catch(() => {
        res.status(400)
        throw new Error('Failed to allot slots');
    })


}

const viewApplication = (req, res) => {
    const appId = req.query.appId
    Application.findOne({ _id: ObjectId(appId) }).then((result) => {
        res.status(201)
        res.json(result)
    }).catch(() => {
        res.status(400)
        throw new Error('Failed to fetch Application');
    })
}



module.exports = { fetchAllReq, changeReqStatus, addSlot, fetchSlots, allotSlot, viewApplication}