import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITable } from "../../@types/order";
import { fetchTablesThunk } from "../../store/middlewares/tables";
import LoggedAs from "../LoggedAs/LoggedAs";
import Table from "../Table/Table";
import "./Tables.scss";
import { updateTablesAction } from "../../store/reducers/tablesReducer";

function Tables() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tables: ITable[] = useAppSelector((state) => state.tables.list);
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  useEffect(() => {
    dispatch(fetchTablesThunk());
  }, [dispatch, currentOrder?.status]);
  useEffect(() => {
    const url = new URL("http://45.147.98.243:2020/.well-known/mercure");
    url.searchParams.append("authorization", import.meta.env.VITE_MERCURE_JWT);
    url.searchParams.append("topic", `tables`);
    const es = new EventSource(url, { withCredentials: true });
    es.onmessage = (event) => {
      // console.log("ouiii ça a marché !", event);
      const updatedTable = JSON.parse(event.data);
      // console.log(updatedTable);

      // Dispatchez une action pour mettre à jour la liste des tables
      dispatch(updateTablesAction(updatedTable));
    };
    return () => {
      es.close();
    };
  }, [dispatch]);

  return (
    <>
      <header>
        <LoggedAs />
        <button
          type="button"
          className="NavBtnBack kitchenVue"
          onClick={() => navigate("/kitchen")}
        >
          kitchen vue
        </button>
        <button
          type="button"
          className="NavBtnBack carte"
          onClick={() => navigate("/carte")}
        >
          La Carte
        </button>
        <h2>Tables</h2>
      </header>
      <ul className="tables-list">
        {tables.map((table) => (
          <li key={`table-${table.id}`}>
            <Table table={table} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tables;
