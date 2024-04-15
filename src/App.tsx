import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/:city" element={<Home />}/>
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="blogs" element={<Blogs />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
     
      
    </Routes>

  </BrowserRouter>
  

     
    
  );
};

export default App;
