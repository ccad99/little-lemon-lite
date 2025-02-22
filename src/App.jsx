import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import PageNotFound from "./ui/PageNotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <Routes>
               <Route element={<AppLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/reservations" element={<ReservationPage />} />
               </Route>
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </BrowserRouter>
      </QueryClientProvider>
   );
}

export default App;
