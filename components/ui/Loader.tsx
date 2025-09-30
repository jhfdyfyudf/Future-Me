
import React from 'react';

export const Loader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-500"></div>
      <p className="mt-4 text-xl font-semibold text-gray-700">{message}</p>
    </div>
  );
};
