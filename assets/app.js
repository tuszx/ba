// Define app
angular.module('ba',[
	'ui.router',
	'daterangepicker',
	"ui.bootstrap",
	"angularFileUpload",
	"ngCookies",
	"ui.mask",
	"blockUI",
	"chart.js"
])

// Router
.config([
	'$stateProvider', 
	'$locationProvider', 
	'uiMask.ConfigProvider', 
	"blockUIConfig",
	"ChartJsProvider",
	"$urlRouterProvider", 
	function ($stateProvider, $locationProvider, uiMaskConfigProvider, blockUIConfig, ChartJsProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state("dashboard",{
			url: "/",
			templateUrl: "/templates/dashboard/dashboard.html",
			controller: "DashboardCtrl"
		})

		.state("help",{
			url: "/help",
			templateUrl: "/templates/dashboard/help.html",
		})

		.state("admin",{
			url: "/admin",
			templateUrl: "/templates/admin/admin.html",
			controller: "AdminCtrl"
		})

		.state("profile",{
			url: "/profile",
			templateUrl: "/templates/user/profile.html",
			controller: "UserCtrl"
		})

		.state("event",{
			url: "/event",
			templateUrl: "/templates/event/event.html",
			controller: "EvenCtrl"
		})

		.state("book",{
			url: "/book",
			templateUrl: "/templates/book/book.html",
			controller: "BookCtrl"
		})

		.state("reader",{
			url: "/reader",
			templateUrl: "/templates/reader/reader.html",
			controller: "ReaderCtrl"
		})

		.state("borrow",{
			url: "/borrow",
			templateUrl: "/templates/borrow/borrow.html",
			controller: "BorrowCtrl"
		})
		.state("report", {})
		.state("report.borrow", {
			url: "/report/borrow",
			templateUrl: "/templates/report/borrow/borrow.html",
			controller: "ReportBorrowTimeCtrl"
		});

		$locationProvider.hashPrefix('');

		// ui mask config
	  uiMaskConfigProvider.clearOnBlur(false);
	  uiMaskConfigProvider.allowInvalidValue(true);
	  uiMaskConfigProvider.clearOnBlurPlaceholder(true);

	  // ui block 
	  blockUIConfig.message = 'Đang tải';

	  // chart
	  ChartJsProvider.setOptions({
	  	chartColors:  ['#0078ff', '#FF8A80'],
	  	layout: {
				padding: "10"
			},
      legend: {
      	display: true,
      	position: "bottom"
      },
			maintainAspectRatio: false,
	  });

}])
.run(["$rootScope", function($rootScope){
	$rootScope.BAM = {};
	$rootScope.BAM.isNavCollapsed = true;

	if(window.innerWidth < 800) {
		$rootScope.BAM.isMobile = true;	
	}

	$( window ).resize(function() {
		if(!$rootScope.BAM.isMobile && window.innerWidth < 800) {
			window.location.reload();
		} else if($rootScope.BAM.isMobile && window.innerWidth >= 800) {
			window.location.reload();
		}
	});
}]);