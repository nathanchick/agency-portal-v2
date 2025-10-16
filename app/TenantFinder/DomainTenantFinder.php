<?php

namespace App\TenantFinder;

use App\Models\Organisation;
use Illuminate\Http\Request;
use Spatie\Multitenancy\TenantFinder\TenantFinder;

class DomainTenantFinder extends TenantFinder
{
    public function findForRequest(Request $request): ?Organisation
    {
        // Try to get tenant from subdomain (e.g., tenant1.yourapp.com)
        $host = $request->getHost();

        // Extract subdomain
        $parts = explode('.', $host);

        // If localhost or single domain, try to get from user's session/auth
        if (count($parts) < 3 || in_array($host, ['localhost', '127.0.0.1'])) {
            return $this->findFromAuthenticatedUser($request);
        }

        $subdomain = $parts[0];

        // Find organisation by subdomain (you'll need to add a subdomain column)
        // For now, we'll use name as a fallback
        return Organisation::where('name', $subdomain)->first();
    }

    protected function findFromAuthenticatedUser(Request $request): ?Organisation
    {
        $user = $request->user();

        if (!$user) {
            return null;
        }

        // Get the first organisation the user belongs to
        // You might want to store the current_organisation_id on the user
        return $user->organisations()->first();
    }
}
