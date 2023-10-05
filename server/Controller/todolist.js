import TodoItem from "../models/TodoItem.js";

// POST ADDITEM TO MONGODB
export const addTodo = async (req, res) => {
  try {
    const newItem = TodoItem({ item: req.body.item });
    const savenewItem = await newItem.save();
    res.status(200).json({
      message: "SAVE SUCCESS",
      data: savenewItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "SAVE FAIL",
    });
  }
};

// GET ITEM FROM MONGODB
export const getTodo = async (req, res) => {
  try {
    const getItemall = await TodoItem.find({});
    res.status(200).json({
      message: "GET ITEM ALL SUCCESS",
      data: getItemall,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET ITEM ALL FAIL",
    });
  }
};

//PUT UPDATE
export const updateTodo = async (req, res) => {
  try {
    const updateItem = await TodoItem.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({
      message: "PUT ITEM SUCCESS",
      data: updateItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET ITEM ALL FAIL",
    });
  }
};

//DELETE ITEM
export const deleteTodo = async (req, res) => {
  try {
    const deleteItem = await TodoItem.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "DELETE SUCCESS",
      data: deleteItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE FAIL",
    });
  }
};
