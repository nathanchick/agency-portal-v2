import React, { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Trash2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ExtensionToken {
  id: string;
  name: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string;
}

interface Props {
  existingTokens: ExtensionToken[];
}

export default function ExtensionToken({ existingTokens }: Props) {
  const [tokenName, setTokenName] = useState('Chrome Extension');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateToken = async () => {
    setLoading(true);

    router.post(
      route('extension.token.generate'),
      { name: tokenName },
      {
        preserveScroll: true,
        onSuccess: (page: any) => {
          const response = page.props.flash?.success;
          if (response) {
            setGeneratedToken(response.token);
            setTokenName('Chrome Extension');
          }
        },
        onFinish: () => setLoading(false),
      }
    );
  };

  const handleCopyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRevokeToken = (tokenId: string) => {
    if (confirm('Are you sure you want to revoke this token? The extension will stop working.')) {
      router.delete(route('extension.token.revoke', tokenId), {
        preserveScroll: true,
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Extension Token" />

      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Extension Token</h1>
            <p className="mt-2 text-sm text-gray-600">
              Generate a secure token to use with the Portal Time Tracker Chrome Extension
            </p>
          </div>

          {/* Generate New Token */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generate New Token</CardTitle>
              <CardDescription>
                Create a new extension token for your Chrome Extension. This token will expire after 90 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedToken ? (
                <>
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Token generated successfully!</strong> Copy it now - you won't be able to see it again.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="generated-token">Your Extension Token</Label>
                    <div className="flex gap-2">
                      <Input
                        id="generated-token"
                        value={generatedToken}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        onClick={handleCopyToken}
                        variant="outline"
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Paste this token into the Chrome Extension when prompted.
                    </p>
                  </div>

                  <Button
                    onClick={() => setGeneratedToken(null)}
                    variant="outline"
                    className="w-full"
                  >
                    Generate Another Token
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="token-name">Token Name (Optional)</Label>
                    <Input
                      id="token-name"
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                      placeholder="e.g., Chrome - Work Laptop"
                      maxLength={255}
                    />
                    <p className="text-sm text-gray-500">
                      Give your token a name to identify it later.
                    </p>
                  </div>

                  <Button
                    onClick={handleGenerateToken}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Generating...' : 'Generate Token'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Existing Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Active Tokens</CardTitle>
              <CardDescription>
                Manage your existing extension tokens. Revoking a token will immediately stop it from working.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {existingTokens.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No active tokens</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Generate your first token above to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {existingTokens.map((token) => (
                    <div
                      key={token.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{token.name}</h4>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Created {formatDistanceToNow(new Date(token.created_at), { addSuffix: true })}
                          </span>
                          {token.last_used_at && (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Last used {formatDistanceToNow(new Date(token.last_used_at), { addSuffix: true })}
                            </span>
                          )}
                          <span className="text-gray-400">
                            Expires {formatDistanceToNow(new Date(token.expires_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRevokeToken(token.id)}
                        variant="destructive"
                        size="sm"
                        className="ml-4"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Revoke
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ol>
                <li>
                  <strong>Install the Chrome Extension</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    Download and install the Portal Time Tracker extension from the Chrome Web Store.
                  </p>
                </li>
                <li>
                  <strong>Generate a Token</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    Click "Generate Token" above and copy the generated token.
                  </p>
                </li>
                <li>
                  <strong>Authenticate the Extension</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    Open the extension, paste your token, and click "Save Token".
                  </p>
                </li>
                <li>
                  <strong>Start Tracking Time</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    Click the extension icon in your browser toolbar to quickly log time entries.
                  </p>
                </li>
              </ol>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Security Note:</strong> Keep your extension token secure. Never share it with others.
                  Tokens expire after 90 days and can be revoked at any time from this page.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
