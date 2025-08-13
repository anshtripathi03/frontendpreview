import React, { useState } from 'react';
import DeliveryBoard from './deliverboard'; // or the correct relative path


function OrderStatusProgress({ currentStatus }) {
    const steps = [
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
    ];

    // Get current step index, Cancelled treated specially
    let currentIndex = steps.indexOf(currentStatus);
    // if (currentStatus === "Cancelled") currentIndex = steps.length - 1;

    return (
        <div className="mt-4 flex items-center space-x-6">
            {steps.map((step, idx) => {
                const isActive = idx === currentIndex;
                const isCompleted = idx < currentIndex && currentStatus !== "Cancelled";
                const isCancelled = currentStatus === "Cancelled";

                return (
                    <div key={step} className="flex flex-col items-center">
                        {/* Circle */}
                        <div
                            className={`h-8 w-8 rounded-full border-2 flex items-center justify-center
                ${isCancelled && step === "Cancelled"
                                    ? "bg-red-600 border-red-600"
                                    : isActive || isCompleted
                                        ? "bg-green-600 border-green-600"
                                        : "bg-white border-gray-50"
                                }
              `}
                        >
                            {isActive || isCompleted ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <div className="text-gray-50 text-xs">{idx + 1}</div>
                            )}
                        </div>
                        {/* Label */}
                        <div
                            className={`mt-1 text-xs ${isCancelled && step === "Cancelled"
                                ? "text-red-600 font-bold"
                                : isActive || isCompleted
                                    ? "text-green-600 font-bold"
                                    : "text-gray-400"
                                }`}
                        >
                            {step}
                        </div>
                        {/* Line */}
                        {idx !== steps.length - 1 && (
                            <div
                                className={`absolute top-4 left-10 h-1 w-20 ${idx < currentIndex && !isCancelled
                                    ? "bg-green-600"
                                    : "bg-gray-300"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function Orders({ orders, handleCancelOrder, onSelectOrder }) {
    const [expandedOrder, setExpandedOrder] = useState(null);
    const filteredOrders = orders;

    return (
        <section>
            <div className="bg-inherit dark:bg-gray-800 rounded-lg">
                <h2 className="font-semibold mb-3">All Orders</h2>
                <div className="overflow-x-auto">
                    <div className="flex flex-col gap-3 md:gap-10">
                        {filteredOrders.map(o => (
                            <div key={o.ordername} onClick={() => onSelectOrder(o)}
                                className={`p-1 rounded-xl cursor-pointer flex gap-5 ${o.status === "Cancelled" ? 
                                    'bg-red-100 border-solid border-[5px] border-red-500' : 
                                    'bg-white border-solid border-[1px] border-black'
                                    }`}>
                                <div key={o.ordername} className={`flex gap-5
                                `} >
                                    <div className={`flex md:gap-[3px]
                                     `} >
                                        <div className=" h-[20vw] w-[20vw] md:h-[15vw] md:w-[15vw]">
                                            <img
                                                src={o.orderimage}
                                                alt={o.ordername}
                                                className="h-full w-full object-cover rounded-xl"
                                            />
                                        </div>
                                        <div className="flex w-[38.8vw] bg-inherit md:text-[1.3vw] md:w-[35vw] pl-2 line flex-col justify-start">
                                            <h1 className="line-clamp-1  md:text-[3vw] font-bold">{o.ordername}</h1>
                                            <h3>Price: {o.total}</h3>
                                            <h4>Date: {o.date}</h4>
                                            <h4>Status: {o.status}</h4>
                                        </div>
                                        <div className="self-start bg-inherit">
                                            {(o.status === "Processing" || o.status === "Shipped") && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // prevent toggling the detail panel when clicking cancel
                                                        handleCancelOrder(o.ordername);
                                                    }}
                                                    className="md:px-3 md:py-2 px-2 py-1 md:text-[1.1vw] bg-red-50 text-red-600 rounded-lg"
                                                >
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    </div>



                                    {expandedOrder === o.ordername && (
                                        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                                            <h3 className="font-semibold mb-2">Delivery Status</h3>
                                            <OrderStatusProgress currentStatus={o.status} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
