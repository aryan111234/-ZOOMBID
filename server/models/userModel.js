const mongoose = require('mongoose');
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,

    },
    password: {
        type: String,
        required: true
    },
    roles : {
        type: String,
        default : "active"
    },
    profilePicture: {
        type: String,
        default: "",
    },

}, {
    timestamps: true,
});

const user = mongoose.model("users", userSchema);

module.exports = user;