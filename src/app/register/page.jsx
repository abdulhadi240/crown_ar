"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
export const dynamic = 'force-dynamic';

export default function Page() {
  const searchParams = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("");
  const [detail, setDetail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [attendees, setAttendees] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [participantType, setParticipantType] = useState("Company");
  const [participants, setParticipants] = useState([
    {
      fullName: "",
      email: "",
      jobTitle: "",
      phone: "",
      mobile: "",
      company: "",
      address: "",
      country: "",
    },
  ]);

  const handleParticipantTypeChange = (type) => {
    setParticipantType(type);
  };

  const handleInputChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    setParticipants([
      ...participants,
      {
        fullName: "",
        email: "",
        jobTitle: "",
        phone: "",
        mobile: "",
        company: "",
        address: "",
        country: "",
      },
    ]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "-");
  };

  useEffect(() => {
    setSlug(searchParams.get("course") || "");
    setSelectedDate(searchParams.get("date") || "");
    setCity(searchParams.get("city") || "");
  }, [searchParams]);

  useEffect(() => {
    async function getDetail() {
      if (slug) {
        try {
          const res = await fetch(
            `https://backendbatd.clinstitute.co.uk/api/courses/${slug}`,
            {
              method: "GET",
              next: { revalidate: 60 },
              headers: {
                "Content-Type": "application/json",
                "Accept-Language": "en",
              },
            }
          );
          if (!res.ok) throw new Error(`Failed to fetch: ${url}`);

          const d = await res.json();
          console.log(d);
          setDetail(d);

          return d;
        } catch (error) {
          console.error(error.message);
          return null; // Return null on error
        }
      }
    }

    getDetail();
  }, [slug]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        // Sort the countries alphabetically by name
        const sortedCountries = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase(); // Ignore case
          const nameB = b.name.common.toUpperCase(); // Ignore case
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log all the form data
    const formData = {
      courseDetails: {
        category,
        specialization,
        title,
        city,
        language,
        attendees,
        duration,
        selectedDate,
      },
      participants,
    };
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg md:p-8 p-4 w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Register Course
        </h1>


        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option>{detail?.data?.category}</option>
              </select>
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Specialization
              </label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option>{detail?.data?.specialization}</option>
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium mb-2">Course</label>
              <input
                type="text"
                value={detail?.data?.title}
                readOnly
                className="w-full border cursor-not-allowed border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                {!city && <option>Select City</option>}
                {detail?.data?.available_cities.map((city) => {
                  return <option>{city.name}</option>;
                })}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option className="disabled">Select Language</option>
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>

            {/* Number of Attendees */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Attendees
              </label>
              <select
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option>Select Participant</option>
                <option>1</option>
                <option>2 - 3</option>
                <option>3+</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option>Week</option>
                <option>Two Week</option>
                <option>3 Week</option>
              </select>
            </div>
            
          </div>
          {/* Available Dates */}
<div className="mt-6">
  <label className="block text-sm font-medium mb-4">Available Dates</label>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
            #
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {detail?.data?.available_dates.map((dateObj, index) => (
          <tr key={dateObj.id} className="hover:bg-gray-100">
            <td className="px-4 py-2 text-sm text-gray-700 border-b">
              <input
                type="radio"
                name="date"
                value={dateObj.date}
                checked={selectedDate === dateObj.date}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="focus:ring-blue-500 focus:ring-2"
              />
            </td>
            <td className="px-4 py-2 text-sm text-gray-700 border-b">
              {dateObj.date}
            </td>
          </tr>
        ))}

        {/* Manual Date Entry Row */}
        <tr className="hover:bg-gray-100">
          <td className="px-4 py-2 text-sm text-gray-700 border-b">
            <input
              type="radio"
              name="date"
              value={selectedDate}
              checked={!detail?.data?.available_dates.some(
                (dateObj) => dateObj.date === selectedDate
              )}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="focus:ring-blue-500 focus:ring-2"
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-700 border-b">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

          <div className="min-h-screen pt-10  flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg md:p-8 p-4     w-full max-w-4xl">
              <h1 className="text-2xl font-semibold mb-6 text-center">
                Participant Form
              </h1>
              

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Participant Type
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="participantType"
                      value="Company"
                      checked={participantType === "Company"}
                      onChange={() => handleParticipantTypeChange("Company")}
                      className="focus:ring-blue-500 focus:ring-2"
                    />
                    <span>Company</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="participantType"
                      value="Person"
                      checked={participantType === "Person"}
                      onChange={() => handleParticipantTypeChange("Person")}
                      className="focus:ring-blue-500 focus:ring-2"
                    />
                    <span>Person</span>
                  </label>
                </div>
              </div>

              {participants.map((participant, index) => (
                <div key={index} className="mb-6 border-t pt-4">
                  <h2 className="text-lg font-medium mb-4">
                    Participant {index + 1}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={participant.fullName}
                      onChange={(e) =>
                        handleInputChange(index, "fullName", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={participant.email}
                      onChange={(e) =>
                        handleInputChange(index, "email", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={participant.jobTitle}
                      onChange={(e) =>
                        handleInputChange(index, "jobTitle", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={participant.phone}
                      onChange={(e) =>
                        handleInputChange(index, "phone", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Mobile"
                      value={participant.mobile}
                      onChange={(e) =>
                        handleInputChange(index, "mobile", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Company"
                      value={participant.company}
                      onChange={(e) =>
                        handleInputChange(index, "company", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={participant.address}
                      onChange={(e) =>
                        handleInputChange(index, "address", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />

                    <select
                      value={participant.country}
                      onChange={(e) =>
                        handleInputChange(index, "country", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                    >
                      <option>Select Country</option>
                      {countries.map((country) => (
                        <option key={country.cca2} value={country.name.common}>
                          {country.name.common}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {parseInt(attendees.split(" ")[0]) > 1 &&
                participantType === "Company" && (
                  <div className="">
                    <button
                      type="button"
                      onClick={addParticipant}
                      className="text-blue-500"
                    >
                      + Add Another Participant
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Submit Button at the bottom */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-primary flex justify-start text-white rounded-lg "
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
