import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./AppLayout.module.css";

function AppLayout() {
   return (
      <div className={styles.layout}>
         <Header />
         <main className={styles.main}>
            <Outlet />
         </main>
         <Footer />
      </div>
   );
}

export default AppLayout;
