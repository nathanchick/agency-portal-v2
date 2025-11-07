<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $reportName }}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .description {
            background: white;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
        }
        .summary {
            background: white;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .summary h2 {
            margin-top: 0;
            color: #667eea;
            font-size: 18px;
        }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        .stat {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
        }
        .stat-label {
            font-size: 12px;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .filters {
            background: white;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .filters h3 {
            margin-top: 0;
            color: #667eea;
            font-size: 16px;
        }
        .filter-item {
            margin-bottom: 10px;
        }
        .filter-label {
            font-weight: 600;
            color: #495057;
            margin-right: 8px;
        }
        .filter-value {
            color: #6c757d;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
            font-size: 14px;
        }
        .attachment-notice {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            color: #0c5460;
            padding: 15px;
            border-radius: 6px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 {{ $reportName }}</h1>
    </div>

    <div class="content">
        @if($reportDescription)
        <div class="description">
            <p style="margin: 0;">{{ $reportDescription }}</p>
        </div>
        @endif

        <div class="summary">
            <h2>Summary</h2>
            <div class="stat-grid">
                <div class="stat">
                    <div class="stat-label">Total Hours</div>
                    <div class="stat-value">{{ number_format($summary['total_hours'], 2) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Billable Hours</div>
                    <div class="stat-value">{{ number_format($summary['billable_hours'], 2) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Total Amount</div>
                    <div class="stat-value">£{{ number_format($summary['total_amount'], 2) }}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Total Entries</div>
                    <div class="stat-value">{{ $summary['entry_count'] }}</div>
                </div>
            </div>
        </div>

        <div class="filters">
            <h3>Report Filters</h3>
            @if($filters['start_date'] && $filters['end_date'])
            <div class="filter-item">
                <span class="filter-label">Date Range:</span>
                <span class="filter-value">{{ $filters['start_date'] }} to {{ $filters['end_date'] }}</span>
            </div>
            @endif

            @if(!empty($filters['customer_ids']))
            <div class="filter-item">
                <span class="filter-label">Customers:</span>
                <span class="filter-value">{{ count($filters['customer_ids']) }} selected</span>
            </div>
            @endif

            @if(!empty($filters['service_ids']))
            <div class="filter-item">
                <span class="filter-label">Services:</span>
                <span class="filter-value">{{ count($filters['service_ids']) }} selected</span>
            </div>
            @endif

            @if(!empty($filters['task_ids']))
            <div class="filter-item">
                <span class="filter-label">Tasks:</span>
                <span class="filter-value">{{ count($filters['task_ids']) }} selected</span>
            </div>
            @endif

            @if(!empty($filters['user_ids']))
            <div class="filter-item">
                <span class="filter-label">Users:</span>
                <span class="filter-value">{{ count($filters['user_ids']) }} selected</span>
            </div>
            @endif
        </div>

        <div class="attachment-notice">
            <strong>📎 Attachment:</strong> The full report is attached to this email. Please download and open the attachment to view the detailed data.
        </div>

        <div class="footer">
            <p>This is an automated report from your Timesheet system.</p>
            <p style="margin-top: 10px;">Generated on {{ date('F j, Y \a\t g:i A') }}</p>
        </div>
    </div>
</body>
</html>
