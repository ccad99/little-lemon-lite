import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect } from "vitest";
import ReservationReviewForm from "../components/ReservationReviewForm";

const mockFormData = {
   name: "John Doe",
   phone: "1234567890",
   occasion: "Birthday",
   email: "john@example.com",
   date: "2025-03-16",
   time: "18:00",
};

const mockBackStep = vi.fn();
const mockSubmitReservation = vi.fn();

test("renders reservation details correctly", () => {
   render(
      <ReservationReviewForm
         formData={mockFormData}
         prevStep={mockBackStep}
         nextStep={mockSubmitReservation}
      />
   );

   // Verify reservation details are displayed
   expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
   expect(
      screen.getByText((content) => content.includes("(123) 456-7890"))
   ).toBeInTheDocument();
   expect(screen.getByText(/Birthday/i)).toBeInTheDocument();
   expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
   expect(screen.getByText(/March 15, 2025/i)).toBeInTheDocument();
   expect(screen.getByText(/6:00 PM/i)).toBeInTheDocument();
});

test("Previous and Continue buttons work", async () => {
   render(
      <ReservationReviewForm
         formData={mockFormData}
         prevStep={mockBackStep}
         nextStep={mockSubmitReservation}
      />
   );

   await userEvent.click(screen.getByRole("button", { name: /Previous/i }));
   expect(mockBackStep).toHaveBeenCalledTimes(1);

   await userEvent.click(screen.getByRole("button", { name: /Continue/i }));
   expect(mockSubmitReservation).toHaveBeenCalledTimes(1);
});
