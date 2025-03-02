import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ReservationConfirmedPage.module.css";
import PropTypes from "prop-types";
import { format } from "date-fns";

function ReservationConfirmedPage() {
   const location = useLocation();
   const navigate = useNavigate();

   const formData = location.state;

   if (!formData) {
      return (
         <div>
            <h2> No Reservation Found!</h2>
            <p>
               No reservation details available. Please make a reservation
               first.
            </p>
            <button onClick={() => navigate("/")}>Return to Home</button>
         </div>
      );
   }

   const { date, time, confirmation } = formData;

   const formattedConfirmation =
      confirmation === "email" ? "Email" : "Text Message";

   const formattedDate = date ? format(new Date(date), "MMMM d, yyyy") : "";

   const formattedTime = (timeString) => {
      if (!timeString) return "";
      const [hour, minute] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute);
      return format(date, "h:mm a");
   };

   return (
      <section className={styles.reviewPage}>
         <div className={styles.reviewForm}>
            <h2>Reservation Confirmed!</h2>
            <div className={styles.body}>
               <div className={styles.textColumn}>
                  <p>🎉 Thank you for your reservation. 🎉</p>
                  <p>
                     Your table is reserved for {formattedDate} at{" "}
                     {formattedTime(time)}
                  </p>
                  <p>
                     We have sent the reservation details to you by:{" "}
                     <span className={styles.confirmMsg}>
                        {formattedConfirmation}
                     </span>
                  </p>
                  <p>We look forward to serving you!</p>
               </div>
            </div>
            <div className={styles.buttonContainer}>
               <div className={styles.continueButton}>
                  <button type="button" onClick={() => navigate("/")}>
                     Finish
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}

ReservationConfirmedPage.propTypes = {
   formData: PropTypes.object,
};

export default ReservationConfirmedPage;
