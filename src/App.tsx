import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { GoogleAnalytics } from "./components/seo/GoogleAnalytics";
import { ContentProvider } from "./content/ContentContext";
import { LocaleProvider } from "./i18n/LocaleContext";
import { LocaleLayout } from "./i18n/LocaleLayout";
import {
  LegacyLocaleRedirect,
  RootLocaleRedirect,
} from "./i18n/LegacyLocaleRedirect";
import { useLocalizedPath } from "./i18n/useLocalizedPath";
import { AbtestPage } from "./pages/AbtestPage";
import { AdminPage } from "./pages/AdminPage";
import { BbnkPage } from "./pages/BbnkPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { CashlogPage } from "./pages/CashlogPage";
import { ClaroPage } from "./pages/ClaroPage";
import { DynamicCasePage } from "./pages/DynamicCasePage";
import { EntreJornadasPage } from "./pages/EntreJornadasPage";
import { EtituloPage } from "./pages/EtituloPage";
import { HomePage } from "./pages/HomePage";
import { PoliciaFederalPage } from "./pages/PoliciaFederalPage";
import { RiskaiPage } from "./pages/RiskaiPage";
import { TrusthubPage } from "./pages/TrusthubPage";

function RiskaiAliasRedirect() {
  const lp = useLocalizedPath();
  return <Navigate to={lp("/cases/gerenciador-de-riscos-com-ai")} replace />;
}

function App() {
  return (
    <LocaleProvider>
      <ContentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <GoogleAnalytics />
          <Routes>
            <Route path="/admin" element={<AdminPage />} />

            <Route path="/:locale" element={<LocaleLayout />}>
              <Route index element={<HomePage />} />
              <Route path="entre-jornadas" element={<EntreJornadasPage />} />
              <Route path="entre-jornadas/:slug" element={<BlogPostPage />} />
              <Route path="cases/cashlog" element={<CashlogPage />} />
              <Route path="cases/claro" element={<ClaroPage />} />
              <Route path="cases/abtest" element={<AbtestPage />} />
              <Route path="cases/etitulo" element={<EtituloPage />} />
              <Route path="cases/bbnk" element={<BbnkPage />} />
              <Route path="cases/trusthub" element={<TrusthubPage />} />
              <Route
                path="cases/policia-federal"
                element={<PoliciaFederalPage />}
              />
              <Route
                path="cases/gerenciador-de-riscos-com-ai"
                element={<RiskaiPage />}
              />
              <Route path="cases/riskai" element={<RiskaiAliasRedirect />} />
              <Route path="cases/:slug" element={<DynamicCasePage />} />
            </Route>

            <Route path="/" element={<RootLocaleRedirect />} />
            <Route path="/cases/*" element={<LegacyLocaleRedirect />} />
            <Route path="/entre-jornadas" element={<LegacyLocaleRedirect />} />
            <Route
              path="/entre-jornadas/*"
              element={<LegacyLocaleRedirect />}
            />
            <Route path="*" element={<LegacyLocaleRedirect />} />
          </Routes>
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </ContentProvider>
    </LocaleProvider>
  );
}

export default App;
