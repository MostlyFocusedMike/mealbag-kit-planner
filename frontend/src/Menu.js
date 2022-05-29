import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Menu = ({ initMenu }) => {
  const [menu, setMenu] = useState(initMenu);

  useEffect(() => { console.log('menu:', menu); }, [menu])

  const handleChange = (e) => {
    setMenu({ ...menu, numberOfPallets: parseInt(e.target.value) })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hi')
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
    <Link
      key={menu.id}
      to={`/menus/${menu.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Go To Spreadsheet
    </Link>
    <form onSubmit={handleSubmit}>
      <label>Number of Paletts:</label>
      <input type='number' value={menu.numberOfPallets} onChange={handleChange} />
      <button>Update</button>
    </form>
  </div>
}

export default Menu;
