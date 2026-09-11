$dates = @(
    (Get-Date -Year 2026 -Month 8 -Day 1 -Hour 0 -Minute 0 -Second 0),
    (Get-Date -Year 2026 -Month 8 -Day 8 -Hour 0 -Minute 0 -Second 0)
)

$commitMessages = @(
    "feat: super massive feature drop",
    "fix: squashed final bugs for the week",
    "docs: detailed changelog for weekend",
    "chore: deep cleaning of legacy code",
    "refactor: modularized core utilities"
)

foreach ($currentDate in $dates) {
    # Generate 15 commits to ensure they show up as dark green
    $numCommits = 15

    for ($i = 0; $i -lt $numCommits; $i++) {
        $msg = $commitMessages | Get-Random

        $hour = Get-Random -Minimum 1 -Maximum 22
        $minute = Get-Random -Minimum 0 -Maximum 59
        $second = Get-Random -Minimum 0 -Maximum 59
        
        $commitDate = $currentDate.AddHours($hour).AddMinutes($minute).AddSeconds($second)
        $dateString = $commitDate.ToString("yyyy-MM-ddTHH:mm:ss")

        $logEntry = "Extra specific contribution on ${dateString} : $msg`n"
        Add-Content -Path "contribution_log.md" -Value $logEntry

        git add contribution_log.md
        
        $env:GIT_AUTHOR_DATE = $dateString
        $env:GIT_COMMITTER_DATE = $dateString

        git commit -m $msg

        Write-Host "Committed strictly on ${dateString}: $msg"
    }
}

git push origin main
Write-Host "Finished filling exactly August 1st and 8th."
