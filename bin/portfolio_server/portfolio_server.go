package main

import (
	"flag"
	"net/http"

	"github.com/bborbe/log"
	"github.com/bborbe/portfolio/handler"
	"github.com/facebookgo/grace/gracehttp"
	"os"
)

const (
	PARAMETER_LOGLEVEL = "loglevel"
)

var (
	logger = log.DefaultLogger
	addressPtr = flag.String("a0", ":48568", "Zero address to bind to.")
	documentRootPtr = flag.String("root", "", "Document root directory")
	logLevelPtr = flag.String(PARAMETER_LOGLEVEL, log.INFO_STRING, log.FLAG_USAGE)
)

func main() {
	defer logger.Close()
	flag.Parse()

	logger.SetLevelThreshold(log.LogStringToLevel(*logLevelPtr))
	logger.Debugf("set log level to %s", *logLevelPtr)

	server, err := createServer(*addressPtr, *documentRootPtr)
	if err != nil {
		logger.Fatal(err)
		logger.Close()
		os.Exit(1)
	}
	logger.Debugf("start server")
	gracehttp.Serve(server)
}

func createServer(address string, documentRoot string) (*http.Server, error) {
	return &http.Server{Addr: address, Handler: handler.NewHandler(documentRoot)}, nil
}
