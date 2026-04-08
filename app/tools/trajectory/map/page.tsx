"use client";

import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { TrajectoryView } from "@/components/trajectory/trajectory-view";

export default function TrajectoryMapPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col">
        <div className="min-h-0 flex-1">
          <TrajectoryView
            onClose={() => router.back()}
            closeLabel="Back"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
