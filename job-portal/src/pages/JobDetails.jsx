import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from 'sweetalert2'

const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJobApply = async () => {
     console.log(job.postedBy)
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "CV or Resume URL address",
      inputPlaceholder: "Enter the URL"
    });

    if (url) {
      Swal.fire(`Entered URL: ${url}`).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Appliction Submited Successfully!", "", "success");
        
          // <a href="mailto:anittajohn268@gmail.com?subject='Hello from Abstract!'&body='Just popped in to say hello'">Click to Send an Email</a>
           {window.location.href ="mailto:anittajohn268@gmail.com?subject='Hello from Abstract!'&body='Just popped in to say hello'"}
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    
  }
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />

      <div className="mt-10">
        <h3 className="font-semibold mb-2">Job ID: {id}</h3>

        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">Job details</h2>
          <p className="text-primary/75 md:w-1/3 text-sm italic my-1">
            Here<span>&apos;</span>s how the job details align with your job
            preferences.
          </p>
        </div>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Job type</p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.employmentType}
          </button>
          <button className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2" onClick={handleJobApply}>
            Apply Now
          </button>
        </div>

        {/* job details */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Advantages</h4>
            <p className="text-sm text-primary/70 mb-2">
              Pulled from the full job description
            </p>
            <ul className="list-disc list-outside text-primary/90 space-y-2 text-base">
              <li>
                1. ${job.minPrice}-{job.maxPrice}k
              </li>
              <li>2. Salary Type: {job.salaryType}</li>
              <li>3. Job Location: {job.jobLocation}</li>
              <li>4.Posting Date: {job.postingDate}t</li>
              <li>5. Experience Level: {job.experienceLevel}</li>
             
            </ul>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">{job.jobTitle}</h4>
          
          </div>
          
        </div>

        <div className="text-primary/75 my-5 space-y-6">
            <p>{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
