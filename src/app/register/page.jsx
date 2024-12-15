"use client";
import Head from "next/head";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
export const dynamic = "force-dynamic";

export default function Page() {
  const searchParams = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [slug, setSlug] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");
  const [cityid, setCityId] = useState(null);
  const [language, setLanguage] = useState("");
  const [attendees, setAttendees] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [modal, setModal] = useState(true);
  const [success, setSuccess] = useState(false);
  const [participantType, setParticipantType] = useState("Company");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const [participants, setParticipants] = useState([
    {
      fullName: "",
      email: "",
      jobTitle: "",
      phone: "",
      mobile: "",
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
      },
    ]);
  };

  useEffect(() => {
    setSlug(searchParams.get("course") || "");
    setSelectedDate(searchParams.get("date") || "");
    //setCity(searchParams.get("city") || "");
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
          if (!res.ok) throw new Error(`Failed to fetch details`);

          const d = await res.json();
          setDetail(d);
          return d;
        } catch (error) {
          console.error(error.message);
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

        const sortedCountries = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();
          return nameA.localeCompare(nameB);
        });

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append fields to FormData
    formData.append("course_id", detail?.data?.id || "");
    formData.append("participant_type", participantType.toLowerCase());
    formData.append("city_id", city || "");
    formData.append("date", selectedDate || "");
    formData.append("full_name", fullname || "");
    formData.append("email", email || "");
    formData.append("job_title", jobtitle || "");
    formData.append("phone", phone || "");
    formData.append("mobile", mobile || "");
    formData.append("company", company || "");
    formData.append("address", address || "");
    formData.append("country", country || "");

    // Append participants only if it's a company
    if (participantType.toLowerCase() === "company") {
      participants.forEach((participant, index) => {
        formData.append(
          `participants[${index}][full_name]`,
          participant.fullName
        );
        formData.append(`participants[${index}][email]`, participant.email);
        formData.append(
          `participants[${index}][job_title]`,
          participant.jobTitle
        );
        formData.append(`participants[${index}][phone]`, participant.phone);
        formData.append(`participants[${index}][mobile]`, participant.mobile);
      });
    }

    try {
      const response = await fetch(
        "https://backendbatd.clinstitute.co.uk/api/course-register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en",
          },
          body: formData,
        }
      );

      const responseData = await response.json(); // Parse JSON response
      console.log("Response Data:", responseData.status);

      // Handle success based on `status`
      if (responseData.status === "success") {
        setModal(true);
        setSuccess(true);
        console.log(responseData.message); // Log success message
      } else {
        setModal(true);
        setSuccess(false);
        console.error("Unexpected status:", responseData.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error); // Handle network or other errors
    }
  };

  return (
    <>
      <Head>
        <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
      </Head>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Register Course
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={detail?.data?.title || ""}
                  readOnly
                  className="w-full cursor-not-allowed   border border-gray-300 rounded-lg p-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option>{detail?.data?.category || "Select Category"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Specialization
                </label>
                <select
                  value={specialization}
                  required
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option>
                    {detail?.data?.specialization || "Select Specialization"}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {!city && <option>Select City</option>}
                  {detail?.data?.available_cities?.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Language
                </label>
                <select
                  value={language}
                  required
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option>Select Language</option>
                  <option>English</option>
                  <option>Arabic</option>
                </select>
              </div>

              {/*<div>
                <label className="block text-sm font-medium mb-2">
                  Number of Attendees
                </label>
                <select
                  value={attendees}
                  required
                  onChange={(e) => setAttendees(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option>Select Participant</option>
                  <option>1</option>
                  <option>2 - 3</option>
                  <option>3+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration
                </label>
                <select
                  value={duration}
                  required
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option>Week</option>
                  <option>Two Weeks</option>
                  <option>3 Weeks</option>
                </select>
              </div>*/}

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-4">
                  Available Dates
                </label>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
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
                      {detail?.data?.available_dates?.map((dateObj) => (
                        <tr key={dateObj.id} className="hover:bg-gray-100">
                          <td className="px-4 py-2 text-sm text-gray-700 border-b">
                            <input
                              type="radio"
                              name="date"
                              value={dateObj.date}
                              checked={selectedDate === dateObj.date}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b">
                            {dateObj.date}
                          </td>
                        </tr>
                      ))}

                      <tr className="hover:bg-gray-100">
                        <td className="px-4 py-2 text-sm text-gray-700 border-b">
                          <input
                            type="radio"
                            name="date"
                            value={selectedDate}
                            checked={
                              !detail?.data?.available_dates?.some(
                                (dateObj) => dateObj.date === selectedDate
                              )
                            }
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 border-b">
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6">Participant Form</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Participant Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="participantType"
                      value="Company"
                      checked={participantType === "Company"}
                      onChange={() => handleParticipantTypeChange("Company")}
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
                    />
                    <span>Person</span>
                  </label>
                </div>
              </div>

              <div className="mb-6 border-t pt-4">
                <h3 className="text-lg font-medium mb-4">
                  {participantType === "Company" ? (
                    <h1>Company Details</h1>
                  ) : (
                    <h1>Participant 1</h1>
                  )}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Job Title"
                    required
                    value={jobtitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Mobile"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  <select
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option>Select Country</option>
                    {countries.map((country) => (
                      <option key={country.cca2} value={country.name.common}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </div>
                {participants.map(
                  (participant, index) =>
                    participantType === "Company" && (
                      <div key={index} className="mb-6 border-t my-10 pt-4">
                        <h3 className="text-lg font-medium mb-4">
                          Participant {index + 1}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={participant.fullName}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "fullName",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={participant.email}
                            onChange={(e) =>
                              handleInputChange(index, "email", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                          <input
                            type="text"
                            placeholder="Job Title"
                            value={participant.jobTitle}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "jobTitle",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                          <input
                            type="text"
                            placeholder="Phone"
                            value={participant.phone}
                            onChange={(e) =>
                              handleInputChange(index, "phone", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                          <input
                            type="text"
                            placeholder="Mobile"
                            value={participant.mobile}
                            onChange={(e) =>
                              handleInputChange(index, "mobile", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>

              {participantType === "Company" && (
                <button
                  type="button"
                  onClick={addParticipant}
                  className="text-blue-500"
                >
                  + Add Another Participant
                </button>
              )}
            </div>

            <div className="mt-8 text-start">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 p-4 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white md:p-6 p-4 rounded-lg maxw-md shadow-lg text-center">
            {success ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Congratulations!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your registration has been submitted successfully. You will be
                  notified via email or phone shortly.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  ERROR!
                </h2>
                <p className="text-gray-600 mb-6">
                  We are Sorry but there was an error submitting your
                  registration. Please try again later or contact{" "}
                  <Link
                    href={"/customer_service"}
                    className="text-primary font-bold underline"
                  >
                    Customer Support
                  </Link>
                </p>
              </div>
            )}
            <button
              onClick={() => setModal(false)}
              className={`mt-4 ${
                success ? "bg-primary" : "bg-secondary"
              } text-white px-4 py-2 rounded-md`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
