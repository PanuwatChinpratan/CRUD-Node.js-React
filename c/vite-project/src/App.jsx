import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [textItem, setText] = useState("");
  const [listItem, setList] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  //additem
  const AddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/item", {
        item: textItem,
      });

      setList((prev) => [...prev, res.data.data]); // เรียกใช้ getItemsList เพื่อ update list ล่าสุดลงไป
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  //get item
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/items");
        setList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);

  // delete items
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/item/${id}`);
      const newListitem = listItem.filter((item) => item._id !== id);
      setList(newListitem);
      console.log(res);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  // Update items
  const updateApiItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res);
      const updatedItemIndex = listItem.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = listItem[updatedItemIndex];
      updatedItem.item = updateItemText;
      setList([...listItem]);
      setIsUpdating("");
      setUpdateItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  // Update Form
  const UpdateForm = () => (
    <form className="update-form" onSubmit={updateApiItem}>
      <input
        type="text"
        value={updateItemText}
        onChange={(e) => setUpdateItemText(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );

  return (
    <div className="App">
      <h1>TODOLIST</h1>
      <form onSubmit={(e) => AddItem(e)}>
        <input
          type="text"
          value={textItem}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todolist">
        {listItem.map((item, i) => (
          <div key={i}>
            {isUpdating === item._id ? (
              UpdateForm()
            ) : (
              <>
                <p>{item.item}</p>
                <button
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
