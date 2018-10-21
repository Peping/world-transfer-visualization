const latLon = require('./latLon.js')
let randomNormal = require('random-normal')
var kafka =  require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient({kafkaHost: process.argv[1]}),//'192.168.81.25:9092'
    producer = new Producer(client)
    
const transaction = {startPlace: 0, endPlace: 0, amount: 0, saved: 0, timeStamp: 0}

const generateLatLog = () => {
    let startNum = randomNum(latLon)
    transaction.startPlace = latLon[startNum]
    let endNum = randomNum(latLon) 
    transaction.endPlace = latLon[endNum]
}

const randomNum = (max) => {
    return Math.floor(Math.random() * (max.length))
}

const foldAndAddTime = () => {
    generateLatLog()
    transaction.amount = Math.floor(randomNormal({mean:100, dev: 20}))
    transaction.saved = Math.floor(Math.random() * 10) + 1
    transaction.timeStamp = new Date()
    console.log(transaction)
    return transaction
}

producer.on('ready', function() {
    setInterval( () => {
        foldAndAddTime();
        const record = [
            {
                topic: "Topic1",
                messages: new Buffer.from(JSON.stringify(transaction)),
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];
        producer.send(record, function() {});
    }, 100)
})

producer.on('error', function(err) {})
