// resources/js/Pages/CodeEditor.tsx
import { useState } from 'react'
import Editor from "@monaco-editor/react"

export default function CodeEditor() {
    const [code, setCode] = useState<string>("<?php\n\n// Start typing your PHP code here...")

    // Configure Monaco editor before it loads
    function handleEditorWillMount(monaco: typeof import('monaco-editor')): void {
        // PHP Language Configuration
        monaco.languages.setLanguageConfiguration('php', {});
    }

    // Handle editor change with proper typing
    function handleEditorChange(value: string | undefined): void {
        if (value !== undefined) {
            setCode(value);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                        PHP Smart Code Editor
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Write PHP code with intelligent suggestions
                    </p>
                </div>

                <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="h-[600px]">
                        <Editor
                            height="100%"
                            defaultLanguage="php"
                            theme="vs-dark"
                            value={code}
                            onChange={handleEditorChange}
                            beforeMount={handleEditorWillMount}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                                tabSize: 4,
                                insertSpaces: true,
                                formatOnPaste: true,
                                formatOnType: true,
                                autoIndent: 'full',
                                snippetSuggestions: 'inline',
                                suggest: {
                                    showClasses: true,
                                    showFunctions: true,
                                    showConstructors: true,
                                    showDeprecated: false,
                                    matchOnWordStartOnly: false,
                                },
                                quickSuggestions: {
                                    other: true,
                                    comments: true,
                                    strings: true
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Status bar */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            PHP
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Ready for suggestions</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
