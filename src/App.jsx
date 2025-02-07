import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);
  const [hovered, setHovered] = useState(false); // New state to track hover

  const moveNoButton = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  // Floating Hearts + Fireworks Effect
  useEffect(() => {
    if (showMessage) {
      const newHearts = [];
      for (let i = 0; i < 500; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
          color: ["#ff4d79", "#ff66a3", "#cc00ff"][Math.floor(Math.random() * 3)],
          direction: Math.random() * 360,
          delay: Math.random() * 0.1,
          duration: 2 + Math.random() * 3,
        });
      }
      setHearts(newHearts);
    }
  }, [showMessage]);

  return (
    <div className="container">
      {/* Cute Cat GIF */}
      <motion.img
        src={showMessage ? "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjR0bmh1b3o4eWNreHdvMXB2c2oxNzNpdTdwenBtZHQ2c28xZXpwbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uiyXLcZBmbEGqaqQXz/giphy.gif" : "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTB4Ynl4YXJjZmZlZnJmMTE1ODAydDRpbTRmOHg0ZWk0M2k1cDFhdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Q6WPVzFU8LcBWWgQE1/giphy.gif"}
        alt="Cute Cat"
        className="cat"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Question */}
      {!showMessage && (
        <h1 className="romantic-text">
          {hovered ? "You will be my Valentine 💕" : "Will you be my Valentine? 💖"}
        </h1>
      )}

    {/* Buttons */}
{!showMessage && (
  <div className="button-group"> 
    <motion.button className="yes-button" onClick={() => setShowMessage(true)} whileHover={{ scale: 1.3 }}>
      Yes! 😍
    </motion.button>
    
    <motion.button
      className="no-button"
      style={
        noButtonPos.x !== 0 || noButtonPos.y !== 0 
          ? { transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)` }
          : {} // ✅ Keeps the No button in place at the start
      }
      onMouseEnter={() => {
        moveNoButton();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      No 😢
    </motion.button>
  </div>
)}
      {/* Confirmation Message & Dancing Cat */}
      {showMessage && (
        <motion.div className="hidden-message" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          Yaeeyyyy !! minnappi yes parnjjjjeeeeeeee  yyyyeeeeee...I love you soooo much dundumaniyeeee 🎉💕
        </motion.div>
      )}

      {/* Floating Hearts + Fireworks */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="heart"
          style={{ left: heart.x, top: heart.y, color: heart.color }}
          initial={{ opacity: 1, scale: 0.8 }}
          animate={{
            opacity: 0,
            scale: 1.5,
            y: -window.innerHeight - 100,
            x: heart.x + Math.cos(heart.direction) * 200,
          }}
          transition={{
            delay: heart.delay,
            duration: heart.duration,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
