import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Category({
  cart = [],
  setCart,
  wishlist = [],
  setWishlist,
}) {
  const { category, subCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const messageTimer = useRef(null);

  // ================= TOAST MESSAGE =================

  const showMessage = (text) => {
    setMessage(text);

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setMessage("");
      messageTimer.current = null;
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Product fetch error:", err);
        showMessage("Unable to load products");
      });
  }, []);

  const normalize = (value) =>
    String(value || "").trim().toLowerCase();

  // Kids page-la Boys / Girls cards kaatta
  const isKidsPage = normalize(category) === "kids";

  // Selected category products
  const categoryProducts = products.filter((product) =>
    isKidsPage
      ? ["boys", "girls"].includes(normalize(product.category))
      : normalize(product.category) === normalize(category)
  );

  // Category cards create pannum
  const cards = isKidsPage
    ? ["boys", "girls"]
        .map((name) => {
          const matchingProducts = products.filter(
            (product) => normalize(product.category) === name
          );

          return {
            name,
            path: `/category/${name}`,
            image: matchingProducts[0]?.image,
          };
        })
        .filter((card) => card.image)
    : [
        ...new Set(
          categoryProducts.map((product) => product.subCategory)
        ),
      ]
        .filter(Boolean)
        .map((name) => {
          const matchingProducts = categoryProducts.filter(
            (product) =>
              normalize(product.subCategory) === normalize(name)
          );

          return {
            name,
            path: `/category/${category}/${encodeURIComponent(name)}`,
            image: matchingProducts[0]?.image,
          };
        });

  // Subcategory select pannina andha products mattum kaattum
  const filteredProducts = categoryProducts.filter(
    (product) =>
      !subCategory ||
      normalize(product.subCategory) === normalize(subCategory)
  );

  const showCategoryCards = !subCategory;

  // ================= ADD TO CART =================

  const addToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        showMessage("Please login first");
        return;
      }

      if (!setCart) {
        console.error("setCart function is missing");
        showMessage("Unable to update cart");
        return;
      }

      await axios.post("http://localhost:3000/cart", {
        user_id: user.id,
        items: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
      });

      setCart((prev) => {
        const existing = prev.find(
          (item) => item.id === product.id
        );

        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: (Number(item.quantity) || 1) + 1,
                }
              : item
          );
        }

        return [
          ...prev,
          {
            ...product,
            quantity: 1,
          },
        ];
      });

      showMessage("Added to Cart 🛒");
    } catch (error) {
      console.error("Add to cart error:", error);
      showMessage("Could not add product to cart");
    }
  };

  // ================= ADD TO WISHLIST =================

  const addToWishlist = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        showMessage("Please login first");
        return;
      }

      if (!setWishlist) {
        console.error("setWishlist function is missing");
        showMessage("Unable to update Wishlist");
        return;
      }

      // Already wishlist-la irundha duplicate request anuppa vendam
      const alreadyExists = wishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        showMessage("Already in Wishlist ❤️");
        return;
      }

      await axios.post("http://localhost:3000/wishlist", {
        user_id: user.id,
        product_id: product.id,
      });

      setWishlist((prev) => {
        const exists = prev.some(
          (item) => item.id === product.id
        );

        if (exists) {
          return prev;
        }

        return [...prev, product];
      });

      showMessage("Added to Wishlist ❤️");
    } catch (error) {
      console.error("Add to wishlist error:", error);
      showMessage("Could not add to Wishlist");
    }
  };

  // ================= TITLE FORMAT =================

  const formatTitle = (value) =>
    decodeURIComponent(value || "")
      .replace(/([A-Z])/g, " $1")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

  // ================= UI =================

  return (
    <div className="category-page">
      {/* Website toast notification - browser alert illa */}
      {message && (
        <div
          className="smartcart-category-toast"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      <style>
        {`
          @keyframes smartCartCategoryToastIn {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .smartcart-category-toast {
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 9999;
            max-width: min(360px, calc(100vw - 40px));
            padding: 13px 20px;
            border-radius: 10px;
            background: #28145f;
            color: #ffffff;
            font-size: 15px;
            font-weight: 500;
            box-shadow: 0 5px 18px rgba(0, 0, 0, 0.22);
            animation: smartCartCategoryToastIn 0.25s ease-out;
          }

          @media (max-width: 600px) {
            .smartcart-category-toast {
              top: 75px;
              right: 12px;
              left: 12px;
              max-width: none;
              text-align: center;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .smartcart-category-toast {
              animation: none;
            }
          }
        `}
      </style>

      <h1>
        {showCategoryCards
          ? formatTitle(category)
          : formatTitle(subCategory)}
      </h1>

      {showCategoryCards ? (
        <div className="fashion-category-grid">
          {cards.map((card) => (
            <Link
              to={card.path}
              key={card.name}
              className="fashion-category-card"
            >
              <img
                src={card.image}
                alt={card.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300";
                }}
              />

              <p>{formatTitle(card.name)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />

                <h3>{product.name}</h3>

                <h4>₹{product.price}</h4>

                <div className="stock">
                  Stock : {product.stock}
                </div>

                <button
                  className="wishlist-btn"
                  onClick={() => addToWishlist(product)}
                >
                  ❤️
                </button>

                <button
                  className="cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h2>No products found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Category;