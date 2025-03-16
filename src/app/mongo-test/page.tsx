'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import mongoose from 'mongoose';

export default function MongoTestPage() {
  const [status, setStatus] = useState('Not tested');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState<any>(null);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Testing connection...');
    setError(null);
    setConnectionDetails(null);

    try {
      // Get MongoDB URI from environment
      const uri = process.env.NEXT_PUBLIC_MONGO_TEST || '';
      if (!uri) {
        setError('NEXT_PUBLIC_MONGO_TEST environment variable not set');
        setStatus('Configuration error');
        return;
      }

      // Log connection attempt
      console.log('Attempting direct mongoose connection...');
      
      // Disconnect if already connected
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }

      // Connect with mongoose
      await mongoose.connect(uri);

      // Check connection state
      const readyState = mongoose.connection.readyState;
      const readyStateText = 
        readyState === 0 ? 'disconnected' :
        readyState === 1 ? 'connected' :
        readyState === 2 ? 'connecting' :
        readyState === 3 ? 'disconnecting' : 'unknown';

      setConnectionDetails({
        readyState,
        readyStateText,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        collections: Object.keys(mongoose.connection.collections).length
      });

      setStatus(readyState === 1 ? 'Connected successfully!' : `Connection state: ${readyStateText}`);
    } catch (err) {
      console.error('MongoDB connection test error:', err);
      setError(err instanceof Error ? err.message : String(err));
      setStatus('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">MongoDB Direct Connection Test</h1>
      
      <div className="mb-6">
        <Button 
          onClick={testConnection} 
          disabled={loading} 
          className="mr-4"
        >
          {loading ? 'Testing...' : 'Test Direct Connection'}
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Status:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-medium">{status}</p>
          
          {connectionDetails && (
            <div className="mt-4 text-sm">
              <h3 className="font-medium text-base">Connection Details:</h3>
              <div className="mt-2 space-y-1">
                <p><span className="font-medium">Ready State:</span> {connectionDetails.readyStateText} ({connectionDetails.readyState})</p>
                <p><span className="font-medium">Host:</span> {connectionDetails.host}</p>
                <p><span className="font-medium">Database:</span> {connectionDetails.name}</p>
                <p><span className="font-medium">Collections:</span> {connectionDetails.collections}</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md">
              <p className="font-medium">Error:</p>
              <p className="mt-1">{error}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Manual Connection Test Instructions:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <ol className="list-decimal list-inside space-y-2">
            <li>Open a new terminal window</li>
            <li>Run: <code className="bg-gray-200 p-1 rounded">mongosh "mongodb+srv://protection.y4ji5.mongodb.net/Company_db" --username osmanabdout</code></li>
            <li>Enter your password when prompted</li>
            <li>If you can connect via terminal but not from the app, there might be a network/firewall issue</li>
          </ol>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Alternative Connection Options:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <ol className="list-decimal list-inside space-y-3">
            <li>Try creating a new database user in MongoDB Atlas with a simple alphanumeric password</li>
            <li>Check if your current IP address is whitelisted in MongoDB Atlas Network Access settings</li>
            <li>Try adding the Network Access rule: 0.0.0.0/0 (allows all IP addresses)</li>
            <li>Verify that your MongoDB Atlas cluster is active and not paused</li>
            <li>Try connecting to a different database within your cluster</li>
            <li>Check if there are any VPN or proxy settings affecting your connection</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 