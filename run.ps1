Set-Location -Path .\server

# Запуск виртуального окружения и сервера Django в фоновом режиме
Start-Process -FilePath "cmd.exe" -ArgumentList "/C poetry shell & python manage.py runserver"

Set-Location -Path ..\client

# Запуск команды npm run dev в фоновом режиме
Start-Process -FilePath "npm" -ArgumentList "run dev" -NoNewWindow

Set-Location -Path ..
