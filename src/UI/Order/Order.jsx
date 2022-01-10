import React from "react";
import { Link } from "react-router-dom";
import C from "../../constants";
import style from "./style.module.scss";

export const Order = ({ isCurrent, number, item, count }) => {
  return (
    <div className={style.wrapper}>
      <Link
        className={style.number}
        to={`/order/${isCurrent ? `current` : item?._id}`}
      >
        {isCurrent ? `Текущий заказ` : `Заказ #${number}`}
      </Link>
      <div>
        КОЛИЧЕСТВО ТОВАРОВ: {isCurrent ? count : item?.products?.length}
      </div>
      <div>{!isCurrent && C.ORDER_FORMED}</div>
      <div className={style.line} />
    </div>
  );
};
