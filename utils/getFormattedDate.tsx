const getFormattedPrice = (price: number): number => {
  if (price === null) {
    return 0;
  }
  return parseFloat(price.toFixed(2));
};

export default getFormattedPrice;
