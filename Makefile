prepare:
	npm install
	go get -u golang.org/x/tools/cmd/goimports
clean:
	rm -rf vendor
karma:
	karma start karma.conf.js
