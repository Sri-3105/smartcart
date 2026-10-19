import { useEffect, useState } from "react";

const API = "http://localhost:3000";

const EMPTY_FORM = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  products: "",
  notes: "",
};

function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  const loadSuppliers = async () => {
    try {
      setListLoading(true);

      const response = await fetch(`${API}/supplier`);
      const data = await response.json();

      setSuppliers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setMessage("Unable to load suppliers. Check that the backend is running.");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.name.trim()) {
      setMessage("Supplier name is required.");
      return;
    }

    const isEditing = editingId !== null;

    try {
      setLoading(true);

      const response = await fetch(
        isEditing ? `${API}/supplier/${editingId}` : `${API}/supplier`,
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not save supplier.");
        return;
      }

      if (isEditing) {
        setSuppliers((prev) =>
          prev.map((item) => (item.id === editingId ? data.supplier : item))
        );
        setMessage("Supplier updated successfully!");
      } else {
        setSuppliers((prev) => [data.supplier, ...prev]);
        setMessage("Supplier added successfully!");
      }

      resetForm();
    } catch (error) {
      console.error(error);
      setMessage("Server error while saving supplier.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);
    setForm({
      name: supplier.name || "",
      contactPerson: supplier.contactPerson || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
      city: supplier.city || "",
      products: supplier.products || "",
      notes: supplier.notes || "",
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (supplier) => {
    if (!window.confirm(`Delete supplier "${supplier.name}"?`)) return;

    try {
      setLoading(true);

      const response = await fetch(`${API}/supplier/${supplier.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to delete supplier.");
        return;
      }

      setSuppliers((prev) => prev.filter((item) => item.id !== supplier.id));

      if (editingId === supplier.id) resetForm();

      setMessage("Supplier deleted.");
    } catch (error) {
      console.error(error);
      setMessage("Server error while deleting supplier.");
    } finally {
      setLoading(false);
    }
  };

  const keyword = search.trim().toLowerCase();

  const visibleSuppliers = keyword
    ? suppliers.filter((item) =>
        [item.name, item.contactPerson, item.city, item.products, item.phone]
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      )
    : suppliers;

  return (
    <section>
      <h2>Suppliers (Where we buy products from)</h2>

      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.panel}>
        <h3>{editingId ? "✏️ Edit Supplier" : "＋ Add New Supplier"}</h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.inputGroup}>
            Supplier / Shop Name *
            <input
              style={styles.input}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Sri Textiles"
              required
            />
          </label>

          <label style={styles.inputGroup}>
            Contact Person
            <input
              style={styles.input}
              name="contactPerson"
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Person name"
            />
          </label>

          <label style={styles.inputGroup}>
            Phone Number
            <input
              style={styles.input}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
            />
          </label>

          <label style={styles.inputGroup}>
            Email
            <input
              style={styles.input}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="supplier@gmail.com"
            />
          </label>

          <label style={styles.inputGroup}>
            City
            <input
              style={styles.input}
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Tirupur"
            />
          </label>

          <label style={styles.inputGroup}>
            Products they supply
            <input
              style={styles.input}
              name="products"
              value={form.products}
              onChange={handleChange}
              placeholder="e.g. Men's shirts, T-shirts"
            />
          </label>

          <label style={styles.fullWidth}>
            Address
            <textarea
              style={styles.textarea}
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full address"
            />
          </label>

          <label style={styles.fullWidth}>
            Notes (optional)
            <textarea
              style={styles.textarea}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Payment terms, delivery time, etc."
            />
          </label>

          <div style={styles.buttonRow}>
            <button
              type="submit"
              style={styles.primaryButton}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : editingId
                ? "Update Supplier"
                : "Add Supplier"}
            </button>

            {editingId && (
              <button
                type="button"
                style={styles.cancelButton}
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.listHeader}>
        <h3>
          Supplier List ({visibleSuppliers.length}
          {keyword ? ` of ${suppliers.length}` : ""})
        </h3>

        <input
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, city, product..."
        />
      </div>

      <div style={styles.panel}>
        {listLoading ? (
          <p>Loading suppliers...</p>
        ) : visibleSuppliers.length === 0 ? (
          <p>No suppliers found.</p>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Contact Person</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>City</th>
                  <th style={styles.th}>Products</th>
                  <th style={styles.th}>Address</th>
                  <th style={styles.th}>Notes</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleSuppliers.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}>
                      <strong>{item.name}</strong>
                    </td>
                    <td style={styles.td}>{item.contactPerson || "—"}</td>
                    <td style={styles.td}>{item.phone || "—"}</td>
                    <td style={styles.td}>{item.email || "—"}</td>
                    <td style={styles.td}>{item.city || "—"}</td>
                    <td style={styles.td}>{item.products || "—"}</td>
                    <td style={styles.td}>{item.address || "—"}</td>
                    <td style={styles.td}>{item.notes || "—"}</td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDelete(item)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

const styles = {
  message: {
    background: "#eef0ff",
    color: "#343b9c",
    padding: "12px 15px",
    borderRadius: "8px",
    marginBottom: "18px",
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
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #dfe2eb",
    borderRadius: "8px",
    fontSize: "14px",
    background: "white",
  },
  textarea: {
    width: "100%",
    minHeight: "70px",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #dfe2eb",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
  },
  buttonRow: {
    gridColumn: "1 / -1",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
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
  cancelButton: {
    background: "#eee",
    color: "#222",
    border: "none",
    borderRadius: "8px",
    padding: "12px 18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },
  searchInput: {
    padding: "10px 14px",
    border: "1px solid #dfe2eb",
    borderRadius: "8px",
    fontSize: "14px",
    minWidth: "240px",
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
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
    overflowWrap: "anywhere",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "8px 14px",
    background: "#202538",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 14px",
    background: "#d93025",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminSuppliers;
