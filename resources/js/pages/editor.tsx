import { useStream } from '@laravel/stream-react';
import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

type Language = 'python' | 'typescript' | 'ruby';

export default function CodeEditor() {
    const [sourceCode, setSourceCode] = useState<string>('<?php\n\nfunction welcome($name) {\n    return "Hello, " . $name;\n}');
    const [targetLang, setTargetLang] = useState<Language>('python');
    const { data, send } = useStream('stream');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (sourceCode.length > 5) {
                send({ code: sourceCode, targetLang });
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [sourceCode, targetLang, send]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Live Code Translator</h1>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Write PHP code, see it translated in real-time</p>

                <div className="mt-12 flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
                    {/* Source Editor */}
                    <div className="w-full overflow-hidden rounded-3xl bg-[#1E1E1E] shadow-2xl md:w-1/2">
                        <div className="h-[200px]">
                            {' '}
                            {/* Reduced height */}
                            <Editor
                                height="100%"
                                defaultLanguage="php"
                                theme="vs-dark"
                                value={sourceCode}
                                onChange={(value) => value && setSourceCode(value)}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    padding: { top: 16, bottom: 16 },
                                    tabSize: 4,
                                }}
                            />
                        </div>
                    </div>

                    {/* Language Selector */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="relative">
                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value as Language)}
                                className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pr-10 pl-4 text-base shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                style={{ minWidth: '120px' }}
                            >
                                <option value="python">Python</option>
                                <option value="typescript">TypeScript</option>
                                <option value="ruby">Ruby</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Target Editor */}
                    <div className="w-full overflow-hidden rounded-3xl bg-[#1E1E1E] shadow-2xl md:w-1/2">
                        <div className="h-[200px]">
                            {' '}
                            {/* Reduced height */}
                            <Editor
                                height="100%"
                                defaultLanguage={targetLang}
                                theme="vs-dark"
                                value={data || `# Translated ${targetLang} code will appear here...`}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    padding: { top: 16, bottom: 16 },
                                    tabSize: 4,
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
