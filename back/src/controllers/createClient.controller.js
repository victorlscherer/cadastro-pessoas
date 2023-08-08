import express from 'express';
import Client from '../models';
import bcrypt from 'bcrypt';

const createClient = async (req, res) => {
    const { fullname, email, password, birthdate, CEP, state, city, streetName, houseNumber, complement } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = new Client({ fullname, email, password: hashedPassword, birthdate, CEP, state, city, streetName, houseNumber, complement });
        await client.save();

        const clientWithoutPassword = client.toObject();
        delete clientWithoutPassword.password;

        res.status(200).json({ message: 'Cliente criado com sucesso', client: clientWithoutPassword });
    }


    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email ou nome de usuário já cadastrado' });
        }
        if (err.name === 'ValidationError') {
            const missingFields = Object.keys(err.errors).map(field => field.replace('$', ''));
            const translatedFields = missingFields.map(field => {
                switch (field) {
                    case 'username':
                        return 'nome de usuário';
                    case 'fullname':
                        return 'nome completo';
                    case 'email':
                        return 'email';
                    case 'password':
                        return 'senha';
                    case 'phone':
                        return 'telefone';
                    case 'state':
                        return 'estado';
                    case 'city':
                        return 'cidade';
                    case 'streetName':
                        return 'nome da rua';
                    case 'houseNumber':
                        return 'número da casa';
                    case 'complement':
                        return 'complemento';
                    default:
                        return field;
                }
            }
            );
            return res.status(400).json({ message: `Falta um ou mais campos: ${translatedFields}`, missingFields: translatedFields });
        }
        return res.status(400).json({ message: 'Erro ao criar cliente' });
    }
}

export default createClient;

