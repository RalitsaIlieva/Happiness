import { Route, Routes } from "react-router-dom";

import Home from "../Home";
import ItemList from "../Items/ItemList";
import About from "./About";
import Membership from "./Membership";

const Content = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/items" element={<ItemList />} />
    <Route path="/about" element={<About />} />
    <Route path="/membership" element={<Membership />} />
  </Routes>
);

export default Content;
