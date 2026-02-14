import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import MaterialsPage from "./pages/MaterialsPage";
import ProductionPage from "./pages/ProductionPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>StockFlow</h1>

        {/* Menu */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/products" style={{ marginRight: "15px" }}>
            Produtos
          </Link>
          <Link to="/materials" style={{ marginRight: "15px" }}>
            Matérias-Primas
          </Link>
          <Link to="/production">Produção</Link>
        </nav>

        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/production" element={<ProductionPage />} />
          <Route path="*" element={<ProductsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
