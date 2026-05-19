# Budget Car Finder - Push to GitHub
# Prerequisites: Install Git from https://git-scm.com/download/win
# Optional: Install GitHub CLI from https://cli.github.com/ for automatic repo creation

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Check Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Download and install from: https://git-scm.com/download/win" -ForegroundColor Red
    Write-Host "Then run this script again."
    exit 1
}

Write-Host "Initializing git repository..." -ForegroundColor Cyan
if (-not (Test-Path .git)) {
    git init
    git branch -M main
}

Write-Host "Staging files..." -ForegroundColor Cyan
git add .
git status

$hasCommits = git rev-parse HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "Initial commit: Budget Car Finder full-stack app

- Frontend: HTML, CSS, JavaScript with car listings and filters
- Backend: Node.js, Express, SQLite
- Auth, favorites, and contact API"
} else {
    $status = git status --porcelain
    if ($status) {
        git commit -m "Update Budget Car Finder project"
    } else {
        Write-Host "Nothing new to commit." -ForegroundColor Yellow
    }
}

# Create GitHub repo with gh CLI if available
if (Get-Command gh -ErrorAction SilentlyContinue) {
    $remote = git remote get-url origin 2>$null
    if (-not $remote) {
        Write-Host "Creating GitHub repository..." -ForegroundColor Cyan
        gh repo create budget-car-finder --public --source=. --remote=origin --push
        Write-Host "Done! Check your GitHub account for the new repo." -ForegroundColor Green
        exit 0
    }
}

$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host ""
    Write-Host "Next steps (do this once):" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new"
    Write-Host "2. Create a repo named 'budget-car-finder' (no README)"
    Write-Host "3. Run these commands (replace YOUR_USERNAME):"
    Write-Host ""
    Write-Host '   git remote add origin https://github.com/YOUR_USERNAME/budget-car-finder.git'
    Write-Host "   git push -u origin main"
    Write-Host ""
    exit 0
}

Write-Host "Pushing to origin..." -ForegroundColor Cyan
git push -u origin main
Write-Host "Push complete!" -ForegroundColor Green
