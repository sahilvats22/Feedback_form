const Feedback = require("../model/model")


const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({})
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id)
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createFeedback = async (req, res) => {
    try {

        const body = req.body;


        if (!body || !body.contact_no || !body.email) {
            return res.status(400).json({ message: " Contact number, Email Required" })
        }

        const existingData = await Feedback.findOne({ $or: [ { contact_no: body.contact_no }, { email: body.email }] })

        if (existingData) {
            let errorMessage = "Data already exist. please check it"

            if (existingData.contact_no === body.contact_no) {
                errorMessage = "Contact number already exist"
            }
            else if (existingData.email === body.email) {
                errorMessage = "Email is alredy exist"
            }
            return res.status(400).json({ message: errorMessage })
        }


        const feedback = await Feedback.create(req.body);
        res.status(201).json(feedback)

    } catch (error) {

        // if (error.code === 11000) {
        //     return res.status(400).json({ message: "Data already exist please provide unique data" })
        // } 
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createFeedback, getFeedback, getFeedbackById }