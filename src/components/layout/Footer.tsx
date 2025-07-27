import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { liquidGlassClasses } from "../../style/LiquidGlass";

export const Footer = () => {
  return (
    <footer className={`${liquidGlassClasses?.base} ${liquidGlassClasses?.liquidText} pt-16 pb-8 mt-44`}>
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
              Game UC, Mobile Legends Accounts, and Diamonds ဝယ်ရန်အတွက် ယုံကြည်စိတ်ချစွာ ဝယ်ယူနိုင်သောအရာများဖြစ်ပါတယ်။
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  href="#"
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
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="opacity-70">+95 987 654 321</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="opacity-70">support@zakari.com</span>
              </div>
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
            {["Privacy Policy", "Terms of Service", "Security Policy"].map((text, idx) => (
              <a
                key={idx}
                href="#"
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
