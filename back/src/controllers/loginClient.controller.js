import express from 'express';
import Client from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const loginClient = async (req, res) => {
    const { username, password } = req.body;
    const client = await Client.findOne({ where: { username } });
    if (!client) {
        return res.status(400).json({ error: 'Cliente não existe' });
    }
    if (!bcrypt.compareSync(password, client.password)) {
        return res.status(400).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    const clientData = {
        id: client.id,
        username: client.username,
        fullname: client.fullname,
        email: client.email,
        phone: client.phone,
        CEP: client.CEP,
        state: client.state,
        city: client.city,
        streetName: client.streetName,
        houseNumber: client.houseNumber,
        complement: client.complement
    };

    return res.status(200).json({ token, clientData });
}

export default loginClient;