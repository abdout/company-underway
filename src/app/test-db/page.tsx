'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { testMongoConnection, getMongodbInfo } from "@/actions/test-db";

export default function TestDBPage() {
  const [status, setStatus] = useState<string>('Not tested');
  const [error, setError] = useState<string | null>(null);
  const [mongoInfo, setMongoInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    try {
      setIsLoading(true);
      setStatus('Testing connection...');
      setError(null);
      
      // Get MongoDB URI info (without exposing credentials)
      const infoResult = await getMongodbInfo();
      setMongoInfo(infoResult);
      
      if (!infoResult.success) {
        setStatus('Configuration error');
        setError(infoResult.message);
        return;
      }
      
      // Test the connection
      const result = await testMongoConnection();
      
      if (result.success) {
        setStatus('Connected successfully!');
      } else {
        setStatus('Connection failed');
        setError(result.message || result.error);
      }
    } catch (err) {
      setStatus('Connection failed');
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">MongoDB Connection Test</h1>
      
      <div className="mb-6">
        <Button onClick={testConnection} variant="default" disabled={isLoading}>
          {isLoading ? 'Testing...' : 'Test MongoDB Connection'}
        </Button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Status:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-medium">{status}</p>
          
          {mongoInfo && (
            <div className="mt-4 text-sm">
              <h3 className="font-medium text-base">MongoDB Configuration:</h3>
              {mongoInfo.uriDefined ? (
                mongoInfo.success ? (
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Protocol:</span> {mongoInfo.info.protocol}</p>
                    <p><span className="font-medium">Username:</span> {mongoInfo.info.username}</p>
                    <p><span className="font-medium">Host:</span> {mongoInfo.info.host}</p>
                    <p><span className="font-medium">Database:</span> {mongoInfo.info.database}</p>
                    <p><span className="font-medium">Query Parameters:</span> {mongoInfo.info.hasQueryParams ? 'Yes' : 'No'}</p>
                  </div>
                ) : (
                  <p className="text-amber-600 mt-2">MongoDB URI is defined but {mongoInfo.message}</p>
                )
              ) : (
                <p className="text-red-500 mt-2">MongoDB URI is not defined in environment variables</p>
              )}
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
        <h2 className="text-xl font-semibold mb-2">MongoDB Setup Guide:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <ol className="list-decimal list-inside space-y-2">
            <li>Ensure you have a MongoDB Atlas account and have created a cluster</li>
            <li>Make sure your IP address is whitelisted in MongoDB Atlas</li>
            <li>Check that your connection string in the <code>.env.local</code> file is correct</li>
            <li>Verify that the username and password in the connection string are correct</li>
            <li>Ensure the database name in the URI is properly set</li>
            <li>Restart your development server after making changes to environment variables</li>
          </ol>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">MongoDB Atlas Setup Example:</h2>
        <div className="p-4 bg-gray-100 rounded">
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <p>Create a MongoDB Atlas account at <a href="https://www.mongodb.com/cloud/atlas" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">mongodb.com/cloud/atlas</a></p>
            </li>
            <li>
              <p>Create a new project and build a cluster (the free tier works fine)</p>
            </li>
            <li>
              <p>Once your cluster is created, click "Connect"</p>
            </li>
            <li>
              <p>Add your current IP address to the IP access list or use 0.0.0.0/0 (allow from anywhere)</p>
            </li>
            <li>
              <p>Create a database user with a secure password</p>
            </li>
            <li>
              <p>Choose "Connect your application" and copy the connection string</p>
            </li>
            <li>
              <p>In your <code>.env.local</code> file, set:</p>
              <pre className="bg-gray-900 text-green-400 p-2 rounded mt-2 overflow-x-auto">
                MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yourdatabase?retryWrites=true&w=majority
              </pre>
              <p className="text-sm mt-1">Replace username, password, cluster.mongodb.net, and yourdatabase with your values</p>
            </li>
            <li>
              <p>Restart your development server using <code>npm run dev</code> or <code>yarn dev</code></p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
} 