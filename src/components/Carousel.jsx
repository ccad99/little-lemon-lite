import { useRef } from "react";
import styles from "./Carousel.module.css";
import { specialsData } from "../data/specialsData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cyclist from "/assets/images/littleLemon/cyclistLogo.jpg";

function Carousel() {
   const carouselRef = useRef(null);

   const scrollLeft = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
   };

   const scrollRight = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
   };

   return (
      <>
         <div className={styles.carouselTitle}>
            <h1>{`Chef's Specials - prepared daily`}</h1>
            <button className={styles.carouselButton}>Online Menu</button>
         </div>
         <div className={styles.carouselContainer}>
            <button onClick={scrollLeft} className={styles.navButton}>
               <FaChevronLeft />
            </button>

            <div className={styles.carousel} ref={carouselRef}>
               {specialsData.map((item) => (
                  <div key={item.id} className={styles.card}>
                     <img
                        src={item.image}
                        alt={item.name}
                        className={styles.image}
                     />
                     <div className={styles.namePriceRow}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <span className={styles.price}>${item.price}</span>
                     </div>
                     <p className={styles.description}>{item.description}</p>
                     <div className={styles.orderRow}>
                        <span className={styles.orderText}>
                           Order a delivery
                        </span>
                        <img
                           src={Cyclist}
                           alt="Delivery icon"
                           className={styles.bikeIcon}
                        />
                     </div>
                  </div>
               ))}
            </div>

            <button onClick={scrollRight} className={styles.navButton}>
               <FaChevronRight />
            </button>
         </div>
      </>
   );
}

export default Carousel;
