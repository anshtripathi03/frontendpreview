

import React from "react";



const statuses = [
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
];

const statusColors = {
    Processing: "bg-yellow-400",
    Shipped: "bg-blue-400",
    "Out for Delivery": "bg-indigo-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
};

export default function DeliveryBoard({ order, handleCancelOrder, onBack }) {
    const currentStatus = order.status;
    const currentIndex = statuses.indexOf(currentStatus);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md dark:bg-gray-800">
            <button
                onClick={onBack}
                className="mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
                &larr; Back to Orders
            </button>

            <h1 className="text-4xl font-bold mb-4">{order.ordername}</h1>

            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={order.orderimage}
                    alt={order.ordername}
                    className="w-full md:w-1/3 rounded-lg object-cover"
                />

                <div className="flex-1">
                    <p className="text-lg mb-2">
                        <strong>Price:</strong> ₹{order.total}
                    </p>
                    <p className="text-lg mb-2">
                        <strong>Date:</strong> {order.date}
                    </p>
                    <p className="text-lg mb-6">
                        <strong>Status:</strong> {order.status}
                    </p>
                    {(order.status === "Processing" || order.status === "Shipped") && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // prevent toggling the detail panel when clicking cancel
                                handleCancelOrder(order.ordername);
                            }} // or lift cancel order here
                            className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Cancel Order
                        </button>
                    )}

                    {/* Delivery progress bar */}
                   {/* Delivery progress bar */}
<div className="relative flex items-center justify-between w-full max-w-4xl mx-auto mt-4 px-4">
  {/* Thick horizontal line passing through the circles */}
  <div className="absolute top-[15px] left-4 right-4 h-2 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2 rounded-full z-0"></div>

  {/* Show progress only if NOT cancelled */}
  {currentStatus !== "Cancelled" && (
    statuses.slice(0, -1).map((status, i) => {
      const isActive = i <= currentIndex;
      return (
        <div
          key={status}
          className="relative flex flex-col items-center z-10"
          style={{ width: `${100 / (statuses.length - 1)}%` }}
        >
          <div
            className={`w-8 h-8 rounded-full border-4 transition-colors duration-500 bg-white
              ${isActive ? statusColors[status] : "border-gray-400 dark:border-gray-500 "}
            `}
          ></div>
          <span
            className={`mt-2 text-xs text-center w-24 select-none 
              ${isActive ? "font-semibold text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}
            `}
          >
            {status}
          </span>

        
        </div>
      );
    })
  )}
</div>



                    {currentStatus === "Cancelled" && (
                        <p className=" ml-4 mt-8 text-red-600 font-semibold">This order has been cancelled.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
