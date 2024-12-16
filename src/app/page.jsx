// app/page.js (or any component inside the `app` directory)

import Image from 'next/image';
import dynamic from 'next/dynamic';
import SearchFilters from '../components/SearchFilters';
import SectionTitle from '../components/SectionTitle';
import MainContent from '../components/MainContent';
import MobileFilter from '../components/MobileFilter';
import fetchData from '@/actions/server';
import Design from './homepage1/components/Design';
import CustomerCarasoul from '@/components/CustomerCarasoul';



// Dynamically imported components
const CourseCard = dynamic(() => import('../components/CourseCard'));
const SpecializationSection = dynamic(() => import('../components/SpecializationSection'));
const Carasoul = dynamic(() => import('../components/Carasoul'));
const Training = dynamic(() => import('../components/Training'));
const RequestCourse = dynamic(() => import('../components/RequestCourse'));
const DynamicTabs = dynamic(() => import('../components/DynamicTabs'));
const Team = dynamic(() => import('../components/Team'));
// const CustomerCarasoul = dynamic(() => import('../components/CustomerCarasoul'), { ssr: false });

// Metadata for the page


const Page = async () => {

  const cities = await fetchData('https://backendbatd.clinstitute.co.uk/api/cities');
  const specialization = await fetchData('https://backendbatd.clinstitute.co.uk/api/specializations_courses');
  return (
    <section>
      {/* Hero Section */}
      <Design/>
      <div className="block sm:hidden">
        <MobileFilter />
      </div>

      {/* Search and Main Content */}
      <div className="container hidden mt-10 sm:block sm:px-4 sm:mt-0 sm:py-16">
        <div className="flex justify-center">
          <SearchFilters />
        </div>
        <SectionTitle title="What is" highlight="BRITISH ACADEMY?" />
        <MainContent />
      </div>

      {/* Specialization Section */}
      <SpecializationSection data={specialization.data}/>

      {/* Courses by Cities Carousel */}
      <div className=" sm:mt-16">
        <SectionTitle title="Courses by" highlight="Cities" />
        <Carasoul data={cities}/>
      </div>

      {/* Training Section */}
      <div className="hidden mt-32 sm:block">
        <SectionTitle title="British Academy" highlight="For Training" />
        <Training />
      </div>

      {/* Request Course Section */}
      <div className="mt-32">
        <SectionTitle title="Request A" highlight="Course" />
        <RequestCourse />
      </div>

      {/* Latest Publications Section */}
      <div className="mt-32">
        <SectionTitle title="Latest" highlight="Publication" />
        <DynamicTabs />
      </div>

      {/* Team Section */}
      <div className="mt-32 team">
        <SectionTitle title="Team" highlight="Work" />
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-4 mt-10 overflow-hidden sm:grid-cols-3">
            {[
              {
                image: '/4.webp',
                name: 'Nattasha Julie',
                designation: 'Design, Australia',
                number: '+1 (378) 400-1234',
                email: 'julie@email.com'
              },
              {
                image: '/Photo.webp',
                name: 'John Doe',
                designation: 'Developer, USA',
                number: '+1 (555) 123-4567',
                email: 'john@email.com'
              },
              {
                image: '/2.webp',
                name: 'Jane Smith',
                designation: 'Marketing, UK',
                number: '+44 (20) 7000-1234',
                email: 'jane@email.com'
              }
            ].map((teamMember, index) => (
              <Team
                key={index}
                image={teamMember.image}
                name={teamMember.name}
                designation={teamMember.designation}
                number={teamMember.number}
                email={teamMember.email}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Uncomment if necessary for customer carousel */}
       <div className="mt-32 overflow-hidden customer">
        <SectionTitle title="Most Of" highlight="Our Customers" />
        <CustomerCarasoul />
      </div> 
    </section>
  );
};

export default Page;
