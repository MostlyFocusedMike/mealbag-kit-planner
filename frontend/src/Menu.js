import { Link } from "react-router-dom";
import { useState } from "react";
import Item from "./Item";
import NewItemModal from "./NewItemModal";

const Menu = ({ initMenu }) => {
  const [menu, setMenu] = useState(initMenu);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleMenuChange = (e) => {
    setMenu({ ...menu, numberOfPallets: parseInt(e.target.value) })
  }

  const handleItemChange = (e) => {
    // I know this is mutating the existing state manually, but then immediately resetting it correctly
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(menu) }
    const data = await fetch(`/api/v1/menus/${menu.id}`, options).then(r => r.json())
    console.log('data:', data);
  }

  const { numberOfPallets, items } = menu;
  return <div className="menu">
    <h2>{menu.name}</h2>
    <p>Number of Meals: {menu.numberOfPallets * 180}</p>
    <form onSubmit={handleSubmit}>
      <label>Number of Paletts:</label>
      <input type='number' value={menu.numberOfPallets} onChange={handleMenuChange} />
      <button>Update</button>
    </form>
    <Link
      key={menu.id}
      to={`/menus/${menu.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Go To Spreadsheet
    </Link>
    <form onSubmit={handleSubmit}>
      <ul className="items">
        {
          items.length && items.map((item, idx) => (
            <Item 
              key={item.id} 
              idx={idx}
              handleItemChange={handleItemChange}
              deleteItem={deleteItem} 
              item={item} 
              numberOfPallets={numberOfPallets} 
            />
            ))
          }
      </ul>
      <button>Update Items</button>
    </form>
    <button onClick={() => setIsVisible(!isVisible)}>Add new ticket</button>
    {
      isVisible && <NewItemModal
        toggleVisibility={toggleVisibility}
      />
    }
  </div>
}

export default Menu;
