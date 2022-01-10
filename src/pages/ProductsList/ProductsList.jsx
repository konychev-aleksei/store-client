import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "../../UI/SearchBar/SearchBar";
import { Product } from "../../UI/Product/Product";

import Button from "@mui/material/Button";
import ListIcon from "@mui/icons-material/List";

import * as api from "../../api/index";

export const ProductsList = ({
  query,
  setQuery,
  handleSubmit,
  products,
  currentUser,
  isOrder,
  currentOrder,
  setCurrentOrder,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState([]);

  const handleFormOrder = async () => {
    await api.createNewOrder({ user: currentUser, products: currentOrder });
    navigate("/orders");
  };

  useEffect(() => {
    (async () => {
      setList(
        isOrder
          ? params?.order?.includes("current")
            ? currentOrder
            : []
          : products
      );

      if (isOrder && !params?.order?.includes("current")) {
        const data = await api.getOrder(params.order);
        setList(data.products);
      }
    })();
  }, [params, isOrder, currentOrder, products]);

  return (
    <>
      <div className={style.search}>
        {!isOrder && (
          <SearchBar
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div className={style.products}>
        {list.length > 0
          ? `Товаров найдено: ${list.length}`
          : `Ничего не найдено`}
      </div>
      <div className={style.grid}>
        {list.length > 0 &&
          list.map((item) => (
            <Product
              disabled={isOrder && !params?.order?.includes("current")}
              item={item}
              currentUser={currentUser}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
            />
          ))}
      </div>
      <div className={style.buttonWrapper}>
        {list.length > 0 && isOrder && (
          <Button
            onClick={handleFormOrder}
            variant="contained"
            disabled={!params?.order?.includes("current")}
            className={style.button}
            startIcon={<ListIcon />}
            sx={{
              color: "white",
              background: "black",
            }}
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </>
  );
};
