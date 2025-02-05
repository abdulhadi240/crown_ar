// components/SectionTitle.js
const SectionTitle = ({ title, highlight }) => {
  return (
    <h2 className="my-6 text-3xl md:text-5xl mx-10 font-bold text-center text-primary dark:text-white">
      {title} <span className="text-[#a9becc]">{highlight}</span>
    </h2>
  );
};

export default SectionTitle;