import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { liquidGlassClasses } from "../../style/LiquidGlass";
import { useAuth } from "../../hook/useAuth";
import Cookies from 'js-cookie';
import { AuthConfirmationModal } from "../features/Auth/AuthConfirmationModal";
import { useLogOutMutation } from "../../services/API/Auth";
import type { NotificationType } from "../../types/notiModelType";
import { LiquidModal } from "../UI/NotiModal/LiquidModal";
import echo from "../../lib/echo";
import { messageAPI, useDeleteMessageMutation, useGetMessageQuery, useMakeUnreadMutation } from "../../services/API/messageAPI";
import { timeAgo } from "../../lib/time";
import { useDispatch } from 'react-redux';
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
import { Loading } from "../UI/Loading";

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
}

const demos = [
  {
    type: 'success' as const,
    title: 'Logout Successful',
    message: 'အောင်မြင်စွာအကောက်မှထွက်ပြီးပါပြီ...',
    btnText: 'Login Again',
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
    title: 'Logout Failed',
    message: ` အကောက်မှထွက်ခွာမှု မအောင်မြင်ပါ , Admin ကို ဆက်သွယ်ပါ " Telegram - @samsouta " `,
    btnText: 'try again !',
    buttonClass: 'from-pink-500 to-rose-600 shadow-pink-500/25'
  }
];
const BaseUrl = import.meta.env.VITE_API_BASE;

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [IsDeleteModal, setIsDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useNavigate();
  const Info = JSON.parse(Cookies.get('user') || '{}');
  const token = Cookies.get('token');
  const [logOut, { isLoading }] = useLogOutMutation();
  const [user, setUser] = useState(null);
  const { data, isLoading: messageLoading } = useGetMessageQuery({
    userId: Info?.id || null,
    token: token || ''
  });
  const [makeUnread, { isLoading: unreadLoading }] = useMakeUnreadMutation();
  const dispatch = useDispatch();
  const [deleteMessage, { isLoading: deleteMessageLoading }] = useDeleteMessageMutation();

  /**
   * Listen for real-time user updates via WebSocket
   * Uses Laravel Echo to subscribe to the 'users' channel
   * Logs updated user data when '.UserUpdated' event is received
   */
  useEffect(() => {
    fetch(`${BaseUrl}user/${Info?.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data.data);
      })
      .catch(err => console.error('❌ Fetch error:', err));

    // 2) Listen to Public WebSocket Channel
    const channel = echo.private(`user.${Info?.id}`);

    // 3) Listen to 'UserUpdated' event
    channel.listen('.user.refilled', (e: any) => {
      setUser(e.user);
    });

    // send user notification 
    channel.listen('.user.message.sent', (e: any) => {
      // Update RTK Query cache with new message
      dispatch(
        messageAPI.util.updateQueryData(
          'getMessage',
          { userId: Info?.id || null, token: token || '' },
          (draft) => {
            if (draft?.messages) {
              draft.messages.unshift({
                id: e.id || Date.now(),
                title: e.title,
                body: e.body,
                user_id: e.user_id,
                created_at: e.created_at || new Date().toISOString(),
                is_read: e.is_read || false
              });
            }
          }
        )
      );

    })



    // 4) Log socket connection status
    // echo.connector.pusher.connection.bind('connected', () => {
    //   console.log('✅ WebSocket connected successfully!');
    // });

    // echo.connector.pusher.connection.bind('error', (err: any) => {
    //   console.error('❌ WebSocket connection error:', err);
    // });

    // 5) Cleanup
    return () => {
      echo.leave(`user.${Info.id}`);;
    };

  }, [Info?.id, dispatch]);


  // Handle scroll lock
  useEffect(() => {
    if (isNotificationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
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

  /**
   * @function Handle Click Unread Message 
   */
  const HandleClickUnreadMessage = async (id: number) => {
    // Only proceed if there are unread messages
    if (!data?.messages?.some(msg => !msg?.is_read)) {
      return;
    }

    try {
      const response = await makeUnread({
        messageId: Number(id),
        token: token || ''
      }).unwrap();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  /**
   * @function Handle Delete User Message 
   */
  const DeleteMessage = async (pendingDeleteId: number) => {
    try {
      // Validate inputs
      if (!pendingDeleteId || !token) {
        console.error('Missing required parameters for message deletion');
        return;
      }

      // Call delete mutation
      const response = await deleteMessage({
        messageId: pendingDeleteId,
        token: token
      }).unwrap();

      // Handle success case
      if (response?.success) {
        // Success handling could be added here
        // e.g. showing a success toast notification
        setIsDeleteModal(false)
        console.log('you delete message successfully')
      }

    } catch (error) {
      // Log the full error for debugging
      console.error('Failed to delete message:', error);

      // Could add error handling here
      // e.g. showing error toast to user
    }
  };

  /**
   * @function Handle user Auth 
   */

  const HandleLogin = () => {
    setIsMenuOpen(false);
    router('/login')

  }

  const HandleRegister = () => {
    setIsMenuOpen(false);
    router('/register')

  }

  const handleLogout = async () => {
    if (!token) return;
    // logout process
    try {
      const response = await logOut(token).unwrap();
      if (response?.success) {
        setIsMenuOpen(false);
        setShowConfirm(false);
        Cookies.remove('token');
        Cookies.remove('user');
        setActiveModal('success');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setActiveModal('error')
    }
  };

  /**
   * @function Handle User Profile & Setting
   */

  const HandleUserSetting = () => {
    if (!token && !Info?.username) {
      return;
    }
    setIsMenuOpen(false)
    router(`${Info?.username}`)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  if (messageLoading || unreadLoading || deleteMessageLoading) return <Loading />;

  return (
    <>
      {/* Main Navigation Bar ------------------->*/}
      <div className=" fixed top-2 w-full h-auto z-50" >
        <nav className={`${liquidGlassClasses.base} mx-2 rounded-full overflow-hidden relative`}>
          {/* Main Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="flex justify-between items-center">
              {/* Brand Section with Enhanced Typography */}
              <Link to={'/home'} >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex w-14 h-14 object-fill object-center rounded-full  overflow-hidden">
                    <img src="https://ik.imagekit.io/deceuior6/PHOTO/photo_6330182792851343181_x.jpg?updatedAt=1753471989483" alt="labubu" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-md oxanium font-semibold liquid-glass-text tracking-tight
                 bg-gradient-to-tr from-blue-500 to-purple-500 bg-clip-text text-transparent
                  ">
                      Zakari
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
                <button className="  w-auto h-auto p-1">
                  <span className="oxanium text-sm font-medium">
                    <span className="font-bold text-[var(--purple)] block">Balance:</span> <span className="">{user ? Math.floor(user?.wallet_amount) : 0}</span> MMK
                  </span>
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
        <nav className={`${liquidGlassClasses.base} ${liquidGlassClasses?.liquidText} fixed top-24 right-2 z-50 rounded-full w-auto p-1 `} >
          <button
            onClick={toggleMenu}
            className={`${liquidGlassClasses.btn} flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9`}
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
                {
                  !isAuthenticated ? (
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
                      <Link to={"/home"} >
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            window.scrollTo({
                              top: window.innerHeight / 0.8,
                              behavior: 'smooth'
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
                    <div className={`flex justify-between text-sm font-medium ${liquidGlassClasses?.liquidText}`}>
                      {/* Display Name */}
                      <span className="text-md oxanium">
                        <span className="font-bold text-[var(--amber)]">Welcome: 🥰❤️‍🔥 </span>
                        <span className=" opacity-65 ">{Info?.username}</span>
                      </span>
                      {/* Compact Mobile Button */}
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="liquid-glass max-w-[90px] rounded-xl px-4 py-2 sm:px-6 sm:py-3 group relative overflow-hidden transition-all duration-300 hover:liquid-glass-hover hover:scale-105 floating"
                      >
                        <div className="absolute inset-0 shimmer-effect rounded-xl opacity-25"></div>
                        <div onClick={() => setShowConfirm(true)} className="relative z-10 flex items-center space-x-2">
                          <LogOut className="w-4 h-4 text-purple group-hover:text-white transition-colors duration-300" />
                          <span className=" text-sm font-medium group-hover:text-white transition-colors duration-300">
                            Exit
                          </span>
                        </div>
                      </button>
                    </div>
                  )
                }


                {/* Optional: Menu Items */}
                {
                  isAuthenticated && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex flex-col gap-3 text-sm font-medium liquid-glass-text">
                        <button
                          onClick={() => {
                            router('/home');
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <span>🏠</span> Home
                        </button>

                        <button
                          onClick={() => {
                            router('/home');
                            setIsMenuOpen(false);
                            window.scrollTo({
                              top: window.innerHeight / 0.7,
                              behavior: 'smooth'
                            });
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <span>🕹️</span> Games Shop
                        </button>

                        <button
                          onClick={HandleUserSetting}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <span>⚙️</span> Acount Settings
                        </button>
                      </div>
                    </div>
                  )
                }
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* left noti icon selection ---------------------------------->  */}
      <div >
        {/* Menu Toggle Button */}
        <nav className={`${liquidGlassClasses.base}  fixed top-24 left-2 z-50 rounded-full w-auto p-1 `}>
          <button
            onClick={toggleNotification}
            className={`${liquidGlassClasses.btn} flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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

                {/* badge  */}
                {
                  data?.messages?.some(msg => !msg.is_read) && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )
                }
              </AnimatePresence>
            </div>
          </button>


        </nav>

        {/* Noti Panel */}
        <AnimatePresence>
          {isNotificationOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={toggleNotification}
              />

              {/* Notification Panel Content */}
              <motion.div
                className={`${liquidGlassClasses.base}
                  fixed z-50 rounded-t-[32px] p-4
                  top-36 md:top-40 left-0 right-0 bottom-0
                  overflow-y-auto
                  max-h-[calc(100vh-9rem)]
                  sm:rounded-[32px] sm:left-2 sm:right-2 sm:bottom-2
                  md:left-4 md:right-4 md:bottom-4
                `}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={notiVariants}
              >
                {/* Header */}
                <div
                  className={` rounded-lg sticky top-0 z-20 flex items-center justify-between p-4 mb-4`}>
                  <h2 className="text-lg font-semibold oxanium liquid-glass-text">Notifications</h2>
                  {/* <span className="text-sm text-red-500 ">
                    click message to read
                  </span> */}
                </div>

                {/* Notification List */}
                <div className="space-y-4">
                  {/* Sample notifications - replace with your actual notification data */}
                  {isAuthenticated &&
                    data?.messages.map((mes) => (
                      <div
                        key={mes?.id}
                        onClick={() => HandleClickUnreadMessage(mes?.id)}
                        className="group p-4 rounded-xl liquid-glass-nav backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${!mes?.is_read ? 'from-red-500/50 to-pink-500/20 animate-pulse' : 'from-blue-500/50 to-purple-500/20'} flex items-center justify-center`}>
                            <Bell className={`w-4 h-4 ${data?.messages?.some(msg => !msg.is_read) ? 'text-red-200' : ''}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium oxanium mb-1">{mes?.title}</h3>
                            <p className="text-sm font-medium opacity-70">{mes?.body}</p>
                            <div className="mt-2 text-xs">{timeAgo(mes?.created_at)}</div>

                          </div>
                          <button
                            className=" group-hover:opacity-100 transition-opacity duration-300 p-2 hover:bg-red-500/20 rounded-lg"
                            onClick={() => {
                              setPendingDeleteId(mes.id);
                              setIsDeleteModal(true);
                            }}
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500/30 to-pink-500/20 flex items-center justify-center group-hover:from-red-500/50 group-hover:to-pink-500/30 transition-all duration-300">
                              <X className="w-3 h-3 liquid-glass-icon text-red-200" />
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Empty State - Show when there are no notifications */}
                {!isAuthenticated || !data?.messages?.length ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-500/20 mb-4">
                      <Bell className="w-6 h-6 liquid-glass-icon" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 oxanium">No notifications yet</h3>
                    <p className="text-sm opacity-50 font-medium">We'll notify you when something new arrives</p>
                  </div>
                ) : null}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>


      {/* Auth Confirmation Modal +++++++++++++++++++++ */}
      {
        showConfirm && (
          <AuthConfirmationModal
            handleLogout={handleLogout}
            isLoading={isLoading}
            setShowConfirm={setShowConfirm}
          />
        )
      }

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
        message="This action can’t be undone . | ဖျက်သွားရင် ပြန်မရတော့ဘူး။"
      />
    </>
  );
};
