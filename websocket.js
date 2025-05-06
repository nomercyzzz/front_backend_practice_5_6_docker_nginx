const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4040 });
const clients = new Set(); 

wss.on("connection", (ws) => {
    console.log("Клиент подключился");

    clients.add(ws);

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "message") {
                const chatMessage = JSON.stringify({
                    role: data.role,
                    message: data.message
                });

                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(chatMessage);
                    }
                });
            }
        } catch (error) {
            console.error("Ошибка обработки сообщения:", error);
        }
    });

    ws.on("close", () => {
        clients.delete(ws);
        console.log("Клиент отключился");
    });
});

console.log("webSocket сервер запущен на порту 4040");