import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import ReservationPaymentForm from "../components/ReservationPaymentForm";

const mockFormData = {
   name: "John Doe",
   date: "2025-03-16",
   time: "18:00",
   guests: "3",
};

const mockPrevStep = vi.fn();
const mockResetForm = vi.fn();

const setup = () =>
   render(
      <MemoryRouter>
         <ReservationPaymentForm
            formData={mockFormData}
            prevStep={mockPrevStep}
            resetForm={mockResetForm}
         />
      </MemoryRouter>
   );

beforeEach(() => {
   vi.clearAllMocks();
   setup();
});

test("renders the form correctly", () => {
   expect(screen.getByText(/Complete Your Reservation/i)).toBeInTheDocument();
   expect(screen.getByText(/March 15, 2025/i)).toBeInTheDocument();
   expect(screen.getByText(/6:00 PM/i)).toBeInTheDocument();
   expect(screen.getByText(/Credit Card Details/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Number/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Exp/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
   expect(screen.getByText(/Confirmation Preference/i)).toBeInTheDocument();
   expect(
      screen.findByRole("button", { name: /Previous/i })
   ).toBeInTheDocument();
   expect(
      screen.findByRole("button", { name: /Reserve Table/i })
   ).toBeInTheDocument();
});

test("shows validation errors on empty submit", async () => {
   await userEvent.click(
      screen.findByRole("button", { name: /Reserve Table/i })
   );

   await userEvent.clear(screen.getByLabelText(/Name/i)); // Ensure validation triggers

   await waitFor(() => {
      expect(
         screen.getByText(/Credit Card Number is required/i)
      ).toBeInTheDocument();
      expect(
         screen.getByText(/Expiration Date is required/i)
      ).toBeInTheDocument();
      expect(
         screen.getByText(/Cardholder Name is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/CVV number is required/i)).toBeInTheDocument();
      expect(
         screen.getByText(/Please select a confirmation method/i)
      ).toBeInTheDocument();
   });
});

test("clicking Reserve Table triggers payment processing", async () => {
   await userEvent.type(screen.getByLabelText(/Number/i), "4111111111111111");
   await userEvent.type(screen.getByLabelText(/Name/i), "John Doe");
   await userEvent.type(screen.getByLabelText(/Exp/i), "12/2026");
   await userEvent.type(screen.getByLabelText(/CVV/i), "123");
   await userEvent.click(
      screen.getByLabelText(/Send me reservation confirmation via Email/i)
   );

   await userEvent.click(
      screen.findByRole("button", { name: /Reserve Table/i })
   );

   await waitFor(() => {
      expect(
         screen.findByRole("button", { name: /Processing/i })
      ).toBeInTheDocument();
   });

   expect(screen.findByRole("button", { name: /Processing/i })).toBeDisabled();
});

test("simulates successful payment scenario", async () => {
   vi.spyOn(globalThis.Math, "random").mockReturnValue(0.1); // Forces success

   await userEvent.type(screen.getByLabelText(/Number/i), "4111111111111111");
   await userEvent.type(screen.getByLabelText(/Name/i), "John Doe");
   await userEvent.type(screen.getByLabelText(/Exp/i), "12/2026");
   await userEvent.type(screen.getByLabelText(/CVV/i), "123");
   await userEvent.click(
      screen.getByLabelText(/Send me reservation confirmation via Email/i)
   );

   await userEvent.click(
      screen.getByRole("button", { name: /Reserve Table/i })
   );

   await waitFor(
      () => {
         expect(mockResetForm).toHaveBeenCalledTimes(1);
      },
      { timeout: 10000 }
   );

   globalThis.Math.random.mockRestore();
});
