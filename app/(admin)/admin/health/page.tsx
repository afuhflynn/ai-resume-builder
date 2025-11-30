"use client";

import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";

const AdminHealthCheckPage = () => {
  const [healthData, setHealthData] = useState<{
    uptime: number | null;
    memoryUsage: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
      external: number;
    } | null;
  }>({
    uptime: null,
    memoryUsage: null,
  });
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture("admin_health_check_viewed");

    const fetchHealthData = async () => {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHealthData(data);
      } catch (error) {
        console.error("Could not fetch health data:", error);
      }
    };

    fetchHealthData();

    // Set interval to refresh data every 5 seconds
    const intervalId = setInterval(fetchHealthData, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [posthog]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Health Check</h1>
      {healthData.uptime !== null ? (
        <p>
          <strong>Uptime:</strong> {healthData.uptime} seconds
        </p>
      ) : (
        <p>Loading uptime...</p>
      )}
      {healthData.memoryUsage ? (
        <>
          <p>
            <strong>Memory Usage:</strong>
          </p>
          <p>RSS: {healthData.memoryUsage.rss} bytes</p>
          <p>Heap Total: {healthData.memoryUsage.heapTotal} bytes</p>
          <p>Heap Used: {healthData.memoryUsage.heapUsed} bytes</p>
          <p>External: {healthData.memoryUsage.external} bytes</p>
        </>
      ) : (
        <p>Loading memory usage...</p>
      )}
    </div>
  );
};

export default AdminHealthCheckPage;
