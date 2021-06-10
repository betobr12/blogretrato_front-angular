# blogretrato-laravel-angular
# projeto separado em duas partes 
# main_front https://github.com/betobr12/betobr12-blogretrato_front-angular
# main_back - https://github.com/betobr12/betobr12-blogretrato_back-laravel
# obs:manter os dois projetos em uma pasta principal
# caso tenha que separa-los, altere a rota de salvamento dos arquivos js do Angular no package.json - linha 7 "build": "ng build --output-path=../laravel_api/public/js/",
# para instalar
# back:
# composer install
# php artisan key:generate
# php artisan storage:link
# php artisan migrate
# front:
# npm run dev
# npm run build
# Executar o projeto pelo back no laravel com php artisan serve
