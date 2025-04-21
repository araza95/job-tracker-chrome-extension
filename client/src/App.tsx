// src/App.tsx
import React from "react";

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="w-[400px] h-[500px] p-4 bg-white">
      <h1 className="text-xl font-bold text-blue-600">
        Job Application Tracker
      </h1>

      <div className="mt-4 p-4 border rounded-lg">
        <p className="text-gray-600">Test Counter: {count}</p>

        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setCount((c) => c + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;
