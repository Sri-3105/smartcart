import React from "react";


const offers = [
  {
    id: 1,
    title: "Summer Sale",
    discount: "50% OFF",
    description: "On selected dresses",
    emoji: "☀️",
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    discount: "Special Offer",
    description: "Valid on Kids Collection",
    emoji: "🎁",
  },
  {
    id: 3,
    title: "Free Delivery",
    discount: "Above ₹999",
    description: "Anywhere in India",
    emoji: "🚚",
  },
  {
    id: 4,
    title: "Coupon Code",
    discount: "ROYAL20",
    description: "Get 20% OFF on your first order",
    emoji: "🎟️",
  },
];

function Offers() {
  return (
    <section className="offers-section">
      {/* Background video */}
      <video
        className="offers-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/offers.mp4" type="video/mp4" />
      </video>

      <div className="offers-overlay"></div>

      <div className="offers-content">
        <h1 className="offers-heading">🔥 Today's Offers</h1>
        <p className="offers-subheading">
          Discover exciting deals just for you!
        </p>

        <div className="offers-container">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <div className="offer-card-inner">
                <div className="offer-emoji">{offer.emoji}</div>
                <h2>{offer.title}</h2>
                <h3>{offer.discount}</h3>
                <p>{offer.description}</p>
                <span className="offer-tag">LIMITED TIME OFFER</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Offers;