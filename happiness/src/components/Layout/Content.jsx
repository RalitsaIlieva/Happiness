import { Route, Routes } from "react-router-dom";

import Home from "../Home";
import About from "./About";
import Membership from "./Membership";
import Item from "./Item";

const Content = () => (
  <Routes>
    <Route path="/Happiness" element={<Home />} />
    <Route path="/:id" element={<Item />} />
    <Route path="/about" element={<About />} />
    <Route path="/membership" element={<Membership />} />
  </Routes>
);

export default Content;
