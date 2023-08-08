import Client from "../models"

const getClientById = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const foundClient = await Client.findById(id);

    if (!foundClient) {
        res.status(404).json({ message: "Cliente não encontrado" })
    }

    res.status(200).json({ message: "Cliente retornado com sucesso", client: foundClient })
}

export default getClientById;