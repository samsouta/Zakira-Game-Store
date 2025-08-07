import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Shield,
} from "lucide-react";
import type { FormData, ValidationErrors } from "../../../types/auth";
import { Link } from "react-router-dom";
import { liquidGlassClasses } from "../../../style/LiquidGlass";
import { useRegisterMutation } from '../../../services/API/Auth';
import type { NotificationType } from "../../../types/notiModelType";
import { LiquidModal } from "../../UI/NotiModal/LiquidModal";


const demos = [
  {
    type: 'success' as const,
    title: 'Register Successful',
    message: 'အကောက်အောင်မြင်စွာမှုဖွင့်ပြီးပါပြီ.."Go To Login " ကိုနှိပ်ပါ',
    btnText: 'Go To Login',
    buttonClass: 'from-sky-500 to-blue-600 shadow-sky-500/25',
    router: '/login'
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
    title: 'Create Account Failed',
    message: ` "username" မှန်ကန်အောင်ထည့်ပေးပါ/မတူရ | "phone_number" မှန်ကန်အောင်ထည့်ပေးပါ/မှားနေလားသေချာစစ်ပါ .`,
    btnText: 'try again !',
    buttonClass: 'from-pink-500 to-rose-600 shadow-pink-500/25'
  }
];

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [register, { isLoading }] = useRegisterMutation();

  /**
   * @Validate Data Form 
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.username || formData.username.length > 50) {
      newErrors.username = formData.username
        ? "Username must be 50 characters or less"
        : "Username is required";
    }

    if (!formData.phone_number || formData.phone_number.length > 20) {
      newErrors.phone_number = formData.phone_number
        ? "Phone number must be 20 characters or less"
        : "Phone number is required";
    }

    if (formData.email && formData.email.length > 100) {
      newErrors.email = "Email must be 100 characters or less";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  /**
   * @function handleSubmit Form  
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const response = await register({
        username: formData.username,
        phone_number: formData.phone_number,
        email: formData?.email || undefined,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      }).unwrap();


      // Handle successful registration
      if (response?.success) {

        setActiveModal('success');
      }
    } catch (error: any) {
      setActiveModal('error');

      const errors = error?.data?.errors || {};

      setErrors((prev) => ({
        ...prev,
        email: errors.email?.[0] || '',
        phone_number: errors.phone_number?.[0] || '',
        username: errors.username?.[0] || '',
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
    <div className={`${liquidGlassClasses.base} p-8 rounded-[32px] mx-3`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`${liquidGlassClasses.base} inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4  transform transition-transform hover:rotate-12`}>
          <User className="w-8 h-8 liquid-glass-text" />
        </div>
        <h1 className="text-3xl oxanium font-semibold liquid-glass-text mb-2">
          Create Account
        </h1>
        <p className="liquid-glass-text opacity-60">အကောက်ဖွင့်ရန်</p>
      </div>

      {/* Form  */}
      <form onSubmit={handleSubmit} className={`space-y-6 ${liquidGlassClasses.liquidText}`}>
        <div className="relative group">
          <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={formData.username || ""}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white backdrop-blur-sm"
            maxLength={50}
          />
          {errors.username && (
            <p className="text-red-500 absolute -bottom-5 left-3 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 liquid-glass-text transition-colors" />
          </div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={(e) => handleInputChange("phone_number", e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white backdrop-blur-sm"
            maxLength={20}
          />
          {errors.phone_number && (
            <p className="text-red-500 absolute -bottom-5 left-3 text-sm mt-1">{errors.phone_number}</p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 liquid-glass-text transition-colors" />
          </div>
          <input
            type="email"
            placeholder="Email (optional) / မထည့်လည်းရ"
            value={formData.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white backdrop-blur-sm"
            maxLength={100}
          />
          {errors.email && (
            <p className="text-red-500 absolute -bottom-5 left-3 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 liquid-glass-text transition-colors" />
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
            <p className="text-red-500 absolute -bottom-5 left-3 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 liquid-glass-text transition-colors" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.password_confirmation || ""}
            onChange={(e) =>
              handleInputChange("password_confirmation", e.target.value)
            }
            className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password_confirmation && (
            <p className="text-red-500 absolute -bottom-5 left-3 text-sm mt-1">
              {errors.password_confirmation}
            </p>
          )}
        </div>

        {/* Display submit error if any */}
        {errors.submit && (
          <div className="text-red-500 text-center text-sm">{errors.submit}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full oxanium py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 flex items-center justify-center ${liquidGlassClasses.btn}`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-white rounded-full animate-spin mr-2"></div>
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Switch to Login */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?/ အကောက်ရှိပြီးသားဆိုရင်
            <Link to={"/login"}>
              <button
                type="button"
                className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Sign in
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

    </div>
  );
}

export default RegisterForm;
