import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { MainErrorFallback } from "@/components/errors/main";
import { ErrorBoundary } from "react-error-boundary";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assignment Submission Portal",
  description:
    "The Assignment Submission Portal is a streamlined and user-friendly web platform that enables candidates to submit their assignments efficiently. Designed for recruiters and educational institutions, this portal collects essential candidate details, assignment descriptions, GitHub repository links, and candidate proficiency levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
          {children}
          <ToastContainer position="bottom-right" />
        </ErrorBoundary>
      </body>
    </html>
  );
}
