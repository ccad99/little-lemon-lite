import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./ReservationForm.module.css";
import * as Yup from "yup";

const validationSchema = Yup.object({
   name: Yup.string().required("Full name is required"),
   date: Yup.date().required("Date is required"),
   time: Yup.string().required("Time is required"),
   guests: Yup.number().min(1).max(10).required("No. of Guests is required"),
   occasion: Yup.string(),
   phone: Yup.string().required("Phone is required"),
   email: Yup.string()
      .email("Invalid Email")
      .required("Email name is required"),
});

function ReservationForm({ formData, setFormData, nextStep, resetForm }) {
   return (
      <Formik
         initialValues={formData}
         validationSchema={validationSchema}
         onSubmit={(values) => {
            setFormData(values);
            nextStep();
         }}
      >
         {({ isSubmitting }) => (
            <Form>
               <div className={styles.reservationForm}>
                  <div className={styles.titleCell}>
                     <h2 className={styles.titleCell}>Table Reservation</h2>
                  </div>

                  <div className={styles.nameCell}>
                     <label>Your Name</label>
                     <Field type="text" name="name" placeholder="Full Name" />
                     <ErrorMessage
                        name="name"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.dateCell}>
                     <label>Date</label>
                     <Field type="date" name="date" />
                     <ErrorMessage
                        name="date"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.timeCell}>
                     <label>Timeslot</label>
                     <Field as="select" name="time">
                        <option value="">Timeslots</option>
                        <option value="6:00">6:00 PM</option>
                        <option value="6:30">6:30 PM</option>
                        <option value="7:00">7:00 PM</option>
                        <option value="7:30">7:30 PM</option>
                        <option value="8:00">8:00 PM</option>
                        <option value="8:30">8:30 PM</option>
                     </Field>
                     <ErrorMessage
                        name="time"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.guestsCell}>
                     <label>No. of Guests</label>
                     <Field as="select" name="guests">
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
                     <label>Occasion</label>
                     <Field as="select" name="occasion">
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
                     <label>Mobile No</label>
                     <Field
                        type="text"
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
                     <label>Email</label>
                     <Field type="email" name="email" placeholder="Email" />
                     <ErrorMessage
                        name="email"
                        component="div"
                        className={styles.error}
                     />
                  </div>

                  <div className={styles.resetCell}>
                     <button type="button" onClick={resetForm}>
                        Reset
                     </button>
                  </div>
                  <div className={styles.continueCell}>
                     <button type="submit" disabled={isSubmitting}>
                        Continue
                     </button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
}

export default ReservationForm;
