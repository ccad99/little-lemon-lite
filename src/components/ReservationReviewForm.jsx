import styles from "./ReservationReviewForm.module.css";
import BracioleImage from "../assets/images/menuItems/braciole.webp";
import { format } from "date-fns";

function ReservationReviewForm({ formData, prevStep, nextStep }) {
   const { name, date, time, guests, occasion, phone, email } = formData;

   const formattedDate = date ? format(new Date(date), "MMMM d, yyyy") : "";
   const formattedPhone = phone
      ? `(${phone.slice(-10, -7)}) ${phone.slice(-7, -4)} -${phone.slice(-4)}`
      : "";
   const formattedName = name
      ? name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";
   const formattedOccasion = occasion
      ? occasion.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";

   const occasionString = occasion ? `Occasion: ${formattedOccasion}` : "";

   return (
      <section className={styles.reviewPage}>
         <div className={styles.reviewForm}>
            <h2>Reservation Details Review</h2>
            <div className={styles.body}>
               <div className={styles.imageColumn}>
                  <img src={BracioleImage} alt="Delicious Braciole dinner" />
               </div>
               <div className={styles.textColumn}>
                  <ul>
                     <li>Reservation for: {formattedName}</li>
                     <li>No. of Guests: {guests}</li>
                     <li>
                        Date: {formattedDate} at {time} pm
                     </li>
                     <li>{occasionString}</li>
                     <li>Phone: {formattedPhone}</li>
                     <li>Email: {email}</li>
                  </ul>
               </div>
            </div>

            <div className={styles.buttonContainer}>
               <div className={styles.prevButton}>
                  <button type="button" onClick={prevStep}>
                     Previous
                  </button>
               </div>
               <div className={styles.continueButton}>
                  <button type="button" onClick={nextStep}>
                     Continue
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReservationReviewForm;
