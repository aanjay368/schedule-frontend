function Wrapper({ children, className = ""}) {
  return (
    <div className={`relative overflow-hidden transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;