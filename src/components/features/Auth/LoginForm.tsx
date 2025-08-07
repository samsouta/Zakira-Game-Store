
import { Eye, EyeOff, Phone, Lock, ArrowRight, Shield } from 'lucide-react';
import { useState } from 'react';
import type { FormData, ValidationErrors } from '../../../types/auth';
import { Link } from 'react-router-dom';
import { liquidGlassClasses } from '../../../style/LiquidGlass';
import { useLoginMutation } from '../../../services/API/Auth';
import Cookies from 'js-cookie';
import type { NotificationType } from '../../../types/notiModelType';
import { LiquidModal } from '../../UI/NotiModal/LiquidModal';
import { ForgotPasswordModal } from './ForgotPasswordModal';

const demos = [
  {
    type: 'success' as const,
    title: 'Login Successful',
    message: 'အကောက်အောင်မြင်စွာဝင်ရောက်ပြီးပါပြီ.." Go Home " ကိုနှိပ်ပါ | အကောက်များကို စတင်ဝယ်ယူနိုင်ပါပြီ ',
    btnText: 'Go Home',
    buttonClass: 'from-sky-500 to-blue-600 shadow-sky-500/25',
    router: '/home'
  },
  {
    type: 'warning' as const,
    title: 'Storage Almost Full',
    message: 'Your storage is 85% full. Consider upgrading your plan or cleaning up old files to avoid service interruption.',
    btnText: 'Warning Modal',
    buttonClass: 'from-amber-500 to-yellow-600 shadow-amber-500/25'
  },
  {
    type: 'info' as const,
    title: 'New Feature Available',
    message: 'We\'ve just released a new dashboard feature that will help you track your progress more effectively.',
    btnText: 'Info Modal',
    buttonClass: 'from-purple-500 to-violet-600 shadow-purple-500/25'
  },
  {
    type: 'error' as const,
    title: 'Login Failed',
    message: ` "password" နှင့် "phone number" မှန်ကန်စွာစစ်ဆေးပေးပါ`,
    btnText: 'try again !',
    buttonClass: 'from-pink-500 to-rose-600 shadow-pink-500/25'
  }
];

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    phone_number: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [login, { isLoading }] = useLoginMutation();

  /**
  * ✅ Helper to redirect and reload
  */
  const redirectWithReload = (path: string) => {
    window.location.replace(path); // replaces history and reloads
  };


  /**
   * @validation 
   * @description Validate the form data
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.phone_number && !formData.email) {
      newErrors.login = "Please enter your email or phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  /**
   * @function FormSubmit
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const response = await login({
        phone_number: formData.phone_number,
        password: formData.password,
      }).unwrap();


      // Handle successful registration
      if (response?.success) {
        if (response?.token) {
          Cookies.set('token', response?.token, { expires: 7 });
          Cookies.set('user', JSON.stringify(response?.user), { expires: 7 });
        }
        // ✅ Check is_admin from response.user
        const isAdmin = Boolean(response.user?.is_admin);

        // ✅ Redirect
        if (isAdmin) {
          redirectWithReload('/dashboard'); 
        } else {
          redirectWithReload('/home'); 
        }


      }
    } catch (error: any) {
      setActiveModal('error');
      setErrors((prev) => ({
        ...prev,
        submit: error.data?.message || 'Registration failed. Please try again.',
      }));
    }

  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const isAdmin =
    formData.email?.toLowerCase().includes("admin") ||
    formData.phone_number?.includes("0000");
  return (
    <>
      <div className={`p-8 rounded-[32px] py-3 mx-3 ${liquidGlassClasses.base}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={` ${liquidGlassClasses.base} inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg transform transition-transform hover:rotate-12`}>
            <Lock className={`w-8 h-8 ${liquidGlassClasses.liquidText}`} />
          </div>
          <h1 className={`text-3xl oxanium font-semibold  mb-2 ${liquidGlassClasses.liquidText}`}>
            Welcome Back
          </h1>
          <p className={`oxanium font-medium opacity-60 ${liquidGlassClasses.liquidText}`}>
            အကောက်ကို ဝင်ပါ
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
              <Phone className={`h-5 w-5 transition-colors ${liquidGlassClasses.liquidText}`} />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={(e) =>
                handleInputChange("phone_number", e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white backdrop-blur-sm"
              maxLength={20}
            />
          </div>

          <div className="relative group">
            <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 transition-colors ${liquidGlassClasses.liquidText}`} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white backdrop-blur-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {errors.login && (
            <p className="text-red-500 text-sm">{errors.login}</p>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe || false}
                onChange={(e) =>
                  handleInputChange("rememberMe", e.target.checked)
                }
                className="w-4 h-4 text-blue-600 bg-white/50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-red-500 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`${liquidGlassClasses.btn} w-full oxanium py-3 px-4 rounded-xl font-semibold  disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200  flex items-center justify-center group`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-white rounded-full animate-spin mr-2"></div>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Switch to Register */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Don't have an account?
              အကောက်ဖွင့်ရန်
              <Link to={'/register'}>
                <button
                  type="button"
                  className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </Link>
            </p>
          </div>
        </form>

        {/* Admin Badge */}
        {isAdmin && (
          <div className="mt-6 flex items-center justify-center">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg animate-pulse">
              <Shield className="w-4 h-4 mr-2" />
              Admin Access Detected
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPassword(false)}
        />
      )}

      {/* Noti Modals box */}
      {demos.map((demo) => (
        <LiquidModal
          key={demo.type}
          isOpen={activeModal === demo.type}
          onClose={() => setActiveModal(null)}
          type={demo.type}
          title={demo.title}
          message={demo.message}
          btnText={demo?.btnText}
          router={demo?.router}
        />
      ))}
    </>
  );
};
