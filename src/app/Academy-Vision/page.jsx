import React from "react";
import Vision_Card from "./components/Vision_Card";
import Image from "next/image";
import Card_Quality from "./components/Card_Quality";
import { LuBadgeCheck } from "react-icons/lu";
import { FaHandshake } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import Design from "../homepage1/components/Design";

const page = () => {
  return (
    <div className="mb-10">
      <Design iamge={'/consulting.webp'} search>
        <div className="w-screen">
          <h1 className=" text-center mt-5 text-4xl items-center font-semibold text-white md:text-[55px] md:leading-[60px]">
            اكتشف <span className="text-secondary font-bold">استشاراتنا</span>{" "}
          </h1>
        </div>
      </Design>
      <div className="mx-5 md:mx-10 ">
        <Vision_Card text={"لمحة عن أكاديمية كراون"}>
          أكاديمية كراون للتدريب والتطوير، الواقعة في لندن، هي أكاديمية متخصصة
          ومعتمدة في مجال التدريب والتطوير والاستشارات للكوادر البشرية
          والشركات في عدة مجالات متنوعة. تعقد الأكاديمية دوراتها التدريبية
          وبرامجها، دراساتها ومؤتمراتها في بريطانيا بالإضافة إلى 30 دولة أخرى
          في أوروبا، إفريقيا، آسيا، وأمريكا الشمالية والجنوبية. تقدم الأكاديمية
          نموذجًا تعليميًا فريدًا يتميز بالمرونة في الوقت، المواعيد والمكان،
          وتوفر أحدث المعلومات والعلوم الحديثة في مجموعة من التخصصات تصل إلى
          1300 برنامج مختلف من خلال متخصصين وخبراء من جميع أنحاء العالم
          وبخمس لغات. تنفذ الأكاديمية برامجها باحترافية باستخدام أحدث
          التقنيات العالمية. يتم تقديم هذه البرامج باللغة العربية أو
          الإنجليزية بالإضافة إلى لغات أخرى مثل (الإسبانية، الفرنسية
          والألمانية) بناءً على طلب الجهة المتدربة.
        </Vision_Card>
        <div className="flex justify-center gap-10 my-10">
          <div className="grid justify-between grid-cols-1 gap-5 md:gap-10 md:grid-cols-3 sm:grid-cols-2">
            <Card_Quality Icon={LuBadgeCheck} src={'/handshake.png'} text={'الجودة'} para={'نضمن التميز في كل جانب من جوانب عروضنا التعليمية.'}/>
            <Card_Quality Icon={FaHandshake} src={'/handshake.png'} text={'النزاهة'} para={'نلتزم بأعلى المعايير الأخلاقية في جميع تعاملاتنا.'}/>
            <Card_Quality Icon={FaBookOpen} src={'/handshake.png'} text={'الخبرة'} para={'يتمتع فريقنا بسنوات من الخبرة لتقديم تجارب تعلم لا مثيل لها.'}/>
          </div>
        </div>
        <Vision_Card text={"رؤيتنا"}>
          تعد أكاديمية كراون واحدة من أفضل المؤسسات التدريبية والتنموية
          في العالم، ويظهر ذلك من خلال قدرتها على الدمج بين الأساليب
          العلمية والعملية التي يحتاجها المتدربون. بالإضافة إلى ذلك، تفتح
          الأكاديمية المجال للجميع في جميع التخصصات للاستفادة واكتساب
          الخبرات، استنادًا إلى إيماننا بأن العلم والمعرفة حق أساسي للجميع.
          كما أننا نعزز ريادة الأكاديمية وكوادرها من خلال التدريب والتطوير
          المستمر، ورفع مستوى الأداء، والتواصل والتفاعل المستمر مع المجتمع
          والمؤسسات المماثلة داخل الدولة وخارجها. تقيس الأكاديمية أداءها من
          خلال تطبيق معايير عالية المستوى، تحترم الطموحات الكبيرة وتسعى
          للتميز من خلال التزامنا بأرقى المعايير الفكرية.
        </Vision_Card>

        <Vision_Card text={"مهمتنا"}>
          تسعى المؤسسة، من خلال تقديم برامج تدريبية متخصصة، إلى تحقيق الأهداف
          التالية: 1. تحسين الأداء المؤسسي للموظفين. 2. رفع المستوى العلمي
          والعملي للموظفين لأداء مهامهم بما يتماشى مع التطورات الجديدة في
          مجال التدريب. 3. ربط المؤسسات والشركات والأفراد بالمؤسسات والشركات
          الدولية لتحقيق مصالحهم ورفع مستوى أدائهم من خلال المؤتمرات، الورش
          التدريبية وبرامج التبادل المتخصصة. 4. نقل خبرات الشركات والمؤسسات
          الحكومية والخاصة في بريطانيا وأوروبا إلى باقي دول العالم.
        </Vision_Card>
      </div>
    </div>
  );
};

export default page;
