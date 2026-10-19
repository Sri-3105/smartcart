import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeliveryDay from "../componends/DeliveryDay";

const DELIVERY_CHARGE = 50;
const DEMO_VERIFICATION_CODE = "1234";
const DISCOUNT_STORAGE_KEY = "smartcartDiscountPercent";

function getSavedDiscountPercent() {
  const savedDiscount = Number(
    localStorage.getItem(DISCOUNT_STORAGE_KEY) || 0
  );

  // Accept only supported discount percentages.
  if ([5, 10, 15].includes(savedDiscount)) {
    return savedDiscount;
  }

  return 0;
}

function Checkout({ cart = [], setCart }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("gpay");

  // Comes from DeliveryDay component: { label, date, type }
  // label example: "Tuesday — 6 October 2026"
  const [deliveryChoice, setDeliveryChoice] = useState(null);

  const [showGpay, setShowGpay] = useState(false);
  const [demoCode, setDemoCode] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // Calculate cart subtotal.
  const itemsTotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * (Number(item.quantity) || 1),
    0
  );

  // Read Spin Wheel discount.
  const discountPercent = getSavedDiscountPercent();

  // Discount applies only to product subtotal, not delivery charge.
  const discountAmount = (itemsTotal * discountPercent) / 100;

  const discountedItemsTotal = itemsTotal - discountAmount;

  // Final total includes delivery charge.
  const total = discountedItemsTotal + DELIVERY_CHARGE;

  // Delivery info (from the DeliveryDay component)
  const deliveryLabel = deliveryChoice?.label || "";
  const selectedDeliveryDay = deliveryLabel.split(" — ")[0] || "";
  const deliveryDateString = deliveryChoice?.date || "";

  const handleChange = (e) => {
    setDelivery({
      ...delivery,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    setError("");

    if (!user) {
      setError("Please login before placing an order.");
      return false;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return false;
    }

    if (!deliveryChoice) {
      setError("Please choose a delivery day.");
      return false;
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        product_id: item.id,
        name: item.name || item.title,
        price: Number(item.price || 0),
        quantity: Number(item.quantity) || 1,
        image: item.image || "",
      }));

      const fullAddress = [
        delivery.name,
        delivery.phone,
        delivery.address,
        delivery.city,
        delivery.pincode,
      ].join(", ");

      const response = await axios.post("http://localhost:3000/orders", {
        user_id: user.id,
        items: orderItems,

        // Price summary
        items_total: itemsTotal,
        discount_percent: discountPercent,
        discount_amount: discountAmount,
        discounted_items_total: discountedItemsTotal,
        delivery_charge: DELIVERY_CHARGE,
        total,

        // Delivery details
        delivery_day: selectedDeliveryDay,
        delivery_date: deliveryDateString,
        address: fullAddress,

        // Payment
        payment_method: paymentMethod,
      });

      setOrderDetails(response.data.order);
      setShowGpay(false);
      setDemoCode("");
      setPaymentError("");
      setOrderPlaced(true);

      // Clear cart after successful order.
      if (setCart) {
        setCart([]);
      }

      // Clear the used Spin Wheel discount after successful order.
      localStorage.removeItem(DISCOUNT_STORAGE_KEY);

      return true;
    } catch (err) {
      console.error("Order error:", err);

      const message =
        err.response?.data?.message ||
        "Unable to place order. Please check the backend and try again.";

      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setError("");
    setPaymentError("");

    if (!user) {
      setError("Please login before placing an order.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (paymentMethod === "gpay") {
      setShowGpay(true);
      return;
    }

    placeOrder();
  };

  const handleDemoPayment = async () => {
    setPaymentError("");

    if (demoCode.trim() !== DEMO_VERIFICATION_CODE) {
      setPaymentError("Incorrect demo code. Please enter 1234.");
      return;
    }

    const success = await placeOrder();

    if (!success) {
      setPaymentError(
        "Order could not be created. Check the message below and try again."
      );
    }
  };

  // Order success screen.
  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <h1>🎉 Order Confirmed!</h1>

          <h3>
            {paymentMethod === "gpay"
              ? "Demo Payment Successful"
              : "Cash on Delivery Selected"}
          </h3>

          <p>Thank you, {delivery.name}!</p>
          <p>Order ID: #{orderDetails?.id}</p>

          <p>Items Total: ₹{itemsTotal.toFixed(2)}</p>

          {discountPercent > 0 && (
            <p style={{ color: "green" }}>
              Spin Wheel Discount ({discountPercent}%): -₹
              {discountAmount.toFixed(2)}
            </p>
          )}

          <p>
            Discounted Items Total: ₹
            {discountedItemsTotal.toFixed(2)}
          </p>

          <p>Delivery Charge: ₹{DELIVERY_CHARGE.toFixed(2)}</p>

          <h3>Order Total: ₹{total.toFixed(2)}</h3>

          <p>Delivery: {deliveryLabel}</p>

          <p>
            Delivery Address: {delivery.address}, {delivery.city} -{" "}
            {delivery.pincode}
          </p>

          <p>Status: {orderDetails?.status || "Placed"}</p>

          <p style={{ fontSize: "13px", color: "#777" }}>
            Test payment only. No money was transferred.
          </p>

          <button onClick={() => navigate("/home")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <button
        type="button"
        className="checkout-back"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <h2>Checkout</h2>

      {error && (
        <div
          role="alert"
          style={{
            background: "#ffe5e5",
            color: "#b00020",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleCheckoutSubmit}>
        {/* DELIVERY DETAILS */}
        <section className="checkout-section">
          <h3>Delivery Details</h3>

          <input
            name="name"
            placeholder="Full Name"
            value={delivery.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Mobile Number"
            value={delivery.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a 10-digit mobile number"
            required
          />

          <textarea
            name="address"
            placeholder="Full Delivery Address"
            value={delivery.address}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={delivery.city}
            onChange={handleChange}
            required
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={delivery.pincode}
            onChange={handleChange}
            pattern="[0-9]{6}"
            title="Enter a 6-digit pincode"
            required
          />
        </section>

        {/* DELIVERY DAY (3 days delivery + optional weekend) */}
        <DeliveryDay onChange={setDeliveryChoice} />

        {/* PAYMENT METHOD */}
        <section className="checkout-section">
          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              name="payment"
              value="gpay"
              checked={paymentMethod === "gpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Google Pay
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <p style={{ fontSize: "13px", color: "#777" }}>
            Test checkout only. No real payment is processed.
          </p>
        </section>

        {/* ORDER SUMMARY */}
        <section className="checkout-section">
          <h3>Order Summary</h3>

          <p>Different products: {cart.length}</p>

          {cart.map((item) => (
            <p key={item.id}>
              {item.name || item.title} × {Number(item.quantity) || 1}
              {" — ₹"}
              {(
                Number(item.price || 0) * (Number(item.quantity) || 1)
              ).toFixed(2)}
            </p>
          ))}

          <hr />

          <p>Items Total: ₹{itemsTotal.toFixed(2)}</p>

          {discountPercent > 0 ? (
            <p style={{ color: "green", fontWeight: "600" }}>
              🎉 Spin Wheel Discount ({discountPercent}%): -₹
              {discountAmount.toFixed(2)}
            </p>
          ) : (
            <p style={{ color: "#777", fontSize: "14px" }}>
              No Spin Wheel discount applied.
            </p>
          )}

          <p>
            Discounted Items Total: ₹
            {discountedItemsTotal.toFixed(2)}
          </p>

          <p>Delivery Charge: ₹{DELIVERY_CHARGE.toFixed(2)}</p>

          <hr />

          <h2>Total Amount: ₹{total.toFixed(2)}</h2>
        </section>

        <button
          type="submit"
          className="place-order-btn"
          disabled={loading || cart.length === 0}
        >
          {loading
            ? "Processing..."
            : paymentMethod === "gpay"
            ? `Continue to Pay — ₹${total.toFixed(2)}`
            : `Place COD Order — ₹${total.toFixed(2)}`}
        </button>
      </form>

      {/* DEMO PAYMENT POPUP */}
      {showGpay && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gpay-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              color: "#222",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "14px",
              padding: "26px",
              textAlign: "center",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
              boxSizing: "border-box",
            }}
          >
            <h2 id="gpay-title" style={{ marginTop: 0 }}>
              GPay
            </h2>

            <p>Payment Amount</p>

            <h1 style={{ margin: "20px 0", fontSize: "36px" }}>
              ₹{total.toFixed(2)}
            </h1>

            {discountPercent > 0 && (
              <p style={{ color: "green" }}>
                {discountPercent}% Spin Wheel discount applied
              </p>
            )}

            <p>Delivery: {deliveryLabel}</p>

            <label
              htmlFor="demo-code"
              style={{
                display: "block",
                textAlign: "left",
                marginTop: "18px",
                fontSize: "14px",
              }}
            >
              Enter demo verification code
            </label>

            <input
              id="demo-code"
              type="password"
              inputMode="numeric"
              maxLength={4}
              autoComplete="off"
              placeholder="4-digit demo code"
              value={demoCode}
              onChange={(e) => {
                setDemoCode(e.target.value.replace(/\D/g, "").slice(0, 4));
                setPaymentError("");
              }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                marginTop: "8px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "20px",
                textAlign: "center",
                letterSpacing: "8px",
                background: "#fff",
                color: "#222",
              }}
            />

            <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.5 }}>
              Demo code: 1234. This is not your real UPI PIN or password.
              No money will be transferred.
            </p>

            {paymentError && (
              <p
                role="alert"
                style={{
                  color: "#b00020",
                  background: "#fff0f0",
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "13px",
                  marginTop: "10px",
                }}
              >
                {paymentError}
              </p>
            )}

            {error && (
              <p
                role="alert"
                style={{
                  color: "#b00020",
                  background: "#fff0f0",
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "13px",
                  marginTop: "10px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleDemoPayment}
              disabled={loading || demoCode.length !== 4}
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "12px",
                backgroundColor: "#087f3e",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor:
                  loading || demoCode.length !== 4
                    ? "not-allowed"
                    : "pointer",
                opacity: loading || demoCode.length !== 4 ? 0.6 : 1,
              }}
            >
              {loading ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowGpay(false);
                setDemoCode("");
                setPaymentError("");
              }}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "9px",
                backgroundColor: "#eeeeee",
                color: "#222222",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
