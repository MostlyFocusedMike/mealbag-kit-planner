import { useState, useEffect, useRef } from "react";

const isTabKey = (e) => (e.which || e.keyCode) === 9;
const isShiftKey = (e) => (e.which || e.keyCode) === 16;

const NewItemModal = ({ toggleVisibility, addItem }) => {
  const [isShiftDown, setIsShiftDown] = useState(false);
  const xButton = useRef();
  const submitButton = useRef();

  useEffect(() => { xButton.current.focus() }, []);

  const setShiftKey = (e) => isShiftKey(e) && setIsShiftDown(e.type === 'keydown');

  const forwardTrapFocus = (e) => {
    if (!isTabKey(e) || !isShiftDown) return;
    e.preventDefault();
    submitButton.current.focus();
  }

  const reverseTrapFocus = (e) => {
    if (!isTabKey(e) || isShiftDown) return;
    e.preventDefault();
    xButton.current.focus();
  }

  const handleBackdropClick = (e) => (e.target.id === 'modal-backdrop') && toggleVisibility();

  const [item, setItem] = useState({
    name: '',
    itemsPerBag: 1,
    itemsPerPack: 1,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(item);
    toggleVisibility();
  }

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    })
  }

  return <div id='modal-backdrop' onClick={handleBackdropClick}>
    <div id='new-ticket-modal' onKeyUp={setShiftKey} onKeyDown={setShiftKey}>
      <div id='modal-top'>
        <button id="x-button" onKeyDown={forwardTrapFocus} onClick={toggleVisibility} ref={xButton}>X</button>
        <h2 id="modal-title">Create New Ticket</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-group">
          <label className="modal-label" htmlFor='name'>Name: </label>
          <input type='text' id='name' name='name' value={item.name} onChange={handleChange} />
        </div>
        <div className="modal-group">
          <label htmlFor='items-per-bag' className="modal-label">Items Per Bag: </label>
          <input type='number' min="1" max="99" id='items-per-bag' name='itemsPerBag' value={item.itemsPerBag} onChange={handleChange} />
        </div>
        <div className="modal-group">
          <label className="modal-label" htmlFor='items-per-pack'>Items Per Pack: </label>
          <input type='number' min="1" max="99" id='items-per-pack' name='itemsPerPack' value={item.itemsPerPack} onChange={handleChange} />
        </div>
        <button id="modal-submit" onKeyDown={reverseTrapFocus} ref={submitButton}>Add Item</button>
      </form>
    </div>
  </div>
}

export default NewItemModal;