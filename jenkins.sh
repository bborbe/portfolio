#!/bin/sh

SOURCEDIRECTORY="github.com/bborbe/portfolio"
INSTALLS="github.com/bborbe/portfolio/bin/portfolio_server"
VERSION="1.0.1-b${BUILD_NUMBER}"
NAME="portfolio"

export GOROOT=/opt/go1.5.1
export PATH=$GOROOT/bin:$PATH
export GOPATH=${WORKSPACE}
export REPORT_DIR=${WORKSPACE}/test-reports
DEB="${NAME}_${VERSION}.deb"
rm -rf $REPORT_DIR ${WORKSPACE}/*.deb ${WORKSPACE}/pkg
mkdir -p $REPORT_DIR
PACKAGES=`cd src && find $SOURCEDIRECTORY -name "*_test.go" | /opt/utils/bin/dirof | /opt/utils/bin/unique`
FAILED=false
for PACKAGE in $PACKAGES
do
    XML=$REPORT_DIR/`/opt/utils/bin/pkg2xmlname $PACKAGE`
    OUT=$XML.out
    go test -i $PACKAGE
    go test -v $PACKAGE | tee $OUT
    cat $OUT
	/opt/go2xunit/bin/go2xunit -fail=true -input $OUT -output $XML
	rc=$?
	if [ $rc != 0 ]
	then
	    echo "Tests failed for package $PACKAGE"
    	FAILED=true
	fi
done

if $FAILED
then
  echo "Tests failed => skip install"
  exit 1
else
  echo "Tests success"
fi

echo "Tests completed, install to $GOPATH"

go install $INSTALLS

echo "Install completed, create debian package"

/opt/debian/bin/create_debian_package \
-loglevel=DEBUG \
-version=$VERSION \
-config=src/$SOURCEDIRECTORY/create_debian_package_config.json || exit 1

echo "Create debian package completed, upload"

/opt/aptly/bin/aptly_upload \
-loglevel=DEBUG \
-url=http://aptly.benjamin-borbe.de \
-username=api \
-password=KYkobxZ6uvaGnYBG \
-file=$DEB \
-repo=unstable || exit 1

echo "Upload completed"

