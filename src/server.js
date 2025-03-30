import express from 'express';
import { WebSocketServer } from 'ws';

const zap = [];

const app = express();
//4520 = rbso
const port = 4520;

app.get('/', (req, res) => {
    res.status(200).send('LIMBUS COMPANY!!!!!!!!!');
});

const server = app.listen(port, () => {
    console.log(`Don Quixote Of La MachaLand ${port}`)
})

const robsonSocket = new WebSocketServer({server});

robsonSocket.on('connection', (client) => {
    console.log('Cliente se conecta ao websocket');

    client.on('message',(message) => {
        try {
            zap.push(message);
            console.log('Robson recebeu a mensagem')

            client.send('Glory to Limbus Company!');

            robsonSocket.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(zap);
                }
            });
        } catch(error){
            console.error('Deu ruim:', error)
        }
    });

    client.on('close', () => {
        console.log('conexão fechada')
    });
})

robsonSocket.on('error', (error) => {
    console.log('Robson ferro com tudo dnv: ', error)
})