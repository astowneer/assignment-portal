import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AssignmentForm } from "../app/(root)/_components/assignment-form";
import { submitAssignment } from "../app/(root)/_actions/submit-assignment";
import { toast } from "react-toastify";
import { CandidateValidationMessage } from "@/types/modules";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

jest.mock("../app/(root)/_actions/submit-assignment", () => ({
  submitAssignment: jest.fn(),
}));

const renderForm = () => {
  render(
    <AssignmentForm
      candidateLevels={{ levels: ["Junior", "Middle", "Senior", "Principal"] }}
    />
  );
};

beforeEach(() => {
  jest.clearAllMocks();
});

const fillValidForm = () => {
  fireEvent.input(screen.getByPlaceholderText("Enter your name"), {
    target: { value: "Alice" },
  });
  fireEvent.input(screen.getByPlaceholderText("Enter your email"), {
    target: { value: "alice@example.com" },
  });
  fireEvent.input(
    screen.getByPlaceholderText("Enter your assignment description"),
    {
      target: { value: "Build a login page" },
    }
  );
  fireEvent.input(
    screen.getByPlaceholderText("Enter your GitHub repository URL"),
    {
      target: { value: "https://github.com/alice/repo" },
    }
  );
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Junior" },
  });
};

describe("AssignmentForm submission", () => {
  it("submits form with valid data and shows success toast", async () => {
    (submitAssignment as jest.Mock).mockResolvedValue({ success: true });

    renderForm();
    fillValidForm();

    fireEvent.click(screen.getByText("Submit Assignment"));

    await waitFor(() => {
      expect(submitAssignment).toHaveBeenCalledWith({
        name: "Alice",
        email: "alice@example.com",
        assignment_description: "Build a login page",
        github_repo_url: "https://github.com/alice/repo",
        candidate_level: "Junior",
      });
      expect(toast).toHaveBeenCalledWith("Assignment submitted successfully!");
    });
  });

  it("shows error toast on submission failure", async () => {
    (submitAssignment as jest.Mock).mockResolvedValue({ success: false });

    renderForm();
    fillValidForm();

    fireEvent.click(screen.getByText("Submit Assignment"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Failed to submit assignment!");
    });
  });
});

describe("AssignmentForm validation", () => {
  test("shows validation errors for empty fields", async () => {
    renderForm();
    fireEvent.click(screen.getByText("Submit Assignment"));
    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
    expect(submitAssignment).not.toHaveBeenCalled();
  });

  test("shows error for empty name", async () => {
    renderForm();
    const input = screen.getByLabelText(/name/i);
    fireEvent.blur(input);
    expect(
      await screen.findByText(CandidateValidationMessage.NAME_REQUIRED)
    ).toBeInTheDocument();
  });

  test("shows error for invalid email", async () => {
    renderForm();
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));
    expect(
      await screen.findByText(CandidateValidationMessage.EMAIL_WRONG)
    ).toBeInTheDocument();
  });

  test("shows error for empty email", async () => {
    renderForm();
    const input = screen.getByLabelText(/email/i);
    fireEvent.blur(input);
    expect(
      await screen.findByText(CandidateValidationMessage.EMAIL_REQUIRED)
    ).toBeInTheDocument();
  });

  test("shows error for empty assignment description", async () => {
    renderForm();
    const input = screen.getByLabelText(/assignment description/i);
    fireEvent.blur(input);
    expect(
      await screen.findByText(
        CandidateValidationMessage.ASSIGNMENT_DESCRIPTION_REQUIRED
      )
    ).toBeInTheDocument();
  });

  test("shows error for short assignment description", async () => {
    renderForm();
    fireEvent.input(screen.getByLabelText(/assignment description/i), {
      target: { value: "short" },
    });
    fireEvent.blur(screen.getByLabelText(/assignment description/i));
    expect(
      await screen.findByText(
        CandidateValidationMessage.ASSIGNMENT_DESCRIPTION_MIN_LENGTH
      )
    ).toBeInTheDocument();
  });

  test("shows error for invalid GitHub URL", async () => {
    renderForm();
    fireEvent.input(screen.getByLabelText(/GitHub repository url/i), {
      target: { value: "not-a-url" },
    });
    fireEvent.blur(screen.getByLabelText(/GitHub repository url/i));
    expect(
      await screen.findByText(CandidateValidationMessage.GITHUB_REPO_URL_WRONG)
    ).toBeInTheDocument();
  });

  test("shows error for empty GitHub URL", async () => {
    renderForm();
    const input = screen.getByLabelText(/GitHub repository url/i);
    fireEvent.blur(input);
    expect(
      await screen.findByText(
        CandidateValidationMessage.GITHUB_REPO_URL_REQUIRED
      )
    ).toBeInTheDocument();
  });

  test("shows error for invalid candidate level (not in list)", async () => {
    renderForm();
    const select = screen.getByLabelText(/candidate level/i);
    fireEvent.change(select, { target: { value: "Expert" } });
    fireEvent.blur(select);
    expect(
      await screen.findByText(CandidateValidationMessage.CANDIDATE_LEVEL_WRONG)
    ).toBeInTheDocument();
  });
});
