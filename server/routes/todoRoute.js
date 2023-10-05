// Change the import to use the correct case
import express from "express";
import {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../Controller/todolist.js";

const router = express.Router();

// *************************************API **************************************************//
// ADD ITEM
router.post("/api/item", addTodo);

// GET ITEM
router.get("/api/items", getTodo);

//UPDATE ITEM
router.put("/api/item/:id", updateTodo);

//DELETE ITEM
router.delete("/api/item/:id", deleteTodo);
// *************************************API **************************************************//
export default router;
