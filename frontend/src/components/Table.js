import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Popup from "./Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_URL = "http://3.64.193.26:5000"
const socket = io(BASE_API_URL);

export default function Table() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    socket.on("update", fetchItems);
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_API_URL}/api/items`);
      setItems(res.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${BASE_API_URL}/api/items/${id}`);
      socket.emit("update");
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="p-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between mb-2">
        <input
          className="border p-2 w-full max-w-sm"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={() => { setSelectedItem(null); setIsPopupOpen(true); }}
        >
          Add Item
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
              .map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="bg-yellow-500 text-white px-2 mr-2"
                      onClick={() => { setSelectedItem(item); setIsPopupOpen(true); }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} item={selectedItem} />
    </div>
  );
}
