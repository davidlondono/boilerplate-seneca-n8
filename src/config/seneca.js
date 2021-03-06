const prefix = require('./environment');

module.exports = {
  "amqp": {
    "type": "amqp",
    "url": "amqp://localhost",
    "exchange": {
      "type": "topic",
      "name": "seneca.topic",
      "options": {
        "durable": true,
        "autoDelete": false
      }
    },
    "deadLetter": {
      "queue": {
        "name": "seneca.dlq"
      },
      "exchange": {
        "type": "topic",
        "name": "seneca.dlx",
        "options": {
          "durable": true,
          "autoDelete": false
        }
      }
    },
    "listener": {
      "channel": {
        "prefetch": 1
      },
      "queues": {
        "prefix": "seneca.add",
        "separator": ".",
        "options": {
          "durable": true,
          "arguments": {
            "x-dead-letter-exchange": "seneca.dlx",
            "x-message-ttl": 60000
          }
        }
      }
    },
    "client": {
      "channel": {
        "prefetch": 1
      },
      "queues": {
        "prefix": "seneca.act",
        "separator": ".",
        "options": {
          "autoDelete": true,
          "exclusive": true,
          "arguments": {
            "x-dead-letter-exchange": "seneca.dlx",
            "x-message-ttl": 10000
          }
        }
      }
    }
  }
};
