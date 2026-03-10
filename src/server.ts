// src/server.ts
import app from "./app";
import connectDB from "./utils/db";
import { Logger } from "./utils/logger";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      Logger.info(`🚀 Server running on http://localhost:${PORT}`);
      Logger.info(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
      Logger.info(`🔄 Vercel: ${process.env.VERCEL ? "Yes" : "No"}`);
    });
  } catch (err) {
    Logger.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

// লোকাল ডেভেলপমেন্টে সার্ভার চালান
if (require.main === module) {
  startServer();
}

export default app;
