import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; // הנחה שרכיבים אלו קיימים
import { Input } from "@/components/ui/input";   // הנחה שרכיבים אלו קיימים
import { Card } from "@/components/ui/card";     // הנחה שרכיבים אלו קיימים
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MathProblem({
  operation,
  difficulty,
  onCorrectAnswer,
  onReset
}) {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [tensAnswer, setTensAnswer] = useState("");
  const [unitsAnswer, setUnitsAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const unitsInputRef = useRef(null);
  const tensInputRef = useRef(null);

  const generateNewProblem = () => {
    let a, b;
    let conditionMet = false;

    while (!conditionMet) {
      a = Math.floor(Math.random() * 90) + 10; // 10-99
      b = Math.floor(Math.random() * 90) + 10; // 10-99

      if (operation === "addition") {
        const sumTotal = a + b;
        const unitsSum = (a % 10) + (b % 10);
        if (sumTotal > 99) continue;

        if (difficulty === "easy") {
          conditionMet = unitsSum < 10;
        } else {
          conditionMet = unitsSum >= 10;
        }
      } else { // subtraction
        if (a < b) [a, b] = [b, a]; // Ensure a is always greater or equal
        const unitsA = a % 10;
        const unitsB = b % 10;

        if (difficulty === "easy") {
          conditionMet = unitsA >= unitsB;
        } else {
          conditionMet = unitsA < unitsB;
        }
      }
    }

    setFirstNumber(a);
    setSecondNumber(b);
    setTensAnswer("");
    setUnitsAnswer("");
    setIsCorrect(null);
    setShowFeedback(false);
    if (unitsInputRef.current) unitsInputRef.current.focus();
  };

  useEffect(() => {
    generateNewProblem();
  }, [operation, difficulty]);

  const calculateCorrectAnswer = () => {
    if (operation === "addition") {
      return firstNumber + secondNumber;
    } else {
      return firstNumber - secondNumber;
    }
  };

  const checkAnswer = () => {
    if (unitsAnswer === "" && tensAnswer === "") return;

    // parseInt יתעלם מ-'0' מוביל אם tensAnswer ריק, וזה בסדר.
    const userAnswer = parseInt(`${tensAnswer || '0'}${unitsAnswer || '0'}`, 10);
    const correctAnswer = calculateCorrectAnswer();
    const isAnswerCorrect = userAnswer === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      setTimeout(() => {
        onCorrectAnswer();
        // generateNewProblem(); // generateNewProblem נקרא כבר ב-onCorrectAnswer דרך HomePage
      }, 1500);
    }
  };

  const handleNextProblem = () => {
    // onReset נקרא אם התשובה הייתה שגויה או לא נבדקה
    // onCorrectAnswer נקרא אם התשובה הייתה נכונה
    // הפונקציות האלו מגיעות מ-HomePage ויטפלו ביצירת בעיה חדשה
    if (isCorrect === true) {
      onCorrectAnswer();
    } else { // null or false
      onReset();
      generateNewProblem(); // במקרה של איפוס, נייצר בעיה חדשה ישירות מכאן
    }
  };

  const handleKeyDown = (e, inputType) => {
    if (e.key === "Enter") {
      checkAnswer();
    } else if (e.key === "ArrowLeft" && inputType === 'units' && unitsInputRef.current && tensInputRef.current) {
      // If in UNITS (right visual) and press Left, go to TENS (left visual)
      tensInputRef.current.focus();
    } else if (e.key === "ArrowRight" && inputType === 'tens' && tensInputRef.current && unitsInputRef.current) {
      // If in TENS (left visual) and press Right, go to UNITS (right visual)
      unitsInputRef.current.focus();
    }
  };

  const handleUnitsChange = (e) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) { // Allow single digit or empty
      setUnitsAnswer(val);
      if (val && tensInputRef.current) { // If units has value, focus tens (which is visually to the left)
        tensInputRef.current.focus();
      }
    }
  };

  const handleTensChange = (e) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) { // Allow single digit or empty
      setTensAnswer(val);
    }
  };

  const operationSymbol = operation === "addition" ? "+" : "-";

  const firstTens = Math.floor(firstNumber / 10);
  const firstUnits = firstNumber % 10;
  const secondTens = Math.floor(secondNumber / 10);
  const secondUnits = secondNumber % 10;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${firstNumber}-${secondNumber}-${operation}-${difficulty}-problem`} // מפתח ייחודי
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 shadow-lg rounded-xl bg-white/80 backdrop-blur-sm border-2 border-indigo-100">
          <div className="flex justify-center mb-8">
            <div className="relative font-mono text-5xl" style={{ width: '180px' }}>
              {/* Numbers Display - Corrected Order for RTL Grid */}
              <div className="grid grid-cols-2 mb-2 text-center">
                <div className="text-center">{firstUnits}</div> {/* יוצג מימין ב-RTL */}
                <div className="text-center">{firstTens}</div>  {/* יוצג משמאל ב-RTL */}
              </div>

              <div className="grid grid-cols-2 mb-2 text-center">
                <div className="text-center">{secondUnits}</div> {/* יוצג מימין ב-RTL */}
                <div className="text-center">{secondTens}</div>  {/* יוצג משמאל ב-RTL */}
              </div>

              {/* Operation Symbol */}
              <div className="absolute left-[-30px] top-[calc(50%-25px-1rem)] transform -translate-y-1/2">
                 <span className="text-pink-600">{operationSymbol}</span>
              </div>

              {/* Line */}
              <div className="w-full h-1 bg-gray-700 my-3"></div>

              {/* Answer Inputs - Corrected Order for RTL Grid */}
              <div className="grid grid-cols-2 text-center relative">
                {/* Units Input (Item 1) will be on the right in RTL */}
                <Input
                  ref={unitsInputRef}
                  type="text"
                  value={unitsAnswer}
                  onChange={handleUnitsChange}
                  onKeyDown={(e) => handleKeyDown(e, 'units')}
                  className="w-16 h-16 text-4xl text-center font-bold bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none rounded-lg"
                  maxLength="1"
                  style={{ direction: 'ltr' }} // Keep LTR for individual digit input
                  autoFocus
                />
                {/* Tens Input (Item 2) will be on the left in RTL */}
                <Input
                  ref={tensInputRef}
                  type="text"
                  value={tensAnswer}
                  onChange={handleTensChange}
                  onKeyDown={(e) => handleKeyDown(e, 'tens')}
                  className="w-16 h-16 text-4xl text-center font-bold bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none rounded-lg"
                  maxLength="1"
                  style={{ direction: 'ltr' }} // Keep LTR for individual digit input
                />

                {/* Feedback Icon */}
                {showFeedback && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute left-[-40px] top-1/2 -translate-y-1/2 flex items-center"
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    ) : (
                      <XCircle className="w-10 h-10 text-red-500" />
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6 rtl">
            <Button
              onClick={checkAnswer}
              className="bg-indigo-600 hover:bg-indigo-700 text-lg px-6 py-2 h-12 rounded-full"
              disabled={showFeedback && isCorrect}
            >
              בדיקה
            </Button>
            
            <Button
              onClick={handleNextProblem}
              variant="outline"
              className="border-pink-500 text-pink-600 hover:bg-pink-50 hover:text-pink-700 text-lg px-6 py-2 h-12 rounded-full flex items-center"
            >
              <RefreshCw className="w-5 h-5 ml-2" />
              שאלה חדשה
            </Button>
          </div>

          {showFeedback && !isCorrect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center rtl"
            >
              <p className="text-gray-700">
                התשובה הנכונה היא: <span className="font-bold text-indigo-700">{calculateCorrectAnswer()}</span>
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
