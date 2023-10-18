import { IOrder, ITable } from "../../@types/order";

export function findOrder(
  orders: IOrder[],
  orderId: number
): IOrder | undefined {
  return orders.find((order) => order.id === orderId);
}

export function findOrderByTableId(
  tableId: number,
  tables: ITable[]
): IOrder | null {
  // Find the table by its ID
  const table = tables.find((t) => t.id === tableId);

  // If the table exists and has a related order, return the order
  if (table && table.relatedOrder) {
    return table.relatedOrder;
  }

  // If not found, return null or undefined
  return null;
}

export function findTableById(tables: ITable[], tableId: number) {
  return tables.find((table) => table.id === tableId);
}
