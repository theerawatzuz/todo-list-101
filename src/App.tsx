import { useDarkMode } from "./hooks/useDarkMode";
import { useItemTimer } from "./hooks/useItemTimer";
import { useItemManagement } from "./hooks/useItemManagement";
import { CategorySection } from "./components/CategorySection";
import { foodItems } from "./data/mocks/foodItems";
import { useEffect } from "react";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { timers, startTimer, clearTimer, timeoutsRef } = useItemTimer();
  const { items, vegetables, fruits, moveItem, returnItem } =
    useItemManagement();

  const handleMoveToCategory = (
    item: string,
    category: "vegetable" | "fruit"
  ) => {
    if (!items.includes(item)) return;

    moveItem(item, category);
    timeoutsRef.current[item] = startTimer(item);
  };

  const handleMoveBack = (item: string, category: "vegetable" | "fruit") => {
    clearTimer(item);
    returnItem(item, category);
  };

  useEffect(() => {
    Object.entries(timers).forEach(([item, time]) => {
      if (time === 0 && (vegetables.includes(item) || fruits.includes(item))) {
        const category = vegetables.includes(item) ? "vegetable" : "fruit";
        handleMoveBack(item, category);
      }
    });
  }, [timers, vegetables, fruits, handleMoveBack]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 md:p-6 relative max-w-6xl mx-auto h-full">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Items List */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b dark:border-gray-700">
              All Items
            </h2>
            {items.map((item) => {
              const foodItem = foodItems.find((f) => f.name === item);
              const isVegetable = foodItem?.type === "Vegetable";

              return (
                <button
                  key={item}
                  onClick={() =>
                    handleMoveToCategory(
                      item,
                      isVegetable ? "vegetable" : "fruit"
                    )
                  }
                  className="w-full p-2.5 text-left rounded-md shadow-sm hover:shadow dark:shadow-gray-700/30 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {item}
                </button>
              );
            })}
          </div>

          <CategorySection
            title="Vegetables"
            items={vegetables}
            timers={timers}
            colorClass="bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400"
            onItemClick={(item) => handleMoveBack(item, "vegetable")}
          />

          <CategorySection
            title="Fruits"
            items={fruits}
            timers={timers}
            colorClass="bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
            onItemClick={(item) => handleMoveBack(item, "fruit")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
