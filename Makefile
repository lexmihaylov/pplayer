all: javascript style
style:
	php script/compile.phar css theme/pplayer.css
javascript:
	php script/compile.phar js pplayer.js
build:
	mkdir build
	cp pplayer.min.js build
	cp -r theme build
	cp youtube* build
	cp manifest.json build
	cp index.html build
