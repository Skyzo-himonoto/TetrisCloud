import { NextResponse } from 'next/server';
const ipCache = new Map<string, { count: number; lastReset: number }>();

const LIMIT = 30; // Maksimal 30 request
const WINDOW_MS = 60 * 1000; // per 1 menit

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRecord = ipCache.get(ip) || { count: 0, lastReset: now };

  if (now - userRecord.lastReset > WINDOW_MS) {
    userRecord.count = 1;
    userRecord.lastReset = now;
  } else {
    userRecord.count += 1;
  }

  ipCache.set(ip, userRecord);
  return userRecord.count <= LIMIT;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}
