const DetailHeader = ({color, children}) => {
    return (
  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
    <span className={`h-2 w-2 rounded-full ${color}`}></span>
    {children}
  </h2>
)};
export default DetailHeader;
