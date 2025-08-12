import React from 'react';

export default function Settings() {
  return (
    <section>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="font-semibold mb-4">Settings</h2>
        <div className="space-y-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked disabled /> <span>Receive marketing emails</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={true} disabled /> <span>Two-factor authentication enabled</span>
          </label>
        </div>
      </div>
    </section>
  );
}
