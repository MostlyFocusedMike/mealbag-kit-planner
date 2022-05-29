import { useState } from "react";

const Item = ({initItem, numberOfPallets }) => {
  const [item, setItem] = useState(initItem);
  const handleChange = (e) => {
    console.log('e.target.name:', e.target.name);
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    })
  }
  const numberOfPacks = Math.ceil((numberOfPallets * 180 * item.itemsPerBag) / item.itemsPerPack);
  const extraItems = (numberOfPacks * item.itemsPerPack) - (numberOfPallets * 180 * item.itemsPerBag);
  return <li>
    <h3>{item.name} | { numberOfPacks} Packs</h3>
    <form>
      <label>Items Per Bag: </label>
      <input 
        type="number" 
        min="1"
        max="99"
        value={item.itemsPerBag} 
        name="itemsPerBag" 
        onChange={handleChange}
      />
      <label>Items Per Pack: </label>
      <input 
        type="number" 
        min="1"
        max="99"
        value={item.itemsPerPack} 
        name="itemsPerPack" 
        onChange={handleChange}
      />
      { !!extraItems && <span>(Extra items:{extraItems})</span> }
    </form>
  </li>
}

export default Item;
