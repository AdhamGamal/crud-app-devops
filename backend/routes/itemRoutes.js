import express from "express";
import Item from "../models/Item.js"; // Add .js extension

const router = express.Router();

export default (io) => {
  // Get all items
  router.get("/", async (req, res) => {
    const items = await Item.find();
    res.json(items);
  });

  // Add new item
  router.post("/", async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    io.emit("update"); // Notify all clients
    res.json(item);
  });

  // Update item
  router.put("/:id", async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    io.emit("update");
    res.json(updatedItem);
  });

  // Delete item
  router.delete("/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    io.emit("update");
    res.json({ message: "Item deleted" });
  });

  return router;
};