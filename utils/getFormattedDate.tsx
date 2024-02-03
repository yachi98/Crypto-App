const getFormattedPrice = (price: number): number => {
  return parseFloat(price.toFixed(2));
};

export default getFormattedPrice;
