import React from "react";
import { Button } from "@/components/ui/button"; // הנחה שרכיבים אלו קיימים
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // הנחה שרכיבים אלו קיימים
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function CelebrationModal({ isOpen, onClose, onContinue }) {
  const successMessages = [
    "כל הכבוד! סיימת את התרגול בהצלחה!",
    "מעולה! השלמת 5 תשובות נכונות ברצף!",
    "וואו! אתה ממש אלוף/ה בחשבון!",
    "מדהים! המשך/י כך!",
    "יופי! את/ה ממש טוב/ה בחשבון!"
  ];
  
  // בחירת הודעה אקראית מהמערך - חשוב למקם מחוץ ל-return כדי שלא תשתנה בכל רינדור מחדש של המודל
  const [randomMessage, setRandomMessage] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setRandomMessage(successMessages[Math.floor(Math.random() * successMessages.length)]);
    }
  }, [isOpen]); // רק כאשר המודל נפתח מחדש

  if (!isOpen) return null; // לא לרנדר כלום אם המודל סגור

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {randomMessage}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-8 flex justify-center items-center h-40"> {/* גובה קבוע לאזור האנימציה */}
          <div className="relative w-20 h-20"> {/* מיכל יחסי לאנימציית הכוכבים */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 1],
                  rotate: Math.random() * 60 - 30 // סיבוב אקראי קטן
                }}
                transition={{ 
                  delay: i * 0.15,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100
                }}
                className="absolute"
                style={{ 
                  // פיזור הכוכבים בצורה מעגלית יותר
                  top: `calc(50% + ${Math.sin((i / 5) * 2 * Math.PI) * 40}px - 32px)`, // 32px is half of star size
                  left: `calc(50% + ${Math.cos((i / 5) * 2 * Math.PI) * 40}px - 32px)`,
                }}
              >
                <Star className={`w-16 h-16 fill-current ${
                  ['text-yellow-400', 'text-indigo-500', 'text-pink-500', 'text-green-500', 'text-purple-500'][i % 5]
                }`} />
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                y: [0, -8, 0] // אנימציית ריחוף עדינה יותר
              }}
              transition={{ 
                delay: 0.8, // לאחר הופעת הכוכבים
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror" // "mirror" for smoother loop
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-center"
            >
              🏆
            </motion.div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onContinue}
            className="bg-indigo-600 hover:bg-indigo-700 text-lg w-full"
          >
            המשך לתרגל
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
