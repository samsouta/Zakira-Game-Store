import { motion } from 'framer-motion';
import { Zap, Shield, Truck, Headphones, Award, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: '超快充电',
    description: '120W超级快充，30分钟充满电',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Shield,
    title: '安全保障',
    description: '军工级安全芯片，保护隐私',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: Smartphone,
    title: '顶级屏幕',
    description: '2K AMOLED屏幕，120Hz刷新率',
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: Award,
    title: '品质保证',
    description: '3年质保，终身技术支持',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: Truck,
    title: '极速配送',
    description: '24小时内发货，全国包邮',
    color: 'from-red-400 to-red-600'
  },
  {
    icon: Headphones,
    title: '专业客服',
    description: '7x24小时在线客服支持',
    color: 'from-indigo-400 to-indigo-600'
  }
];

export const FeaturesSection = () => {
  return (
    <>
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            为什么选择我们？
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们致力于为用户提供最优质的产品和服务体验
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
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
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
