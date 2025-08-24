import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { liquidGlassClasses } from "../../style/LiquidGlass";
import { useAuth } from "../../hook/useAuth";
import Cookies from "js-cookie";
import { AuthConfirmationModal } from "../features/Auth/AuthConfirmationModal";
import { useLogOutMutation } from "../../services/API/Auth";
import type { NotificationType } from "../../types/notiModelType";
import { LiquidModal } from "../UI/NotiModal/LiquidModal";
import echo from "../../lib/echo";
import {
  messageAPI,
  useDeleteMessageMutation,
  useGetMessageQuery,
  useMakeUnreadMutation,
} from "../../services/API/messageAPI";
import { timeAgo } from "../../lib/time";
import { useDispatch } from "react-redux";
import {
  MoonStar,
  SunMedium,
  Menu,
  X,
  Key,
  Lock,
  Bell,
  LogOut,
  Home,
  ArrowDown,
  Eye,
} from "lucide-react";
import DeleteModal from "../UI/DeleteModal";
import type { UserType } from "../../types/UserType";

const panelVariants = {
  hidden: {
    opacity: 0,
    x: 20,
    y: -10,
    scale: 0.8,
    transformOrigin: "top right",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transformOrigin: "top right",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    y: -10,
    scale: 0.8,
    transformOrigin: "top right",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.2,
    },
  },
};

const notiVariants = {
  hidden: {
    opacity: 0,
    y: 100, // Start from below (positive y moves down)
    transformOrigin: "bottom center",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0, // Move to original position
    transformOrigin: "bottom center",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -100, // Exit going up (negative y moves up)
    transformOrigin: "top center",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.3,
    },
  },
};

const demos = [
  {
    type: "success" as const,
    title: "Logout Successful",
    message: "အောင်မြင်စွာအကောက်မှထွက်ပြီးပါပြီ...",
    btnText: "Login Again",
    buttonClass: "from-sky-500 to-blue-600 shadow-sky-500/25",
    router: "/login",
  },
  {
    type: "warning" as const,
    title: "Storage Almost Full",
    message:
      "Your storage is 85% full. Consider upgrading your plan or cleaning up old files to avoid service interruption.",
    btnText: "Warning Modal",
    buttonClass: "from-amber-500 to-yellow-600 shadow-amber-500/25",
  },
  {
    type: "info" as const,
    title: "New Feature Available",
    message:
      "We've just released a new dashboard feature that will help you track your progress more effectively.",
    btnText: "Info Modal",
    buttonClass: "from-purple-500 to-violet-600 shadow-purple-500/25",
  },
  {
    type: "error" as const,
    title: "Logout Failed",
    message: ` အကောက်မှထွက်ခွာမှု မအောင်မြင်ပါ , Admin ကို ဆက်သွယ်ပါ " Telegram - @samsouta " `,
    btnText: "try again !",
    buttonClass: "from-pink-500 to-rose-600 shadow-pink-500/25",
  },
];
const BaseUrl = import.meta.env.VITE_API_BASE;

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [IsDeleteModal, setIsDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useNavigate();
  const Info = JSON.parse(Cookies.get("user") || "{}");
  const token = Cookies.get("token");
  const [logOut, { isLoading }] = useLogOutMutation();
  const [user, setUser] = useState<UserType | null>(null);
  const { data, isLoading: messageLoading } = useGetMessageQuery({
    userId: Info?.id || null,
    token: token || "",
  });
  const [makeUnread, { isLoading: unreadLoading }] = useMakeUnreadMutation();
  const dispatch = useDispatch();
  const [deleteMessage, { isLoading: deleteMessageLoading }] =
    useDeleteMessageMutation();
  /**
   * Listen for real-time user updates via WebSocket
   * Uses Laravel Echo to subscribe to the 'users' channel
   * Logs updated user data when '.UserUpdated' event is received
   */
  useEffect(() => {
    // Add guard clause to prevent fetch when Info?.id or token is missing
    if (!Info?.id || !token) {
      console.log("Missing user ID or token, skipping fetch");
      return;
    }

    fetch(`${BaseUrl}user/${Info?.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.error("❌ Fetch error:", err));

    // 2) Listen to private WebSocket Channel
    const channel = echo.private(`user.${Info?.id}`);

    // 3) Listen to 'UserUpdated' event
    channel.listen(".user.updated", (e: any) => {
      if (e.updateType === "wallet") {
        setUser(e.user);
      }
    });

    // 4) Listen to 'UserMessageSent' event
    channel.listen(".user.message.sent", (e: any) => {
      // Update RTK Query cache with new message
      dispatch(
        messageAPI.util.updateQueryData(
          "getMessage",
          { userId: Info?.id || null, token: token || "" },
          (draft) => {
            if (draft?.messages) {
              draft.messages.unshift({
                id: e.id || Date.now(),
                title: e.title,
                body: e.body,
                user_id: e.user_id,
                created_at: e.created_at || new Date().toISOString(),
                is_read: e.is_read || false,
              });
            }
          }
        )
      );
    });

    // 5) Cleanup
    return () => {
      echo.leave(`user.${Info.id}`);
    };
  }, [Info?.id, dispatch, token]);

  // Handle scroll lock
  useEffect(() => {
    if (isNotificationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNotificationOpen]);

  /**
   * @hook
   * Dark Mode with smooth transition
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  /**
   * @function handle button click to toggle theme
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   *
   * @function Handle noti and make unread message
   */
  const toggleNotification = async () => {
    setIsNotificationOpen(!isNotificationOpen);
  };


  // New function to handle expand/collapse with conditional API call
  const handleToggleExpand = async (messageId: number, isRead: boolean) => {
    const isCurrentlyExpanded = expandedMessages.includes(messageId);

    if (!isCurrentlyExpanded) {
      // Expanding: add to expanded list
      setExpandedMessages(prev => [...prev, messageId]);

      // Only call makeUnread API if message is unread
      if (!isRead) {
        try {
          await HandleClickUnreadMessage(messageId);
        } catch (error) {
          console.error('Failed to mark message as read:', error);
          // Optionally remove from expanded list if API call fails
          setExpandedMessages(prev => prev.filter(id => id !== messageId));
        }
      }
    } else {
      // Collapsing: remove from expanded list (no API call)
      setExpandedMessages(prev => prev.filter(id => id !== messageId));
    }
  };

  /**
   * @function Handle Click Unread Message
   */
  const HandleClickUnreadMessage = async (id: number) => {
    // Only proceed if there are unread messages
    if (!data?.messages?.some((msg) => !msg?.is_read)) {
      return;
    }

    try {
      await makeUnread({
        messageId: Number(id),
        token: token || "",
      }).unwrap();
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  /**
   * @function Handle Delete User Message
   */
  const DeleteMessage = async (pendingDeleteId: number) => {
    try {
      // Validate inputs
      if (!pendingDeleteId || !token) {
        console.error("Missing required parameters for message deletion");
        return;
      }

      // Call delete mutation
      const response = await deleteMessage({
        messageId: pendingDeleteId,
        token: token,
      }).unwrap();

      // Handle success case
      if (response?.success) {
        // Success handling could be added here
        // e.g. showing a success toast notification
        setIsDeleteModal(false);
        console.log("you delete message successfully");
      }
    } catch (error) {
      // Log the full error for debugging
      console.error("Failed to delete message:", error);

      // Could add error handling here
      // e.g. showing error toast to user
    }
  };

  /**
   * @function Handle user Auth
   */

  const HandleLogin = () => {
    setIsMenuOpen(false);
    router("/login");
  };

  const HandleRegister = () => {
    setIsMenuOpen(false);
    router("/register");
  };

  const handleLogout = async () => {
    if (!token) return;
    // logout process
    try {
      const response = await logOut(token).unwrap();
      if (response?.success) {
        setIsMenuOpen(false);
        setShowConfirm(false);
        Cookies.remove("token");
        Cookies.remove("user");
        setActiveModal("success");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setActiveModal("error");
    }
  };

  /**
   * @function Handle User Profile & Setting
   */

  const HandleUserSetting = () => {
    if (!token && !Info?.username) {
      return;
    }
    setIsMenuOpen(false);
    router(`${Info?.username}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <>
      {/* Main Navigation Bar ------------------->*/}
      <div className=" fixed top-2 w-full h-auto z-50">
        <nav
          className={`${liquidGlassClasses.base} mx-2 rounded-full overflow-hidden relative`}
        >
          {/* Main Content Container */}
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 relative">
            <div className="flex justify-between items-center">
              {/* Brand Section with Enhanced Typography */}
              <Link to={"/home"}>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex w-14 h-14 object-fill object-center rounded-full  overflow-hidden">
                    <img
                      src="https://ik.imagekit.io/deceuior6/PHOTO/photo_6330182792851343181_x.jpg?updatedAt=1753471989483"
                      alt="zakari game"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3
                      className="text-md oxanium font-semibold liquid-glass-text tracking-tight
                 bg-gradient-to-tr from-blue-500 to-purple-500 bg-clip-text text-transparent
                  "
                    >
                      Game Store
                    </h3>
                    {/* <p className="text-xs opacity-60 liquid-glass-text">
                  Premium Gaming Experience
                </p> */}
                  </div>
                </div>
              </Link>

              {/* Action Buttons Section */}
              <div className="flex items-center gap-x-2 sm:gap-x-3">
                {/* Profile Button */}
                <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm px-3 py-2 transition-all duration-300 hover:scale-105 hover:from-purple-500/20 hover:to-pink-500/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative z-10">
                    <span className="oxanium text-sm font-medium flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                        Balance:
                      </span>
                      <span className="font-medium text-sm">
                        {user
                          ? Number(user?.wallet_amount).toLocaleString()
                          : 0}
                        <span className="ml-1 text-xs opacity-75">KS</span>
                      </span>
                    </span>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </button>

                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={liquidGlassClasses.btn}
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  <div className="relative">
                    {isDarkMode ? (
                      <SunMedium className="h-4 w-4 transition-all duration-500 rotate-0 opacity-100 hover:rotate-180" />
                    ) : (
                      <MoonStar className="h-4 w-4 transition-all duration-500 rotate-0 opacity-100 hover:rotate-12" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Menu Button and Panel Container ----------------------------> */}
      <div className=" relative">
        {/* Menu Toggle Button */}
        <nav
          className={`${liquidGlassClasses.base} ${liquidGlassClasses?.liquidText} fixed top-[95px] right-6 z-50 rounded-full w-auto p-1 `}
        >
          <button
            onClick={toggleMenu}
            className={`${liquidGlassClasses.btn} flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-4 w-4 " />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-4 w-4 liquid-glass-icon" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </nav>

        {/* Auth Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={toggleMenu}
              />

              {/* Menu Content */}
              <motion.div
                className={` ${liquidGlassClasses.base} 
                  fixed z-50 rounded-[32px] p-4  overflow-hidden backdrop-blur-xl
                  top-36 md:top-40 right-2 w-72 sm:w-80
                  sm:top-32 sm:right-4
                  md:w-96`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={panelVariants}
              >
                {/* Auth Buttons */}
                {!isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4">
                    {/* Login Button */}
                    <button
                      onClick={HandleLogin}
                      className={`${liquidGlassClasses.btn} flex items-center justify-center w-full sm:w-auto px-4 py-3 h-auto oxanium font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95`}
                    >
                      <span className="text-sm sm:text-md">Login</span>
                      <Key className="ml-2 h-4 w-4" />
                    </button>

                    {/* Register Button */}
                    <button
                      onClick={HandleRegister}
                      className={`${liquidGlassClasses.btn} flex items-center justify-center w-full sm:w-auto px-4 py-3 h-auto oxanium font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95`}
                    >
                      <span className="text-sm sm:text-md">Register</span>
                      <Lock className="ml-2 h-4 w-4" />
                    </button>
                    {/* home button  */}
                    <Link to={"/home"}>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.scrollTo({
                            top: window.innerHeight / 0.8,
                            behavior: "smooth",
                          });
                        }}
                        className={`${liquidGlassClasses.btn} flex items-center justify-center w-full sm:w-auto px-4 py-3 h-auto oxanium font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95`}
                      >
                        <span className="text-sm sm:text-md">Home</span>
                        <Home className="ml-2 h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div
                    className={`flex justify-between text-sm font-medium ${liquidGlassClasses?.liquidText}`}
                  >
                    {/* Display Name */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 backdrop-blur-sm">
                        <span className="text-amber-400 text-sm font-semibold">
                          Welcome
                        </span>
                        <span className="animate-pulse">✨</span>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                          {Info?.username}
                        </span>
                      </div>
                    </div>
                    {/* Compact Mobile Button */}
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="liquid-glass max-w-[90px] rounded-xl px-4 py-2 sm:px-6 sm:py-3 group relative overflow-hidden transition-all duration-300 hover:liquid-glass-hover hover:scale-105 floating"
                    >
                      <div className="absolute inset-0 shimmer-effect rounded-xl opacity-25"></div>
                      <div
                        onClick={() => setShowConfirm(true)}
                        className="relative z-10 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4 text-purple group-hover:text-white transition-colors duration-300" />
                        <span className=" text-sm font-medium group-hover:text-white transition-colors duration-300">
                          Exit
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Optional: Menu Items */}
                {isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col gap-3 text-sm font-medium liquid-glass-text">
                      <button
                        onClick={() => {
                          router("/home");
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span>🏠</span> Home (မှုလစာမျက်နာ)
                      </button>

                      <button
                        onClick={() => {
                          router("/home");
                          setIsMenuOpen(false);
                          window.scrollTo({
                            top: window.innerHeight / 0.7,
                            behavior: "smooth",
                          });
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span>🕹️</span> Games Shop (စတိုးဆိုင်)
                      </button>

                      <button
                        onClick={() => {
                          router("/top-up");
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span>💰</span> Top Up (ငွေဖြည့်)
                      </button>

                      <button
                        onClick={HandleUserSetting}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <span>⚙️</span> Account Settings
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* left noti icon selection ---------------------------------->  */}
      <div>
        {/* Menu Toggle Button */}
        <nav
          className={`${liquidGlassClasses.base} fixed top-[95px] left-6 z-50 rounded-full w-auto p-1`}
        >
          <button
            onClick={toggleNotification}
            className={`${liquidGlassClasses.btn} flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10`}
            aria-label={isNotificationOpen ? "Close notification panel" : "Open notification panel"}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {isNotificationOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-4 w-4 liquid-glass-icon" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bell className="h-4 w-4 liquid-glass-icon" />
                  </motion.div>
                )}

                {/* Notification Badge */}
                {data?.messages?.some((msg) => !msg.is_read) && !isNotificationOpen && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white/20"></div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </nav>

        {/* Notification Panel */}
        <AnimatePresence>
          {isNotificationOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={toggleNotification}
              />

              {/* Notification Panel Content */}
              <motion.div
                className={`${liquidGlassClasses.base}
            fixed z-50 
            
            /* Mobile: Slide from bottom */
            bottom-0 left-0 right-0 
            rounded-t-3xl max-h-[85vh]
            
            /* Tablet: Side panel from left */
            sm:bottom-4 sm:left-4 sm:top-[140px] sm:right-auto
            sm:w-[400px] sm:rounded-2xl sm:max-h-[calc(100vh-160px)]
            
            /* Desktop: Larger side panel */
            md:w-[450px] md:top-[120px] md:max-h-[calc(100vh-140px)]
            lg:w-[500px] 
            
            /* Large Desktop: Even larger */
            xl:w-[550px] xl:top-[100px]
            
            overflow-hidden flex flex-col shadow-2xl
          `}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={notiVariants}
              >
                {/* Header - Fixed at top */}
                <div className="sticky top-0 z-20 bg-gradient-to-r from-black/20 to-black/10 backdrop-blur-md 
            border-b border-white/10 flex items-center justify-between p-4 sm:p-5 lg:p-6 flex-shrink-0
            rounded-t-3xl sm:rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 
                flex items-center justify-center">
                      <Bell className="w-4 h-4 text-white/80" />
                    </div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold oxanium liquid-glass-text">
                      Notifications
                      {(data?.messages?.length || 0) > 0 && (
                        <span className="ml-2 text-sm text-white/60 font-normal">
                          ({data?.messages?.length || 0})
                        </span>
                      )}
                    </h2>
                  </div>

                  <button
                    onClick={toggleNotification}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 
                group flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors" />
                  </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {/* Loading State */}
                  {messageLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-medium text-purple-400">Loading notifications...</p>
                    </div>
                  ) : !isAuthenticated || !data?.messages?.length ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                  flex items-center justify-center mb-4">
                        <Bell className="w-8 h-8 text-white/40" />
                      </div>
                      <h3 className="text-lg font-medium mb-2 oxanium text-white/80">
                        No notifications yet
                      </h3>
                      <p className="text-sm text-white/50 max-w-sm">
                        When you have new notifications, they'll appear here
                      </p>
                    </div>
                  ) : (
                    /* Messages List */
                    <div className="space-y-2 p-4 sm:p-5 lg:p-6">
                      {data.messages.map((mes) => {
                        const isExpanded = expandedMessages.includes(mes?.id);

                        return (
                          <motion.div
                            key={mes?.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="group p-4 rounded-xl liquid-glass-nav backdrop-blur-sm 
                        border border-white/10 hover:border-white/20 transition-all duration-300
                        hover:shadow-lg hover:shadow-purple-500/10 transform hover:scale-[1.02]"
                          >
                            <div className="flex items-start gap-3">
                              {/* Notification Icon */}
                              <div className={`
                          w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center
                          transition-all duration-300 flex-shrink-0
                          ${!mes?.is_read
                                  ? "from-red-500/40 to-pink-500/20 shadow-md shadow-red-500/20"
                                  : "from-blue-500/40 to-purple-500/20 shadow-md shadow-blue-500/20"
                                }`}
                              >
                                {!mes?.is_read ? (
                                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                                ) : (
                                  <Bell className="w-5 h-5 text-blue-200" />
                                )}
                              </div>

                              {/* Message Content */}
                              <div className="flex-1 space-y-2 min-w-0">
                                {
                                  mes?.product?.service?.name === 'code' ? (
                                    <div className="group/copy relative">
                                      {/* Glassmorphism container */}
                                      <div className="relative overflow-hidden rounded-xl
        bg-white/5 backdrop-blur-md border border-white/10
        dark:bg-black/5 dark:border-white/5
        hover:bg-white/10 dark:hover:bg-white/10
        hover:border-white/20 dark:hover:border-white/10
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-xl
        transform hover:scale-[1.02]"
                                      >
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover/copy:opacity-100
          bg-gradient-to-r from-purple-500/5 to-pink-500/5
          transition-opacity duration-300"
                                        />

                                        <button
                                          onClick={() => {
                                            navigator.clipboard.writeText(mes?.title);
                                            // Add your toast notification here
                                          }}
                                          className="w-full p-4 text-left relative z-10
            focus:outline-none focus:ring-2 focus:ring-purple-500/50
            active:scale-[0.99] transition-transform duration-150"
                                        >
                                          <div className="flex items-center justify-between gap-3">
                                            {/* Text content */}
                                            <div className="flex-1 min-w-0">
                                              <h3 className="font-medium text-sm sm:text-base lg:text-lg
                text-slate-800 dark:text-white/90
                group-hover/copy:text-slate-900 dark:group-hover/copy:text-white
                transition-colors duration-200
                truncate pr-2"
                                              >
                                                {mes?.title}
                                              </h3>

                                              {/* Subtitle hint */}
                                              <p className="text-xs text-slate-500 dark:text-white/50 mt-1
                opacity-0 group-hover/copy:opacity-100
                transform translate-y-1 group-hover/copy:translate-y-0
                transition-all duration-300 delay-75"
                                              >
                                                Click to copy to clipboard
                                              </p>
                                            </div>

                                            {/* Copy icon */}
                                            <div className="flex-shrink-0 relative">
                                              {/* Default state */}
                                              <div className="opacity-60 group-hover/copy:opacity-100
                transform scale-90 group-hover/copy:scale-100
                transition-all duration-200"
                                              >
                                                <svg
                                                  width="20"
                                                  height="20"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  className="text-slate-600 dark:text-white/70"
                                                >
                                                  <path
                                                    d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                  />
                                                  <path
                                                    d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                  />
                                                </svg>
                                              </div>

                                              {/* Hover glow effect */}
                                              <div className="absolute inset-0 opacity-0 group-hover/copy:opacity-100
                bg-gradient-to-r from-purple-500 to-pink-500
                rounded-full blur-lg scale-150
                transition-opacity duration-300 -z-10"
                                              />
                                            </div>
                                          </div>
                                        </button>

                                        {/* Bottom indicator line */}
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5
          bg-gradient-to-r from-purple-500 to-pink-500
          transform scale-x-0 group-hover/copy:scale-x-100
          transition-transform duration-300 ease-out origin-left"
                                        />

                                        {/* Ripple effect on click */}
                                        <div className="absolute inset-0 opacity-0 group-active/copy:opacity-20
          bg-gradient-to-r from-purple-500 to-pink-500
          transition-opacity duration-150"
                                        />
                                      </div>

                                      {/* Optional: Floating copy badge for mobile */}
                                      <div className="sm:hidden absolute -top-2 -right-2
        opacity-0 group-hover/copy:opacity-100
        transform scale-75 group-hover/copy:scale-100
        transition-all duration-200"
                                      >
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500
          text-white text-xs font-medium px-2 py-1 rounded-full
          shadow-lg backdrop-blur-sm"
                                        >
                                          Copy
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="relative overflow-hidden rounded-xl
      bg-white/5 backdrop-blur-md border border-white/10
      dark:bg-black/5 dark:border-white/5
      hover:bg-white/10 dark:hover:bg-white/10
      hover:border-white/20 dark:hover:border-white/10
      transition-all duration-300 ease-out
      p-4 group"
                                    >
                                      <h3 className="font-medium text-sm sm:text-base lg:text-lg
        text-slate-800 dark:text-white/90
        group-hover:text-slate-900 dark:group-hover:text-white
        transition-colors duration-200
        truncate"
                                      >
                                        {mes?.title}
                                      </h3>
                                    </div>
                                  )
                                }

                                <motion.div
                                  initial={false}
                                  animate={{ height: isExpanded ? "auto" : "2.5rem" }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <p className={`text-sm font-medium text-white/70 leading-relaxed
                              ${!isExpanded ? "line-clamp-2" : ""}`}>
                                    {mes?.body}
                                  </p>
                                </motion.div>

                                <div className="flex items-center justify-between pt-2">
                                  <span className="text-xs text-white/50 font-medium">
                                    {timeAgo(mes?.created_at)}
                                  </span>

                                  {/* Action Buttons */}
                                  <div className="flex items-center gap-2">
                                    {/* Read More/Less Button */}
                                    <button
                                      disabled={unreadLoading}
                                      onClick={() => handleToggleExpand(mes?.id, mes?.is_read)}
                                      className="group/btn relative px-3 py-1.5 rounded-lg 
                                  bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                                  border border-purple-500/20 backdrop-blur-sm 
                                  hover:from-purple-500/20 hover:to-pink-500/20 
                                  transition-all duration-300 hover:scale-105
                                  focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                    >
                                      {unreadLoading ? (
                                        <div className="flex items-center gap-1.5">
                                          <div className="w-3 h-3 border-2 border-purple-300 
                                      border-t-transparent rounded-full animate-spin" />
                                          <span className="text-xs font-medium text-purple-400">
                                            Loading...
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs font-medium bg-gradient-to-r 
                                      from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            {isExpanded ? "Less" : "More"}
                                          </span>
                                          <Eye className="w-3 h-3 text-purple-400 group-hover/btn:text-pink-400 
                                      transition-colors duration-300" />
                                        </div>
                                      )}
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      disabled={deleteMessageLoading}
                                      className="group/del p-1.5 hover:bg-red-500/10 rounded-lg
                                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                      onClick={() => {
                                        setPendingDeleteId(mes.id);
                                        setIsDeleteModal(true);
                                      }}
                                    >
                                      <div className="w-6 h-6 rounded-full bg-gradient-to-br 
                                  from-red-500/20 to-pink-500/10 flex items-center justify-center
                                  group-hover/del:from-red-500/30 group-hover/del:to-pink-500/20 
                                  transition-all duration-300">
                                        {deleteMessageLoading ? (
                                          <div className="w-3 h-3 border-2 border-red-300 
                                      border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                          <X className="w-3 h-3 text-red-300 group-hover/del:text-red-200" />
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Confirmation Modal +++++++++++++++++++++ */}
      {showConfirm && (
        <AuthConfirmationModal
          handleLogout={handleLogout}
          isLoading={isLoading}
          setShowConfirm={setShowConfirm}
        />
      )}

      {/* Noti Modals box +++++++++++++++ */}
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={IsDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        onConfirm={() => pendingDeleteId && DeleteMessage(pendingDeleteId)}
        isDark={isDarkMode}
        title="Delete Message"
        message="ဖျက်ပြီးသွားရင် ,သူမလိုမျိုးပြန်မလာတော့ဘူး....👀"
      />
    </>
  );
};
