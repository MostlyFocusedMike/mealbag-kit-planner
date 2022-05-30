import { useState } from "react";

const Item = ({item, numberOfPallets, handleItemChange, idx, deleteItem }) => {
  const handleChange = (e) => { handleItemChange(e,idx) };
  const numberOfPacks = Math.ceil((numberOfPallets * 180 * item.itemsPerBag) / item.itemsPerPack);
  const extraItems = (numberOfPacks * item.itemsPerPack) - (numberOfPallets * 180 * item.itemsPerBag);

  return <li className="item">
    <button onClick={deleteItem} data-idx={idx}>X</button>
    <h3>{item.name} | { numberOfPacks} Packs</h3>
    <label>Items Per Bag: </label>
    <input 
      type="number" 
      min="1"
      max="99"
      data-idx={idx}
      value={item.itemsPerBag} 
      name="itemsPerBag" 
      onChange={handleChange}
    />
    <label>Items Per Pack: </label>
    <input 
      type="number" 
      min="1"
      max="99"
      data-idx={idx}
      value={item.itemsPerPack} 
      name="itemsPerPack" 
      onChange={handleChange}
    />
    { !!extraItems && <span>(Extra items:{extraItems})</span> }
  </li>
}

export default Item;
