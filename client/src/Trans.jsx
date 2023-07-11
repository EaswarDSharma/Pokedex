import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosRounded";
const Trans = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const variants = {
    hidden: { opacity: 0, x: -15, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1},
    small: { scale: 0.8, opacity: 0.5 },
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            backgroundColor: "white",
            borderRadius: "0%",
            width: "36px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 20px",
          }}
        >
          <ArrowBackIosSharpIcon fontSize="large" />
        </IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "35vw",
            minWidth:"180px"
          }}
        >
          <AnimatePresence initial={false} custom={currentIndex}>
            {data.slice(currentIndex, currentIndex + 3).map((value, index) => {
              const isMiddle = index === 1;
              return (
                <motion.div
                  key={value}
                  style={{
                    width: "10vw",
                    textAlign: "center",
                    background: "white",
                    border: "1px solid gray",
                    padding: "10px",
                    marginLeft: index === 0 ? "0" : "10px",
                    marginRight: index === 2 ? "0" : "10px",
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{ type: "tween ", duration: 0.5 }}
                  custom={index === 0 || index === 2 ? "medium" : undefined}
                >
                  {isMiddle ? (
                    <motion.span style={{ fontWeight: "bold" }}>
                      {value}
                    </motion.span>
                  ) : (
                    value
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <IconButton
          onClick={handleNext}
          disabled={currentIndex === data.length - 3}
          style={{
            backgroundColor: "white",
            borderRadius: "0%",
            width: "36px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 20px",
          }}
        >
          <ArrowForwardIosSharpIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default Trans;
