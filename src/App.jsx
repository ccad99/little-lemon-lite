import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import PageNotFound from "./ui/PageNotFound";
import ReservationConfirmedPage from "./pages/ReservationConfirmedPage";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import "./App.css";

const queryClient = new QueryClient();

function ErrorFallback({ error }) {
   return <div>Something went wrong: {error.message}</div>;
}

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
            <ErrorBoundary FallbackComponent={ErrorFallback}>
               <Routes>
                  <Route element={<AppLayout />}>
                     <Route index element={<HomePage />} />
                     <Route
                        path="/reservations"
                        element={<ReservationPage />}
                     />
                     <Route
                        path="/reservation-confirmed"
                        element={<ReservationConfirmedPage />}
                     />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
               </Routes>
            </ErrorBoundary>
         </BrowserRouter>
      </QueryClientProvider>
   );
}

export default App;
