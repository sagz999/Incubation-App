const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Application = require('../models/applicationModel');
const generateToken = require('../utils/generateToken');
const ObjectId = require('mongoose').Types.ObjectId;

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {

        res.status(400);
        throw new Error("Error occured!")

    }



});

const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        res.json({

            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {

        res.status(400);
        throw new Error("Invalid user!");
    }


})

const newApplication = asyncHandler(async (req, res) => {

    const { name,
        address,
        city,
        state,
        email,
        phoneNum,
        companyName,
        companyBackground,
        companyProducts,
        facingProblem,
        revenueModel,
        marketSize,
        incubationType,
        businessProposal,
        userId,
        
    } = await req.body

    Application.create({
        name,
        address,
        city,
        state,
        email,
        phoneNum,
        companyName,
        companyBackground,
        companyProducts,
        facingProblem,
        revenueModel,
        marketSize,
        incubationType,
        businessProposal,
        userId
    }).then(() => {
        res.status(201);
        res.json({
            message: 'application created'
        })
    }).catch((err) => {
        console.log('Error:', err);
        res.status(400);
        throw new Error('Application submission failed');
    })


})

const fetchApplication = asyncHandler(async (req, res) => {
    const userId = req.query.userId;
    const applications = await Application.find({ userId: userId });

    if (applications) {

        res.status(200);
        res.json(applications)

    } else {

        res.status(400);
        throw new Error('Failed to fetch Applications');

    }
})

const cancelApplication =  (req, res) => {

    const id =  req.query.id;

    Application.updateOne({ _id: ObjectId(id) },
        {
            $set: {
                status: "cancelled"
            }

        }).then(() => {

            res.status(200);
            res.json({
                message:"Cancelled Application"
            });

        }).catch((err) => {

            console.log("Error:", err)
            res.status(400);
            throw new Error('Failed to cancel Applications');

        })

}

module.exports = { registerUser, authUser, newApplication, fetchApplication, cancelApplication }