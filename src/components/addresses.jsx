
import React, { useState } from "react";
import { AddAddressForm } from "./dashboard/user";


export default function Addresses({ addresses, handleAddAddress, handleEditAddress, handleDeleteAddress}) {
  // track which address is being edited
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ label: '', line1: '', city: '', state: '', pin: '' });

  // start editing address: fill form with current data
  const startEditing = (address) => {
    setEditingId(address.id);
    setEditForm({ ...address });
  };

   console.log("handleDeleteAddress prop:", handleDeleteAddress);

  // cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ label: '', line1: '', city: '', state: '', pin: '' });
  };

  // submit edit form
  const submitEdit = (e) => {
    e.preventDefault();
    handleEditAddress(editForm);  // send updated address back to parent
    cancelEditing();
  };

  return (
    <section>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="font-semibold mb-4">Saved Addresses</h2>
        <div className="space-y-3">
          {addresses.map(a => (
            <div key={a.id} className="p-3 border rounded">
              {editingId === a.id ? (
                // Edit mode: show form inputs
                <form onSubmit={submitEdit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={editForm.label}
                    onChange={e => setEditForm(f => ({ ...f, label: e.target.value }))}
                    placeholder="Label (Home/Work)"
                    className="p-2 border rounded bg-white dark:bg-gray-800"
                  />
                  <input
                    value={editForm.line1}
                    onChange={e => setEditForm(f => ({ ...f, line1: e.target.value }))}
                    placeholder="Address line"
                    className="p-2 border rounded bg-white dark:bg-gray-800"
                  />
                  <input
                    value={editForm.city}
                    onChange={e => setEditForm(f => ({ ...f, city: e.target.value }))}
                    placeholder="City"
                    className="p-2 border rounded bg-white dark:bg-gray-800"
                  />
                  <input
                    value={editForm.pin}
                    onChange={e => setEditForm(f => ({ ...f, pin: e.target.value }))}
                    placeholder="PIN"
                    className="p-2 border rounded bg-white dark:bg-gray-800"
                  />
                  <div className="sm:col-span-2 flex gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // View mode: show address info + edit button
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.label}</div>
                    <div className="text-sm text-gray-500">{a.line1}, {a.city} — {a.pin}</div>
                  </div>
                  <div className="text-sm flex gap-2">
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() => startEditing(a)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 border rounded text-red-600 hover:bg-red-100"
                      
                      onClick={() => {console.log("Delete clicked for id:", a.id);
                        handleDeleteAddress(a.id)}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <AddAddressForm onAdd={handleAddAddress} />
      </div>
    </section>
  );
}
