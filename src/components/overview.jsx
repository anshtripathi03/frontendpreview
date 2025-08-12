import React from 'react';
import {StatCard} from './dashboard/user';

export default function Overview({ orders, wishlist, formatINR, handleRemoveWishlist, handleCancelOrder }) {
  const totalOrders = orders.length;
  const lastOrder = orders[0] || null;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Spent on last order" value={lastOrder ? formatINR(lastOrder.total) : '—'} />
        <StatCard title="Last Order" value={lastOrder ? `${lastOrder.ordername} • ${lastOrder.status}` : '—'} />
      </div>

      <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 uppercase">
                          <th className="py-2">Order</th>
                          <th className="py-2">Date</th>
                          <th className="py-2">Total</th>
                          <th className="py-2">Status</th>
                          <th className="py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.ordername} className="border-t dark:border-gray-700">
                            <td className="py-3 font-mono text-xs">{o.ordername}</td>
                            <td className="py-3">{o.date}</td>
                            <td className="py-3">{formatINR(o.total)}</td>
                            <td className="py-3">{o.status}</td>
                            <td className="py-3">
                              {(o.status === 'Processing') ? (
                                <button onClick={() => handleCancelOrder(o.ordername)} className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded">Cancel</button>
                              ) : ((o.status === 'Shipped') ? (
                                <div className="px-3 py-1 text-xs bg-green-200 text-black rounded">
                                  On It"s Way
                                </div>
                              ) : ((o.status === 'Cancelled') ? (
                                <div className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded">
                                  Cancelled
                                </div>
                              ) : (
                                <div className="px-3 py-1 text-xs bg-green-400 text-black rounded">
                                  Happy to Deliver
                                </div>

                              )))
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

      {/* Recent orders table omitted for brevity — you can add it here or move to Orders.jsx */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="md:col-span-2 h-full w-full bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
          <h3 className="font-semibold mb-2">Wishlist Preview</h3>
          <div className="flex flex-wrap gap-3">
            {wishlist.map(p => (
              <div key={p.id} className="p-1 border rounded w-44">
                <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded mb-2" />
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">{formatINR(p.price)}</div>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 text-xs px-2 py-1 border rounded">Add to cart</button>
                  <button onClick={() => handleRemoveWishlist(p.id)} className="text-xs px-2 py-1 border rounded">Remove</button>
                </div>
              </div>
            ))}
            {wishlist.length === 0 && <div className="text-sm text-gray-500">No items in wishlist</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
