import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // הנחה שרכיבים אלו קיימים
import { motion } from "framer-motion";

export default function CategorySelector({ activeCategory, onCategoryChange }) {
  return (
    <div className="mb-8">
      <Tabs 
        defaultValue={activeCategory} 
        onValueChange={onCategoryChange}
        className="w-full"
        dir="rtl"
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto h-14">
          <TabsTrigger 
            value="addition" 
            className="text-lg font-medium rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white relative overflow-hidden"
          >
            {activeCategory === "addition" && (
              <motion.div
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-indigo-600 -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
              />
            )}
            חיבור
          </TabsTrigger>
          <TabsTrigger 
            value="subtraction" 
            className="text-lg font-medium rounded-lg data-[state=active]:bg-pink-600 data-[state=active]:text-white relative overflow-hidden"
          >
            {activeCategory === "subtraction" && (
              <motion.div
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-pink-600 -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
              />
            )}
            חיסור
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
