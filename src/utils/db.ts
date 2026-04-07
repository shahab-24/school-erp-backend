// // // // src/utils/db.ts
// // // import mongoose from "mongoose";

// // // const MONGODB_URI = process.env.MONGO_URI as string;

// // // if (!MONGODB_URI) {
// // //   throw new Error("Please define MONGODB_URI environment variable");
// // // }

// // // // ✅ Global cache for serverless
// // // declare global {
// // //   var mongooseCache: {
// // //     conn: typeof mongoose | null;
// // //     promise: Promise<typeof mongoose> | null;
// // //   };
// // // }

// // // let cached = global.mongooseCache;

// // // if (!cached) {
// // //   cached = global.mongooseCache = { conn: null, promise: null };
// // // }

// // // async function connectDB() {
// // //   // If connection exists, return it
// // //   if (cached.conn) {
// // //     console.log("✅ Using cached MongoDB connection");
// // //     return cached.conn;
// // //   }

// // //   // If no connection promise exists, create one
// // //   if (!cached.promise) {
// // //     const opts = {
// // //       bufferCommands: false,
// // //       maxPoolSize: 5,
// // //       serverSelectionTimeoutMS: 5000,
// // //       socketTimeoutMS: 30000,
// // //     };

// // //     console.log("🔄 Creating new MongoDB connection...");

// // //     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
// // //       console.log("✅ MongoDB connected");
// // //       return mongoose;
// // //     });
// // //   }

// // //   // Wait for connection
// // //   try {
// // //     cached.conn = await cached.promise;
// // //   } catch (e) {
// // //     cached.promise = null;
// // //     throw e;
// // //   }

// // //   return cached.conn;
// // // }

// // // export default connectDB;
// // // src/utils/db.ts - অপ্টিমাইজড ভার্সন
// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGO_URI as string;

// // if (!MONGODB_URI) {
// //   throw new Error("Please define MONGODB_URI environment variable");
// // }

// // // ✅ Global cache for serverless
// // declare global {
// //   var mongooseCache: {
// //     conn: typeof mongoose | null;
// //     promise: Promise<typeof mongoose> | null;
// //   };
// // }

// // let cached = global.mongooseCache;

// // if (!cached) {
// //   cached = global.mongooseCache = { conn: null, promise: null };
// // }

// // async function connectDB() {
// //   if (cached.conn) {
// //     console.log("✅ Using cached MongoDB connection");
// //     return cached.conn;
// //   }

// //   if (!cached.promise) {
// //     console.log("🔄 Connecting to MongoDB Atlas...");

// //     // ✅ বর্ধিত timeout সহ অপশন
// //     const opts = {
// //       bufferCommands: false,
// //       maxPoolSize: 10,
// //       minPoolSize: 5,
// //       serverSelectionTimeoutMS: 30000, // 30 সেকেন্ড (ডিফল্ট ৫ থেকে বাড়ানো)
// //       socketTimeoutMS: 60000,           // 60 সেকেন্ড
// //       connectTimeoutMS: 30000,          // 30 সেকেন্ড
// //       family: 4,                        // IPv4 ফোর্স করুন
// //       retryWrites: true,
// //       retryReads: true,
// //       heartbeatFrequencyMS: 30000,
// //     };

// //     cached.promise = mongoose
// //       .connect(MONGODB_URI, opts)
// //       .then((mongoose) => {
// //         console.log("✅ MongoDB connected successfully");
        
// //         mongoose.connection.on("error", (err) => {
// //           console.error("❌ MongoDB connection error:", err);
// //         });

// //         mongoose.connection.on("disconnected", () => {
// //           console.log("⚠️ MongoDB disconnected");
// //         });

// //         return mongoose;
// //       })
// //       .catch((error) => {
// //         console.error("❌ MongoDB connection failed:", error.message);
// //         cached.promise = null;
// //         throw error;
// //       });
// //   }

// //   try {
// //     cached.conn = await cached.promise;
// //   } catch (e) {
// //     cached.promise = null;
// //     throw e;
// //   }

// //   return cached.conn;
// // }

// // export default connectDB;// src/utils/db.ts
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGO_URI as string;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGO_URI environment variable");
// }

// // ✅ Global cache for serverless
// declare global {
//   var mongooseCache: {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   };
// }

// let cached = global.mongooseCache;

// if (!cached) {
//   cached = global.mongooseCache = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     console.log("✅ Using cached MongoDB connection");
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       maxPoolSize: 5,
//       serverSelectionTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//       family: 4,
//       retryWrites: true,
//     };

//     console.log("🔄 Creating new MongoDB connection...");
//     cached.promise = mongoose
//       .connect(MONGODB_URI, opts)
//       .then((mongoose) => {
//         console.log("✅ MongoDB connected successfully");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("❌ MongoDB connection error:", err);
//         cached.promise = null;
//         throw err;
//       });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default connectDB;import mongoose from "mongoose";
import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI!, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}