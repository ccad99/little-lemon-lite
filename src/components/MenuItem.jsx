import styles from "./MenuItem.module.css";

const MenuItem = ({ item }) => {
   const {
      image,
      name,
      description,
      price,
      spicy_level: spicyness,
      vegetarian,
   } = item;

   return (
      <li className={styles.menuItem}>
         {/* <img src={image} alt={name} className={styles.menuImage} /> */}
         <img
            src={image || "/assets/images/menuItems/default-plate.webp"}
            alt={name || "Menu item"}
            className={styles.menuImage}
         />
         <div className={styles.nameDescription}>
            <span className={styles.name}>{name}</span>
            <span className={styles.description}>{description}</span>
         </div>
         <span className={styles.price}>${price.toFixed(2)}</span>
         <span className={styles.spicy}>
            {spicyness ? "🌶️".repeat(spicyness) : "Mild"}
         </span>
         {/* <span className={styles.veg}>{vegetarian ? "✅" : "❌"}</span> */}
      </li>
   );
};

export default MenuItem;
