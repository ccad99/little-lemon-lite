import styles from "./Hero.module.css";
import heroImage from "../assets/images/littleLemon/bruschetta-platter.jpg";

function Hero() {
   // return (
   //    <section className={styles.heroContainer}>
   //       <div className={styles.hero}>
   //          <div className={styles.heroTitle}>
   //             <h1 className={styles.heroTitleA}>Little Lemon</h1>
   //             <h2 className={styles.heroTitleB}>Chicago</h2>
   //             <p className={styles.heroText}>
   //                We are a family owned Italian restaurant, focused on
   //                traditional recipes served with a modern twist.
   //             </p>
   //             <button className={styles.heroButton}>Reserve A Table</button>
   //          </div>
   //       </div>
   //       <img
   //          src={heroImage}
   //          alt="Waiter holding platter of Bruschetta"
   //          className={styles.heroImage}
   //       />
   //    </section>
   // );

   return (
      <section className={styles.heroContainer}>
         <div className={styles.hero}>
            <h1 className={styles.heroName}>Little Lemon</h1>
            <h2 className={styles.heroCity}>Chicago</h2>
            <p className={styles.heroText}>
               We are a family owned Italian restaurant, focused on traditional
               recipes served with a modern twist.
            </p>
            <button className={styles.heroButton}>Reserve A Table</button>
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
