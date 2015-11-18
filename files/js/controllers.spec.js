describe('StartCtrl TestSuite', function () {
  beforeEach(module('portfolioApp'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  it('controller not null', function () {
    var $scope = {};
    var controller = $controller('StartCtrl', {$scope: $scope});
    expect(controller).not.toBe(null);
  });
});