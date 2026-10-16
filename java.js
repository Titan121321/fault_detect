// Connect to a free public MQTT broker over WebSockets
const brokerUrl = 'wss://broker.hivemq.com:8884/mqtt';
const topic = 'stm32/fault/sensor-data'; // Make sure this matches your ESP32 topic

console.log("Connecting to MQTT broker...");
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log("Connected to cloud broker successfully!");
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

// Listen for incoming data from the ESP32
client.on('message', (incomingTopic, payload) => {
    if (incomingTopic === topic) {
        const messageString = payload.toString();
        console.log("Received live data from ESP32:", messageString);
        
        let sensorValue = parseFloat(messageString);
        
        // TODO: Pass 'sensorValue' into your graph library (e.g., Chart.js)
        // updateGraph(sensorValue);
    }
});