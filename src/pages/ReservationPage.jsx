// Table reservation page

import { useState } from "react";
import ReservationForm from "../components/ReservationForm";
import ReservationReviewForm from "../components/ReservationReviewForm";
import ReservationPaymentForm from "../components/ReservationPaymentForm";
import ReservationProgressBar from "../components/ReservationProgressBar";
import { Link } from "react-router-dom";

function ReservationPage() {
   const [step, setStep] = useState(1);

   const [formData, setFormData] = useState({
      name: "",
      date: "",
      time: "",
      guests: "1",
      occasion: "",
      phone: "",
      email: "",
   });

   const nextStep = () => setStep(step + 1);
   const prevStep = () => setStep(step - 1);
   // const nextStep = () => setStep((prev) => prev + 1);

   const resetForm = () => {
      setFormData({
         name: "",
         date: "",
         time: "",
         guests: "1",
         occasion: "",
         phone: "",
         email: "",
      });
      setStep(1);
   };

   return (
      <div>
         <ReservationProgressBar step={step} />
         {step === 1 && (
            <ReservationForm
               formData={formData}
               setFormData={setFormData}
               nextStep={nextStep}
               resetForm={resetForm}
               step={step}
            />
         )}
         {step === 2 && (
            <ReservationReviewForm
               formData={formData}
               prevStep={prevStep}
               nextStep={nextStep}
            />
         )}
         {step === 3 && (
            <ReservationPaymentForm
               formData={formData}
               setFormData={setFormData}
               prevStep={prevStep}
               nextStep={nextStep}
               resetForm={resetForm}
            />
         )}
      </div>
   );
}

export default ReservationPage;
