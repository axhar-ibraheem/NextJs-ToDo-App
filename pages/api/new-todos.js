import { MongoClient, ObjectId } from "mongodb";

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
  } else if (req.method === "PUT") {
    const { id, task, completed } = req.body;

    if (!id || !task || completed === undefined) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://azharibraheem482:0o0lLf3TWEAukMqW@cluster0.qgbncx2.mongodb.net/todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");

    const result = await todosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { task, completed } }
    );
    console.log(result);

    client.close();

    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Todo updated successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
