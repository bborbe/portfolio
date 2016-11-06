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
	"github.com/bborbe/portfolio/model"
)

const (
	DEFAULT_PORT int = 8080
	PARAMETER_PORT = "port"
)

var (
	portPtr = flag.Int(PARAMETER_PORT, DEFAULT_PORT, "port")
	documentRootPtr = flag.String("root", "", "Document root directory")
)

func main() {
	defer glog.Flush()
	glog.CopyStandardLogTo("info")
	flag.Parse()
	runtime.GOMAXPROCS(runtime.NumCPU())

	if err := do(); err != nil {
		glog.Exit(err)
	}

}

func do() error {
	server, err := createServer()
	if err != nil {
		return err
	}
	glog.V(2).Infof("start server")
	return gracehttp.Serve(server)
}

func createServer() (*http.Server, error) {
	port := model.Port(*portPtr)
	documentRoot := *documentRootPtr

	handler := handler.NewHandler(documentRoot)

	if glog.V(4) {
		handler = debug_handler.New(handler)
	}

	glog.V(2).Infof("create http server on %s", port.Address())
	return &http.Server{Addr: fmt.Sprintf(":%d", port), Handler: handler}, nil
}
