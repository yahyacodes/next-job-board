// components/JobDescription.tsx
import Image from "next/image";
import { jobType } from "@/components/all-jobs";

type JobDescriptionProps = {
  job: jobType | undefined;
  onBack: () => void;
};

const JobDescription = ({ job, onBack }: JobDescriptionProps) => {
  if (!job) return <p>Job not found</p>;

  const renderDescription = (description: string) => {
    return description
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold mb-2">$1</h3>'
      ) // Sub-headers
      .replace(
        /^#### (.*$)/gim,
        '<h3 class="text-lg font-semibold mb-2">$1</h3>'
      ) // Sub-headers
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-semibold mb-4">$1</h2>'
      ) // Headers
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>') // Main headers
      .replace(/^\* (.*$)/gim, '<li class=" pl-6 mb-2">$1</li>') // List items
      .replace(/^\* (.*$)/gim, '<li class=" pl-6 mb-2">$1</li>') // List items
      .replace(/^(.+)$/gim, '<p class="text-gray-700 mb-4">$1</p>') // Paragraphs
      .replace(/(\*\*)(.*?)\1/g, "<strong>$2</strong>"); // Bold text
  };

  const technologies = job.technologies || [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
        onClick={onBack}
      >
        Back to Job Listings
      </button>
      <div className="flex items-center mb-6">
        {job.logo_url ? (
          <Image
            src={job.logo_url}
            alt={`${job.company} logo`}
            width={64}
            height={64}
            className="aspect-square rounded-md object-cover border mr-4"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-md mr-4"></div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{job.company}</h2>
          <p className="text-gray-500">{job.country_iso}</p>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="mb-6">
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: renderDescription(job.description),
          }}
        />
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Technologies:</h3>
        <ul className="list-disc list-inside">
          {technologies.length > 0 ? (
            technologies.map((tech: string, index: number) => (
              <li key={index} className="text-gray-700">
                {tech}
              </li>
            ))
          ) : (
            <li className="text-gray-700">No technologies listed</li>
          )}
        </ul>
      </div>
      <div className="flex justify-end">
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDescription;
