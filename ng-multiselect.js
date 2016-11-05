(function() {

var app = angular.module('ng-multiselect',[]);
app.directive('select' , ['$compile',function($compile) {
        console.log('found directive');
	return {
		restrict: 'E',
                replace: true,
                priority: 10, //to make sure default select directive runs before this one.
		scope: {
                    options: '='
		},
                link:  function ($scope, elm, attrs) {
                    if(!attrs.multiple) {
                        return;
                    }
                    
                            
                    $scope.transfer = $scope.transfer || function(from, to, index) {
                            if (index >= 0) {
                                    to.push(from[index]);
                                    from.splice(index, 1);
                            } else {
                                    for (var i = 0; i < from.length; i++) {
                                            to.push(from[i]);
                                    }
                                    from.length = 0;
                            }
                    };
                    
                    var style = '<style>.ng-multiselect label{margin: 10px;}.ng-multiselect .btn {margin: 10px;}.ng-multiselect .pool {border: 1px solid #999;border-radius: 4px; padding: 10px;margin: 5px; height: 150px; overflow-y: scroll;}.ng-multiselect .pool ul { list-style: none;  padding-left:0px;}.ng-multiselect .pool ul li {  width: 100%;  padding: 4px 8px 4px 4px;  border-bottom: 1px dotted #CFCFCF;}.ng-multiselect .pool ul li a:hover {  text-decoration: none;}</style>';
                    
                    var template = style + '<div class="ng-multiselect"> <div class="row"> <div class="col-lg-12 col-md-12 col-sm-12"> <h4 ng-hide="options.title == null">{{options.title}}<small>&nbsp;{{options.helpMessage}}</small> </h4> <input ng-hide="options.disableFilter" class="form-control" placeholder="{{options.filterPlaceHolder}}" ng-model="searchTerm"> </div></div><div class="row"> <div class="col-lg-6 col-md-6 col-sm-6"> <label>{{options.labelAll}}</label> <button type="button" class="btn btn-default btn-xs" ng-click="transfer(options.items, options.selectedItems, -1)"> Select All </button> <div class="pool"> <ul> <li ng-repeat="item in options.items | filter: searchTerm | orderBy: options.orderProperty"> <a href="" ng-click="transfer(options.items, options.selectedItems, options.items.indexOf(item))">{{item.name}}&nbsp;&rArr; </a> </li></ul> </div></div><div class="col-lg-6 col-md-6 col-sm-6"> <label>{{options.labelSelected}}</label> <button type="button" class="btn btn-default btn-xs" ng-click="transfer(options.selectedItems, options.items, -1)"> Deselect All </button> <div class="pool"> <ul> <li ng-repeat="item in options.selectedItems | orderBy: options.orderProperty"> <a href="" ng-click="transfer(options.selectedItems, options.items, options.selectedItems.indexOf(item))"> &lArr;&nbsp;{{item.name}}</a> </li></ul> </div></div></div></div>';
                    
                    var $select = angular.element(elm);
                    var $options = $select.find('option');
                    console.dir($options);

                    if($options.length > 0) {
                        var items = [];
                        angular.forEach($options, function(item) {
                            items.push({id: item.value, name: item.text});
                        });
                        $scope.options = $scope.options || {};
                        $scope.options.items = items;
                    }
                    
                    var html = $compile(template)($scope);

                    
                    $select.replaceWith(html);
                }
        };

}]);
})();


