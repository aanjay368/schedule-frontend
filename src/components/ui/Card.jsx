function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border-gray-200 bg-white shadow-sm dark:bg-slate-800 ${className}`}>
      {children}
    </div>
  );
};

export default Card;