import express from 'express';
import Client from '../models';

const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        await Client.findByIdAndDelete(id);
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default deleteClient;