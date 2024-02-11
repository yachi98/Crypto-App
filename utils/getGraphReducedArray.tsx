type SimpleArray = number[];
type TupleArray = [string, number][];

const getGraphReducedArray = <T extends SimpleArray | TupleArray>(
  array: T,
  num: number
): T => {
  const lastIndex: number = array.length - 1;

  return array.filter((_, index: number) => {
    return index === 0 || index === lastIndex || (index + 1) % num === 0;
  }) as T;
};

export default getGraphReducedArray;
