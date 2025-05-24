import { Router, urlencoded } from "express";
import "dotenv/config";
import MongoStore from "connect-mongo";
const mongodb_database = process.env.MONGODB_DATABASE;
var {database} = include('databaseConnection');
const collection = database.db(mongodb_database).collection('messages');
const router = Router();

router.post('/addMessage', async (req, res) => {
    const { userinp, messageinp } = req.body;
    console.log(req.body)
    await collection.insertOne({
        user: userinp,
        message: messageinp
    });
    return res.status(200).json({success: "a"});
});

router.get('/getMessages', async (req, res) => {
  let messages = await collection.find().toArray();

  return res.status(200).json({messages: messages});
});

export default router;