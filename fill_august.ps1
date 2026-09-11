$dates = @(
    (Get-Date -Year 2026 -Month 8 -Day 1),
    (Get-Date -Year 2026 -Month 8 -Day 8)
)

$commitMessages = @(
    "feat: major structural update",
    "fix: critical performance issue resolved",
    "docs: massive overhaul of documentation",
    "chore: extensive dependency updates",
    "refactor: core components redesign",
    "style: complete theme alignment",
    "perf: significant load time improvement",
    "test: comprehensive test suite addition",
    "build: CI/CD pipeline enhancements",
    "feat: integration with new API"
)

foreach ($currentDate in $dates) {
    # Generate 10 commits per target day to make them dark green
    $numCommits = 10

    for ($i = 0; $i -lt $numCommits; $i++) {
        $msg = $commitMessages | Get-Random

        $hour = Get-Random -Minimum 8 -Maximum 23
        $minute = Get-Random -Minimum 0 -Maximum 59
        $second = Get-Random -Minimum 0 -Maximum 59
        
        $commitDate = $currentDate.AddHours($hour).AddMinutes($minute).AddSeconds($second)
        $dateString = $commitDate.ToString("yyyy-MM-ddTHH:mm:ss")

        $logEntry = "Extra contribution on ${dateString} : $msg`n"
        Add-Content -Path "contribution_log.md" -Value $logEntry

        git add contribution_log.md
        
        $env:GIT_AUTHOR_DATE = $dateString
        $env:GIT_COMMITTER_DATE = $dateString

        git commit -m $msg

        Write-Host "Committed on ${dateString}: $msg"
    }
}

git push origin main
Write-Host "Finished filling August 1st and 8th."
