export const Form = ({ className = '', onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={`space-y-6 ${className}`}>
        {children}
      </div>
    </form>
  );
};