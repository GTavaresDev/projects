#!/bin/bash
cd /Ubuntu/home/tavares/Development/beer-code
php artisan cache:clear
php artisan route:clear
php artisan config:clear
php artisan view:clear
php artisan optimize:clear
echo "Cache limpo com sucesso!"
