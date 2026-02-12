const classVariants = {
  base: "hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:rounded-md",
  active: "bg-gray-100 dark:bg-gray-100/10 rounded-md",
};
export const Action = ({ onClick, children, variant = "base" }) => {
  return (
    <div
      className={`flex p-1 flex-col items cursor-pointer ${classVariants[variant]}`}
      onClick={onClick}
    >
      <div className="flex w-full">
        <div className="w-full flex items-center gap-2">{children}</div>
      </div>
      <div className="h-1 border-b-1 border-gray-200 dark:border-gray-800 p-1 mx-12"></div>
    </div>
  );
};
