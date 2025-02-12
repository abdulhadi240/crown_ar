// components/SectionTitle.js
const SectionTitle1 = ({ title, highlight }) => {
    return (
      <h2 className="my-6 text-3xl  md:text-5xl mx-10 font-bold text-center text-white dark:text-white">
        {title} <span className="text-secondary">{highlight}</span>
      </h2>
    );
  };
  
  export default SectionTitle1;