package handler

import (
	"net/http"

	"github.com/bborbe/http_handler/cachingheader"
	"github.com/bborbe/http_handler/contenttype"
	"github.com/bborbe/http_handler/fallback"
	log_handler "github.com/bborbe/http_handler/log"
	"github.com/bborbe/http_handler/static"
	"github.com/bborbe/http_handler_finder/part"
	"github.com/golang/glog"
)

func NewHandler(documentRoot string) http.Handler {
	glog.V(2).Infof("root: %s", documentRoot)
	fileServer := cachingheader.NewCachingHeaderHandler(contenttype.NewContentTypeHandler(http.FileServer(http.Dir(documentRoot))))
	handlerFinder := part.New("")
	handlerFinder.RegisterHandler("/", fileServer)
	handlerFinder.RegisterHandler("/css", fileServer)
	handlerFinder.RegisterHandler("/js", fileServer)
	handlerFinder.RegisterHandler("/images", fileServer)
	return log_handler.NewLogHandler(fallback.NewFallback(handlerFinder, static.NewHandlerStaticContentReturnCode("not found", 404)))
}
