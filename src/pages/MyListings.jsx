import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  // Fetch user listings
  useEffect(() => {
    fetch(`http://localhost:3000/products?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error(err));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Listing deleted successfully!");
        setListings(listings.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.");
    }
  };

  return (
    <div className="my-20 px-5 container mx-auto">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">My Listings</h2>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-indigo-100">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item._id} className="hover:bg-indigo-50">
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.price && item.price > 0
                      ? `৳${item.price}`
                      : "Free for Adoption"}
                  </td>
                  <td>{item.location}</td>
                  <td className="space-x-2">
                    {/* Edit button */}
                    <button className="btn btn-sm btn-primary">Edit</button>
                    {/* Delete button */}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyListings;
