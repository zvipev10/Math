import React from "react";

export default function Layout({ children }) {
  return (
    // הרקע הגלובלי מוגדר עכשיו ב-globals.css דרך body
    // dir="rtl" יכול להיות מוגדר ברמה גבוהה יותר, או להישאר כאן אם זה הכרחי ספציפית לפריסה זו
    <div className="min-h-screen" dir="rtl"> 
      <header className="py-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700">
          תרגול חשבון <span className="text-pink-600">לילדים</span>
        </h1>
        <p className="text-center text-gray-600 mt-2">
          למד חיבור וחיסור בדרך מהנה ואינטראקטיבית
        </p>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {children}
      </main>
      
      <footer className="text-center text-gray-500 py-4 text-sm">
        <p>נבנה במיוחד עבור ילדים שאוהבים מתמטיקה</p>
        {/* אפשר להוסיף כאן קרדיט או שנה */}
      </footer>
    </div>
  );
}
