#!/bin/bash

# Настройки
SOURCE_DIR="/data/data/com.termux/files/usr/var/log/nginx/"
REMOTE_USER="tunneljack"
REMOTE_HOST="193.233.115.17"
REMOTE_DIR="~/nginx_realme/"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
LOG_FILE="/data/data/com.termux/files/usr/var/log/nginx/nginx_backup.log"

# Функция для копирования файлов
backup_nginx_logs() {
  echo "$(date): Начало резервного копирования логов Nginx" >> "$LOG_FILE"
  scp -i id_tunneljack -r "$SOURCE_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR" >> "$LOG_FILE" 2>&1
  if [ $? -eq 0 ]; then
    echo "$(date): Резервное копирование логов Nginx успешно завершено" >> "$LOG_FILE"
  else
    echo "$(date): Ошибка резервного копирования логов Nginx" >> "$LOG_FILE"
  fi
}

# Запуск резервного копирования
backup_nginx_logs

# Планирование следующего запуска через час
(sleep 3600; $0) &