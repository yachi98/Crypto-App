const CoinsTableSpinner = () => {
  return (
    <>
      {[...Array(20)].map(() => (
        <div
          key={Math.random()}
          className="px-5 py-8 rounded-lg animate-pulse"
        ></div>
      ))}
    </>
  );
};
export default CoinsTableSpinner;
