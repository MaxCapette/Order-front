import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
// import Navbar from "./components/Navbar/Navbar";
import Tables from "./components/Tables/Tables";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import CollapseOrder from "./components/CollapseOrder/CollapseOrder";
import { getFromLocalStorage } from "./localStorage/localStorage";
import "./App.scss";
import { getActionLogin } from "./store/reducers/userReducer";
import Kitchen from "./components/Kitchen/Kitchen";
import CustomersCarte from "./components/CustomersCarte/CustomersCarte";
// import Chat from "./components/Websocket/Chat";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // console.log(tables);
  const logged = useAppSelector((state) => state.user.logged);
  // const user = useAppSelector((state) => state.user);
  // // recuperer dans le localstorage
  // getFromLocalStorage("auth");
  // console.log(getFromLocalStorage("auth"));

  // console.log(currentUser, user);
  const isOnTablePageOrCurrentOrderPage =
    location.pathname === `/` || location.pathname.includes(`/orders/`);

  useEffect(() => {
    if (!logged) {
      // TODO : remplir le store avec le localstorage
      const auth = getFromLocalStorage("auth");
      console.log(auth);

      if (auth) {
        dispatch(getActionLogin(auth));
      } else {
        navigate("/login");
      }
    }
    // console.log(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  return (
    <div className="container1">
      <Routes>
        {logged ? (
          <>
            <Route path="/" element={<Tables />} />
            <Route path="/orders/:orderId" element={<CurrentOrder />} />
            <Route path="/categories/:id/items" element={<CurrentOrder />} />
            {/* <Route path="/chat" element={<Chat />} /> */}

            {/* <Route
                      path={`/users/${userId}/orders`}
                      element={<Orders userId={userId} />}
                    /> */}
            <Route path="/logout" element={<Logout />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/carte" element={<CustomersCarte />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
      {isOnTablePageOrCurrentOrderPage && <CollapseOrder />}
    </div>
  );
}
export default App;
