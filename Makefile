prepare:
	npm install
	go get -u golang.org/x/tools/cmd/goimports
update:
	npm-check-updates -u
clean:
	rm -rf vendor
karma:
	karma start karma.conf.js
