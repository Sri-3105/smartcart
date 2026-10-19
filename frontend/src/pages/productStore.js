const KEY = "smartcart_products";

export const getProducts = () => {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : [];
};

export const addProduct = (product) => {
  const updated = [...getProducts(), { ...product, id: Date.now() }];
  localStorage.setItem(KEY, JSON.stringify(updated));
};