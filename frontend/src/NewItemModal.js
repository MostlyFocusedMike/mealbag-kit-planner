import { useState, useEffect, useRef } from "react";

const isTabKey = (e) => (e.which || e.keyCode) === 9;
const isShiftKey = (e) => (e.which || e.keyCode) === 16;

const NewItemModal = ({ toggleVisibility }) => {
  const [isShiftDown, setIsShiftDown] = useState(false);
  const xButton = useRef();
  const submitButton = useRef();

  useEffect(() => { xButton.current.focus() }, []);

  const setShiftKey = (e) => isShiftKey(e) && setIsShiftDown(e.type === 'keydown');

  const firstTrapFocus = (e) => {
    if (!isTabKey(e) || !isShiftDown) return;
    e.preventDefault();
    submitButton.current.focus();
  }

  const lastTrapFocus = (e) => {
    if (!isTabKey(e) || isShiftDown) return;
    e.preventDefault();
    xButton.current.focus();
  }

  const handleBackdropClick = (e) => (e.target.id === 'modal-backdrop') && toggleVisibility();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit!:', );
  }

  const handleChangeText = (e) => {
    switch (e.target.id) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'url':
        setUrl(e.target.value);
        break;
    }
  }

  return <div id='modal-backdrop' onClick={handleBackdropClick}>
    <div id='new-ticket-modal' onKeyUp={setShiftKey} onKeyDown={setShiftKey}>
      <button onKeyDown={firstTrapFocus} onClick={toggleVisibility} ref={xButton}>X</button>
      <h2>Create New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' value={title} onChange={handleChangeText} />

        <button onKeyDown={lastTrapFocus} ref={submitButton}>Add Item</button>
      </form>
    </div>
  </div>
}

export default NewItemModal;