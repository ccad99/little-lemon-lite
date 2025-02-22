import styles from "./Hero.module.css";
import heroImage from "../assets/images/littleLemon/bruschetta-platter.jpg";
import { Link } from "react-router-dom";

function Hero() {
   return (
      <section className={styles.container}>
         <div className={styles.hero}>
            <div className={styles.heroText}>
               <div className={styles.heroTextHead}>
                  <h1>Little Lemon</h1>
                  <h2>Chicago</h2>
               </div>
               <p>
                  We are a family owned Italian restaurant, focused on
                  traditional recipes served with a modern twist.
               </p>
               <Link to="/reservations">
                  <button className={styles.heroButton}>Reserve a Table</button>
               </Link>
            </div>
            <img
               src={heroImage}
               alt="Waiter holding platter of Bruschetta"
               className={styles.heroImage}
            />
         </div>
      </section>
   );
}

export default Hero;
