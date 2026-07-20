import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { ContentProvider } from "./content/ContentContext";
import { LocaleProvider } from "./i18n/LocaleContext";
import { AbtestPage } from "./pages/AbtestPage";
import { AdminPage } from "./pages/AdminPage";
import { CashlogPage } from "./pages/CashlogPage";
import { ClaroPage } from "./pages/ClaroPage";
import { DynamicCasePage } from "./pages/DynamicCasePage";
import { EtituloPage } from "./pages/EtituloPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <LocaleProvider>
      <ContentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cases/cashlog" element={<CashlogPage />} />
            <Route path="/cases/claro" element={<ClaroPage />} />
            <Route path="/cases/abtest" element={<AbtestPage />} />
            <Route path="/cases/etitulo" element={<EtituloPage />} />
            <Route path="/cases/:slug" element={<DynamicCasePage />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </LocaleProvider>
  );
}

export default App;
