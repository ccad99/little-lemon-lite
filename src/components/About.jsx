import styles from "./About.module.css";
// import OwnerA from "../assets/images/littleLemon/mario-adrian-a.jpg";
// import OwnerB from "../assets/images/littleLemon/mario-adrian-b.jpg";
import Patio from "../assets/images/littleLemon/restaurant-patio.jpg";
import Chef from "../assets/images/littleLemon/restaurant-chef.jpg";

function About() {
   return (
      <section className={styles.about}>
         <div className={styles.textColumn}>
            <h1 className={styles.title}>Little Lemon</h1>
            <p className={styles.subtitle}>Chicago</p>
            <div className={styles.spacer}></div>
            <p className={styles.description}>
               Little Lemon is a charming neighborhood bistro that serves simple
               food and classic cocktails in a lively but casual environment.
               The restaurant features a locally-sourced menu with daily
               specials.
            </p>
            <div className={styles.spacer}></div>
         </div>

         <div className={styles.imageColumn}>
            <div className={styles.imageContainer}>
               <img
                  src={Patio}
                  alt="Patio seating in the Little Lemon restaurant"
                  className={styles.imageA}
               />
               <img
                  src={Chef}
                  alt="A Chef preparing a delicious and decorative salad"
                  className={styles.imageB}
               />
            </div>
         </div>
      </section>
   );
}

export default About;
