import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const messages = [];

const app = express();
const port = 4520;

app.get("/", (req, res) => {
  res.status(200).send("Servidor WebSocket em execução.");
});

const server = app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on("connection", (client) => {
  console.log("Cliente conectado ao WebSocket.");

  client.on("message", (message) => {
    try {
      messages.push(message);
      console.log("Mensagem recebida do cliente.");

      client.send("Mensagem recebida com sucesso.");

      webSocketServer.clients.forEach((connectedClient) => {
        if (connectedClient.readyState === WebSocket.OPEN) {
          connectedClient.send(JSON.stringify(message));
        }
      });
    } catch (error) {
      console.error("Erro ao processar a mensagem:", error);
    }
  });

  client.on("close", () => {
    console.log("Conexão com o cliente encerrada.");
  });
});

webSocketServer.on("error", (error) => {
  console.error("Erro no servidor WebSocket:", error);
});
