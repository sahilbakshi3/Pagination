import React from 'react';

const PageLayout = ({ title, children, actions }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>
            {actions && <div>{actions}</div>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;