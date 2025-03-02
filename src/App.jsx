import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import PageNotFound from "./ui/PageNotFound";
import ReservationConfirmedPage from "./pages/ReservationConfirmedPage";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import "./App.css";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         {
            <Toaster position="top-center">
               {(t) => (
                  <ToastBar toast={t}>
                     {({ icon, message }) => (
                        <>
                           {icon}
                           {message}
                           {t.type !== "loading" && (
                              <button onClick={() => toast.dismiss(t.id)}>
                                 X
                              </button>
                           )}
                        </>
                     )}
                  </ToastBar>
               )}
            </Toaster>
         }
         <BrowserRouter>
            <Routes>
               <Route element={<AppLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/reservations" element={<ReservationPage />} />
                  <Route
                     path="/reservation-confirmed"
                     element={<ReservationConfirmedPage />}
                  />
               </Route>
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </BrowserRouter>
      </QueryClientProvider>
   );
}

export default App;
