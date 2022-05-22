import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Menus = () => {
  const [menus, setMenus] = useState(null);
  useEffect(() => {
    fetch('/api/v1/menus').then(r=>r.json()).then(setMenus);;
  }, []);

  useEffect(() => { console.log('menus:', menus); }, [menus])
  if (!menus) return;
  return <div>
    <h1>Menus</h1>
    <nav>
      {
        menus.map(menu => (
          <Link
            key={menu.id}
            to={`/menus/${menu.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {menu.name} |
          </Link>)
        )
      }
    </nav>
  </div>
}

export default Menus;
