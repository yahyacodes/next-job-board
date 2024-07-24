// components/AllJobs.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import JobDetails from "./job-details";

export type jobType = {
  id: string;
  title: string;
  description: string;
  company: string;
  technologies: string[];
  main_technology: string;
  job_type: string;
  max_payment_usd: number;
  country_iso: string;
  applications: number;
  views: number;
  apply_url: string;
  logo_url: string;
  skill_level: string;
};

const AllJobs = () => {
  const [data, setData] = useState<jobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<jobType[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [searchJobs, setSearchJobs] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const lastJobIndex = currentPage * jobsPerPage;
  const firstJobIndex = lastJobIndex - jobsPerPage;
  const currentJobs = filteredJobs.slice(firstJobIndex, lastJobIndex);

  useEffect(() => {
    fetch("api/crackeddevs")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredJobs(data);
        if (data.length > 0) {
          setSelectedJobId(data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setData([]);
      });
    setIsClient(true);
  }, []);

  useEffect(() => {
    const filtered = data.filter((jobs) =>
      jobs.title.toLowerCase().includes(searchJobs.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchJobs, data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchJobs(event.target.value);
  };

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  return (
    <div className="container mx-auto py-16 sm:py-24 lg:py-32">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Find Your Dream Developer Job
        </h1>
        <p className="text-md sm:text-lg mb-8 text-zinc-400 max-w-md">
          Discover opportunities from top tech companies around the world
        </p>
        <div className="w-full max-w-md">
          <Input
            type="search"
            placeholder="Search Jobs....."
            name="search"
            value={searchJobs}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isClient ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-8xl py-16">
          {/* Job list column */}
          <div className="md:col-span-1">
            {data &&
              Array.isArray(currentJobs) &&
              currentJobs.map((job: jobType) => (
                <div
                  className={`flex gap-6 p-4 border rounded-md mb-2 cursor-pointer ${
                    selectedJobId === job.id
                      ? "bg-zinc-50 dark:bg-zinc-950"
                      : ""
                  }`}
                  key={job.id}
                  onClick={() => handleJobClick(job.id)}
                >
                  <div className="col-span-1">
                    {job.logo_url ? (
                      <Image
                        src={job.logo_url}
                        alt="Company Logo"
                        width={64}
                        height={64}
                        className="aspect-square rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-zinc-200 rounded-md"></div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium">{job.company}</p>
                    <h1 className="font-semibold mt-1">{job.title}</h1>
                    <div className="flex gap-2 mt-1">
                      <Badge>
                        {job.max_payment_usd !== null
                          ? `$${job.max_payment_usd.toLocaleString()}`
                          : "Competitive"}
                      </Badge>
                      <Badge>
                        {job.country_iso !== null
                          ? `${job.country_iso}`
                          : "Worldwide"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            <PaginationSection
              totalItems={filteredJobs.length}
              jobsPerPage={jobsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Job details column */}
          <div className="md:col-span-2">
            {selectedJobId ? (
              <JobDetails
                job={data.find((job) => job.id === selectedJobId)}
                onBack={() => setSelectedJobId(null)}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-zinc-100 animate-spin fill-zinc-900"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

function PaginationSection({
  totalItems,
  jobsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  jobsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / jobsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePrevPage()} />
        </PaginationItem>
        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            className={
              currentPage === page
                ? "bg-neutral-100 rounded-md dark:text-zinc-950"
                : ""
            }
          >
            <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default AllJobs;
