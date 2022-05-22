import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MenuTableView from "./MenuTableView";
import Menus from "./Menus";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/menus" element={<Menus />} />
      <Route path="/menus/:menuId" element={<MenuTableView />} />
    </Routes>
  </BrowserRouter>
);