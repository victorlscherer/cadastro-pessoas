import mongoose from "../db";

const ClientSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    birthdate: {
        type: String,
        required: true
    },

    CEP: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    streetName: {
        type: String,
        required: true
    },

    houseNumber: {
        type: String,
        required: true
    },

    complement: {
        type: String,
        required: true
    }
}
);

const Client = mongoose.model("Client", ClientSchema);

export default Client;