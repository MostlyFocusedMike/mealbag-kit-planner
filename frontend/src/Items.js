import Item from "./Item";

const Items = ({ items, numberOfPallets }) => {
  return <ul className="items">
    {
      items.length && items.map(item => <Item key={item.id} initItem={item} numberOfPallets={numberOfPallets} />)
    }
  </ul>
}

export default Items; 
