'use client';

import React, { useState } from 'react';

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestBody?: string;
  response?: string;
  notes?: string;
}

export const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  method,
  path,
  description,
  requestBody,
  response,
  notes,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const methodColors = {
    GET: 'bg-blue-500',
    POST: 'bg-green-500',
    PUT: 'bg-yellow-500',
    DELETE: 'bg-red-500',
  };

  return (
    <div className="border border-dark-border rounded-lg overflow-hidden mb-4">
      <div
        className="flex items-center p-4 cursor-pointer hover:bg-dark-surface transition-colors"
        onClick={() => setShowDetails(!showDetails)}
      >
        <span
          className={`${methodColors[method]} text-white px-3 py-1 rounded text-sm font-bold mr-4`}
        >
          {method}
        </span>
        <code className="text-crypto-primary font-mono flex-1">{path}</code>
        <svg
          className={`w-5 h-5 text-dark-textMuted transition-transform ${
            showDetails ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {showDetails && (
        <div className="border-t border-dark-border p-4 bg-dark-surface">
          <p className="text-dark-text mb-4">{description}</p>

          {requestBody && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-dark-text mb-2">
                Request Body
              </h4>
              <pre className="bg-dark-bg p-3 rounded overflow-x-auto text-sm">
                <code className="text-crypto-secondary">{requestBody}</code>
              </pre>
            </div>
          )}

          {response && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-dark-text mb-2">
                Response Example
              </h4>
              <pre className="bg-dark-bg p-3 rounded overflow-x-auto text-sm">
                <code className="text-crypto-secondary">{response}</code>
              </pre>
            </div>
          )}

          {notes && (
            <div className="mt-4 p-3 bg-crypto-primary bg-opacity-10 border border-crypto-primary rounded">
              <p className="text-sm text-dark-text">
                <span className="font-semibold">Note:</span> {notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
