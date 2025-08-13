
import React, { useState, useEffect } from "react";

import Overview from '../overview';
import Orders from '../orders';
import Wishlist from '../wishlist';
import Addresses from '../addresses';
import Account from '../account';
import Settings from '../settings';
import DeliveryBoard from '../deliverboard';

function NavItem({ label, id, activeSection, setActiveSection }) {
  const active = activeSection === id;
  return (
    <button
      onClick={() => setActiveSection(id)}
      className={`w-full text-left px-3 py-2 rounded ${active ? ' bg-black text-white dark:hover:bg-gray-900' : ' '}`}
    >
      {label}
    </button>
  );
}

function StatCard({title, value}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function AddAddressForm({ onAdd }) {
  const [form, setForm] = useState({ label: '', line1: '', city: '', state: '', pin: '' });
  const submit = (e) => {
    e.preventDefault();
    if (!form.line1 || !form.city || !form.pin) return alert('Fill required');
    onAdd(form);
    setForm({ label: '', line1: '', city: '', state: '', pin: '' });
  };
  return (
    <form onSubmit={submit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="Label (Home/Work)" className="p-2 border rounded bg-white dark:bg-gray-800" />
      <input value={form.line1} onChange={e => setForm(f => ({ ...f, line1: e.target.value }))} placeholder="Address line" className="p-2 border rounded bg-white dark:bg-gray-800" />
      <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="City" className="p-2 border rounded bg-white dark:bg-gray-800" />
      <input value={form.pin} onChange={e => setForm(f => ({ ...f, pin: e.target.value }))} placeholder="PIN" className="p-2 border rounded bg-white dark:bg-gray-800" />
      <div className="sm:col-span-2">
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Add Address</button>
      </div>
    </form>
  );
}

function MobileSidebar() {


  // Simple component switcher based on activePage state
  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return <div>Overview Content</div>;
      case "orders":
        return <div>Orders Content</div>;
      case "wishlist":
        return <div>Wishlist Content</div>;
      default:
        return <div>Overview Content</div>;
    }
  };

  const handleClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false); // close sidebar on selection
  };

  return (
    <>
      {/* Hamburger button only on mobile */}
      <button
        className="p-2 m-2 text-gray-700 rounded-md md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <button
          className="p-2 m-2 text-gray-700 rounded-md"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul className="flex flex-col p-4 space-y-2">
          {["overview", "orders", "wishlist"].map((page) => (
            <li key={page}>
              <button
                onClick={() => handleClick(page)}
                className={`w-full text-left px-3 py-2 rounded ${activePage === page ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                  }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Render active page content */}
      <main className="p-4">
        {renderPage()}
      </main>
    </>
  );
}

function OrdersContainer({ orders, handleCancelOrder }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to select order and open delivery board
  const openDeliveryBoard = (order) => {
    setSelectedOrder(order);
  };

  // Function to go back to orders list
  const closeDeliveryBoard = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      {!selectedOrder ? (
        <Orders
          orders={orders}
          handleCancelOrder={handleCancelOrder}
          onSelectOrder={openDeliveryBoard}
        />
      ) : (
        <DeliveryBoard order={selectedOrder} onBack={closeDeliveryBoard} />
      )}
    </div>
  );
}


export default function EcommerceUserDashboard() {
  // UI state
  const [activeSection, setActiveSection] = useState("overview");
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", line1: "123 Street", city: "City", pin: "12345" },
    { id: 2, label: "Office", line1: "456 Avenue", city: "City", pin: "67890" },
  ]);

  const [user, setUser] = useState({
    name: "Ansh Tripathi",
    email: "ansh@example.com",
    phone: "+91 98765 43210",
    userId: "ghfcfghvg",
    password: "anshtripathi03"
  });

  const [orders, setOrders] = useState([
    { ordername: "business inauguration", date: "2025-08-06", total: 499, status: "Processing", orderimage: "https://i.etsystatic.com/14336051/r/il/7024a4/6431020757/il_340x270.6431020757_c8uf.jpg", quantity: 50 },
    { ordername: "wedding", date: "2025-07-30", total: 2499, status: "Delivered", orderimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaADUseTdMvOMBO4Xrg9HcZMVMmT6N74Fecw&s", quantity: 50 },
    { ordername: "baby shower", date: "2025-08-01", total: 1299, status: "Shipped", orderimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmMZeDLqnOP1ENxnYPMsvWj5cTuI5E7nQki2lSqrI6yJZlLRRP4s5ohi8lFYUy_Ovnhus&usqp=CAU", quantity: 50 }
  ]);

  const [wishlist, setWishlist] = useState([
    { id: "P-101", title: "Minimal Leather Wallet", price: 699 },
    { id: "P-202", title: "Bluetooth Earbuds", price: 1499 },
  ]);

  const pageTitles = {
    overview: "Overview",
    orders: "My Orders",
    wishlist: "Wishlist",
    addresses: "My Addresses",
    account: "My Account",
    settings: "Settings",
  };

  
  const openDeliveryBoard = (order) => {
    setSelectedOrder(order);
    setActiveSection('deliveryBoard');  // switch view to delivery board
  };

  const closeDeliveryBoard = () => {
    setSelectedOrder(null);
    setActiveSection('orders');  // back to orders list
  };

  function handleAddAddress(newAddress) {
    setAddresses(prev => [...prev, newAddress]);
  }

  // Edit address handler - You need to create this
  function handleEditAddress(updatedAddress) {
    setAddresses(prev =>
      prev.map(addr => (addr.id === updatedAddress.id ? updatedAddress : addr))
    );
  }


  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

  const handleCancelOrder = (ordername) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(o =>
        o.ordername === ordername ? { ...o, status: "Cancelled" } : o
      );

      // Update selectedOrder with the new cancelled order if it's the one selected
      if (selectedOrder && selectedOrder.ordername === ordername) {
        setSelectedOrder(updatedOrders.find(o => o.ordername === ordername));
      }

      return updatedOrders;
    });
  };

  const handleRemoveWishlist = (id) => setWishlist(prev => prev.filter(p => p.id !== id));

  function handleDeleteAddress(id) {
    console.log("Deleting address with id:", id);
  setAddresses(prev => prev.filter(addr => addr.id !== id));
}



  return (

    <div className="min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-5">

        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-3 ">
            <h1 className="text-2xl font-semibold">Your Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search orders by id..."
                  className="px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4  md:hidden">
          <div>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 mb-4"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-300 ">
              {pageTitles[activeSection]}
            </h1>
          </div>
        </div>

        <div
          onClick={() => setMobileSidebarOpen(false)}
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } lg:hidden`}
        ></div>

        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black shadow-md z-50 transform transition-transform duration-300
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        >
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-2 m-2 rounded-md text-gray-700 dark:text-gray-200"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <ul className="flex flex-col p-4 space-y-2">
            {["overview", "orders", "wishlist", "addresses", "account", "settings"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => {
                    setActiveSection(section);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded ${activeSection === section ? "bg-black text-white font-bold" : "hover:bg-black"
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 bg-white dark:bg-black rounded-lg p-4 shadow hidden md:block">
            <nav className="space-y-1">
              <NavItem label="Overview" id="overview" activeSection={activeSection} setActiveSection={setActiveSection} />
              <NavItem label="Orders" id="orders" activeSection={activeSection} setActiveSection={setActiveSection} />
              <NavItem label="Wishlist" id="wishlist" activeSection={activeSection} setActiveSection={setActiveSection} />
              <NavItem label="Addresses" id="addresses" activeSection={activeSection} setActiveSection={setActiveSection} />
              <NavItem label="Account" id="account" activeSection={activeSection} setActiveSection={setActiveSection} />
              <NavItem label="Settings" id="settings" activeSection={activeSection} setActiveSection={setActiveSection} />
            </nav>

            <div className="mt-6 border-t pt-4 text-xs text-gray-500 dark:text-gray-400">
              Joined: <strong>Jan 2024</strong>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            {activeSection === 'overview' && (
              <Overview
                orders={orders}
                wishlist={wishlist}
                formatINR={formatINR}
                handleRemoveWishlist={handleRemoveWishlist}
                handleCancelOrder={handleCancelOrder}
              />
            )}
            {activeSection === 'orders' && (
              <Orders
                orders={orders}
                handleCancelOrder={handleCancelOrder}
                onSelectOrder={openDeliveryBoard}
              />
            )}
            {activeSection === 'wishlist' && (
              <Wishlist
                wishlist={wishlist}
                formatINR={formatINR}
                handleRemoveWishlist={handleRemoveWishlist}
              />
            )}
            {activeSection === 'addresses' && (
              <Addresses
                addresses={addresses}
                handleAddAddress={handleAddAddress}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
              />
            )}
            {activeSection === 'account' && (
              <Account
                user={user}
                setUser={setUser}
              />
            )}
            {activeSection === 'deliveryBoard' && selectedOrder && (
              <DeliveryBoard order={selectedOrder} onBack={closeDeliveryBoard}
                handleCancelOrder={handleCancelOrder}
                  
              />
            )}

            {activeSection === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    </div>
  );


}

export { AddAddressForm, StatCard, MobileSidebar, OrdersContainer };


