import { motion } from 'framer-motion';
import { Zap, Truck, Headphones, Smartphone, ShieldCheck, Gem } from 'lucide-react';
import { liquidGlassClasses } from '../../../style/LiquidGlass';

const features = [
  {
    icon: Zap,
    title: 'Instant Top-Up',
    description: 'ငွေပေးချေနှိပ်ပြီးချင်းနဲ့ အော်ဒါအမြန်ဆုံးပေးပို့ပေးပါတယ်။',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: ShieldCheck,
    title: '100% Safe & Secure',
    description: 'ငွေလွှဲမှတ်တမ်းစုံ၊ လုံခြုံမှုအပြည့်အဝနဲ့ ဝယ်ယူနိုင်ပါတယ်။',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'ဖုန်းနဲ့ဖြစ်ဖြစ်၊ ကွန်ပျူတာနဲ့ဖြစ်ဖြစ် လွယ်ကူမြန်ဆန်စွာ ဝင်ကြည့်နိုင်ပါတယ်။',
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: Gem,
    title: 'Top Quality Diamonds',
    description: 'တရားဝင် diamonds / UC များသာရောင်းပြီး စိတ်ချယုံကြည်နိုင်ပါတယ်။',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'အော်ဒါတင်ပြီးနောက် ၅ မိနစ်အတွင်းမှာပဲ ပေးပို့ပြီးဖြေရှင်းပေးပါတယ်။',
    color: 'from-red-400 to-red-600'
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'မေးစရာရှိရင် မည်သည့်အချိန်မဆို ဆက်သွယ်မေးမြန်းလို့ရပါတယ်။',
    color: 'from-indigo-400 to-indigo-600'
  }
];


export const FeaturesSection = () => {
  return (
    <>
      <section className={`py-20 ${liquidGlassClasses?.liquidText} `}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`text-center mb-16 p-5 rounded-3xl ${liquidGlassClasses?.base} `}
          >
            <h2 className="text-4xl oxanium lg:text-5xl font-black  mb-6">
              Why choose us?
            </h2>
            <p className="text-xl opacity-75  max-w-3xl mx-auto">
              We are committed to providing users with the best product and service experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`group relative  rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${liquidGlassClasses?.base}`}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 " />
                </div>

                <h3 className="text-2xl font-bold oxanium mb-4">
                  {feature.title}
                </h3>

                <p className=" opacity-70  leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
