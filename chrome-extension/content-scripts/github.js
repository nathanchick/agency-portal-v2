// GitHub issue integration for time tracking
(function() {
    'use strict';

    // Check if we're on a GitHub issue page
    function isIssuePage() {
        const path = window.location.pathname;
        // Matches: /owner/repo/issues/123
        return /^\/[^\/]+\/[^\/]+\/issues\/\d+/.test(path);
    }

    // Extract issue information
    function getIssueInfo() {
        // Try multiple selectors for the title
        const titleElement = document.querySelector('.js-issue-title') ||
                           document.querySelector('h1.gh-header-title') ||
                           document.querySelector('[data-testid="issue-title"]') ||
                           document.querySelector('bdi.js-issue-title') ||
                           document.querySelector('h1');

        const issueNumber = window.location.pathname.match(/\/issues\/(\d+)/)?.[1];
        const repoPath = window.location.pathname.match(/^\/([^\/]+\/[^\/]+)/)?.[1];

        return {
            title: titleElement?.textContent.trim() || 'GitHub Issue',
            number: issueNumber,
            repo: repoPath,
            url: window.location.href
        };
    }

    // Create and insert the "Start Timer" button
    function insertStartTimerButton() {
        // Check if button already exists
        if (document.querySelector('.time-tracker-start-btn')) {
            return;
        }

        // Create a floating button container (simple and reliable)
        const container = document.createElement('div');
        container.className = 'portal-timer-floating';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        `;

        // Create button with nice styling
        const button = document.createElement('button');
        button.className = 'time-tracker-start-btn';
        button.type = 'button';
        button.innerHTML = `
            <svg style="width: 18px; height: 18px; margin-right: 6px; vertical-align: middle;" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"/>
            </svg>
            <span>Start Timer</span>
        `;
        button.style.cssText = `
            background: linear-gradient(180deg, #2ea44f 0%, #2a9146 100%);
            color: white;
            border: 1px solid rgba(27,31,36,0.15);
            border-radius: 6px;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            transition: all 0.2s ease;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        `;

        button.onmouseenter = () => {
            button.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
            button.style.transform = 'translateY(-1px)';
        };

        button.onmouseleave = () => {
            button.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
            button.style.transform = 'translateY(0)';
        };

        // Add click handler
        button.addEventListener('click', async () => {
            const issueInfo = getIssueInfo();

            // Send message to background script
            chrome.runtime.sendMessage({
                type: 'START_TIMER_FROM_ISSUE',
                source: 'github',
                issue: issueInfo
            }, (response) => {
                if (response?.success) {
                    // Update button state
                    button.innerHTML = `
                        <svg class="octicon" style="width: 16px; height: 16px; margin-right: 4px; vertical-align: text-bottom;" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/>
                        </svg>
                        Timer Ready
                    `;

                    // Notify user to click extension
                    showNotification('Click the extension icon to start the timer');

                    // Optional: Try to open popup (may not work in all contexts)
                    chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
                }
            });
        });

        // Add button to container and container to page
        container.appendChild(button);
        document.body.appendChild(container);
    }

    // Show notification banner
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'flash flash-success';
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; padding: 16px; border-radius: 6px;';
        notification.innerHTML = `
            <svg class="octicon" style="width: 16px; height: 16px; margin-right: 8px; vertical-align: text-bottom;" viewBox="0 0 16 16">
                <path fill="currentColor" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/>
            </svg>
            ${message}
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Get current repository from URL
    function getCurrentRepoFromUrl() {
        const match = window.location.pathname.match(/^\/([^\/]+\/[^\/]+)/);
        return match ? match[1] : null;
    }

    // Check if button should be shown for current repo
    async function shouldShowButton() {
        const currentRepo = getCurrentRepoFromUrl();

        if (!currentRepo) {
            return false;
        }

        try {
            // Get allowed repos from storage
            const result = await chrome.storage.local.get(['cache_github_repos']);
            const cacheEntry = result.cache_github_repos;

            // If no cache, show button by default (better UX on first load)
            if (!cacheEntry || !cacheEntry.data) {
                return true;
            }

            // Check if cache is still valid
            const isValid = Date.now() < cacheEntry.expires_at;
            if (!isValid) {
                return true;
            }

            const allowedRepos = cacheEntry.data;

            // If no repos in cache (empty array), show button by default
            if (allowedRepos.length === 0) {
                return true;
            }

            // Check if current repo is in allowed list
            const isAllowed = allowedRepos.includes(currentRepo);

            return isAllowed;
        } catch (error) {
            console.error('[Portal Time Tracker] Error checking allowed repos:', error);
            // Show button by default on error
            return true;
        }
    }

    // Initialize with permission check
    async function init() {
        if (!isIssuePage()) {
            return;
        }

        // Check if button should be shown
        const shouldShow = await shouldShowButton();

        if (!shouldShow) {
            return;
        }

        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', insertStartTimerButton);
        } else {
            // Try immediately and with delays to catch the right moment
            insertStartTimerButton();
            setTimeout(insertStartTimerButton, 500);
            setTimeout(insertStartTimerButton, 1000);
            setTimeout(insertStartTimerButton, 2000);
        }

        // Handle GitHub's client-side navigation (SPA)
        const observer = new MutationObserver(() => {
            if (isIssuePage()) {
                insertStartTimerButton();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    init();
})();
