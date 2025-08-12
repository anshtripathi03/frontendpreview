import React from 'react';

export default function Account({ user, setUser }) {
  return (
    <section>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="font-semibold mb-4">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Name</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.name}
              onChange={(e) => setUser(u => ({ ...u, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.email}
              onChange={(e) => setUser(u => ({ ...u, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.phone}
              onChange={(e) => setUser(u => ({ ...u, phone: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm">User Id</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.userId}
              onChange={(e) => setUser(u => ({ ...u, userId: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.password}
              onChange={(e) => setUser(u => ({ ...u, password: e.target.value }))}
            />
          </div>
          <div className="flex items-end">
            <button className="px-4 py-2 bg-primary text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </section>
  );
}
