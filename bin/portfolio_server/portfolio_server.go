package main

import (
	"flag"
	"net/http"

	debug_handler "github.com/bborbe/http_handler/debug"

	"runtime"

	"fmt"

	"github.com/bborbe/portfolio/handler"
	"github.com/facebookgo/grace/gracehttp"
	"github.com/golang/glog"
)

const (
	DEFAULT_PORT    int = 8080
	PARAMETER_PORT      = "port"
	PARAMETER_DEBUG     = "debug"
)

var (
	portPtr         = flag.Int(PARAMETER_PORT, DEFAULT_PORT, "port")
	documentRootPtr = flag.String("root", "", "Document root directory")
	debugPtr        = flag.Bool(PARAMETER_DEBUG, false, "debug")
)

func main() {
	defer glog.Flush()
	glog.CopyStandardLogTo("info")
	flag.Parse()
	runtime.GOMAXPROCS(runtime.NumCPU())

	err := do(
		*portPtr,
		*debugPtr,
		*documentRootPtr,
	)
	if err != nil {
		glog.Exit(err)
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
	glog.V(2).Infof("start server")
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
