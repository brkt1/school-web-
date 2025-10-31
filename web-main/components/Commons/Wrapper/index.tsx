// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// interface PageWrapperProps {
//     children: React.ReactNode;
//     variant?: string; 
//     delay?:number;
// }
// export const PageWrapper = ({ children, variant = 'down',delay=0.05 }: PageWrapperProps) => (
//     <motion.div
//         variants={fadeIn(variant, delay)}
//         initial="hidden"
//         whileInView={"show"}
//         viewport={{ once: false, amount: 0.7 }}
//     >
//         {children}
//     </motion.div>
// );

// export const fadeIn = (direction: string, delay: number) => {
//     return {
//         hidden: {
//             y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
//             x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
//             opacity: 10,
//         },
//         show: {
//             y: 0,
//             x: 0,
//             opacity: 1,
//             transition: {
//                 type: 'tween',
//                 duration: 0.3,
//                 delay: delay,
//                 ease: [0.25, 0.25, 0.25, 0.75]
//             }
//         }
//     }
// }