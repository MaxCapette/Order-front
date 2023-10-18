import { IItem } from "../../@types/order";

export default function findItem(items: IItem[], itemId = 1) {
  const item = items.find((testedItem) => {
    return testedItem.id === itemId;
  });
  return item;
}
