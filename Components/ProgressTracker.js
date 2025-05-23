import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ProgressTracker({ correctAnswers, totalNeeded = 5 }) {
  return (
    <div className="mb-8">
      <div className="flex justify-center items-center space-x-2 rtl">
        {Array.from({ length: totalNeeded }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: index < correctAnswers ? 1 : 0.8,
              opacity: index < correctAnswers ? 1 : 0.5
            }}
            className={`rounded-full p-1 ${
              index < correctAnswers
                ? "bg-green-100 text-green-500"
                : "bg-gray-100 text-gray-300"
            }`}
          >
            <CheckCircle className="w-8 h-8" />
          </motion.div>
        ))}
      </div>
      <p className="text-center mt-2 text-gray-600 font-medium">
        {correctAnswers} מתוך {totalNeeded} תשובות נכונות
      </p>
    </div>
  );
}
