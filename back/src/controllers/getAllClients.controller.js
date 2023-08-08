import Client from '../models';

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        const clientsWithoutPassword = clients.map(client => {
            const clientWithoutPassword = client.toObject();
            delete clientWithoutPassword.password;
            return clientWithoutPassword;
        }
        );
        res.status(200).json({ message: 'Clientes retornados com sucesso', clients: clientsWithoutPassword });
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default getAllClients;