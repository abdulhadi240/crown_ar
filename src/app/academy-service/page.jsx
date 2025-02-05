import { CheckCircleIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Design from '../homepage1/components/Design';

const translations = {
  en: {
    heading: 'Academy Services',
    whyChooseUs: 'Why Choose Our Services?',
    getStarted: 'Ready to Get Started?',
    description:
      'Take the first step towards unlocking your full potential. Contact us today to learn more about our services and how we can tailor them to your unique needs.',
    schedule: 'Schedule A Consultation',
    tabs: {
      all: 'All Services',
      academic: 'Academic',
      support: 'Support',
    },
    services: [
      {
        name: 'Personalized Learning Plans',
        description:
          'Tailored educational strategies designed to meet individual student needs and learning styles.',
        features: [
          'Customized curriculum',
          'Regular progress assessments',
          'Adaptive learning technologies',
          'One-on-one mentoring sessions',
        ],
      },
      {
        name: 'Expert Tutoring',
        description:
          'Access to highly qualified tutors across various subjects to support and enhance student learning.',
        features: [
          'Subject matter experts',
          'Flexible scheduling',
          'In-person and online options',
          'Small group and individual sessions',
        ],
      },
      {
        name: 'State-of-the-Art Facilities',
        description:
          'Modern, well-equipped learning environments that foster creativity, collaboration, and academic excellence.',
        features: [
          'Advanced technology labs',
          'Multimedia classrooms',
          'Collaborative study spaces',
          'Extensive library resources',
        ],
      },
      {
        name: 'Career Counseling',
        description:
          'Comprehensive guidance to help students explore career paths and make informed decisions about their future.',
        features: [
          'Career aptitude assessments',
          'Industry expert talks',
          'Internship placements',
          'College application support',
        ],
      },
      {
        name: 'Extracurricular Activities',
        description:
          'A wide range of programs to develop well-rounded individuals and foster personal growth.',
        features: [
          'Sports teams and clubs',
          'Arts and music programs',
          'Community service initiatives',
          'Leadership development workshops',
        ],
      },
      {
        name: 'Parent-Teacher Collaboration',
        description:
          'Strong partnerships between educators and families to support student success.',
        features: [
          'Regular parent-teacher conferences',
          'Online progress tracking',
          'Parent workshops and seminars',
          'Family engagement events',
        ],
      },
    ],
    reasons: [
      {
        title: 'Proven Track Record',
        content:
          'Our services have helped thousands of students achieve their academic and personal goals, with many going on to top universities and successful careers.',
      },
      {
        title: 'Holistic Approach',
        content:
          'We believe in developing well-rounded individuals. Our services address academic, social, emotional, and practical aspects of education.',
      },
      {
        title: 'Continuous Innovation',
        content:
          'We constantly update our services to incorporate the latest educational research and technologies, ensuring our students are always ahead of the curve.',
      },
    ],
  },
  ar: {
    heading: 'خدمات الأكاديمية',
    whyChooseUs: 'لماذا تختار خدماتنا؟',
    getStarted: 'هل أنت مستعد للبدء؟',
    description:
      'اتخذ الخطوة الأولى نحو إطلاق إمكاناتك الكاملة. تواصل معنا اليوم لمعرفة المزيد عن خدماتنا وكيف يمكننا تخصيصها لتلبية احتياجاتك الفريدة.',
    schedule: 'جدولة استشارة',
    tabs: {
      all: 'جميع الخدمات',
      academic: 'أكاديمية',
      support: 'دعم',
    },
    services: [
      {
        name: 'خطط تعلم شخصية',
        description:
          'استراتيجيات تعليمية مصممة خصيصًا لتلبية احتياجات وأنماط تعلم الطلاب الفردية.',
        features: [
          'منهج مخصص',
          'تقييمات تقدم منتظمة',
          'تقنيات تعلم تكيفية',
          'جلسات إرشاد فردية',
        ],
      },
      {
        name: 'الدروس الخصوصية المتخصصة',
        description:
          'الوصول إلى معلمين مؤهلين تأهيلاً عالياً في مختلف المواد لدعم وتعزيز تعلم الطلاب.',
        features: [
          'خبراء في المواد الدراسية',
          'جدولة مرنة',
          'خيارات حضورية وعبر الإنترنت',
          'جلسات فردية وجماعية صغيرة',
        ],
      },
      {
        name: 'مرافق حديثة',
        description:
          'بيئات تعليمية حديثة ومجهزة بشكل جيد تعزز الإبداع والتعاون والتميز الأكاديمي.',
        features: [
          'مختبرات تكنولوجية متقدمة',
          'فصول دراسية متعددة الوسائط',
          'مساحات دراسة تعاونية',
          'موارد مكتبية واسعة',
        ],
      },
      {
        name: 'الإرشاد المهني',
        description:
          'إرشادات شاملة لمساعدة الطلاب على استكشاف المسارات المهنية واتخاذ قرارات مستنيرة بشأن مستقبلهم.',
        features: [
          'تقييمات كفاءة مهنية',
          'ندوات خبراء الصناعة',
          'توفير فرص التدريب',
          'دعم التقديم للجامعات',
        ],
      },
      {
        name: 'أنشطة خارج المنهج',
        description: 'مجموعة واسعة من البرامج لتطوير الأفراد وبناء الشخصية.',
        features: [
          'فرق رياضية وأندية',
          'برامج الفنون والموسيقى',
          'مبادرات الخدمة المجتمعية',
          'ورش عمل تطوير القيادة',
        ],
      },
      {
        name: 'تعاون أولياء الأمور والمعلمين',
        description: 'شراكات قوية بين المعلمين والأسر لدعم نجاح الطلاب.',
        features: [
          'اجتماعات دورية بين أولياء الأمور والمعلمين',
          'تتبع تقدم الطالب عبر الإنترنت',
          'ورش عمل وندوات للأولياء',
          'فعاليات مشاركة الأسرة',
        ],
      },
    ],
    reasons: [
      {
        title: 'سجل حافل بالإنجازات',
        content:
          'لقد ساعدت خدماتنا الآلاف من الطلاب على تحقيق أهدافهم الأكاديمية والشخصية، وقد التحق الكثير منهم بجامعات كبرى وحصلوا على وظائف ناجحة.',
      },
      {
        title: 'نهج شامل',
        content:
          'نؤمن بتطوير الأفراد بشكل متكامل. تشمل خدماتنا الجوانب الأكاديمية والاجتماعية والعاطفية والعملية للتعليم.',
      },
      {
        title: 'ابتكار مستمر',
        content:
          'نقوم بتحديث خدماتنا باستمرار لتضمين أحدث الأبحاث والتقنيات التعليمية، مما يضمن أن طلابنا دائمًا في الطليعة.',
      },
    ],
  },
};

export default function AcademyService({ params }) {
  const locale = params.locale || 'en';
  const t = translations[locale] || translations['en'];
  const isRTL = locale === 'ar';

  return (
    <div>
    <Design secondary={true} bg={true}></Design>
    <div className="bg-[#0A1828] py-8">
        <h1 className="text-center text-3xl font-bold text-white">Academy Services</h1>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
            <TabsTrigger value="academic">{t.tabs.academic}</TabsTrigger>
            <TabsTrigger value="support">{t.tabs.support}</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ServiceCards services={t.services} isRTL={isRTL} />
          </TabsContent>
          <TabsContent value="academic">
            <ServiceCards services={t.services.slice(0, 3)} isRTL={isRTL} />
          </TabsContent>
          <TabsContent value="support">
            <ServiceCards services={t.services.slice(3)} isRTL={isRTL} />
          </TabsContent>
        </Tabs>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">{t.whyChooseUs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.reasons.map((reason, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className='text-primary'>{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{reason.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">{t.getStarted}</h2>
          <p className="mb-8 max-w-2xl mx-auto">{t.description}</p>
          <Link
            href={`/consulting-services`}
            className="text-white text-sm bg-secondary p-2 rounded-sm"
          >
            {t.schedule}
          </Link>
        </section>
      </div>
    </div>
  );
}

function ServiceCards({ services, isRTL }) {
  if (!services || services.length === 0) {
    return <p>No services available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle className={`text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
              {service.name}
            </CardTitle>
            <CardDescription className={`${isRTL ? 'text-right' : 'text-left'}`}>
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul
              className={`space-y-2 ${
                isRTL ? 'text-right rtl' : 'text-left ltr'
              }`}
            >
              {service.features.map((feature, fIndex) => (
                <li
                  key={fIndex}
                  className={`flex items-center ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                >
                  <CheckCircleIcon
                    className={`h-5 w-5 text-green-500 ${
                      isRTL ? 'ml-2' : 'mr-2'
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
