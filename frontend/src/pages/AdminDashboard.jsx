import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminFeedback from "../componends/AdminFeedback";
import AdminSuppliers from "../componends/AdminSuppliers";
const API = "http://localhost:3000";

const ORDER_STATUSES = [
  "Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

// Same category / subCategory values used in data.js
// (must match exactly so products show on the user side)
const CATEGORY_MAP = {
  women: ["dresses", "sarees", "tops", "footwear"],
  men: ["shirts", "tshirts", "trousers", "footwear"],
  boys: ["shirts", "tshirts", "shorts"],
  girls: ["frocks", "tops", "skirts"],
  jewellery: ["necklace", "earrings", "bangles", "rings"],
  homeDecor: ["kitchen", "lighting", "wallDecor", "furniture", "usefulProducts"],
  electronics: ["mobiles", "laptops", "accessories"],
  toys: ["toys"],
  books: ["books"],
};

// "homeDecor" -> "Home Decor"
const prettify = (text = "") =>
  text.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

const EMPTY_FORM = {
  name: "",
  price: "",
  category: "",
  subCategory: "",
  stock: "",
  image: "",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loginActivity, setLoginActivity] = useState([]);
  const [orders, setOrders] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("overview");

  const [editingId, setEditingId] = useState(null);
  const [editStock, setEditStock] = useState("");

  const [orderMessages, setOrderMessages] = useState({});

  // small notice shown next to each order's Save button
  const [orderNotice, setOrderNotice] = useState({});

  const [form, setForm] = useState(EMPTY_FORM);

  // filter for the "Your Products" list
  const [filterCategory, setFilterCategory] = useState("all");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // Load dashboard data
  const fetchDashboardData = async () => {
    setDataLoading(true);
    setMessage("");

    const endpoints = [
      { key: "products", url: `${API}/product` },
      { key: "users", url: `${API}/user` },
      { key: "loginActivity", url: `${API}/login-activity` },
      { key: "orders", url: `${API}/orders` },
    ];

    const results = await Promise.allSettled(
      endpoints.map(async (endpoint) => {
        const response = await fetch(endpoint.url);

        if (!response.ok) {
          throw new Error(`Unable to load ${endpoint.key}`);
        }

        return {
          key: endpoint.key,
          data: await response.json(),
        };
      })
    );

    results.forEach((result) => {
      if (result.status !== "fulfilled") {
        console.error(result.reason);
        return;
      }

      const { key, data } = result.value;

      if (key === "products") {
        setProducts(Array.isArray(data) ? data : []);
      }

      if (key === "users") {
        setUsers(Array.isArray(data) ? data : []);
      }

      if (key === "loginActivity") {
        setLoginActivity(Array.isArray(data) ? data : []);
      }

      if (key === "orders") {
        setOrders(Array.isArray(data) ? data : []);
      }
    });

    const failedCount = results.filter(
      (result) => result.status === "rejected"
    ).length;

    if (failedCount > 0) {
      setMessage(
        "Some dashboard data could not be loaded. Check that the backend is running."
      );
    }

    setDataLoading(false);
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchDashboardData();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // When category changes, reset subCategory
  // (auto-select it if the category has only one, e.g. books)
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const subs = CATEGORY_MAP[category] || [];

    setForm({
      ...form,
      category,
      subCategory: subs.length === 1 ? subs[0] : "",
    });
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      !form.name.trim() ||
      form.price === "" ||
      !form.category ||
      !form.subCategory ||
      form.stock === ""
    ) {
      setMessage("Please fill all required product fields.");
      return;
    }

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!Number.isFinite(price) || price < 0) {
      setMessage("Enter a valid product price.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setMessage("Enter a valid stock quantity.");
      return;
    }

    const newProduct = {
      name: form.name.trim(),
      price,
      category: form.category,
      subCategory: form.subCategory,
      stock,
      image: form.image.trim(),
    };

    try {
      setLoading(true);

      const response = await fetch(`${API}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Product could not be added.");
        return;
      }

      if (data.product) {
        setProducts((prev) => [...prev, data.product]);
      } else {
        await fetchDashboardData();
      }

      setForm(EMPTY_FORM);

      setMessage("Product added successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Server error while adding product.");
    } finally {
      setLoading(false);
    }
  };

  // Edit stock
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditStock(String(product.stock ?? 0));
    setMessage("");
  };

  // Save stock
  const handleSaveStock = async (productId) => {
    const stockValue = Number(editStock);

    if (
      editStock.trim() === "" ||
      !Number.isInteger(stockValue) ||
      stockValue < 0
    ) {
      setMessage("Enter a valid stock quantity (0 or more).");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/product/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: stockValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to update stock.");
        return;
      }

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? {
                ...product,
                ...(data.product || {}),
                stock: stockValue,
              }
            : product
        )
      );

      setEditingId(null);
      setEditStock("");
      setMessage("Stock updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Server error while updating stock.");
    } finally {
      setLoading(false);
    }
  };

  // Update order status and delivery message
  const handleUpdateOrder = async (order) => {
    const deliveryMessage =
      orderMessages[order.id] ?? order.deliveryMessage ?? "";

    setOrderNotice((prev) => ({ ...prev, [order.id]: "Saving..." }));

    try {
      setLoading(true);

      const response = await fetch(`${API}/orders/${order.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: order.status,
          deliveryMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOrderNotice((prev) => ({
          ...prev,
          [order.id]: data.message || "Unable to update order.",
        }));
        return;
      }

      setOrders((prev) =>
        prev.map((item) => (item.id === order.id ? data.order : item))
      );

      setOrderNotice((prev) => ({ ...prev, [order.id]: "Saved ✓" }));
    } catch (error) {
      console.error(error);
      setOrderNotice((prev) => ({
        ...prev,
        [order.id]: "Server error. Backend run aagudha paarunga.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // Find user information for an order
  const getOrderUser = (order) => {
    return users.find((item) => Number(item.id) === Number(order.user_id));
  };

  const visibleProducts =
    filterCategory === "all"
      ? products
      : products.filter((product) => product.category === filterCategory);

  if (!user || user.role !== "admin") {
    return (
      <div style={styles.denied}>
        <h2>Access Denied</h2>
        <p>Admin account mattum indha page access panna mudiyum.</p>
        <button
          style={styles.primaryButton}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Dashboard Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>SmartCart Admin</h1>
          <p style={styles.headerSubtitle}>
            Welcome back, {user.name || "Admin"}!
          </p>
        </div>

        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Navigation */}
      <nav style={styles.nav}>
        {[
          ["overview", "Overview"],
          ["products", "Products"],
          ["suppliers", "Suppliers"],
          ["users", "Users"],
          ["activity", "Login Activity"],
          ["orders", "Orders"],
          ["feedback", "Feedback"],
        ].map(([section, label]) => (
          <button
            key={section}
            type="button"
            onClick={() => setActiveSection(section)}
            style={{
              ...styles.navButton,
              ...(activeSection === section ? styles.activeNavButton : {}),
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {message && <div style={styles.message}>{message}</div>}

      {dataLoading ? (
        <p style={styles.loadingText}>Loading dashboard data...</p>
      ) : (
        <>
          {/* Overview */}
          {activeSection === "overview" && (
            <section>
              <h2>Dashboard Overview</h2>

              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <span>Total Products</span>
                  <strong>{products.length}</strong>
                </div>

                <div style={styles.statCard}>
                  <span>Total Users</span>
                  <strong>{users.length}</strong>
                </div>

                <div style={styles.statCard}>
                  <span>Total Orders</span>
                  <strong>{orders.length}</strong>
                </div>

                <div style={styles.statCard}>
                  <span>Login Records</span>
                  <strong>{loginActivity.length}</strong>
                </div>

                <div style={styles.statCard}>
                  <span>Cancelled Orders</span>
                  <strong>
                    {orders.filter((order) => order.status === "Cancelled").length}
                  </strong>
                </div>

                <div style={styles.statCard}>
                  <span>Delivered Orders</span>
                  <strong>
                    {orders.filter((order) => order.status === "Delivered").length}
                  </strong>
                </div>
              </div>

              <div style={styles.panel}>
                <h3>Recent Orders</h3>

                {orders.length === 0 ? (
                  <p>No orders yet.</p>
                ) : (
                  <div style={styles.tableWrap}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Order ID</th>
                          <th style={styles.th}>Customer</th>
                          <th style={styles.th}>Total</th>
                          <th style={styles.th}>Status</th>
                          <th style={styles.th}>Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {[...orders]
                          .slice()
                          .reverse()
                          .slice(0, 5)
                          .map((order) => {
                            const customer = getOrderUser(order);

                            return (
                              <tr key={order.id}>
                                <td style={styles.td}>#{order.id}</td>
                                <td style={styles.td}>
                                  {customer?.name || `User #${order.user_id}`}
                                </td>
                                <td style={styles.td}>
                                  ₹{Number(order.total || 0).toFixed(2)}
                                </td>
                                <td style={styles.td}>{order.status}</td>
                                <td style={styles.td}>
                                  {order.createdAt
                                    ? new Date(order.createdAt).toLocaleString()
                                    : "—"}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Products */}
          {activeSection === "products" && (
            <section>
              <h2>Product Management</h2>

              <div style={styles.panel}>
                <h3>＋ Add New Product</h3>

                <form onSubmit={handleAddProduct} style={styles.form}>
                  <label style={styles.inputGroup}>
                    Product Name
                    <input
                      style={styles.input}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                    />
                  </label>

                  <label style={styles.inputGroup}>
                    Price (₹)
                    <input
                      style={styles.input}
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                    />
                  </label>

                  <label style={styles.inputGroup}>
                    Category
                    <select
                      style={styles.input}
                      name="category"
                      value={form.category}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select category</option>
                      {Object.keys(CATEGORY_MAP).map((category) => (
                        <option key={category} value={category}>
                          {prettify(category)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={styles.inputGroup}>
                    Sub Category
                    <select
                      style={styles.input}
                      name="subCategory"
                      value={form.subCategory}
                      onChange={handleChange}
                      disabled={!form.category}
                      required
                    >
                      <option value="">
                        {form.category
                          ? "Select sub category"
                          : "Select category first"}
                      </option>
                      {(CATEGORY_MAP[form.category] || []).map((sub) => (
                        <option key={sub} value={sub}>
                          {prettify(sub)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={styles.inputGroup}>
                    Stock Quantity
                    <input
                      style={styles.input}
                      name="stock"
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="Enter stock"
                      required
                    />
                  </label>

                  <label style={styles.fullWidth}>
                    Product Image URL (optional)
                    <input
                      style={styles.input}
                      name="image"
                      type="url"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="Paste image URL"
                    />
                  </label>

                  {form.image && (
                    <div style={styles.fullWidth}>
                      <p>Image Preview</p>
                      <img
                        src={form.image}
                        alt="Product preview"
                        style={styles.previewImage}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    style={styles.primaryButton}
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Add Product"}
                  </button>
                </form>
              </div>

              <div style={styles.listHeader}>
                <h3>
                  Your Products ({visibleProducts.length}
                  {filterCategory !== "all" ? ` of ${products.length}` : ""})
                </h3>

                <select
                  style={styles.filterSelect}
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {Object.keys(CATEGORY_MAP).map((category) => (
                    <option key={category} value={category}>
                      {prettify(category)}
                    </option>
                  ))}
                </select>
              </div>

              {visibleProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                <div style={styles.productGrid}>
                  {visibleProducts.map((product) => (
                    <article key={product.id} style={styles.productCard}>
                      <div style={styles.imageContainer}>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={styles.productImage}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>

                      <div style={styles.productInfo}>
                        <small style={styles.category}>
                          {prettify(product.category) || "Uncategorized"}
                          {product.subCategory
                            ? ` › ${prettify(product.subCategory)}`
                            : ""}
                        </small>

                        <h3>{product.name}</h3>

                        <h3>
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </h3>

                        {editingId === product.id ? (
                          <div style={styles.editBox}>
                            <p>Current Stock: {product.stock ?? 0}</p>

                            <label>
                              Update Stock
                              <input
                                style={styles.input}
                                type="number"
                                min="0"
                                value={editStock}
                                onChange={(e) => setEditStock(e.target.value)}
                              />
                            </label>

                            <button
                              style={styles.saveButton}
                              onClick={() => handleSaveStock(product.id)}
                              disabled={loading}
                            >
                              Save Stock
                            </button>

                            <button
                              style={styles.cancelButton}
                              onClick={() => {
                                setEditingId(null);
                                setEditStock("");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <p>
                              Stock:{" "}
                              <strong
                                style={{
                                  color:
                                    Number(product.stock) === 0
                                      ? "red"
                                      : "green",
                                }}
                              >
                                {product.stock ?? 0}
                              </strong>
                            </p>

                            <button
                              style={styles.editButton}
                              onClick={() => handleEditClick(product)}
                            >
                              Edit Stock ✏️
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Users */}
          {activeSection === "users" && (
            <section style={styles.panel}>
              <h2>Registered Users ({users.length})</h2>

              {users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <div style={styles.tableWrap}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Phone</th>
                        <th style={styles.th}>Address</th>
                        <th style={styles.th}>Role</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((item) => (
                        <tr key={item.id}>
                          <td style={styles.td}>{item.id}</td>
                          <td style={styles.td}>{item.name || "—"}</td>
                          <td style={styles.td}>{item.gmail || "—"}</td>
                          <td style={styles.td}>{item.phno || "—"}</td>
                          <td style={styles.td}>{item.address || "—"}</td>
                          <td style={styles.td}>{item.role || "user"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Login Activity */}
          {activeSection === "activity" && (
            <section style={styles.panel}>
              <h2>Successful Login Activity</h2>

              {loginActivity.length === 0 ? (
                <p>No successful login records yet.</p>
              ) : (
                <div style={styles.tableWrap}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>User ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Role</th>
                        <th style={styles.th}>Login Time</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loginActivity.map((activity) => (
                        <tr key={activity.id}>
                          <td style={styles.td}>{activity.userId}</td>
                          <td style={styles.td}>{activity.name || "—"}</td>
                          <td style={styles.td}>{activity.gmail || "—"}</td>
                          <td style={styles.td}>{activity.role || "user"}</td>
                          <td style={styles.td}>
                            {activity.loginTime
                              ? new Date(activity.loginTime).toLocaleString()
                              : "—"}
                          </td>
                          <td style={styles.td}>
                            {activity.status || "Success"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <p style={styles.note}>
                This table currently records successful logins only.
              </p>
            </section>
          )}

          {/* Orders */}
          {activeSection === "orders" && (
            <section>
              <h2>Order Management ({orders.length})</h2>

              {orders.length === 0 ? (
                <div style={styles.panel}>
                  <p>No orders have been placed yet.</p>
                </div>
              ) : (
                <div style={styles.orderList}>
                  {[...orders].reverse().map((order) => {
                    const customer = getOrderUser(order);

                    return (
                      <article key={order.id} style={styles.orderCard}>
                        <div style={styles.orderHeader}>
                          <div>
                            <h3>Order #{order.id}</h3>
                            <p style={styles.muted}>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleString()
                                : "Date unavailable"}
                            </p>
                          </div>

                          <strong style={styles.orderTotal}>
                            ₹{Number(order.total || 0).toFixed(2)}
                          </strong>
                        </div>

                        <div style={styles.orderDetails}>
                          <p>
                            <strong>Customer:</strong>{" "}
                            {customer?.name || `User #${order.user_id}`}
                          </p>

                          <p>
                            <strong>Email:</strong>{" "}
                            {customer?.gmail || "Not available"}
                          </p>

                          <p>
                            <strong>Phone:</strong>{" "}
                            {customer?.phno || "Not available"}
                          </p>

                          <p>
                            <strong>Delivery Address:</strong>{" "}
                            {order.address || "Not provided"}
                          </p>
                        </div>

                        <h4>Items</h4>

                        {Array.isArray(order.items) && order.items.length > 0 ? (
                          <ul style={styles.itemList}>
                            {order.items.map((item, index) => (
                              <li key={`${order.id}-${index}`}>
                                {item.name || "Product"} ×{" "}
                                {Number(item.quantity) || 1}
                                {" — ₹"}
                                {(
                                  Number(item.price || 0) *
                                  (Number(item.quantity) || 1)
                                ).toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No item details available.</p>
                        )}

                        {order.status === "Cancelled" && (
                          <div style={styles.cancelledBox}>
                            <strong>Cancellation reason:</strong>{" "}
                            {order.cancellationReason || "Not provided"}
                          </div>
                        )}

                        <div style={styles.orderUpdate}>
                          <label style={styles.inputGroup}>
                            Order Status
                            <select
                              style={styles.input}
                              value={order.status || "Placed"}
                              onChange={(e) => {
                                const newStatus = e.target.value;

                                setOrders((prev) =>
                                  prev.map((item) =>
                                    item.id === order.id
                                      ? { ...item, status: newStatus }
                                      : item
                                  )
                                );
                              }}
                              disabled={order.status === "Cancelled"}
                            >
                              {ORDER_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label style={styles.inputGroup}>
                            Delivery Message
                            <textarea
                              style={styles.textarea}
                              value={
                                orderMessages[order.id] ??
                                order.deliveryMessage ??
                                ""
                              }
                              placeholder="Enter delivery update message"
                              onChange={(e) =>
                                setOrderMessages((prev) => ({
                                  ...prev,
                                  [order.id]: e.target.value,
                                }))
                              }
                            />
                          </label>

                          <div style={styles.saveBox}>
                            <button
                              style={styles.primaryButton}
                              onClick={() => handleUpdateOrder(order)}
                              disabled={loading || order.status === "Cancelled"}
                            >
                              Save Order Update
                            </button>

                            {orderNotice[order.id] && (
                              <strong style={styles.orderNotice}>
                                {orderNotice[order.id]}
                              </strong>
                            )}
                          </div>
                        </div>

                        <p style={styles.deliveryMessage}>
                          <strong>Current message:</strong>{" "}
                          {order.deliveryMessage || "No delivery message"}
                        </p>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* Feedback */}
          {activeSection === "feedback" && <AdminFeedback />}
          {activeSection === "suppliers" && <AdminSuppliers />}
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    padding: "28px 5%",
    color: "#202538",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    background: "#202538",
    color: "white",
    padding: "22px 28px",
    borderRadius: "16px",
    marginBottom: "20px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "26px",
  },
  headerSubtitle: {
    margin: "8px 0 0",
    color: "#d6d9e3",
  },
  logoutButton: {
    background: "#fff",
    color: "#202538",
    border: "none",
    borderRadius: "8px",
    padding: "11px 20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "22px",
  },
  navButton: {
    padding: "11px 18px",
    border: "1px solid #d9ddeb",
    borderRadius: "8px",
    background: "white",
    color: "#202538",
    fontWeight: "bold",
    cursor: "pointer",
  },
  activeNavButton: {
    background: "#4c54c8",
    color: "white",
    borderColor: "#4c54c8",
  },
  message: {
    background: "#eef0ff",
    color: "#343b9c",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "18px",
  },
  loadingText: {
    padding: "20px",
    textAlign: "center",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "white",
    borderRadius: "12px",
    padding: "22px",
    boxShadow: "0 4px 14px rgba(30,40,70,0.06)",
  },
  statCardStrong: {
    fontSize: "28px",
  },
  panel: {
    background: "white",
    padding: "24px",
    borderRadius: "14px",
    marginBottom: "24px",
    boxShadow: "0 4px 14px rgba(30,40,70,0.05)",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontWeight: "bold",
  },
  fullWidth: {
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #dfe2eb",
    borderRadius: "8px",
    fontSize: "14px",
    marginTop: "6px",
    background: "white",
  },
  textarea: {
    width: "100%",
    minHeight: "75px",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #dfe2eb",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
  },
  primaryButton: {
    background: "#4c54c8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 18px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "fit-content",
  },
  previewImage: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },
  filterSelect: {
    padding: "10px 14px",
    border: "1px solid #dfe2eb",
    borderRadius: "8px",
    fontSize: "14px",
    background: "white",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  productCard: {
    background: "white",
    borderRadius: "13px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(30,40,70,0.07)",
  },
  imageContainer: {
    height: "210px",
    background: "#f8f9fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  productInfo: {
    padding: "16px",
  },
  category: {
    fontSize: "12px",
    color: "#6d73c9",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  editButton: {
    width: "100%",
    padding: "10px",
    background: "#202538",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "12px",
  },
  saveButton: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px",
    background: "#eee",
    color: "#222",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "650px",
  },
  th: {
    background: "#f0f2fa",
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #dfe2eb",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #edf0f5",
    verticalAlign: "top",
  },
  orderList: {
    display: "grid",
    gap: "18px",
  },
  orderCard: {
    background: "white",
    borderRadius: "14px",
    padding: "22px",
    boxShadow: "0 4px 16px rgba(30,40,70,0.06)",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    borderBottom: "1px solid #edf0f5",
    paddingBottom: "12px",
    marginBottom: "14px",
  },
  orderTotal: {
    fontSize: "20px",
    color: "#4c54c8",
  },
  orderDetails: {
    lineHeight: 1.5,
    overflowWrap: "anywhere",
  },
  itemList: {
    lineHeight: 1.8,
  },
  orderUpdate: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
    alignItems: "end",
    background: "#f8f9fc",
    padding: "16px",
    borderRadius: "10px",
    marginTop: "16px",
  },
  saveBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-start",
  },
  orderNotice: {
    fontSize: "13px",
    color: "#343b9c",
  },
  cancelledBox: {
    background: "#fff0f0",
    color: "#a32020",
    padding: "12px",
    borderRadius: "8px",
    marginTop: "12px",
  },
  deliveryMessage: {
    background: "#eef8ee",
    color: "#27632a",
    padding: "12px",
    borderRadius: "8px",
    overflowWrap: "anywhere",
  },
  muted: {
    color: "#777",
    fontSize: "13px",
  },
  note: {
    color: "#777",
    fontSize: "13px",
    marginTop: "16px",
  },
  denied: {
    padding: "50px",
    textAlign: "center",
  },
};

export default AdminDashboard;