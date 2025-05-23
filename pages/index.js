import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"; // ודא ש-ui/card קיים ומיוצא נכון
import { MathProgress } from "@/entities/MathProgress"; // ודא שהנתיב והייצוא נכונים
// import { User } from "@/entities/User"; // User לא בשימוש כרגע

import MathProblem from "@/components/MathProblem";
import CategorySelector from "@/components/CategorySelector";
import DifficultySelector from "@/components/DifficultySelector";
import ProgressTracker from "@/components/ProgressTracker";
import CelebrationModal from "@/components/CelebrationModal";
import { AnimatePresence, motion } from "framer-motion";


export default function HomePage() {
  const [operation, setOperation] = useState("addition");
  const [difficulty, setDifficulty] = useState("easy");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0); // סך כל התרגילים שניסו לפתור בסשן הנוכחי
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    // איפוס התשובות הנכונות הרצופות בעת החלפת סוג התרגיל או רמת הקושי
    setCorrectAnswers(0);
  }, [operation, difficulty]);

  const handleCorrectAnswer = () => {
    const newCorrectCount = correctAnswers + 1;
    setCorrectAnswers(newCorrectCount);
    setTotalSolved(prev => prev + 1);
    
    if (newCorrectCount >= 5) {
      saveMathProgress(newCorrectCount, totalSolved + 1); // מעבירים את הספירה המעודכנת
      setShowCelebration(true);
    }
  };

  const handleResetProblem = () => {
    // נקרא כאשר המשתמש מבקש שאלה חדשה לאחר טעות או דילוג
    // או כאשר MathProblem קורא ל-onReset
    setTotalSolved(prev => prev + 1);
    setCorrectAnswers(0); // איפוס הרצף
    // MathProblem יצור בעיה חדשה בעצמו או דרך useEffect
  };

  const saveMathProgress = async (currentCorrectAnswers, currentTotalSolved) => {
    try {
      // כאן יכולה להיות לוגיקה לשמור את ההתקדמות
      // למשל, ב-localStorage או לשלוח לשרת
      console.log("Saving progress (simulated):", {
        operation,
        difficulty,
        correct_answers: currentCorrectAnswers,
        total_solved: currentTotalSolved, // סך כל התרגילים שניסו לפתור
        date: new Date().toISOString()
      });
      // אם אתה משתמש ב-MathProgress.create:
      await MathProgress.create({
        operation,
        difficulty,
        correct_answers: currentCorrectAnswers,
        total_solved: currentTotalSolved,
        date: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleContinueAfterCelebration = () => {
    setShowCelebration(false);
    setCorrectAnswers(0); // איפוס הרצף להתחלה חדשה של 5
    // totalSolved ממשיך לצבור
  };

  return (
    <div>
      <CategorySelector 
        activeCategory={operation} 
        onCategoryChange={(newOperation) => {
          setOperation(newOperation);
          // setCorrectAnswers(0); // כבר מטופל ב-useEffect
        }} 
      />
      
      <DifficultySelector 
        difficulty={difficulty}
        onDifficultyChange={(newDifficulty) => {
          setDifficulty(newDifficulty);
          // setCorrectAnswers(0); // כבר מטופל ב-useEffect
        }}
      />
      
      <ProgressTracker 
        correctAnswers={correctAnswers} 
        totalNeeded={5} // היעד להצגת מודל החגיגה
      />
      
      {/* ה-key כאן גורם לרכיב MathProblem להיות מרונדר מחדש (unmount and mount)
        כאשר operation או difficulty משתנים. זה מאפס את ה-state הפנימי שלו
        ומריץ את ה-useEffect שלו מחדש, מה שמייצר בעיה חדשה.
      */}
      <MathProblem
        key={`${operation}-${difficulty}-problem`} // מפתח ייחודי חיוני לאיפוס הרכיב
        operation={operation}
        difficulty={difficulty}
        onCorrectAnswer={handleCorrectAnswer}
        onReset={handleResetProblem} 
      />
      
      <Card className="mt-8 border-indigo-100 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-gray-700">
            <h3 className="font-bold mb-2 text-lg">טיפים לפתרון:</h3>
            {operation === "addition" ? (
              difficulty === "easy" ? (
                <ul className="list-disc list-inside space-y-1">
                  <li>חבר את הספרות אחת לשנייה</li>
                  <li>כדאי להתחיל עם המספר הגדול ולהוסיף אליו את הקטן</li>
                  <li>אפשר להיעזר באצבעות</li>
                </ul>
              ) : ( // addition hard
                <ul className="list-disc list-inside space-y-1">
                  <li>חבר קודם את ספרות היחידות</li>
                  <li>אם התוצאה גדולה מ-9, זכור להעביר את העשרת לספרת העשרות</li>
                  <li>אחר כך חבר את ספרות העשרות</li>
                </ul>
              )
            ) : ( // subtraction
              difficulty === "easy" ? (
                <ul className="list-disc list-inside space-y-1">
                  <li>החסר את המספר הקטן מהמספר הגדול</li>
                  <li>זכור: תמיד אפשר לבדוק את התשובה על ידי חיבור התוצאה עם המספר שהחסרנו</li>
                </ul>
              ) : ( // subtraction hard
                <ul className="list-disc list-inside space-y-1">
                  <li>אם ספרת היחידות במספר העליון קטנה מהתחתון, צריך "לשאול" עשרת</li>
                  <li>לוקחים 1 מספרת העשרות ומוסיפים 10 לספרת היחידות</li>
                  <li>עכשיו אפשר לחסר את היחידות ואז את העשרות</li>
                </ul>
              )
            )}
          </div>
        </CardContent>
      </Card>
      
      <CelebrationModal 
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)} // מאפשר סגירה של המודל גם ללא לחיצה על הכפתור
        onContinue={handleContinueAfterCelebration}
      />
    </div>
  );
}
