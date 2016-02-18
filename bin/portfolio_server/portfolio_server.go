package main

import (
	"flag"
	"net/http"

	"github.com/bborbe/log"
	"github.com/bborbe/portfolio/handler"
	"github.com/facebookgo/grace/gracehttp"
)

const (
	PARAMETER_LOGLEVEL = "loglevel"
)

var (
	logger          = log.DefaultLogger
	addressPtr      = flag.String("a0", ":48568", "Zero address to bind to.")
	documentRootPtr = flag.String("root", "", "Document root directory")
	logLevelPtr     = flag.String(PARAMETER_LOGLEVEL, log.INFO_STRING, log.FLAG_USAGE)
)

func main() {
	defer logger.Close()
	flag.Parse()
	gracehttp.Serve(createServer(*addressPtr, *documentRootPtr))
}

func createServer(address string, documentRoot string) *http.Server {
	logger.SetLevelThreshold(log.LogStringToLevel(*logLevelPtr))
	logger.Debugf("set log level to %s", *logLevelPtr)
	return &http.Server{Addr: address, Handler: handler.NewHandler(documentRoot)}
}
