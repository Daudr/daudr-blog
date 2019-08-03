import * as functions from "firebase-functions"
import * as crypto from "crypto"
import * as Parser from "rss-parser"

const hash = crypto.createHash("sha256")
const parser = new Parser()

hash.on("readable", () => {
  const data = hash.read()
  if (data) {
    console.log(data.toString("hex"))
  }
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const pushNotification = functions.pubsub
  .schedule("every day 11:00")
  .onRun(async context => {
    const feed = await parser.parseURL("https://blog.daudr.me/rss.xml")

    const items = feed.items.map(item => item.link)

    hash.write(items.toString())

    console.log(items)
  })
