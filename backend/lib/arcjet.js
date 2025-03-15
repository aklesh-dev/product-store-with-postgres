import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import "dotenv/config";

// *Init arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules:[
    // Shield protects your app from common attacks eg: SQL injection, XSS, CSRF attacks
    shield({mode:"LIVE"}),
    detectBot({
      mode:"LIVE",
      // *Block all the bots excepts search engine bots
      allow:[
        "CATEGORY:SEARCH_ENGINE",
        // see the full list at https://arcjet.com/bot-list
      ]
    }),
    // Create a token bucket rate limit.
    tokenBucket({
      mode:"LIVE",
      refillRate:5, // Refill 5 tokens per interval
      interval: 10, // Interval of 10 seconds
      capacity: 10, // Capacity of 10 tokens
    }),
  ]
})