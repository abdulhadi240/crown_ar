"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "./context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// مخطط التحقق من صحة تسجيل الدخول
const loginSchema = yup.object().shape({
  username: yup.string().required("اسم المستخدم مطلوب"),
  password: yup.string().required("كلمة المرور مطلوبة"),
});

// مخطط التحقق من صحة استعادة كلمة المرور
const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
});

const AuthForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await login(data.username, data.password, "ar");

      if (response) {
        setErrorMessage(response);
      }
    } catch (error) {
      console.error("فشل تسجيل الدخول:", error.message);
      setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    setLoading(false);
  };

  const handleForgotPassword = async (data) => {
    setForgotPasswordMessage("");

    try {
      const response = await fetch(
        "https://backendbatd.clinstitute.co.uk/api/customer/password/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            locale: "ar",
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setForgotPasswordMessage("تم إرسال بريد استعادة كلمة المرور بنجاح.");
      } else {
        setForgotPasswordMessage(result.message || "حدث خطأ ما.");
      }
    } catch (error) {
      console.error("خطأ:", error);
      setForgotPasswordMessage("فشل في إرسال بريد الاستعادة.");
    }
  };

  return (
    <Card className="md:p-6 p-3 shadow-lg w-[400px] -mt-10">
      <CardContent>
        <h1 className="text-xl font-semibold text-center text-gray-700">
          مرحباً بعودتك!
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          قم بتسجيل الدخول للوصول إلى حسابك.
        </p>

        <form className="flex flex-col gap-2 mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* إدخال اسم المستخدم */}
          <div>
            <Label className="text-sm">اسم المستخدم</Label>
            <Input
              type="text"
              {...register("username")}
              placeholder="أدخل بريدك الإلكتروني"
              className="text-sm text-primary"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* إدخال كلمة المرور */}
          <div>
            <Label className="text-sm">كلمة المرور</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="أدخل كلمة المرور"
              className="text-sm text-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* تذكرني & استعادة كلمة المرور */}
          <div className="flex justify-between text-xs text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" />
              تذكرني
            </label>
            <button
              type="button"
              className="hover:text-primary"
              onClick={() => setShowForgotPassword(true)}
            >
              هل نسيت كلمة المرور؟
            </button>
          </div>

          {/* زر تسجيل الدخول */}
          <Button type="submit" disabled={loading} className="mt-4 text-white">
            {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>

          {/* عرض رسالة الخطأ أسفل النموذج */}
          {errorMessage && (
            <p className="text-red-500 text-xs text-start mt-3">
              {errorMessage}
            </p>
          )}
        </form>
      </CardContent>

      {/* نافذة استعادة كلمة المرور */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">استعادة كلمة المرور</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleForgotPasswordSubmit(handleForgotPassword)}>
            {/* إدخال البريد الإلكتروني */}
            <div>
              <Label className="text-sm">أدخل بريدك الإلكتروني</Label>
              <Input
                type="email"
                {...registerForgotPassword("email")}
                placeholder="بريدك الإلكتروني"
                className="text-primary"
              />
              {forgotPasswordErrors.email && (
                <p className="text-red-500 text-xs">
                  {forgotPasswordErrors.email.message}
                </p>
              )}
            </div>

            {/* زر التأكيد */}
            <Button type="submit" className="mt-4 text-white w-full">
              تأكيد
            </Button>

            {/* عرض رسالة النجاح أو الفشل */}
            {forgotPasswordMessage && (
              <p className="text-center mt-2 text-sm text-primary">
                {forgotPasswordMessage}
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AuthForm;
