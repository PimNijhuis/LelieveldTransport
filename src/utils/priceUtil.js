export const formatPrice = (price) => {
  return "€" + parseFloat(price).toFixed(2).replace(".", ",");
};

export default formatPrice;
