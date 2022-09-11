const Item = ({item, numberOfPallets, handleItemChange, idx, deleteItem, isItemInfoVisible, handleItemIncrement }) => {
  // isItemInfoVisible not sure if I want this anymore
  const handleChange = (e) => { handleItemChange(e,idx) };
  const numberOfPacks = Math.ceil((numberOfPallets * 180 * item.itemsPerBag) / item.itemsPerPack);
  const extraItems = (numberOfPacks * item.itemsPerPack) - (numberOfPallets * 180 * item.itemsPerBag);
  // TODO: pretty sure the extra items math is wrong, and doesn't handle items per bag
  const { itemsPerBag, itemsPerPack } = item;
  return <li className="item">
    <h3>{item.name}</h3>
    {
      isItemInfoVisible &&
        <div className="item-info">
          <div className="bag-info">
            <div className="item-info-label-input">
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
            <div className="plus-minus-container">
              <button
                type="button"
                className='plus-minus'
                data-val={1}
                data-idx={idx}
                data-name="itemsPerBag"
                onClick={handleItemIncrement}
              > + </button>
              <button
                type="button"
                className='plus-minus'
                data-val={-1}
                data-idx={idx}
                data-name="itemsPerBag"
                onClick={handleItemIncrement}
                > − </button>
            </div>

          </div>
          <div className="pack-info">
            <div className="item-info-label-input">

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
            <div className="plus-minus-container">
              <button
                type="button"
                className='plus-minus'
                data-val={1}
                data-idx={idx}
                data-name="itemsPerPack"
                onClick={handleItemIncrement}
              > + </button>
              <button
                type="button"
                className='plus-minus'
                data-val={-1}
                data-idx={idx}
                data-name="itemsPerPack"
                onClick={handleItemIncrement}
                > − </button>
              </div>
          </div>
          { !!extraItems && <span> (Extra items:{extraItems})</span> }
          <button className="danger" type='button' onClick={deleteItem} data-idx={idx}>DELETE</button>
        </div>
    }
  </li>
}

export default Item;
