import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { Order } from "../../UI/Order/Order";
import * as api from "../../api/index";

export const OrdersList = ({ currentUser, currentOrder }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const data = await api.getOrders(currentUser);
        setOrders(data.reverse());
      }
    })();
  }, [currentUser]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Список заказов {currentUser}</div>
      <Order isCurrent count={currentOrder.length} />
      {orders.map((item, index) => (
        <Order number={orders.length - index} item={item} />
      ))}
    </div>
  );
};
