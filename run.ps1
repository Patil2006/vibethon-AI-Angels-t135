# AI Playground - Run All Servers
Write-Host "Starting AI Playground..." -ForegroundColor Cyan

# Start Backend
Write-Host "Starting FastAPI Backend on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; uvicorn main:app --reload --port 8000"

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "Starting React Frontend on port 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; `$env:PORT=3001; npm start"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "Both servers starting!" -ForegroundColor Green
Write-Host "Frontend : http://localhost:3001" -ForegroundColor White
Write-Host "Backend  : http://localhost:8000" -ForegroundColor White
Write-Host "API Docs : http://localhost:8000/docs" -ForegroundColor White
