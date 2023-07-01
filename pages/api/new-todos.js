import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://azharibraheem482:0o0lLf3TWEAukMqW@cluster0.qgbncx2.mongodb.net/todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    const result = await todosCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json(result);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
