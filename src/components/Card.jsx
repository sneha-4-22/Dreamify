const Card = ({ children }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
  
  const CardHeader = ({ children }) => (
    <div className="p-4 border-b">
      {children}
    </div>
  );
  
  const CardTitle = ({ children }) => (
    <h2 className="text-lg font-semibold">
      {children}
    </h2>
  );
  
  const CardContent = ({ children }) => (
    <div className="p-4">
      {children}
    </div>
  );
  
  export { Card, CardHeader, CardTitle, CardContent };