import styles from "./Hero.module.css";
import heroImage from "../assets/images/littleLemon/bruschetta-platter.jpg";
import { Link } from "react-router-dom";
import ReservationPage from "../pages/ReservationPage";

function Hero() {
   return (
      <section className={styles.hero}>
         <div className={styles.heroText}>
            <div className={styles.hero_}>
               <h1>Little Lemon</h1>
               <h4>Chicago</h4>
            </div>
            <p className={styles.heroText}>
               We are a family owned Italian restaurant, focused on traditional
               recipes served with a modern twist.
            </p>
            <Link to="/reservations">
               <button className={styles.heroButton}>Reserve A Table</button>
            </Link>
         </div>
         <img
            src={heroImage}
            alt="Waiter holding platter of Bruschetta"
            className={styles.heroImage}
         />
      </section>
   );
}

export default Hero;
