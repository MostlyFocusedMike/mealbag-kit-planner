import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "./Menu";

const Menus = () => {
  const [menus, setMenus] = useState(null);
  useEffect(() => {
    fetch('/api/v1/menus').then(r=>r.json()).then(setMenus);;
  }, []);

  if (!menus) return;
  return <div>
    <h1>Menus</h1>
    { menus.map(menu => <Menu key={menu.id} initMenu={menu} />) }
  </div>
}

export default Menus;
