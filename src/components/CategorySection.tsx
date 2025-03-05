export const CategorySection = ({
  title,
  items,
  timers,
  colorClass,
  onItemClick,
}: {
  title: string;
  items: string[];
  timers: { [key: string]: number };
  colorClass: string;
  onItemClick: (item: string) => void;
}) => (
  <div className="space-y-2">
    <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b dark:border-gray-700">
      {title}
    </h2>
    {items.map((item) => (
      <div
        key={item}
        onClick={() => onItemClick(item)}
        className={`group p-2.5 rounded-md shadow-sm hover:shadow dark:shadow-gray-700/30 transition-all duration-200 cursor-pointer flex justify-between items-center border ${colorClass}`}
      >
        <span>{item}</span>
        <span className="text-xs">{timers[item]}s</span>
      </div>
    ))}
  </div>
);
