import { useState } from "react";

const Item = ({initItem}) => {
  const [item, setItem] = useState(initItem);
  console.log('item:', item);
  return <li>
    <h3>{item.name}</h3>
    <form>
      <label>Items Per Bag: </label>
      <input type="number" value={item.itemsPerBag} />
      <label>Items Per Pack: </label>
      <input type="number" value={item.itemsPerPack} />
    </form>
  </li>
}

export default Item;
