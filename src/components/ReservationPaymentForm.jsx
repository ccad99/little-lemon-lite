import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { format } from "date-fns";
import { submitAPI } from "../services/apiUtils.js";
import styles from "./ReservationPaymentForm.module.css";

function ReservationPaymentForm({ formData, prevStep, resetForm }) {
   const { name, date, time, guests } = formData;

   ReservationPaymentForm.propTypes = {
      formData: PropTypes.object.isRequired,
      setFormData: PropTypes.func.isRequired,
      prevStep: PropTypes.func.isRequired,
      resetForm: PropTypes.func.isRequired,
   };

   const navigate = useNavigate();

   const formattedDate = date ? format(new Date(date), "MMMM d, yyyy") : "";

   const formattedTime = (timeString) => {
      if (!timeString) return "";
      const [hour, minute] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute);
      return format(date, "h:mm a");
   };

   const formattedName = name
      ? name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";

   const validationSchema = Yup.object({
      ccNumber: Yup.string()
         .matches(/^\d{16}$/, "Credit Card must be 16 digits")
         .required("Credit Card Number is required"),
      ccDate: Yup.string()
         .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, "Expiration Date must be MM/YYYY")
         .required("Expiration Date is required")
         .test(
            "is-future-date",
            "Expiration date must be today or in the future",
            (value) => {
               // Ensure a value is present
               if (!value) return false;

               const [month, year] = value.split("/").map(Number);
               const currentDate = new Date();
               const currentMonth = currentDate.getMonth() + 1;
               const currentYear = currentDate.getFullYear();

               return (
                  year > currentYear ||
                  (year === currentYear && month >= currentMonth)
               );
            }
         ),
      ccName: Yup.string().required("Cardholder Name is required"),
      ccCVV: Yup.string()
         .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
         .required("CVV number is required"),
      confirmation: Yup.string().required(
         "Please select a confirmation method"
      ),
   });

   const processPayment = async (values, setSubmitting) => {
      try {
         const success = await submitAPI(formData);

         if (success) {
            resetForm();
            navigate("/reservation-confirmed", {
               state: { ...formData, confirmation: values.confirmation },
            });
         } else {
            console.error("❌ Reservation failed.");
            alert("Reservation could not be completed. Please try again.");
         }
      } catch (error) {
         console.error("❌ Error submitting reservation.");
         alert("An Error occurred. Please try again.");
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <Formik
         initialValues={{
            ccNumber: "",
            ccName: formattedName,
            ccDate: "",
            ccCVV: "",
            confirmation: "",
         }}
         validationSchema={validationSchema}
         onSubmit={processPayment}
      >
         {({ isSubmitting }) => (
            <Form>
               <div className={styles.paymentForm}>
                  <h2>Complete Your Reservation</h2>
                  <div className={styles.disclaimer}>
                     Little Lemon charges a $20 reservation fee to reserve your
                     table. This amount will be credited to you when you arrive
                     and check in. We look forward to serving you!
                  </div>
                  <p className={styles.reservation}>
                     📅 {formattedDate} | 🕒 {formattedTime(time)} PM | 👥{" "}
                     {guests} guests
                  </p>

                  <h3 className={styles.sectionHeader}>Credit Card Details</h3>
                  <div className={styles.paymentGrid}>
                     <div className={styles.formField}>
                        <label htmlFor="ccNumber">Number</label>
                        <Field
                           type="text"
                           id="ccNumber"
                           name="ccNumber"
                           placeholder="1234 5678 9012 3456"
                        />
                        <ErrorMessage
                           name="ccNumber"
                           component="div"
                           className={styles.error}
                        />
                     </div>
                     <div className={styles.formField}>
                        <label htmlFor="ccName">Name</label>
                        <Field
                           type="text"
                           id="ccName"
                           name="ccName"
                           placeholder="John Doe"
                        />
                        <ErrorMessage
                           name="ccName"
                           component="div"
                           className={styles.error}
                        />
                     </div>
                     <div className={styles.formField}>
                        <label htmlFor="ccDate">Exp</label>
                        <Field
                           type="text"
                           id="ccDate"
                           name="ccDate"
                           placeholder="MM/YYYY"
                        />
                        <ErrorMessage
                           name="ccDate"
                           component="div"
                           className={styles.error}
                        />
                     </div>

                     <div className={styles.formField}>
                        <label htmlFor="ccCVV">CVV</label>
                        <div className={styles.cvvContainer}>
                           <Field
                              type="text"
                              id="ccCVV"
                              name="ccCVV"
                              placeholder="123"
                           />
                           <img
                              src="/assets/images/littleLemon/icon-creditcard.svg"
                              alt="CVV location"
                              className={styles.cvvImage}
                           />
                        </div>
                        <ErrorMessage
                           name="ccCVV"
                           component="div"
                           className={styles.error}
                        />
                     </div>

                     <div className={styles.formField}>
                        <label htmlFor="ccAmt">Amount</label>
                        <input
                           type="text"
                           id="ccAmt"
                           value="$20.00"
                           readOnly
                           className={styles.reservationFee}
                           aria-label="Reservation Fee"
                           tabIndex={-1}
                        />
                     </div>
                  </div>

                  <h3 className={styles.sectionHeader}>
                     Confirmation Preference
                  </h3>
                  <div className={styles.radioGroup}>
                     <div className={styles.radioButtons}>
                        <label>
                           <Field
                              type="radio"
                              id="ccConfirmText"
                              name="confirmation"
                              value="text"
                           />
                           Send me reservation confirmation via Text Message
                        </label>
                        <label>
                           <Field
                              type="radio"
                              id="ccConfirmEmail"
                              name="confirmation"
                              value="email"
                           />
                           Send me reservation confirmation via Email
                        </label>
                     </div>
                     <ErrorMessage
                        name="confirmation"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.buttonContainer}>
                     <button
                        type="button"
                        className={styles.prevButton}
                        onClick={prevStep}
                     >
                        Previous
                     </button>
                     <button
                        type="submit"
                        className={styles.continueButton}
                        disabled={isSubmitting}
                     >
                        {isSubmitting ? "Processing..." : "Reserve Table"}
                     </button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
}
export default ReservationPaymentForm;
