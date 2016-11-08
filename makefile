.PHONE: all

all:
	@php -S 0.0.0.0:8081 -t public/

upload:
	@rsync -a public/ -e "ssh -p 3389" leo@paradev.ru:/var/www/peskar.paradev.ru/www/
