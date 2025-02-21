// Full menu view
import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../services/apiMenuItems";
import MenuItem from "../components/MenuItem";
import Spinner from "../ui/Spinner";
import styles from "./MenuPage.module.css";

function MenuPage() {
   //Get Menu items using React Query

   const {
      data: menuItems,
      error,
      isLoading,
   } = useQuery({
      queryKey: ["menuItems"],
      queryFn: getMenuItems,
      staleTime: 1000 * 60 * 5,
   });

   if (isLoading) return <Spinner />;
   if (error) return <p className={styles.error}>❌ {error.message}</p>; // Display error to user

   return (
      <div className={styles.menuContainer}>
         <h2>Our Menu</h2>
         <ul className={styles.menuList}>
            <li className={styles.menuHeader}>
               <span></span>
               <div className={styles.nameDescription}>
                  <span className={styles.name}>Name</span>
                  <span className={styles.description}>Description</span>
               </div>
               <span className={styles.price}>Price</span>
               <span className={styles.spicy}>Spicy</span>
            </li>
            {menuItems.map((item) => (
               <MenuItem key={item.id} item={item} />
            ))}
         </ul>
      </div>
   );
}

export default MenuPage;
