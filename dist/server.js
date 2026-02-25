"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./utils/db")); // শুধু একটি ফাংশন
const logger_1 = require("./utils/logger");
// লোকাল ডেভেলপমেন্টে চালান
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    async function startServer() {
        try {
            await (0, db_1.default)();
            app_1.default.listen(PORT, () => {
                logger_1.Logger.info(`🚀 Server running on http://localhost:${PORT}`);
            });
        }
        catch (err) {
            logger_1.Logger.error("❌ Failed to start server:", err);
            process.exit(1);
        }
    }
    startServer();
}
exports.default = app_1.default; // Vercel এর জন্য export
//# sourceMappingURL=server.js.map