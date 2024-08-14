import Image from "next/image";
import { jobType } from "@/components/all-jobs";
import Link from "next/link";

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
      )
      .replace(
        /^#### (.*$)/gim,
        '<h3 class="text-lg font-semibold mb-2">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-semibold mb-4">$1</h2>'
      )
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^\* (.*$)/gim, '<li class=" pl-6 mb-2">$1</li>')
      .replace(/^\* (.*$)/gim, '<li class=" pl-6 mb-2">$1</li>')
      .replace(
        /^(.+)$/gim,
        '<p class="text-zinc-700 dark:text-zinc-300 mb-4">$1</p>'
      )
      .replace(/(\*\*)(.*?)\1/g, "<strong>$2</strong>");
  };

  const technologies = job.technologies || [];

  return (
    <div className="p-6 bg-zin-50 dark:bg-background rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex items-center gap-4 md:col-span-2">
          {job.logo_url ? (
            <Image
              src={job.logo_url}
              alt={`${job.company} logo`}
              width={64}
              height={64}
              className="aspect-square rounded-md object-cover border"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{job.company}</h2>
          </div>
        </div>
        <div className="flex justify-end md:col-start-3">
          <Link
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600
            text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700"
          >
            {" "}
            Apply Now
          </Link>
        </div>
      </div>
      <h1 className="text-3xl font-bold mt-4">{job.title}</h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        {job.country_iso !== null ? `${job.country_iso}` : "Remote, Worldwide"}
      </p>
      <div className="mb-6">
        <div
          className="text-zinc-700 dark:text-zinc-50"
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
              <li key={index} className="text-zinc-700 dark:text-zinc-50">
                {tech}
              </li>
            ))
          ) : (
            <li className="text-zinc-700 dark:text-zinc-300">
              No technologies listed
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default JobDescription;
