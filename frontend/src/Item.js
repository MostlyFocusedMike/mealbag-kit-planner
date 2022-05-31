const Item = ({item, numberOfPallets, handleItemChange, idx, deleteItem, isItemInfoVisible }) => {
  const handleChange = (e) => { handleItemChange(e,idx) };
  const numberOfPacks = Math.ceil((numberOfPallets * 180 * item.itemsPerBag) / item.itemsPerPack);
  const extraItems = (numberOfPacks * item.itemsPerPack) - (numberOfPallets * 180 * item.itemsPerBag);

  const { itemsPerBag, itemsPerPack } = item;
  return <li className="item">
    <h3>{item.name}</h3>
    {
      isItemInfoVisible &&
        <div className="item-info">
          <div>
            
          <label>Items Per Bag: </label>
          <input 
            type="number" 
            min="1"
            max="99"
            data-idx={idx}
            value={itemsPerBag} 
            name="itemsPerBag" 
            onChange={handleChange}
            />
          </div>
          <div>

          <label>Items Per Pack: </label>
          <input 
            type="number" 
            min="1"
            max="99"
            data-idx={idx}
            value={itemsPerPack} 
            name="itemsPerPack" 
            onChange={handleChange}
            />
            </div>
          { !!extraItems && <span>(Extra items:{extraItems})</span> }
          <button onClick={deleteItem} data-idx={idx}>Delete</button>
        </div>
    }
  </li>
}

export default Item;
