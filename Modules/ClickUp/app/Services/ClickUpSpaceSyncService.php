<?php

namespace Modules\ClickUp\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\ClickUp\Models\ClickUpSpace;
use Modules\Organisation\Models\Organisation;

/**
 * ClickUpSpaceSyncService
 *
 * Handles syncing of ClickUp Space metadata from the API to local database.
 */
class ClickUpSpaceSyncService
{
    /**
     * Create a new service instance.
     */
    public function __construct(
        private ClickUpApiService $apiService
    ) {
    }

    /**
     * Sync all spaces for an organisation.
     *
     * @param Organisation $organisation
     * @return int Number of spaces synced
     */
    public function syncSpacesForOrganisation(Organisation $organisation): int
    {
        try {
            // Get the organisation's team ID from their OAuth token
            $token = $organisation->clickUpOAuthToken;

            if (! $token || ! $token->clickup_team_id) {
                Log::warning('ClickUp Sync: No team ID found for organisation', [
                    'organisation_id' => $organisation->id,
                ]);

                return 0;
            }

            // Fetch spaces from ClickUp API
            $spaces = $this->apiService->getSpaces($organisation, $token->clickup_team_id, true);

            $syncCount = 0;

            DB::transaction(function () use ($organisation, $spaces, &$syncCount) {
                foreach ($spaces as $spaceData) {
                    $this->syncSpace($organisation, $spaceData);
                    $syncCount++;
                }
            });

            Log::info('ClickUp Sync: Spaces synced successfully', [
                'organisation_id' => $organisation->id,
                'count' => $syncCount,
            ]);

            return $syncCount;

        } catch (\Exception $e) {
            Log::error('ClickUp Sync: Failed to sync spaces', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Sync a single space.
     *
     * @param Organisation $organisation
     * @param string $spaceId
     * @return ClickUpSpace
     */
    public function syncSingleSpace(Organisation $organisation, string $spaceId): ClickUpSpace
    {
        // Fetch space details from ClickUp API
        $spaceData = $this->apiService->getSpace($organisation, $spaceId);

        return $this->syncSpace($organisation, $spaceData);
    }

    /**
     * Sync space data to database.
     *
     * @param Organisation $organisation
     * @param array $spaceData
     * @return ClickUpSpace
     */
    private function syncSpace(Organisation $organisation, array $spaceData): ClickUpSpace
    {
        $space = ClickUpSpace::updateOrCreate(
            [
                'organisation_id' => $organisation->id,
                'clickup_space_id' => $spaceData['id'],
            ],
            [
                'clickup_team_id' => $spaceData['team_id'] ?? null,
                'name' => $spaceData['name'],
                'is_private' => $spaceData['private'] ?? false,
                'color' => $spaceData['color'] ?? null,
                'avatar_url' => $spaceData['avatar'] ?? null,
                'metadata' => [
                    'features' => $spaceData['features'] ?? [],
                    'statuses' => $spaceData['statuses'] ?? [],
                    'multiple_assignees' => $spaceData['multiple_assignees'] ?? false,
                ],
                'last_synced_at' => now(),
            ]
        );

        Log::debug('ClickUp Sync: Space updated', [
            'organisation_id' => $organisation->id,
            'space_id' => $space->clickup_space_id,
            'space_name' => $space->name,
        ]);

        return $space;
    }
}
