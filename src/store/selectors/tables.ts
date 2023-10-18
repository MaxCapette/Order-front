import { ITable } from "../../@types/order";

export default function findTable(tables: ITable[], tableId = 1) {
  const table = tables.find((testedTable) => {
    return testedTable.id === tableId;
  });
  return table;
}
