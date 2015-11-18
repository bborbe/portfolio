#!/bin/sh


export DEBFULLNAME="Benjamin Borbe"
export EMAIL=bborbe@rocketnews.de

export DEB_SERVER=misc.rn.benjamin-borbe.de
export TARGET_DIR=opt/portfolio/bin

export NAME=portfolio
export BINS="portfolio_server"
export INSTALLS="github.com/bborbe/portfolio/bin/portfolio_server"
export SOURCEDIRECTORY="github.com/bborbe/portfolio"

export MAJOR=0
export MINOR=1
export BUGFIX=0

# exec
sh src/github.com/bborbe/jenkins/jenkins.sh