import React from "react";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ list }) => {
  return (
    <div className="home-section">
      {list.map((element) => (
        <Item key={element.idAlojamiento} item={element} />
      ))}
    </div>
  );
};

export default ItemList;
