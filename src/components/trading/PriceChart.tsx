'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ColorType, AreaSeries } from 'lightweight-charts';
import { getOHLCV } from '@/lib/codex';

interface Props {
  mint: string;
}

export default function PriceChart({ mint }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8B9BAE',
      },
      grid: {
        vertLines: { color: '#1E2736' },
        horzLines: { color: '#1E2736' },
      },
      timeScale: { timeVisible: true, secondsVisible: false },
      crosshair: { vertLine: { color: '#8B9BAE' }, horzLine: { color: '#8B9BAE' } },
    });

    const series = chart.addSeries(AreaSeries,{
      lineColor: '#22C55E',
      topColor: 'rgba(34, 197, 94, 0.4)',
      bottomColor: 'rgba(34, 197, 94, 0.0)',
      lineWidth: 2,
    });

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    async function loadData() {
      setLoading(true);
      try {
        const data = await getOHLCV(mint, '1D'); 
        if (data && data.length > 0) {
          const formatted = data.map((d: any) => ({
            time: d.timestamp,
            value: d.close,
          }));
          series.setData(formatted);
        }
      } catch (error) {
        console.error('Error loading chart data', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [mint]);

  return (
    <div className="w-full h-[400px] flex flex-col relative rounded-b-2xl" style={{ backgroundColor: 'var(--color-card)' }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0D0F14]/50 backdrop-blur-sm">
          <div className="animate-pulse font-mono text-sm" style={{ color: 'var(--color-green)' }}>Loading Chart...</div>
        </div>
      )}
      <div ref={chartContainerRef} className="flex-1 w-full" />
    </div>
  );
}