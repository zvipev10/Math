import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // הנחה שרכיבים אלו קיימים
import { Label } from "@/components/ui/label"; // הנחה שרכיבים אלו קיימים
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Brain } from "lucide-react";

export default function DifficultySelector({ difficulty, onDifficultyChange }) {
  return (
    <div className="mb-8" dir="rtl">
      <h3 className="text-center mb-3 text-gray-600 font-medium">רמת קושי:</h3>
      <RadioGroup 
        value={difficulty} 
        onValueChange={onDifficultyChange}
        className="flex justify-center space-x-8 space-x-reverse" // space-x-reverse for RTL
      >
        <div className="flex flex-col items-center space-y-1">
          <RadioGroupItem value="easy" id="easy" className="sr-only peer" />
          <Label 
            htmlFor="easy" 
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-indigo-500 cursor-pointer transition-all"
          >
            <Baby className="mb-1 h-8 w-8 text-indigo-500" />
            קל
          </Label>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <RadioGroupItem value="hard" id="hard" className="sr-only peer" />
          <Label 
            htmlFor="hard" 
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-pink-600 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-pink-500 cursor-pointer transition-all"
          >
            <Brain className="mb-1 h-8 w-8 text-pink-500" />
            מאתגר
          </Label>
        </div>
      </RadioGroup>
      
      <div className="mt-4 text-center text-sm text-gray-500 min-h-[20px]"> {/* min-h to prevent layout shift */}
        <AnimatePresence mode="wait">
          {difficulty === "easy" ? (
            <motion.p
              key="easy-desc"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              ללא צורך בהעברה/השאלת ספרה בין עשרות לאחדות
            </motion.p>
          ) : (
            <motion.p
              key="hard-desc"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              עם צורך בהעברה/השאלת ספרה בין עשרות לאחדות
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
