hd.directive('abc', [function () {
	return {
		restrict: 'A',
		template:'<h1>ksks</h1>',
		link: function (scope, iElement, iAttrs) {
			require(['jquery'],function($){
				alert($(document.body).html());
			});
		}
	};
}])