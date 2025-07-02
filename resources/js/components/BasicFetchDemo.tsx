import React, { useState } from 'react';

export function BasicFetchDemo() {
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchText = async () => {
        setIsLoading(true);
        setResponseText('');

        const response = await fetch('/api/text-stream', { method: 'POST' });
        const text = await response.text();

        setResponseText(text);
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Traditional Fetch Approach</h2>
            
            <button
                onClick={fetchText}
                disabled={isLoading}
                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
                {isLoading ? 'Loading...' : 'Fetch Text'}
            </button>

            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg min-h-32">
                <h3 className="font-medium text-gray-300 mb-3">Output (shows all at once when done):</h3>
                <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {isLoading ? (
                        <span className="text-gray-400 italic">Loading complete response...</span>
                    ) : (
                        responseText || <span className="text-gray-500 italic">Click button to start</span>
                    )}
                </div>
            </div>
        </div>
    );
}
