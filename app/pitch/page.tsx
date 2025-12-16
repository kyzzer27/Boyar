import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Image from "next/image";

export default function PitchPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pitch</h1>
          <p className="text-slate-600">
            Pitch deck slides, key market summary, business highlights, and mission statement.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Pitch Deck
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-red-600 font-semibold">PDF</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Pitch Deck</p>
                  <p className="text-sm text-slate-600">Main presentation</p>
                </div>
              </div>
              <a
                href="/pitch-deck.pdf"
                download
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Download
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Market Summary
            </h2>
            <p className="text-slate-600">
              Key market insights and analysis will be displayed here.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Business Highlights
            </h2>
            <p className="text-slate-600">
              Key business achievements and milestones will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

