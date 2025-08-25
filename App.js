import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏥 Welcome to MedConnect </h1>
      <p style={styles.subtitle}>Browse and order your medicines online with ease.</p>
    </div>
  );
}

function Medicines({ addToCart }) {
  const [search, setSearch] = useState("");
  const medicines = [
    { id: 1, name: "Paracetamol", price: 5 },
    { id: 2, name: "Aspirin", price: 8 },
    { id: 3, name: "Cough Syrup", price: 12 },
    { id: 4, name: "Antibiotic", price: 20 },
    { id: 5, name: "Vitamin C", price: 7 },
  ];

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>💊 Available Medicines</h2>
      <input
        type="text"
        placeholder="Search medicine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />
      <div style={styles.grid}>
        {filtered.map((med) => (
          <div key={med.id} style={styles.card}>
            <h3>{med.name}</h3>
            <p style={styles.price}>${med.price}</p>
            <button style={styles.button} onClick={() => addToCart(med)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p style={styles.subtitle}>No items yet. Add some medicines!</p>
      ) : (
        <div>
          <ul style={styles.list}>
            {cart.map((item, index) => (
              <li key={index} style={styles.listItem}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <h3 style={styles.total}>Total: ${total}</h3>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.navLink}>
        Home
      </Link>
      <Link to="/medicines" style={styles.navLink}>
        Medicines
      </Link>
      <Link to="/cart" style={styles.navLink}>
        Cart
      </Link>
    </nav>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </Router>
  );
}

/* 🎨 Inline CSS Styles */
const styles = {
  nav: {
    padding: "15px",
    background: "#4CAF50",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  navLink: {
    color: "white",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "18px",
  },
  page: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    color: "#333",
  },
  subtitle: {
    color: "#555",
  },
  search: {
    padding: "10px",
    margin: "20px 0",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  price: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#f9f9f9",
    margin: "8px auto",
    padding: "10px",
    borderRadius: "5px",
    width: "250px",
  },
  total: {
    marginTop: "15px",
    color: "#4CAF50",
  },
};

export default App;
