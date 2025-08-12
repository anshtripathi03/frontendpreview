import React from 'react';

export default function Wishlist({ wishlist, formatINR, handleRemoveWishlist }) {
  return (
    <section>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="font-semibold mb-3">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map(p => (
            <div key={p.id} className="p-4 border rounded flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded" />
              <div className="flex-1">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500">{formatINR(p.price)}</div>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 border rounded">Add to cart</button>
                  <button onClick={() => handleRemoveWishlist(p.id)} className="px-3 py-1 border rounded">Remove</button>
                </div>
              </div>
            </div>
          ))}
          {wishlist.length === 0 && <div className="text-sm text-gray-500">Nothing here yet</div>}
        </div>
      </div>
    </section>
  );
}
