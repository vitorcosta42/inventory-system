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
        <header className="bg-[#0C0F3D] shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <StockFlowIcon size={24} className="text-white" />
                <span className="text-white">StockFlow</span>
              </h1>

              <button
                className="sm:hidden text-white"
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
                        ? "text-white border-b-2 border-white pb-1"
                        : "text-white/70 hover:text-white"
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
                        ? "text-white border-b-2 border-white pb-1"
                        : "text-white/70 hover:text-white"
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
                        ? "text-white border-b-2 border-white pb-1"
                        : "text-white/70 hover:text-white"
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
                className="text-white/70 hover:text-white"
              >
                Produtos
              </NavLink>

              <NavLink
                to="/materials"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
              >
                Matérias-Primas
              </NavLink>

              <NavLink
                to="/production"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
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
