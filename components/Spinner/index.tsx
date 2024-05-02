const CoinsTableSpinner = () => {
  return (
    <>
      {[...Array(20)].map(() => (
        <div
          key={Math.random()}
          className="dark:bg-white px-5 py-8 rounded-lg animate-pulse"
        ></div>
      ))}
    </>
  );
};
export default CoinsTableSpinner;
