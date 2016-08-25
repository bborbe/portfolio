package main

import (
	"flag"
	"net/http"

	debug_handler "github.com/bborbe/http_handler/debug"

	"os"

	"runtime"

	"fmt"

	"github.com/bborbe/log"
	"github.com/bborbe/portfolio/handler"
	"github.com/facebookgo/grace/gracehttp"
)

const (
	PARAMETER_LOGLEVEL     = "loglevel"
	DEFAULT_PORT       int = 8080
	PARAMETER_PORT         = "port"
	PARAMETER_DEBUG        = "debug"
)

var (
	logger          = log.DefaultLogger
	portPtr         = flag.Int(PARAMETER_PORT, DEFAULT_PORT, "port")
	documentRootPtr = flag.String("root", "", "Document root directory")
	logLevelPtr     = flag.String(PARAMETER_LOGLEVEL, log.INFO_STRING, log.FLAG_USAGE)
	debugPtr        = flag.Bool(PARAMETER_DEBUG, false, "debug")
)

func main() {
	defer logger.Close()
	flag.Parse()

	logger.SetLevelThreshold(log.LogStringToLevel(*logLevelPtr))
	logger.Debugf("set log level to %s", *logLevelPtr)

	runtime.GOMAXPROCS(runtime.NumCPU())

	err := do(
		*portPtr,
		*debugPtr,
		*documentRootPtr,
	)
	if err != nil {
		logger.Fatal(err)
		logger.Close()
		os.Exit(1)
	}

}

func do(
	port int,
	debug bool,
	documentRoot string,
) error {
	server, err := createServer(
		port,
		debug,
		documentRoot,
	)
	if err != nil {
		return err
	}
	logger.Debugf("start server")
	return gracehttp.Serve(server)
}

func createServer(
	port int,
	debug bool,
	documentRoot string,
) (*http.Server, error) {
	handler := handler.NewHandler(documentRoot)

	if debug {
		handler = debug_handler.New(handler)
	}

	return &http.Server{Addr: fmt.Sprintf(":%d", port), Handler: handler}, nil
}
