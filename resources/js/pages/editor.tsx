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
        <div className="min-h-screen bg-gray-950">
            <div className="py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-white mb-8">Live Code Translator</h1>

                            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                                {/* Source Editor */}
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-white mb-4">PHP Code</h2>
                                    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                                        <div className="h-64">
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
                                </div>

                                {/* Language Selector */}
                                <div className="flex lg:flex-col items-center justify-center lg:justify-start gap-4">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400 mb-2">Translate to</div>
                                        <select
                                            value={targetLang}
                                            onChange={(e) => setTargetLang(e.target.value as Language)}
                                            className="bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-4 focus:border-gray-500 focus:outline-none"
                                        >
                                            <option value="python">Python</option>
                                            <option value="typescript">TypeScript</option>
                                            <option value="ruby">Ruby</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Target Editor */}
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-white mb-4">Translated {targetLang.charAt(0).toUpperCase() + targetLang.slice(1)}</h2>
                                    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                                        <div className="h-64">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
