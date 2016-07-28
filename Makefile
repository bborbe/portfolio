prepare:
	npm install
	go get -u golang.org/x/tools/cmd/goimports
	go get -u github.com/Masterminds/glide
	glide install
update:
	glide up
	npm-check-updates -u
clean:
	rm -rf vendor
karma:
	./node_modules/karma/bin/karma start karma.conf.js
