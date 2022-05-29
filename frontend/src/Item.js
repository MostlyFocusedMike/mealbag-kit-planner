import { useState } from "react";

const Item = ({initItem, numberOfPallets }) => {
  const [item, setItem] = useState(initItem);
  console.log('numberOfPallets:', numberOfPallets);

  return <li>
    <h3>{item.name} | {(numberOfPallets * 180) / item.itemsPerPack} Packs</h3>
    <form>
      <label>Items Per Bag: </label>
      <input type="number" value={item.itemsPerBag} />
      <label>Items Per Pack: </label>
      <input type="number" value={item.itemsPerPack} />
    </form>
  </li>
}

export default Item;
