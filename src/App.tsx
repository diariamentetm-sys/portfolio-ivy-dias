import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { ContentProvider } from "./content/ContentContext";
import { LocaleProvider } from "./i18n/LocaleContext";
import { AbtestPage } from "./pages/AbtestPage";
import { AdminPage } from "./pages/AdminPage";
import { BbnkPage } from "./pages/BbnkPage";
import { CashlogPage } from "./pages/CashlogPage";
import { ClaroPage } from "./pages/ClaroPage";
import { DynamicCasePage } from "./pages/DynamicCasePage";
import { EtituloPage } from "./pages/EtituloPage";
import { HomePage } from "./pages/HomePage";
import { PoliciaFederalPage } from "./pages/PoliciaFederalPage";
import { RiskaiPage } from "./pages/RiskaiPage";
import { TrusthubPage } from "./pages/TrusthubPage";

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
            <Route path="/cases/bbnk" element={<BbnkPage />} />
            <Route path="/cases/trusthub" element={<TrusthubPage />} />
            <Route
              path="/cases/policia-federal"
              element={<PoliciaFederalPage />}
            />
            <Route path="/cases/riskai" element={<RiskaiPage />} />
            <Route path="/cases/:slug" element={<DynamicCasePage />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </LocaleProvider>
  );
}

export default App;
