$startDate = Get-Date -Year 2026 -Month 8 -Day 1
$endDate = Get-Date -Year 2026 -Month 9 -Day 11

$commitMessages = @(
    "refactor: optimize component rendering",
    "fix: resolve layout shift on mobile devices",
    "feat: implement new UI components",
    "chore: update dependencies and clean up",
    "docs: update readme and project documentation",
    "style: improve CSS transitions and animations",
    "perf: optimize image loading and caching",
    "test: add unit tests for utility functions",
    "refactor: extract reusable hooks",
    "fix: correct typings in interfaces",
    "feat: add support for multiple languages",
    "chore: configure linting rules",
    "style: refine dark mode color palette",
    "fix: handle edge cases in state management",
    "perf: reduce bundle size"
)

$currentDate = $startDate

while ($currentDate -le $endDate) {
    # Generate 1 to 4 commits per day to simulate active development
    $numCommits = Get-Random -Minimum 1 -Maximum 5

    for ($i = 0; $i -lt $numCommits; $i++) {
        # Pick a random commit message
        $msg = $commitMessages | Get-Random

        # Add some random time to the date for realistic commit times
        $hour = Get-Random -Minimum 9 -Maximum 23
        $minute = Get-Random -Minimum 0 -Maximum 59
        $second = Get-Random -Minimum 0 -Maximum 59
        
        $commitDate = $currentDate.AddHours($hour).AddMinutes($minute).AddSeconds($second)
        $dateString = $commitDate.ToString("yyyy-MM-ddTHH:mm:ss")

        # Make a dummy change to a file
        $logEntry = "Contribution on $dateString : $msg`n"
        Add-Content -Path "contribution_log.md" -Value $logEntry

        # Stage and commit
        git add contribution_log.md
        
        $env:GIT_AUTHOR_DATE = $dateString
        $env:GIT_COMMITTER_DATE = $dateString

        git commit -m $msg

        Write-Host "Committed on ${dateString}: $msg"
    }

    $currentDate = $currentDate.AddDays(1)
}

# Push all commits to the remote repository
git push origin main
Write-Host "Finished generating and pushing commits."
