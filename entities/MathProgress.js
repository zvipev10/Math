// entities/MathProgress.js

// זוהי הגדרה פשטנית מאוד, רק כדי שהקוד ירוץ.
// במערכת אמיתית, תרצה משהו חזק יותר, אולי עם אימות וכו'.

const MATH_PROGRESS_KEY = 'mathPracticeAppProgress'; // מפתח ייחודי לאפליקציה

export const MathProgress = {
  create: async (progressData) => {
    try {
      const existingProgress = JSON.parse(localStorage.getItem(MATH_PROGRESS_KEY) || '[]');
      existingProgress.push(progressData);
      localStorage.setItem(MATH_PROGRESS_KEY, JSON.stringify(existingProgress));
      console.log("Progress saved to localStorage:", progressData);
      return progressData; // מחזירים את האובייקט שנשמר
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
      // במקרה של שגיאה, אולי כדאי לא לזרוק אותה כדי לא לשבור את האפליקציה,
      // אלא רק לרשום אותה לקונסול. תלוי בדרישות.
      // throw error; 
      return null;
    }
  },

  getAll: async () => {
    try {
      return JSON.parse(localStorage.getItem(MATH_PROGRESS_KEY) || '[]');
    } catch (error) {
      console.error("Failed to get progress from localStorage", error);
      return [];
    }
  }
  // כאן תוכל להוסיף פונקציות נוספות כמו getByUser, update, delete וכו'.
};

// אין צורך ב-User entity כרגע לפי הקוד שסופק
// export const User = { /* ... */ };
