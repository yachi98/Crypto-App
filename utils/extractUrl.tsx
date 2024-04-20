const extractUrl = (address: string): string => {
  return (
    address.indexOf("://") > -1 ? address.split("/")[2] : address.split("/")[0]
  ).split(":")[0];
};

export default extractUrl;
