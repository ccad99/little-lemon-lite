import styles from "./ReservationProgressBar.module.css";

function ReservationProgressBar({ step }) {
   return (
      <div className={styles.progressBar}>
         {["Reservation", "Review", "Payment"].map((label, index) => (
            <div
               key={index}
               className={`${styles.step} ${
                  step === index + 1 ? styles.activeStep : ""
               }`}
            >
               <span className={styles.stepNumber}>{index + 1}</span>
               <span className={styles.stepLabel}>{label}</span>
            </div>
         ))}
      </div>
   );
}

export default ReservationProgressBar;
