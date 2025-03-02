import styles from "./ReservationReviewForm.module.css";
import PropTypes from "prop-types";
import { format } from "date-fns";

function ReservationReviewForm({ formData, prevStep, nextStep }) {
   const { name, date, time, guests, occasion, phone, email } = formData;

   const formattedDate = date ? format(new Date(date), "MMMM d, yyyy") : "";

   const formattedTime = (timeString) => {
      if (!timeString) return "";
      // Extract hours & minutes
      const [hour, minute] = timeString.split(":").map(Number);
      const date = new Date();
      // Set extracted time into a Date object
      date.setHours(hour, minute);
      // Convert to 12-hour format
      return format(date, "h:mm a");
   };

   let formattedPhone = phone;

   // Remove all non-numeric characters
   const numericPhone = phone ? phone.replace(/\D/g, "") : "";

   // Format if exactly 10 digits
   if (numericPhone.length === 10) {
      formattedPhone = `(${numericPhone.slice(0, 3)}) ${numericPhone.slice(
         3,
         6
      )}-${numericPhone.slice(6)}`;
   }

   const formattedName = name
      ? name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";
   const formattedOccasion = occasion
      ? occasion.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";

   return (
      <section className={styles.reviewPage}>
         <div className={styles.reviewForm}>
            <h2>Reservation Details Review</h2>
            <div className={styles.body}>
               <div className={styles.imageColumn}>
                  <img
                     src="/assets/images/menuItems/braciole.webp"
                     alt="Delicious Braciole dinner"
                  />
               </div>
               <div className={styles.textColumn}>
                  <ul>
                     <li>Reservation for: {formattedName}</li>
                     <li>No. of Guests: {guests}</li>
                     <li>
                        Date: {formattedDate} at {formattedTime(time)}
                     </li>
                     {occasion && <li>Occasion: {formattedOccasion}</li>}
                     <li>Phone: {formattedPhone}</li>
                     <li>Email: {email}</li>
                  </ul>
               </div>
            </div>

            <div className={styles.buttonContainer}>
               <div className={styles.prevButton}>
                  <button type="button" name="prev" onClick={prevStep}>
                     Previous
                  </button>
               </div>
               <div className={styles.continueButton}>
                  <button type="button" name="next" onClick={nextStep}>
                     Continue
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}

ReservationReviewForm.propTypes = {
   formData: PropTypes.object.isRequired,
   nextStep: PropTypes.func.isRequired,
   prevStep: PropTypes.func.isRequired,
};

export default ReservationReviewForm;
