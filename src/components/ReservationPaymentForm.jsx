import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { format } from "date-fns";
import styles from "./ReservationPaymentForm.module.css";
// import CvvImage from "../assets/images/littleLemon/icon-creditcard.svg";
import toast from "react-hot-toast";

function ReservationPaymentForm({ formData, prevStep, nextStep, resetForm }) {
   const { name, date, time, guests } = formData;
   const [isProcessing, setIsProcessing] = useState(false);

   const navigate = useNavigate();

   const formattedDate = date ? format(new Date(date), "MMMM d, yyyy") : "";

   // const formattedPhone = phone
   //    ? `(${phone.slice(-10, -7)}) ${phone.slice(-7, -4)} -${phone.slice(-4)}`
   //    : "";
   const formattedName = name
      ? name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";
   // const formattedOccasion = occasion
   //    ? occasion.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
   //    : "";

   // const occasionString = occasion ? `Occasion: ${formattedOccasion}` : "";

   const validationSchema = Yup.object({
      ccNumber: Yup.string()
         .matches(/^\d{16}$/, "Credit Card must be 16 digits")
         .required("Credit Card Number is required"),
      ccDate: Yup.string()
         .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, "Expiration Date must be MM/YYYY")
         .required("Expiration Date is required"),
      ccName: Yup.string().required("Cardholder Name is required"),
      ccCVV: Yup.string()
         .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
         .required("CVV number is required"),
      confirmation: Yup.string().required(
         "Please select a confirmation method"
      ),
   });

   const processPayment = (values) => {
      setIsProcessing(true);

      setTimeout(() => {
         setIsProcessing(false);

         const isSuccess = Math.random() < 0.9;

         if (isSuccess) {
            toast.success("🎉 Reservation Confirmed! Redirecting to home...");
            setTimeout(() => {
               resetForm();
               navigate("/");
            }, 7000);
         } else {
            const failureReason =
               Math.random() < 0.5
                  ? "We're sorry, we don't have a table available for the selected date and time."
                  : "Payment failed. Please check your credit card details and try again.";
            // toast.error(failureReason, {
            //    duration: 5000,
            // });
            toast.error(failureReason);
            setTimeout(() => {
               prevStep();
            }, 7000);
         }
      }, 2000);
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
                     📅 {formattedDate} | 🕒 {time} PM | 👥 {guests} guests
                  </p>

                  <h3 className={styles.sectionHeader}>Credit Card Details</h3>
                  <div className={styles.paymentGrid}>
                     <div className={styles.formField}>
                        <label>Number</label>
                        <Field
                           type="text"
                           name="ccNumber"
                           placeholder="1234 5678 9012 3456"
                           // onBlur={(e) => {
                           //    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric chars
                           //    if (value.length === 16) {
                           //       e.target.value = value.replace(
                           //          /(\d{4})(?=\d)/g,
                           //          "$1-"
                           //       );
                           //    }
                           // }}
                        />
                        <ErrorMessage
                           name="ccNumber"
                           component="div"
                           className={styles.error}
                        />
                     </div>
                     <div className={styles.formField}>
                        <label>Name</label>
                        <Field
                           type="text"
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
                        <label>Exp</label>

                        <Field
                           type="text"
                           name="ccDate"
                           placeholder="MM/YYYY"
                           // onChange={(e) => {
                           //    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric chars
                           //    if (value.length > 2) {
                           //       value = `${value.slice(0, 2)}/${value.slice(
                           //          2,
                           //          6
                           //       )}`;
                           //    }
                           //    e.target.value = value; // Update input value
                           // }}
                           // onBlur={(e) => {
                           //    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric chars
                           //    if (value.length === 6) {
                           //       e.target.value = value.replace(
                           //          /^(\d{2})(\d{4})$/,
                           //          "$1/$2"
                           //       );
                           //    }
                           // }}
                        />

                        <ErrorMessage
                           name="ccDate"
                           component="div"
                           className={styles.error}
                        />
                     </div>

                     <div className={styles.formField}>
                        <label>CVV</label>
                        <div className={styles.cvvContainer}>
                           <Field type="text" name="ccCVV" placeholder="123" />
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
                  </div>

                  <h3 className={styles.sectionHeader}>
                     Confirmation Preference
                  </h3>
                  <div className={styles.radioGroup}>
                     <div className={styles.radioButtons}>
                        <label>
                           <Field
                              type="radio"
                              name="confirmation"
                              value="text"
                           />
                           Send me reservation confirmation via Text Message
                        </label>
                        <label>
                           <Field
                              type="radio"
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
                        disabled={isProcessing}
                     >
                        {isProcessing ? "Processing..." : "Reserve Table"}
                     </button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
}
export default ReservationPaymentForm;
