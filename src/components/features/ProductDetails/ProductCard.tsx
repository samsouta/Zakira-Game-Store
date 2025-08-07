import React, { useState } from "react";
import { Star, Diamond, Flame, Sparkles, ShoppingCart } from "lucide-react";
import { PreviewSlide } from "../../UI/PreviewSlide";
import type { ProductData } from "../../../types/ProductType";

interface AccountProductCardProps {
  pkg: ProductData;
}

// Liquid Glass Classes (you should define these in your CSS or Tailwind config)
const liquidGlass = {
  base: "backdrop-blur-xl bg-white/10 border border-white/20",
  btn: "backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/30 text-white"
};

const AccountProductCard: React.FC<AccountProductCardProps> = ({ pkg }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isHot] = useState<boolean>(pkg?.discount_percent > 20); // Auto-detect hot items

  const handleBuyNow = () => {
    setIsPreviewOpen(true);
  };

  if (!pkg) {
    return null; // Handle undefined pkg
  }

  return (
    <>
      <div className="cursor-pointer w-full h-full mb-5">
        <div className={`relative w-full ${liquidGlass?.base} rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}>
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-yellow-500/10 pointer-events-none" />

          {/* Hot Sale Ribbon */}
          {isHot && (
            <div className="absolute top-3 -left-1 z-20">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 text-[10px] font-bold transform -rotate-45 shadow-lg min-w-[60px] text-center">
                🔥 HOT
              </div>
            </div>
          )}

          {/* Discount Badge */}
          {pkg.discount_percent > 0 && (
            <div className="absolute top-3 right-3 z-20">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-xs shadow-lg">
                -{pkg.discount_percent}%
              </div>
            </div>
          )}

          {/* Sold out Badge */}
          {pkg.is_sold && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <div className="relative flex flex-col items-center gap-3 transform scale-110">
                <div className="backdrop-blur-xl bg-white/10 border-2 border-red-500/50 text-white rounded-2xl px-6 py-3 flex items-center gap-3 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50" />
                    <div className="relative w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  </div>
                  <span className="font-bold text-base tracking-wider uppercase">
                    Sold Out
                  </span>
                </div>
                <p className="text-white/80 text-sm animate-pulse">
                  Check back later for availability
                </p>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="relative z-10">
            {/* Image Section */}
            <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
              <img
                src={pkg.img_url}
                alt={pkg.name}
                className="w-full h-full object-fill object-center transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

              {/* Floating Icons */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <div className="animate-pulse">
                  <Diamond className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 drop-shadow-lg" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 flex items-center gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-pulse flex-shrink-0" />
                <span className="truncate text-white">{pkg.name}</span>
              </h3>

              <p className="text-white/70 font-medium text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 min-h-[2.5rem] sm:min-h-[3rem]">
                {pkg.description}
              </p>

              <div className="flex items-center flex-wrap gap-1 sm:gap-2 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1 bg-yellow-400/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full backdrop-blur-sm">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 flex-shrink-0" />
                  <span className="whitespace-nowrap text-white">Rank {pkg.data?.rank}</span>
                </div>
                <div className="flex items-center gap-1 bg-blue-600/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full backdrop-blur-sm">
                  <Diamond className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400 flex-shrink-0" />
                  <span className="whitespace-nowrap text-white">{pkg.data?.skin_count} Skins</span>
                </div>
                <div className="flex items-center gap-1 bg-red-400/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full backdrop-blur-sm">
                  <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 flex-shrink-0" />
                  <span className="whitespace-nowrap text-white">{pkg.data?.hero_count} Heroes</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 sm:pt-2">
                <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {Math.floor(Number(pkg.price))}
                  </span>
                  <span className="text-xs sm:text-sm text-white/80 font-medium">MMK</span>
                  {pkg.fake_price && (
                    <span className="text-red-400 font-bold line-through text-xs sm:text-sm">
                      {Math.floor(Number(pkg.fake_price))}MMK
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className={`${liquidGlass?.btn} w-full font-bold py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-2 sm:mt-3`}
              >
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">Preview Image ⚡</span>
              </button>

              <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 pt-1 sm:pt-2 flex-wrap">
                <div className="text-[10px] sm:text-xs text-white/60 flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                  🛡️ Safe Transfer
                </div>
                <div className="text-[10px] sm:text-xs text-white/60 flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                  ⭐ 5.0 Rating
                </div>
                <div className="text-[10px] sm:text-xs text-white/60 flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                  🔒 Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Preview Overlay */}
      {pkg.preview_img && (
        <PreviewSlide
          isOpen={isPreviewOpen}
          thumbnails={pkg.preview_img}
          title={pkg.name}
          orderDetail={{
            orderId: pkg.id.toString(),
            orderType: pkg.product_type,
            image: pkg.img_url,
            title: pkg.name,
            totalPrice: Number(pkg.price),
            game_server: '',
            game_uid: ''
          }}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
};

export default AccountProductCard;



//// diamond product card +++++++++++++++++++++++++++++
import { Gem, Zap } from "lucide-react";
import { useDispatch } from 'react-redux';
import { setDiaData } from "../../../services/Slice/orderSlice";
import { liquidGlassClasses } from "../../../style/LiquidGlass";

interface ProductCardProps {
  pkg: ProductData;
  onOpen: () => void;
}


export const DiamondProductCard: React.FC<ProductCardProps> = ({ onOpen, pkg }) => {
  const dispatch = useDispatch();



  /**
   * @function handle User Game Informaton 
   */
  const HandleUserGameInfo = () => {
    try {
      dispatch(setDiaData({
        orderId: pkg.id.toString(),
        orderType: pkg.product_type,
        image: pkg.img_url,
        title: pkg.name,
        totalPrice: Number(pkg.price),
        game_server: '',
        game_uid: '',
      }));
    } catch (error) {
      console.error('Failed to set order ID:', error);
    }

    onOpen()
  }

  return (
    <>
      <div className={`w-full px-1 md:px-3 ${liquidGlassClasses?.liquidText}`}>
        <div className={`
    relative cursor-pointer 
    w-full rounded-lg bg-white/10 border border-white/20 ${liquidGlassClasses?.base}
    p-3 ${pkg?.is_popular ? 'ring-1 ring-yellow-400/50' : ''}
  `}>
          {pkg?.is_popular ? (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500  px-2 py-0.5 rounded-full text-[10px] font-medium">
                🔥 POPULAR
              </div>
            </div>
          ) : null}

          {/* Sold out Badge */}
          {pkg.is_sold && (
            <div className="absolute inset-0 flex items-center justify-center z-30 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
              <div className="relative flex flex-col items-center gap-2">
                <div className="bg-white/10 border border-red-500/50 text-white rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50" />
                    <div className="relative w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px]">!</span>
                    </div>
                  </div>
                  <span className="font-bold text-sm tracking-wide uppercase">
                    Sold Out
                  </span>
                </div>
                <p className="text-white/80 text-xs animate-pulse px-2 text-center">
                  Check back later
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-2">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={pkg?.img_url}
                alt={pkg?.description}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            {/* Product Name */}
            <h3 className="md:text-sm text-xs font-medium oxanium text-center line-clamp-1">
              {pkg?.name}
            </h3>

            {/* Diamond Amount */}
            <div className="flex items-center justify-center gap-1">
              <Gem className="w-3 h-3 text-blue-400" />
              <span className="font-bold text-base">
                {pkg?.data?.amount?.toLocaleString()}
              </span>
            </div>

            {/* Price */}
            <div className="text-center">
              <div className="font-bold text-sm">
                MMK {Math.floor(Number(pkg.price))}
              </div>
            </div>

            {/* Purchase Button */}
            <button
              onClick={HandleUserGameInfo}
              className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500"
            >
              <div className="flex items-center justify-center gap-1">
                <span>Purchase</span>
                <Zap className="w-3 h-3" />
              </div>
            </button>
          </div>
        </div>
      </div>

    </>
  );
};