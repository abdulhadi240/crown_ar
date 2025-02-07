// components/SectionTitle.js
const SectionTitle = ({ title, highlight }) => {
  return (
    <div className="">
    <h2 className="my-6 text-3xl md:text-4xl mx-2 md:mx-32 font-bold text-center text-primary dark:text-white">
      {title} <span className="text-[#a9becc]">{highlight}</span>
    </h2>
    </div>
  );
};

export default SectionTitle;