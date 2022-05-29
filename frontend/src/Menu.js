import { Link } from "react-router-dom";
import { useState } from "react";
import Items from "./Items";

const Menu = ({ initMenu }) => {
  const [menu, setMenu] = useState(initMenu);

  const handleChange = (e) => {
    setMenu({ ...menu, numberOfPallets: parseInt(e.target.value) })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/menus/${menu.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menu)
    })
      .then(r => r.json())
      .then(console.log)
  }

  return <div className="menu">
    <h2>{menu.name}</h2>
    <p>Number of Meals: {menu.numberOfPallets * 180}</p>
    <form onSubmit={handleSubmit}>
      <label>Number of Paletts:</label>
      <input type='number' value={menu.numberOfPallets} onChange={handleChange} />
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
    <Items items={menu.items} numberOfPallets={menu.numberOfPallets} />
  </div>
}

export default Menu;
