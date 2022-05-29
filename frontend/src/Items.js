import Item from "./Item";

const Items = ({ items }) => {
  return <ul className="items">
    {
      items.length && items.map(item => <Item key={item.id} initItem={item} />)
    }
  </ul>
}

export default Items; 
