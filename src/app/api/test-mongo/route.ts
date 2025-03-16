import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  let connection: typeof mongoose | null = null;
  
  try {
    // Get the URI
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return NextResponse.json({ 
        success: false, 
        message: 'MONGODB_URI not defined in environment variables' 
      }, { status: 500 });
    }
    
    // Set timeouts
    const options = {
      connectTimeoutMS: 20000,
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
      family: 4, // Force IPv4
    };
    
    // Clear any existing connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    // Attempt connection
    console.log('API: Testing MongoDB connection...');
    const startTime = Date.now();
    
    connection = await mongoose.connect(uri, options);
    
    const connectionTime = Date.now() - startTime;
    const readyState = mongoose.connection.readyState;
    
    // Check connection
    if (readyState === 1) {
      console.log('API: MongoDB connected successfully');
      
      // Get database info
      const dbList = await mongoose.connection.db.admin().listDatabases();
      const collections = await mongoose.connection.db.listCollections().toArray();
      
      return NextResponse.json({
        success: true,
        message: 'Connection successful',
        diagnostics: {
          connectionTime: `${connectionTime}ms`,
          readyState,
          dbName: mongoose.connection.name,
          host: mongoose.connection.host,
          databases: dbList.databases.map((db: any) => db.name),
          collections: collections.map(c => c.name),
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Connection in unexpected state: ${readyState}`,
        readyState
      }, { status: 500 });
    }
  } catch (error) {
    console.error('API: MongoDB connection test error:', error);
    
    // Extract useful error data
    let errorMessage = 'Unknown error';
    let errorDetails = null;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Parse more details from common MongoDB errors
      if (errorMessage.includes('ENOTFOUND')) {
        errorDetails = 'Hostname not found - DNS resolution failed';
      } else if (errorMessage.includes('ETIMEDOUT')) {
        errorDetails = 'Connection timed out - check network or firewall';
      } else if (errorMessage.includes('Authentication failed')) {
        errorDetails = 'Username or password incorrect';
      } else if (errorMessage.includes('timed out')) {
        errorDetails = 'Server selection timed out - check if cluster is running';
      } else if (errorMessage.includes('IP address is not whitelisted')) {
        errorDetails = 'Your IP address needs to be added to MongoDB Atlas whitelist';
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'Connection failed',
      error: errorMessage,
      details: errorDetails
    }, { status: 500 });
  } finally {
    // Clean up connection if it was established
    if (connection && mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
} 