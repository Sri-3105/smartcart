import { Link } from "react-router-dom";

function FashionPage() {
  const categories = [
    {
      name: "Men",
      path: "/category/men",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Nbh1LaaD7vlhDj-rY6msLFT_sNQu5-MUx7nvLAaUNWoYcJYk2JjmJ5o&s=10",
    },
    {
      name: "Women",
      path: "/category/women",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyQpLog2OONacP6s_eSw7w_h_SPwtoqwA_rxfYC6vlig&s",
    },
    {
      name: "Kids",
      path: "/category/kids",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXXxzW4-5cElprEFIpp2_eE9r_LttdjxYCoM5QF7buA&s=10",
    },
  ];

  return (
    <div className="fashion-page">
      <h2>Shop by Category</h2>

      <div className="fashion-category-grid">
        {categories.map((cat) => (
          <Link
            to={cat.path}
            key={cat.name}
            className="fashion-category-card"
          >
            <img
              src={cat.image}
              alt={cat.name}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />

            <p>{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FashionPage;