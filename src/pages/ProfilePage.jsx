import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userRes = await axios.get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data.user);
        setOrders(userRes.data.orders);
      } catch (err) {
        setUser(null);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token]);

  if (loading) return <div className="text-pink-500">Loading profile...</div>;
  if (!user) return <div className="text-red-500">Not logged in or error loading profile.</div>;

  return (
    <div className="min-h-screen bg-pink-50 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Profile</h2>
        <div className="mb-6">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Verified:</strong> {user.verified ? "Yes" : "No"}</p>
        </div>
        <h3 className="text-xl font-bold text-pink-500 mb-2">Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="list-disc pl-6">
            {orders.map(order => (
              <li key={order.id}>
                Order #{order.id} - {order.status} - ${order.total}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
