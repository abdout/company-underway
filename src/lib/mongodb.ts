import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
  try {
    // Check if we already have a connection
    if (cachedConnection) {
      console.log("Using cached database connection");
      return cachedConnection;
    }

    // Get MongoDB URI from environment variables
    const uri = process.env.MONGODB_URI;
    console.log("MongoDB connection: Checking URI availability");
    
    if (!uri) {
      console.error("MONGODB_URI environment variable is not defined!");
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    // Log a masked version of the URI for debugging
    const maskedUri = uri.replace(/:([^@]*)@/, ':******@');
    console.log(`MongoDB connection: Attempting to connect to ${maskedUri}`);

    // Set timeout for connection
    const connectTimeoutMS = 30000; // 30 seconds
    
    // Configure mongoose options
    const options = {
      connectTimeoutMS,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 60000,
      family: 4, // Use IPv4, skip trying IPv6
    } as mongoose.ConnectOptions;

    console.log("MongoDB connection: Options set, connecting with timeout:", connectTimeoutMS);

    // Disconnect if already connected
    if (mongoose.connection.readyState !== 0) {
      console.log("MongoDB connection: Disconnecting existing connection");
      await mongoose.disconnect();
    }

    // Connect with timeout
    const connectionPromise = mongoose.connect(uri, options);
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Connection timeout after ${connectTimeoutMS}ms`));
      }, connectTimeoutMS);
    });
    
    // Race the connection against timeout
    const connection = await Promise.race([connectionPromise, timeoutPromise]) as typeof mongoose;
    
    console.log("MongoDB connection: Successfully connected to database");
    console.log("MongoDB connection: Connection state:", mongoose.connection.readyState);
    
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    
    // Try to provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND')) {
        console.error("MongoDB hostname not found. Check your connection string's domain.");
      } else if (error.message.includes('ETIMEDOUT')) {
        console.error("MongoDB connection timed out. Check your network or firewall settings.");
      } else if (error.message.includes('Authentication failed')) {
        console.error("MongoDB authentication failed. Check your username and password.");
      } else if (error.message.includes('timed out')) {
        console.error("MongoDB server selection timed out. The server might be down or not reachable.");
      }
    }
    
    throw error;
  }
};

export default connectDB;