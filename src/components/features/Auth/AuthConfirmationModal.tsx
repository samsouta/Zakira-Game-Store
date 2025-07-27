import { LogOut } from "lucide-react"
import { liquidGlassClasses } from "../../../style/LiquidGlass";

interface AuthConfirmationModalProps {
    handleLogout: () => void;
    isLoading: boolean;
    setShowConfirm: (value: boolean) => void;
}

export const AuthConfirmationModal = ({
    handleLogout,
    isLoading,
    setShowConfirm
}: AuthConfirmationModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/30 dark:bg-white/10 backdrop-blur-2xl border border-white/40 dark:border-white/20 shadow-xl rounded-3xl p-6 sm:p-8 max-w-sm w-full fade-in-scale">
                <div className={`text-center  space-y-4 ${liquidGlassClasses?.liquidText}`}>
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-rose-400 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <LogOut className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold ">Confirm Logout</h3>
                    <p className=" text-sm opacity-65">
                        Are you sure you want to log out of your account?
                    </p>

                    <div className="flex space-x-3 pt-4">
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-white/50 dark:bg-white/10 text-gray-800 dark:text-white font-medium text-sm border border-gray-300 dark:border-white/20 hover:bg-white/70 dark:hover:bg-white/20 transition-all duration-300"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[var(--sky-blue)] to-[var(--rose-pink)] text-red-500 font-medium text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Logging out...</span>
                                </>
                            ) : (
                                <span>Logout</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
