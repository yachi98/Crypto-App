const CoinsTableSpinner = () => {
  const numberOfItems = 20;

  return (
    <>
      {[...Array(numberOfItems)].map((_, index) => (
        <div key={index} className="px-5 py-8 rounded-lg animate-pulse"></div>
      ))}
    </>
  );
};

export default CoinsTableSpinner;
