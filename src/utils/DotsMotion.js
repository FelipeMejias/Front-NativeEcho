import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MovingEllipsis() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{width:'100px',marginBottom:'12px'}} className="flex justify-center items-center h-20 text-2xl font-bold">
      <motion.div
      style={{fontSize:'40px'}}
        animate={{ x: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {dots}
      </motion.div>
    </div>
  );
}