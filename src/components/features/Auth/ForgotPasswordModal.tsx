import { useEffect, useState } from 'react';
import { Mail, Phone, Check, X, Send, Shield, Lock } from 'lucide-react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import {
  type ConfirmationResult
} from 'firebase/auth';
import { useResetPasswordPhoneMutation } from '../../../services/API/Auth';
import { auth } from '../../../firebase';
import type { NotificationType } from '../../../types/notiModelType';
import { LiquidModal } from '../../UI/NotiModal/LiquidModal';

const demos = [
  {
    type: 'success' as const,
    title: 'Password Reset Successful',
    message: 'အကောက် passwordအောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ , ပြန်လည်Login လုပ်ပါ !',
    btnText: 'Login Again',
    buttonClass: 'from-sky-500 to-blue-600 shadow-sky-500/25',
    router: '/login'
  },
  {
    type: 'warning' as const,
    title: 'email is not support yet.',
    message: 'phone number ဖြင့်သာလုပ်လို့ရသည်| email ဖြင့်လုပ်လို့မရသေးပါ.. Admin ထဲဆက်သွယ်ပါ..telegram - @samsouta .',
    btnText: 'OK ',
    buttonClass: 'from-amber-500 to-yellow-600 shadow-amber-500/25'
  },
];

interface VerificationModalProps {
  onClose: () => void;
}

export const ForgotPasswordModal = ({ onClose }: VerificationModalProps) => {
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errors, setErrors] = useState('');
  const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
  const [contactType, setContactType] = useState<'email' | 'phone' | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [resetPasswordPhone] = useResetPasswordPhoneMutation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifiedPhone, setVerifiedPhone] = useState<string>('');
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);

  /**
   * @function detect contact type
   */
  const detectContactType = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+[1-9]\d{9,14}$/; // strict E.164 format

    if (emailRegex.test(value)) {
      setContactType('email');
    } else if (phoneRegex.test(value)) {
      setContactType('phone');
    } else {
      setContactType(null);
    }
  };

  /**
   * @function handle contact change
   */
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact(value);
    detectContactType(value);
    setErrors('');
  };

  /**
   * @function initialize recaptcha
   */
  const initializeRecaptcha = () => {
    try {
      // Clear existing recaptcha first
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }

      // Create new recaptcha verifier with proper configuration
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: string) => {
          console.log('reCAPTCHA solved:', response);
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          setErrors('reCAPTCHA expired. Please try again.');
        },
        'error-callback': (error: any) => {
          console.error('reCAPTCHA error:', error);
          setErrors('reCAPTCHA error. Please try again.');
        }
      });

      setRecaptchaVerifier(verifier);
      setRecaptchaInitialized(true);
      console.log('reCAPTCHA initialized successfully');
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
      setErrors('Failed to initialize reCAPTCHA. Please refresh the page.');
    }
  };

  /**
   * @useEffect recaptcha verifier
   */
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeRecaptcha();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.clear();
        } catch (error) {
          console.error('Error clearing recaptcha:', error);
        }
      }
    };
  }, []);

  /**
   * @function handle send code 
   */
  const handleSendCode = async () => {
    if (!contact.trim() || !contactType) {
      setErrors('Please enter a valid phone number');
      return;
    }
    
    if (contactType === 'phone') {
      if (!recaptchaVerifier || !recaptchaInitialized) {
        setErrors('reCAPTCHA not ready. Please wait a moment and try again.');
        // Try to reinitialize
        initializeRecaptcha();
        return;
      }

      try {
        setIsSubmitting(true);
        setErrors('');
        console.log('Sending OTP to:', contact);
        
        // Ensure the phone number is in proper format
        const formattedPhone = contact.startsWith('+') ? contact : `+${contact}`;
        
        const result = await signInWithPhoneNumber(
          auth,
          formattedPhone,
          recaptchaVerifier
        );
        
        setConfirmationResult(result);
        console.log('OTP sent successfully:', result);
        setStep(2);
      } catch (err: any) {
        console.error('Error sending OTP:', err);
        
        // Handle specific Firebase errors
        if (err.code === 'auth/invalid-phone-number') {
          setErrors('Invalid phone number format. Please use +country_code format (e.g., +959123456789)');
        } else if (err.code === 'auth/too-many-requests') {
          setErrors('Too many requests. Please try again later.');
        } else if (err.code === 'auth/captcha-check-failed') {
          setErrors('reCAPTCHA verification failed. Please try again.');
          // Reinitialize reCAPTCHA
          initializeRecaptcha();
        } else if (err.code === 'auth/web-storage-unsupported') {
          setErrors('Web storage is not supported. Please enable cookies and try again.');
        } else {
          setErrors('Failed to send OTP. Please check your phone number and try again.');
        }
        
        // Clear and reinitialize reCAPTCHA for retry
        if (recaptchaVerifier) {
          try {
            recaptchaVerifier.clear();
          } catch (clearError) {
            console.error('Error clearing recaptcha:', clearError);
          }
        }
        initializeRecaptcha();
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setActiveModal('warning');
    }
  };

  /**
   * @function handle verify code
   */
  const handleVerify = async () => {
    if (!otp.trim()) {
      setErrors('Please enter the verification code');
      return;
    }

    if (contactType !== 'phone' || !confirmationResult) {
      setErrors('Please request OTP first');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors('');

      const result = await confirmationResult.confirm(otp);
      const phoneNumber = result.user.phoneNumber;

      if (!phoneNumber) {
        throw new Error('Phone number not found');
      }

      setVerifiedPhone(phoneNumber);
      setStep(3);
    } catch (error: any) {
      console.error('Verification error:', error);
      
      if (error.code === 'auth/invalid-verification-code') {
        setErrors('Invalid verification code. Please check and try again.');
      } else if (error.code === 'auth/code-expired') {
        setErrors('Verification code expired. Please request a new code.');
        setStep(1);
      } else {
        setErrors('Verification failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * @function Handle reset password 
   */
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setErrors('Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setErrors('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors('');

      await resetPasswordPhone({
        phone_number: verifiedPhone,
        password: newPassword,
        password_confirmation: confirmPassword,
      }).unwrap();

      setActiveModal('success');
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      if (error.message?.includes('phone number not found')) {
        setErrors('Session expired. Please start over.');
        setStep(1);
      } else {
        setErrors('Password reset failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * @function handle back
   */
  const handleBack = () => {
    setErrors('');
    if (step === 3) {
      setStep(2);
      setNewPassword('');
      setConfirmPassword('');
    } else if (step === 2) {
      setStep(1);
      setOtp('');
    }
  };

  /**
   * @function handle modal close
   */
  const handleModalClose = () => {
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
      } catch (error) {
        console.error('Error clearing recaptcha on close:', error);
      }
    }
    onClose();
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isDarkMode ? 'dark' : ''}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" onClick={handleModalClose} />

        {/* Modal Container */}
        <div className="relative w-full max-w-md mx-auto">
          {/* Liquid Glass Card */}
          <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden">
            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-800/10 pointer-events-none" />

            {/* Header */}
            <div className="relative px-6 py-8 text-center">
              <div className="flex justify-between items-center mb-6">
                <div className="w-8" /> {/* Spacer */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-400/20 dark:to-purple-500/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                  {step === 1 ? (
                    <Send className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  ) : step === 2 ? (
                    <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                  ) : (
                    <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-8 h-8 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {step === 1 ? 'Verify Your Identity' : step === 2 ? 'Enter Verification Code' : 'Create New Password'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {step === 1
                  ? 'Enter your email or phone number to receive a verification code'
                  : step === 2
                    ? `We've sent a verification code to ${contact}`
                    : 'Enter your new password and confirm it'
                }
              </p>
            </div>

            {/* Form */}
            <div className="px-6 pb-8">
              {step === 1 ? (
                <div className="space-y-4">
                  {/* Contact Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      {contactType === 'email' ? (
                        <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      ) : contactType === 'phone' ? (
                        <Phone className="w-5 h-5 text-green-500 dark:text-green-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={contact}
                      onChange={handleContactChange}
                      placeholder="Phone e.g. +959123456789"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                    />
                    {contactType && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-6 h-6 rounded-full bg-green-500 dark:bg-green-400 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {errors && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 dark:bg-red-500/20 backdrop-blur-sm border border-red-500/20 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                      <X className="w-4 h-4 flex-shrink-0" />
                      {errors}
                    </div>
                  )}

                  {/* Send Code Button */}
                  <button
                    onClick={handleSendCode}
                    disabled={isSubmitting || !contactType || !recaptchaInitialized}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Code...
                      </div>
                    ) : !recaptchaInitialized ? (
                      'Initializing...'
                    ) : (
                      'Send Code'
                    )}
                  </button>
                </div>
              ) : step === 2 ? (
                <div className="space-y-4">
                  {/* Verification Code Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <Shield className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                        setErrors('');
                      }}
                      placeholder="Enter 6-digit code"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-400/50 focus:border-transparent transition-all duration-300 text-center text-lg font-mono tracking-wider"
                      maxLength={6}
                    />
                  </div>

                  {/* Error Message */}
                  {errors && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 dark:bg-red-500/20 backdrop-blur-sm border border-red-500/20 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                      <X className="w-4 h-4 flex-shrink-0" />
                      {errors}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleVerify}
                      disabled={isSubmitting || otp.length !== 6}
                      className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-600 dark:from-green-400 dark:to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Verifying...
                        </div>
                      ) : (
                        'Verify'
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* New Password Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <Lock className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                    </div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErrors('');
                      }}
                      placeholder="New Password (min 6 chars)"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                      <Lock className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors('');
                      }}
                      placeholder="Confirm Password"
                      className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Error Message */}
                  {errors && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 dark:bg-red-500/20 backdrop-blur-sm border border-red-500/20 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                      <X className="w-4 h-4 flex-shrink-0" />
                      {errors}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleResetPassword}
                      disabled={isSubmitting || !newPassword || !confirmPassword}
                      className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Resetting...
                        </div>
                      ) : (
                        'Reset Password'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 text-center">
              <button
                onClick={handleModalClose}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modals */}
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

      {/* reCAPTCHA container - changed ID to avoid conflicts */}
      <div id="recaptcha-container" className="hidden" />
    </>
  );
};