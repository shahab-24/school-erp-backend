// api/index.ts
import app from "../src/app";

// Vercel handler
export default async function handler(req: any, res: any) {
  // Vercel environment check
  if (process.env.VERCEL) {
    console.log("🚀 Running on Vercel");
  }

  return app(req, res);
}
