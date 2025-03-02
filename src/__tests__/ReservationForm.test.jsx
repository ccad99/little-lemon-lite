import {
   render,
   renderHook,
   act,
   screen,
   waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import { loadAPI } from "../services/apiUtils";
import { useReducer } from "react";
import ReservationForm, {
   timesReducer,
   initialState,
} from "../components/ReservationForm";

const mockFormData = {
   name: "",
   date: "",
   guests: "1",
   occasion: "",
   phone: "",
   email: "",
};

const mockSetFormData = vi.fn();
const mockNextStep = vi.fn();
const mockResetForm = vi.fn();

const mockNavigate = vi.fn(); // Move this to before mocking

vi.mock("react-router-dom", () => ({
   ...vi.importActual("react-router-dom"),
   useNavigate: () => mockNavigate,
}));

vi.mock("../services/apiUtils", () => ({
   loadAPI: vi.fn(() => Promise.resolve(() => ["17:00", "18:30", "20:00"])), // Returns a function
}));

const setup = (customFormData = mockFormData) =>
   render(
      <ReservationForm
         formData={customFormData}
         setFormData={mockSetFormData}
         nextStep={mockNextStep}
         resetForm={mockResetForm}
      />
   );

beforeEach(() => {
   vi.clearAllMocks();
   setup();
});

test("initializeTimes should fetch and set available times", async () => {
   const mockTimes = ["17:00", "18:30", "20:00"];
   loadAPI.mockResolvedValue(async () => mockTimes); // Mock API response

   // Use useReducer to test state updates
   const { result } = renderHook(() => useReducer(timesReducer, initialState));

   const [, dispatch] = result.current;

   await act(async () => {
      const api = await loadAPI();
      const availableTimes = await api();
      dispatch({ type: "INITIALIZE_TIMES", payload: availableTimes });
   });

   expect(result.current[0].times).toEqual(mockTimes);
   expect(result.current[0].isLoading).toBe(false);
});

test("updateTimes should update available times based on selected date", async () => {
   const mockTimes = ["17:00", "19:30"];
   loadAPI.mockResolvedValue(async () => mockTimes);

   const { result } = renderHook(() => useReducer(timesReducer, initialState));

   const [, dispatch] = result.current;

   await act(async () => {
      const api = await loadAPI();
      const availableTimes = await api("2025-03-15"); // Mock fetching times for a specific date
      dispatch({ type: "UPDATE_TIMES", payload: availableTimes });
   });

   expect(result.current[0].times).toEqual(mockTimes);
});

test("dispatches ERROR action when API fails", async () => {
   loadAPI.mockRejectedValue(new Error("API failed"));

   const { result } = renderHook(() => useReducer(timesReducer, initialState));
   const [, dispatch] = result.current;

   await act(async () => {
      try {
         const api = await loadAPI();
         const availableTimes = await api();
         dispatch({ type: "INITIALIZE_TIMES", payload: availableTimes });
      } catch (error) {
         dispatch({ type: "ERROR", payload: "Failed to load times" });
      }
   });

   expect(result.current[0].times).toEqual([]);
   expect(result.current[0].error).toBe("Failed to load times");
});

test("renders the Reservation Form with all fields", () => {
   expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/No. of Guests/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Mobile No/i)).toBeInTheDocument();
   expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
   expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
   expect(
      screen.getByRole("button", { name: /Continue/i })
   ).toBeInTheDocument();
});

test("shows validation errors on empty submit", async () => {
   await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

   expect(
      await screen.findByText(/Full name is required/i)
   ).toBeInTheDocument();
   expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
   expect(await screen.findByText(/Phone is required/i)).toBeInTheDocument();
   expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
});

test("shows email validation error on invalid input", async () => {
   await userEvent.type(screen.getByLabelText(/Email/i), "invalidemail");
   await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

   expect(await screen.findByText(/Invalid Email/i)).toBeInTheDocument();
});

test("allows the user to fill out the form", async () => {
   await userEvent.type(screen.getByLabelText(/Name/i), "John Doe");
   await userEvent.type(screen.getByLabelText(/Mobile No/i), "1234567890");
   await userEvent.type(screen.getByLabelText(/Email/i), "john@example.com");

   expect(screen.getByLabelText(/Name/i)).toHaveValue("John Doe");
   expect(screen.getByLabelText(/Mobile No/i)).toHaveValue("1234567890");
   expect(screen.getByLabelText(/Email/i)).toHaveValue("john@example.com");
});

test("submits the form and calls nextStep()", async () => {
   await userEvent.type(screen.getByLabelText(/Name/i), "John Doe");
   await userEvent.type(screen.getByLabelText(/Mobile No/i), "1234567890");
   await userEvent.type(screen.getByLabelText(/Email/i), "john@example.com");
   await userEvent.type(screen.getByLabelText(/Date/i), "2025-03-15");
   await userEvent.selectOptions(screen.getByLabelText(/No. of Guests/i), "3");
   await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

   expect(mockSetFormData).toHaveBeenCalled();
   expect(mockSetFormData.mock.calls[0][0]).toEqual(
      expect.objectContaining({
         name: "John Doe",
         phone: "1234567890",
         email: "john@example.com",
         date: "2025-03-15",
         guests: expect.any(String),
      })
   );

   expect(mockNextStep).toHaveBeenCalledTimes(1);
});

test("restricts guests to max 10", () => {
   expect(screen.queryByRole("option", { name: "11" })).not.toBeInTheDocument();
});
