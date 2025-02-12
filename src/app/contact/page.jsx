"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Design from "../homepage1/components/Design";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    po_box: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = new FormData();
    formattedData.append("name", formData.name);
    formattedData.append("email", formData.email);
    formattedData.append("number", formData.number);
    formattedData.append("po_box", formData.po_box);
    formattedData.append("message", formData.message);

    try {
      const response = await fetch(
        "https://backendbatd.clinstitute.co.uk/api/contact-us",
        {
          method: "POST",
          headers: {
            "Accept-Language": "ar",
            Accept: "application/json",
          },
          body: formattedData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "نجاح",
          description: "تم إرسال رسالتك بنجاح!",
          variant: "success",
        });
        setFormData({
          name: "",
          email: "",
          number: "",
          po_box: "",
          message: "",
        });
      } else {
        throw new Error(
          data.message || "حدث خطأ ما. يرجى المحاولة مرة أخرى."
        );
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Design secondary bg></Design>
      <div className="relative">
        <div className="bg-[#0A1828] py-4">
          <h1 className="text-center md:mt-10 md:pt-6 text-3xl items-center font-bold text-white">
            اتصل بنا
          </h1>
        </div>
        <div className="max-w-3xl mx-auto text-center px-4 py-8 text-base">
          <p className="text-gray-600">
            في معهد كراون لندن، نحرص على تقديم الدعم لك في كل مرحلة. إذا كان لديك أي استفسارات حول دوراتنا أو خدماتنا، أو كنت بحاجة إلى مزيد من المعلومات، يرجى ملء النموذج أدناه مع تقديم وصف موجز لاستفسارك، وسنقوم بالرد عليك في أقرب وقت ممكن.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <Card className="p-6 md:p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  أدخل <span className="text-secondary">معلوماتك</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input
                      id="fullName"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({ ...formData, number: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      id="subject"
                      value={formData.po_box}
                      onChange={(e) =>
                        setFormData({ ...formData, po_box: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-white"
                    disabled={loading}
                  >
                    {loading ? "جاري الإرسال..." : "إرسال"}
                  </Button>
                </form>
                <div className="mt-8 flex gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>privacy@clinstitute.co.uk</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-full min-h-[400px] rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9930.19158563342!2d-0.1842779!3d51.5190033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761aac0c5b8aa3%3A0x2c6c8204f8814686!2s6th%20Floor%2C%202%20Kingdom%20St%2C%20London%20W2%206BD%2C%20UK!5e0!3m2!1sen!2suk!4vYOUR_TIMESTAMP" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
