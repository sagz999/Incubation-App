const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNum: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyBackground: {
        type: String,
        required: true
    },
    companyProducts: {
        type: String,
        required: true
    },
    facingProblem: {
        type: String,
        required: true
    },
    revenueModel: {
        type: String,
        required: true
    },
    marketSize: {
        type: String,
        required: true
    },
    incubationType: {
        type: String,
        required: true
    },
    businessProposal: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },

    seatId: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    seatNo: {
        type: String,
        default:null
    }

},
    {
        timestamps: true,
    }
)

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application;