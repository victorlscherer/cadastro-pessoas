import express from 'express';
import { startWs } from './webSocket/wsConfig';
import router from './routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('', router);


const initServer = () => {
    const PORT = 8080

    try {
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        startWs(server);

    } catch (error) {
        console.log('Erro ao iniciar servidor: ', error);
        process.exit(1)
    }
}

initServer()