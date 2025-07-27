import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setServiceData } from "../../../services/Slice/servicesSlice";
import type {  GameType } from "../../../types/ProductType";


export const ProductCard = (props: GameType) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  /**
   * @function handle routes
   */
  const handleProductCard = (name: string, service_id: number, game_id: number, desc: string) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(setServiceData({ service_id , game_id , name , desc }));
    router(`/detail/${name.toLowerCase().replace(/\s+/g, '-')}`);
  };
  return (
    <>
      <div
        className="group max-w-[100px] cursor-pointer h-auto text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)]"
        onClick={() => handleProductCard(props.slug, Number(props?.service_id) , Number(props?.id) , props?.name)}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden shadow-2xl rounded-3xl">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className=" w-full h-auto flex items-center justify-center object-center"
            >
              <img
                src={props?.logo_url}
                alt={props?.name}
                className=" w-full h-full object-fill "
              />
            </motion.div>

            {/* Hot label - positioned absolutely in top right */}
            {!props?.is_hot ? null : (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold z-10 shadow-lg">
                Hot
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <div className=" mt-1 w-full">
          <h3 className="font-bold oxanium text-center opacity-60 text-sm text-wrap">
            {props?.name}
          </h3>
        </div>
      </div>
    </>
  );
};