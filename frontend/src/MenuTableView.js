import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function MenuTableView() {
  let params = useParams()
  const [menu, setMenu] = useState(null);
  useEffect(() =>  {
    const route = `/api/v1/menus/${params.menuId}`
    if (params.menuId) fetch(route).then(r=>r.json()).then(setMenu)
  }, [params])

  if (!menu) return null;

  const numberOfMeals = menu.numberOfPallets * 12 * 15
  const getNumberOfPacks = ({itemsPerPack, itemsPerBag}) => Math.ceil(numberOfMeals * itemsPerBag / itemsPerPack)
  console.log('numberOfMeals:', numberOfMeals);
  return (
    <div id="menu-table-view">
      <table id="menu-table">
        <caption>
          <h1 id="menu-table-name">{menu.name}</h1>
          # Meals: <b>{numberOfMeals}</b> | # Pallets: <b>{menu.numberOfPallets}</b>
        </caption>
        <thead>
          <tr>
            <th>Items Per Bag</th>
            <th>Number of Packs</th>
            <th>Item Name</th>
            <th>Extra Items</th>
          </tr>
        </thead>
        <tbody>
          {
            menu.items.map(item => {
              const numberOfPacks = Math.ceil((menu.numberOfPallets * 180 * item.itemsPerBag) / item.itemsPerPack);
              const extraItems = (numberOfPacks * item.itemsPerPack) - (menu.numberOfPallets * 180 * item.itemsPerBag);
              return (
                <tr key={item.id}>
                  <td>{item.itemsPerBag}</td>
                  <td>{getNumberOfPacks(item)}</td>
                  <td>{item.name}</td>
                  <td>{extraItems}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default MenuTableView;