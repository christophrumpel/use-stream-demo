import React from 'react';
import { useStream } from '@laravel/stream-react';

export function UseStreamDemo() {
    const { data: streamData, send: send } = useStream('api/text-stream');

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">useStream Hook Approach</h2>
            
            <button
                onClick={() => send({})}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
                Start Real-time Stream
            </button>

            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg min-h-32">
                <h3 className="font-medium text-gray-300 mb-3">Output (streams in real-time):</h3>
                <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {streamData || <span className="text-gray-500 italic">Click button to start streaming...</span>}
                    {streamData && streamData.length > 0 && streamData.slice(-1) !== ' ' && (
                        <span className="animate-pulse text-green-400">|</span>
                    )}
                </div>
            </div>
        </div>
    );
}
