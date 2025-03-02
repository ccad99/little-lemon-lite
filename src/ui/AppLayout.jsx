import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Suspense } from "react";
import styles from "./AppLayout.module.css";
import Spinner from "./Spinner";

function AppLayout() {
   return (
      <div className={styles.layout}>
         <Header />
         <main className={styles.main}>
            <Suspense fallback={<Spinner />}>
               <Outlet />
            </Suspense>
         </main>
         <Footer />
      </div>
   );
}

export default AppLayout;
