CSS.DIR = ./webapp/css
LESS.DIR = ./webapp/less
JS.DIR = ./webapp/js
IMG.DIR = ./webapp/images

TEST.DIR = ./test
PHP.TESTLOG = ./log/php-test-logs.txt

TOOLS.DIR = ./buildtools
DATE = $(shell date +%I:%M%p)
CHECK = \033[32m✔\033[39m
HR = -------------------------------------------------------------


#
# Build Website
#

build:
	@echo "\n${HR}"
	@echo "Building Website..."
	@echo "${HR}\n"

	@echo -n Downloading packages...
	@php composer.phar install
	@echo "Downloading packages...                            ${CHECK} Done"

	@echo -n Compiling LESS into css with Recess...
	#@lessc ${LESS.DIR}/main.less > ${CSS.DIR}/site.css
	#@lessc -x ${CSS.DIR}/site.css > ${CSS.DIR}/site.min.css

	@echo "        ${CHECK} Done"

	@echo "\n${HR}"
	@echo "Website successfully built at ${DATE}."
	@echo "${HR}\n"
	@echo "No test where run as part of the build process, to run tests use make run-test"

install:
	@echo "\n${HR}"
	@echo "Installing tools needed to run makefile"
	@echo "${HR}\n"
	@echo "Installing Composer from https://getcomposer.org/";
	@curl -sS https://getcomposer.org/installer | php -d detect_unicode=Off
	@echo "Installing the LESS command line compiler, JSHint, Recess, and uglify-js globally";
	@echo "We need sudo access:"
	@sudo npm install -g less jshint recess uglify-js;
	@echo "Installation                        ${CHECK} Done"
	@echo "\n you can now build a site using 'make'"