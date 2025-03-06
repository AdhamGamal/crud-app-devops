import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:5000"
const socket = io(BASE_API_URL);

export default function Popup({ isOpen, onClose, item }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { name, description };
      if (item) {
        await axios.put(`${BASE_API_URL}/api/items/${item._id}`, data);
        toast.success("Item updated successfully!");
      } else {
        await axios.post(`${BASE_API_URL}/api/items`, data);
        toast.success("Item added successfully!");
      }

      socket.emit("update");
      onClose();
    } catch (error) {
      toast.error("Operation failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md w-1/3">
        <h2 className="text-lg mb-3">{item ? "Edit Item" : "Add Item"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-500 text-white" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white" disabled={loading}>
              {loading ? "Saving..." : item ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
