const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required : true
        },
        contact_no: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        emoji: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;