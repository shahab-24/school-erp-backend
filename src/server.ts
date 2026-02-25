// src/server.ts
import app from "./app";
import connectDB from "./utils/db"; // শুধু একটি ফাংশন
import { Logger } from "./utils/logger";

// লোকাল ডেভেলপমেন্টে চালান
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  async function startServer() {
    try {
      await connectDB();
      app.listen(PORT, () => {
        Logger.info(`🚀 Server running on http://localhost:${PORT}`);
      });
    } catch (err) {
      Logger.error("❌ Failed to start server:", err);
      process.exit(1);
    }
  }

  startServer();
}

export default app; // Vercel এর জন্য export
