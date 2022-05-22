import {useEffect, useState} from 'react';

function MenuTableView() {
  const [menu, setMenu] = useState(null);
  useEffect(() =>  {
    fetch('/api/v1/menus/6289957ef618b5d92e3af7f9').then(r=>r.json()).then(setMenu)
  }, [])

  useEffect(() => {
    console.log('menu:', menu);
  }, [menu])

  if (!menu) return null;

  const numberOfMeals = menu.numberOfPallets * 12 * 15
  const getNumberOfPacks = ({itemsPerPack}) => Math.ceil(numberOfMeals / itemsPerPack)
  console.log('numberOfMeals:', numberOfMeals);
  return (
    <div className="menu-table-view">
      <table>
        <caption>{menu.name} <br /># Pallets: <b>{menu.numberOfPallets}</b> | # Meals: <b>{numberOfMeals}</b></caption>
        <thead>
          <tr>
            <th>Items Per Bag</th>
            <th>Number of Packs</th>
            <th>Item Name</th>
          </tr>
        </thead>
        <tbody>
          {
            menu.items.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.itemsPerBag}</td>
                  <td>{getNumberOfPacks(item)}</td>
                  <td>{item.name}</td>
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