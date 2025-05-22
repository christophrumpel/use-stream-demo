// resources/js/Pages/CodeEditor.jsx
import { useState } from 'react'
import Editor from "@monaco-editor/react"

export default function CodeEditor() {
    const [code, setCode] = useState("// Start typing your code here...")

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                        Smart Code Editor
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Type your code below to get real-time AI suggestions
                    </p>
                </div>

                {/* Editor Container */}
                <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="h-[600px]"> {/* Fixed height for editor */}
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value)}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                            }}
                        />
                    </div>
                </div>

                {/* Footer/Status Area */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div>
                        Ready for suggestions
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Connected</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
