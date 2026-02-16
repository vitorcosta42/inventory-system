import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import MaterialsPage from "./pages/MaterialsPage";
import ProductionPage from "./pages/ProductionPage";
import { ToastContainer } from "react-toastify";

function App() {
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
        {/* HEADER */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              📦 <span className="text-blue-600">StockFlow</span>
            </h1>

            <nav className="flex gap-6">
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
        </header>

        {/* CONTEÚDO */}
        <main className="max-w-6xl mx-auto px-6 py-8">
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
