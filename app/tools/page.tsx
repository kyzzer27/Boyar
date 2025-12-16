"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useRouter } from "next/navigation";

export default function ToolsPage() {
  const router = useRouter();

  const tools = [
    { name: "Conversion Metrics", route: "/client-acquisition/conversion-metrics" },
    { name: "Expenditure", route: "/tools/expenditure" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Tools</h1>
          <p className="text-slate-600">
            Access various tools and utilities for analysis and reporting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => router.push(tool.route)}
              className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                <span className="text-teal-600 font-semibold text-lg">
                  {tool.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-600">
                Click to access {tool.name.toLowerCase()}
              </p>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

