import React from "react";
import Vision_Card from "./components/Vision_Card";
import Image from "next/image";
import Card_Quality from "./components/Card_Quality";
import { LuBadgeCheck } from "react-icons/lu";
import { FaHandshake } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
const page = () => {
  return (
    <>
      <div className="relative flex items-center justify-center h-32 banner sm:h-64">
        {/* Set height and make container relative */}
        <Image
          src="/consulting.webp"
          alt="banner"
          fill // replaces layout="fill"
          priority
          className="object-cover" // replaced objectFit="cover"
        />
        
      </div>
      <div className="mx-5 md:mx-10 ">
        <Vision_Card text={"Overview of BATD"}>
          The British Academy for Training and Development (BATD), located in
          London, is a British educational Academy specialized and accredited in
          the field of training, development and consultation for human and
          corporate cadres in several and various areas. The Academy holds its
          training courses and programs, studies and conferences in Britain in
          addition to other 30 countries in Europe, Africa, Asia, North and
          South America. It provides a unique educational model featured with
          its flexibility in time, dates and place. It provides the latest
          information and modern sciences in a group of specializations up to
          1300 different programs through specialists and experts from all over
          the world and in five languages. The Academy carries out its programs
          professionally using the latest technologies of the world. These
          programs are presented in Arabic or English in addition to other
          languages such as (Spanish, French and German) based on the request of
          the trainee entity. We are also registered at the British companies
          accredited in the education and training field under No. 08758169.
        </Vision_Card>
        <div className="flex justify-center gap-10 my-10">
        <div className="grid justify-between grid-cols-1 gap-5 md:gap-10 md:grid-cols-3 sm:grid-cols-2">
        <Card_Quality Icon={LuBadgeCheck} src={'/handshake.png'} text={'Quality'} para={'We will always provide you the highest quality education at the best price '}/>
        <Card_Quality Icon={FaHandshake} src={'/handshake.png'} text={'Integrity'} para={'We will always provide you the highest quality education at the best price '}/>
        <Card_Quality Icon={FaBookOpen} src={'/handshake.png'} text={'Experience'} para={'We will always provide you the highest quality education at the best price '}/>
        </div>
        </div>
        <Vision_Card text={"Our Vision"}>
          The British Academy for Training and Development (BATD) is one of the
          best training and developmental institutions in the world. This is
          demonstrated through its ability to combine between the scientific and
          practical methods needed by its trainees. In addition, it opens the
          field for everyone and all specializations to benefit and gain
          experience. This is based on our belief that science and knowledge are
          basic right for all. We also promote the Academy leadership and cadres
          through continuous training and development, upgrading the level of
          performance, and continuous contact and interaction with the society
          and similar institutions within the state and abroad. The Academy
          measures its performance by applying high-level standards respecting
          great ambitions and seeking excellence through our commitment to the
          finest intellectual standards.
        </Vision_Card>

        <Vision_Card text={"Our Mission"}>
          The institution seeks, through providing specialized training
          programs, to achieve the following: 1. Improving the employees’
          corporate performance. 2. Upgrading the scientific and practical level
          of employees to perform their duties in line with the new development
          in the training field. 3. Connecting institutions, companies and
          individuals with international institutions and companies to achieve
          their interests and raise their performance level through conferences,
          workshops and specialized exchange programs. 4. Transferring the
          experience of governmental and private companies and institutions in
          Britain and Europe to the other countries of the world.
        </Vision_Card>
      </div>
    </>
  );
};

export default page;
