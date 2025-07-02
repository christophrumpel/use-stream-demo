import React from 'react';
import { Head } from '@inertiajs/react';
import { BasicFetchDemo } from '@/components/BasicFetchDemo';
import { UseStreamDemo } from '@/components/UseStreamDemo';

export default function StreamingComparisonDemo() {

    return (
        <div className="min-h-screen bg-gray-950">
            <Head title="Streaming Comparison Demo" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-white mb-8">Streaming Comparison Demo</h1>

                            <div className="space-y-8">
                                <BasicFetchDemo />
                                <UseStreamDemo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
