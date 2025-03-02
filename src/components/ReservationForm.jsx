import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useReducer } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { loadAPI } from "../services/apiUtils.js";
import { format } from "date-fns";
import styles from "./ReservationForm.module.css";

const initialState = {
   times: [],
   isLoading: true,
   error: null,
};

function timesReducer(state, action) {
   switch (action.type) {
      case "INITIALIZE_TIMES":
         return { ...state, times: action.payload, isLoading: false };
      case "UPDATE_TIMES":
         return { ...state, times: action.payload };
      case "ERROR":
         return {
            ...state,
            times: [],
            error: action.payload,
            isLoading: false,
         };
      default:
         return state;
   }
}

const validationSchema = Yup.object({
   name: Yup.string().required("Full name is required"),
   date: Yup.date().required("Date is required"),
   time: Yup.string().required("Time is required"),
   guests: Yup.number().min(1).max(10).required("No. of Guests is required"),
   occasion: Yup.string(),
   phone: Yup.string().required("Phone is required"),
   email: Yup.string().email("Invalid Email").required("Email is required"),
});

function ReservationForm({ formData, setFormData, nextStep, resetForm }) {
   const [state, dispatch] = useReducer(timesReducer, initialState);

   useEffect(() => {
      async function fetchTimes() {
         try {
            const api = await loadAPI();

            if (!api) {
               console.error("❌ API is null. Unable to fetch times.");
               return;
            }
            console.log("Calling API function...");
            const today = new Date();
            const availableTimes = await api(today);
            console.log("✅ Available times:", availableTimes);
            dispatch({ type: "INITIALIZE_TIMES", payload: availableTimes });
         } catch (error) {
            console.error("❌ Failed to load times:", error);
            dispatch({ type: "ERROR", payload: "Failed to load times" });
         }
      }
      fetchTimes();
   }, []);

   const updateTimes = async (selectedDate) => {
      try {
         const api = await loadAPI();
         if (!api) {
            console.error("❌ API is null. Cannot update times.");
            return;
         }
         if (!selectedDate) {
            console.error("❌ No date provided to updateTimes().");
            return;
         }
         const parsedDate = new Date(selectedDate); // Ensure it's a Date object
         console.log(`Fetching times for date: ${parsedDate}`);

         const availableTimes = await api(parsedDate);
         console.log("✅ Updated available times:", availableTimes);

         dispatch({ type: "UPDATE_TIMES", payload: availableTimes });
      } catch (error) {
         console.error("❌ Failed to update times:", error);
         dispatch({ type: "ERROR", payload: "Failed to update times" });
      }
   };

   const formattedTime = (timeString) => {
      // Handle empty cases
      if (!timeString || !timeString.includes(":")) return "";
      // Extract hours & minutes
      const [hour, minute] = timeString.split(":").map(Number);
      const date = new Date();
      // Set extracted time into a Date object
      date.setHours(hour, minute);
      // Convert to 12-hour format
      return format(date, "h:mm a");
   };

   return (
      <Formik
         initialValues={{ ...formData }}
         validationSchema={validationSchema}
         onSubmit={(values) => {
            setFormData((prev) => ({
               ...prev, // ✅ Preserve existing data
               ...values, // ✅ Merge new form values
            }));
            nextStep();
         }}
      >
         {({ setFieldValue, isSubmitting }) => (
            <Form>
               <section className={styles.reservationForm}>
                  <header className={styles.titleCell}>
                     <h2 className={styles.titleCell}>Table Reservation</h2>
                  </header>

                  <div className={styles.nameCell}>
                     <label htmlFor="name">Name</label>
                     <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                     />
                     <ErrorMessage
                        name="name"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.dateCell}>
                     <label htmlFor="date">Date</label>
                     <Field
                        type="date"
                        id="date"
                        name="date"
                        onChange={(e) => {
                           setFieldValue("date", e.target.value);
                           setFormData((prev) => ({
                              ...prev,
                              date: e.target.value,
                           }));
                           updateTimes(e.target.value);
                        }}
                     />
                  </div>

                  <div className={styles.timeCell}>
                     <label htmlFor="time">Timeslot</label>
                     <Field as="select" id="time" name="time">
                        <option value="">Select a time</option>
                        {state.times.map((time) => {
                           return (
                              <option key={time} value={time}>
                                 {formattedTime(time)}
                              </option>
                           );
                        })}
                     </Field>
                     <ErrorMessage
                        name="time"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.guestsCell}>
                     <label htmlFor="guests">No. of Guests</label>
                     <Field as="select" id="guests" name="guests">
                        {[...Array(10).keys()].map((n) => (
                           <option key={n + 1} value={n + 1}>
                              {n + 1}
                           </option>
                        ))}
                     </Field>
                     <ErrorMessage
                        name="guests"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.occasionCell}>
                     <label htmlFor="occasion">Occasion</label>
                     <Field as="select" id="occasion" name="occasion">
                        <option value="">Select Occasion</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                     </Field>
                     <ErrorMessage
                        name="occasion"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.phoneCell}>
                     <label htmlFor="phone">Mobile No</label>
                     <Field
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Mobile Phone No"
                     />
                     <ErrorMessage
                        name="phone"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.emailCell}>
                     <label htmlFor="email">Email</label>
                     <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                     />
                     <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.buttonContainer}>
                     <button
                        type="button"
                        className={styles.resetButton}
                        onClick={resetForm}
                     >
                        Reset
                     </button>

                     <button
                        type="submit"
                        className={styles.continueButton}
                        disabled={isSubmitting}
                     >
                        Continue
                     </button>
                  </div>
               </section>
            </Form>
         )}
      </Formik>
   );
}

ReservationForm.propTypes = {
   formData: PropTypes.object.isRequired,
   setFormData: PropTypes.func.isRequired,
   nextStep: PropTypes.func.isRequired,
   resetForm: PropTypes.func.isRequired,
};

export { timesReducer, initialState };
export default ReservationForm;
