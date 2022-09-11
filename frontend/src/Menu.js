import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Item from "./Item";
import NewItemModal from "./NewItemModal";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
      return () => { clearTimeout(handler); };
    },
    [value, delay]
  );
  return debouncedValue;
}

const Menu = ({ initMenu }) => {
  const [menu, setMenu] = useState(initMenu);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isItemInfoVisible, setIsItemInfoVisible] = useState(false);
  const toggleModalVisibility = () => setIsModalVisible(!isModalVisible);
  const toggleItemInfoVisibility = () => setIsItemInfoVisible(!isItemInfoVisible);

  const handleMenuChange = (e) => {
    setMenu({ ...menu, numberOfPallets: parseInt(e.target.value) })
  }

  const deferredValue = useDebounce(menu, 750);
  useMemo(async () => {
    const options = { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(menu) }
    const data = await fetch(`/api/v1/menus/${menu.id}`, options).then(r => r.json())
    console.log('data:', data);
  }, [deferredValue])

  const handleItemChange = (e) => {
    const newMenu = { ...menu }
    const { value, name, dataset: { idx } } = e.target;
    newMenu.items[idx] = {
      ...newMenu.items[idx],
      [name]: value,
    }
    setMenu(newMenu);
  }

  const deleteItem = (e) => {
    e.preventDefault();
    const newMenu = { ...menu }
    newMenu.items.splice(e.target.dataset.idx, 1);
    setMenu(newMenu);
  }

  const addItem = async (item) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) };
    const newItem = await fetch(`/api/v1/menus/${menu.id}/items`, options).then(r => r.json())
    const newMenu = { ...menu }
    newMenu.items.push(newItem)
    setMenu(newMenu);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(menu) }
    const data = await fetch(`/api/v1/menus/${menu.id}`, options).then(r => r.json())
    console.log('data:', data);
  }

  const { numberOfPallets, items } = menu;
  return <div className="menu">
    <h2 className="menu-name">{menu.name}</h2>
    <hr className="menu-line" />
    <form className="menu-form" onSubmit={handleSubmit}>
      <p>Number of Meals: {menu.numberOfPallets * 180}</p>
      <div className="inputs">
        <label>Number of Paletts: </label>
        <input type='number' min="1" max="99" value={menu.numberOfPallets} onChange={handleMenuChange} />
      </div>
    </form>
    <Link
      key={menu.id}
      to={`/menus/${menu.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      See warehouse spreadsheet
    </Link>
    <form onSubmit={handleSubmit}>
      <ul className="items">
        {
          !!items.length && items.map((item, idx) => (
            <Item
              key={item.id}
              idx={idx}
              isItemInfoVisible="true"
              handleItemChange={handleItemChange}
              deleteItem={deleteItem}
              item={item}
              numberOfPallets={numberOfPallets}
            />
            ))
          }
      </ul>
    </form>
    <button className="add-item-button" onClick={() => setIsModalVisible(!isModalVisible)}>Add Item</button>
    {
      isModalVisible && <NewItemModal
        toggleVisibility={toggleModalVisibility}
        addItem={addItem}
      />
    }
  </div>
}

export default Menu;
