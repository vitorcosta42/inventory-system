import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { MaterialsPage, ProductionPage, ProductsPage } from "./pages";
import { ToastContainer } from "react-toastify";
import { MenuIcon, StockFlowIcon } from "./components/icons";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <StockFlowIcon size={24} />
                <span className="text-blue-600">StockFlow</span>
              </h1>

              <button
                className="sm:hidden text-slate-700 text-2xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MenuIcon size={24} />
              </button>
              <nav className="sm:flex gap-6 max-sm:hidden">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-slate-600 hover:text-blue-600"
                    }`
                  }
                >
                  Produtos
                </NavLink>

                <NavLink
                  to="/materials"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-slate-600 hover:text-blue-600"
                    }`
                  }
                >
                  Matérias-Primas
                </NavLink>

                <NavLink
                  to="/production"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-slate-600 hover:text-blue-600"
                    }`
                  }
                >
                  Produção
                </NavLink>
              </nav>
            </div>
            <nav
              className={`flex flex-col gap-4 mt-4 sm:hidden transition-all duration-200 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <NavLink
                to="/products"
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-blue-600"
              >
                Produtos
              </NavLink>

              <NavLink
                to="/materials"
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-blue-600"
              >
                Matérias-Primas
              </NavLink>

              <NavLink
                to="/production"
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-blue-600"
              >
                Produção
              </NavLink>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/production" element={<ProductionPage />} />
            <Route path="*" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
