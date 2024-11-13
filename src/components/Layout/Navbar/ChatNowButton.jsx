// src/components/Layout/Navbar/ChatNowButton.jsx
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function ChatNowButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white 
        rounded-full font-medium transition-colors flex items-center space-x-2
        shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40"
    >
      <MessageSquare className="w-4 h-4" />
      <span>Chat Now</span>
    </motion.button>
  );
}