const mongoose = require('mongoose')

const seatSchema = mongoose.Schema({

    
    applicationId: {
        type: mongoose.Types.ObjectId,
        default: null,
    }, seatNumber: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    }
})


const Seats = mongoose.model('Seats', seatSchema)

module.exports = Seats