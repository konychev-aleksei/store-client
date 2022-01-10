import React from "react";
import style from "./style.module.scss";
import Button from "@mui/material/Button";

export const Product = ({
  item,
  currentUser,
  currentOrder,
  setCurrentOrder,
  disabled,
}) => {
  const handleAddProduct = (product) => handleChange(product, 1);
  const handleRemoveProduct = (product) => handleChange(product, -1);

  const handleChange = (product, count) => {
    let newCount = -1;
    const hasAProduct =
      currentOrder.filter((item) => item.image === product.image).length > 0;

    const changedOrder = hasAProduct
      ? [
          ...currentOrder.map((item) => {
            if (item.image === product.image) {
              newCount = Math.max(0, item.count + count);
              return { ...item, count: newCount };
            } else {
              return item;
            }
          }),
        ]
      : [...currentOrder, { ...product, count: 1 }];

    const __changedOrder = currentOrder.filter(
      (item) => item.image !== product.image
    );

    setCurrentOrder(newCount === 0 ? __changedOrder : changedOrder);
  };

  const getCount = (product) => {
    if (product.count) {
      return product.count;
    }

    const filtered = currentOrder.filter(
      (item) => item.image === product.image
    );

    return filtered.length > 0 ? filtered[0].count : 0;
  };

  return (
    <div className={style.wrapper}>
      <img className={style.icon} src={item.image} alt="" draggable="false" />
      <br />
      <div className={style.link}>{item.name}</div>
      <div className={style.description}>{item.description}</div>
      <br />
      <div className={style.price}>
        {item.price} РУБ. &nbsp;
        {currentUser && (
          <>
            <Button
              disabled={disabled}
              onClick={() => handleAddProduct(item)}
              className={style.buttonStyle}
              variant="outlined"
              sx={{
                border: "1px solid black",
                color: "black",
              }}
            >
              +
            </Button>
            {getCount(item)}
            <Button
              disabled={disabled}
              onClick={() => handleRemoveProduct(item)}
              className={style.buttonStyle}
              variant="outlined"
              sx={{
                border: "1px solid black",
                color: "black",
              }}
            >
              -
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
