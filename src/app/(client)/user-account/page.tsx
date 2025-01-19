"use client";
import { Button } from "@/components/ui/button";
import { Edit, FileText, LogOut, User } from "lucide-react";
import React from "react";

const UserAccountPage: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    address: "123 Street, City, Country",
  };

  const orderHistory = [
    {
      id: "ORD12345",
      date: "2025-01-10",
      total: "₹1,250.00",
      status: "Delivered",
    },
    {
      id: "ORD12346",
      date: "2025-01-12",
      total: "₹3,400.00",
      status: "Pending",
    },
    {
      id: "ORD12347",
      date: "2025-01-14",
      total: "₹850.00",
      status: "Cancelled",
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        My Account
      </h1>

      {/* User Information */}
      <div className=" rounded-lg shadow-lg  p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <User size={40} className="" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.address}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <Button className="flex items-center gap-2 bg-white text-blue-700 hover:bg-gray-100 px-4 py-2">
            <Edit size={18} /> Update Profile
          </Button>
          <Button className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 px-4 py-2">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Order History
        </h2>
        {orderHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm">{order.id}</td>
                    <td className="py-2 px-4 text-sm">{order.date}</td>
                    <td className="py-2 px-4 text-sm">{order.total}</td>
                    <td
                      className={`py-2 px-4 text-sm font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                    >
                      {order.status}
                    </td>
                    <td className="py-2 px-4">
                      <Button className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2">
                        <FileText size={16} /> View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">You have no orders yet.</p>
        )}
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Account Settings
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="font-medium text-gray-700">Change Password:</span>
            <span className="text-gray-600">Update your login credentials.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-medium text-gray-700">Manage Addresses:</span>
            <span className="text-gray-600">Add or update delivery addresses.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-medium text-gray-700">Payment Methods:</span>
            <span className="text-gray-600">Save your preferred payment methods.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-medium text-gray-700">Notifications:</span>
            <span className="text-gray-600">Configure email and SMS alerts.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAccountPage;
