import { AssignmentForm } from "./_components/assignment-form";
import { fetchCandidateLevels } from "./_actions/fetch-candidate-levels";
import Image from "next/image";

export default async function AssignmentFormPage() {
  const candidateLevels = await fetchCandidateLevels();

  if (!candidateLevels.success) {
    return <div>{candidateLevels.error}</div>;
  }

  return (
    <main className="py-6 mx-auto max-w-3xl  grow flex flex-col justify-center w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 flex items-center gap-4">
        <Image
          src="/logo.svg"
          alt="Assignment Submission Portal"
          width={150}
          height={150}
        />
        <h1 className="text-2xl font-semibold text-gray-900">
          Assignment Submission Portal
        </h1>
      </div>
      <div className="mx-auto w-full px-4 py-6 sm:px-6 md:px-8">
        <AssignmentForm candidateLevels={candidateLevels} />
      </div>
    </main>
  );
}
