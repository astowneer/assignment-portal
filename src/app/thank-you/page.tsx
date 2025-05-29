import Link from "next/link";
import React from "react";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50 text-center">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Thank you for submitting your assignment!
        </h1>
        <p className="text-lg text-gray-700">
          Your assignment has been submitted successfully.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
