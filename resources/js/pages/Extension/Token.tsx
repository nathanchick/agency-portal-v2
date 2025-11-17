import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Copy, Trash2, Clock, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Extension Token',
        href: '/extension-token',
    },
];

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
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [tokenToRevoke, setTokenToRevoke] = useState<{ id: string; name: string } | null>(null);

  const handleGenerateToken = async () => {
    setLoading(true);

    router.post(
      route('extension-token.generate'),
      { name: tokenName },
      {
        preserveScroll: true,
        onSuccess: (page: any) => {
          const response = page.props.flash?.success;
          if (response && typeof response === 'object' && 'token' in response) {
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

  const handleRevokeToken = (tokenId: string, tokenName: string) => {
    setTokenToRevoke({ id: tokenId, name: tokenName });
    setRevokeDialogOpen(true);
  };

  const confirmRevoke = () => {
    if (tokenToRevoke) {
      router.delete(route('extension-token.revoke', tokenToRevoke.id), {
        preserveScroll: true,
        onSuccess: () => {
          setRevokeDialogOpen(false);
          setTokenToRevoke(null);
        },
      });
    }
  };

  const cancelRevoke = () => {
    setRevokeDialogOpen(false);
    setTokenToRevoke(null);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Extension Token" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Chrome Extension"
            description="Generate a secure token to use with the Portal Time Tracker Chrome Extension"
          />

          {/* Generate New Token */}
          <Card>
            <CardHeader>
              <CardTitle>Generate New Token</CardTitle>
              <CardDescription>
                Create a new extension token for your Chrome Extension. This token will expire after 90 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedToken ? (
                <>
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
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
                    <p className="text-sm text-muted-foreground">
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
                    <p className="text-sm text-muted-foreground">
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
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">No active tokens</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Generate your first token above to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {existingTokens.map((token) => (
                    <div
                      key={token.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{token.name}</h4>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                          <span>
                            Expires {formatDistanceToNow(new Date(token.expires_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRevokeToken(token.id, token.name)}
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
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  <strong>Install the Chrome Extension</strong>
                  <p className="text-sm text-muted-foreground mt-1 ml-5">
                    Download and install the Portal Time Tracker extension from the Chrome Web Store.
                  </p>
                </li>
                <li>
                  <strong>Generate a Token</strong>
                  <p className="text-sm text-muted-foreground mt-1 ml-5">
                    Click "Generate Token" above and copy the generated token.
                  </p>
                </li>
                <li>
                  <strong>Authenticate the Extension</strong>
                  <p className="text-sm text-muted-foreground mt-1 ml-5">
                    Open the extension, paste your token, and click "Save Token".
                  </p>
                </li>
                <li>
                  <strong>Start Tracking Time</strong>
                  <p className="text-sm text-muted-foreground mt-1 ml-5">
                    Click the extension icon in your browser toolbar to quickly log time entries.
                  </p>
                </li>
              </ol>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Security Note:</strong> Keep your extension token secure. Never share it with others.
                  Tokens expire after 90 days and can be revoked at any time from this page.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </SettingsLayout>

      {/* Revoke Token Confirmation Dialog */}
      <Dialog open={revokeDialogOpen} onOpenChange={cancelRevoke}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Revoke Extension Token
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this token? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">Token: {tokenToRevoke?.name}</p>
                  <p className="text-sm">
                    The Chrome Extension using this token will immediately stop working and will need to be re-authenticated with a new token.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button onClick={cancelRevoke} variant="outline">
              Cancel
            </Button>
            <Button onClick={confirmRevoke} variant="destructive">
              Revoke Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
