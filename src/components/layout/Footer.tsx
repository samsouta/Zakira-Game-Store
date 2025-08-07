import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  MapPin,
} from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { liquidGlassClasses } from "../../style/LiquidGlass";

export const Footer = () => {
  return (
    <footer className={`${liquidGlassClasses?.base} ${liquidGlassClasses?.liquidText} pt-16 pb-8 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Zakari Game Store</h3>
            <p className="opacity-70 mb-6 leading-relaxed">
              မင်္ဂလာပါ။ ကျွန်တော်တို့ Zakari Game Store မှ Game UC၊ Mobile Legends အကောင့်များနှင့် Diamonds များကို စိတ်ချယုံကြည်စွာ ဝယ်ယူနိုင်ပါကြောင်း လှိုက်လှဲစွာ ဖိတ်ခေါ်အပ်ပါတယ်။
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, link: "https://www.facebook.com/zakari.gamestore" },
                { icon: FaTelegram, link: "https://t.me/ZakarixCage" },
                { icon: IoLogoTiktok, link: "https://www.tiktok.com/@zakarigamestore" }
              ].map(({ icon: Icon, link }, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Location</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="opacity-70">Yangon, Myanmar</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="opacity-70 text-sm">© 2025 Zakari Game Store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { text: "Privacy Policy", link: "/privacy-policy" },
              { text: "Terms of Service", link: "/terms-of-service" },
              { text: "Security Policy", link: "/security-policy" }
            ].map(({ text, link }, idx) => (
              <a
                key={idx}
                href={link}
                className="opacity-70 hover:text-yellow-400 text-sm transition-colors"
              >
                {text}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
