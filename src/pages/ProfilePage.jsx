import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error loading profile:", err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {profile.user.email}!</h1>
      <p>Status: {profile.user.is_verified ? "✅ Verified" : "❌ Not Verified"}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Orders</h2>
      {profile.orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {profile.orders.map((order) => (
            <li key={order.id} className="border p-3 rounded-lg shadow">
              <p><b>Product:</b> {order.product_name}</p>
              <p><b>Quantity:</b> {order.quantity}</p>
              <p><b>Price:</b> RM{order.price}</p>
              <p><b>Ordered at:</b> {new Date(order.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
