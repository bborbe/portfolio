all: test install
install:
	GOBIN=$(GOPATH)/bin GO15VENDOREXPERIMENT=1 go install bin/portfolio_server/*.go
test:
	go test -cover -race $(shell go list ./... | grep -v /vendor/)
vet:
	go tool vet .
	go tool vet --shadow .
lint:
	golint -min_confidence 1 ./...
errcheck:
	errcheck -ignore '(Close|Write)' ./...
check: lint vet errcheck
prepare:
	npm install
	go get -u golang.org/x/lint/golint
	go get -u github.com/kisielk/errcheck
	go get -u golang.org/x/tools/cmd/goimports
	go get -u github.com/Masterminds/glide
	glide install
update:
	glide up
	npm-check-updates -u
clean:
	rm -rf vendor target node_modules
karma:
	./node_modules/karma/bin/karma start karma.conf.js
