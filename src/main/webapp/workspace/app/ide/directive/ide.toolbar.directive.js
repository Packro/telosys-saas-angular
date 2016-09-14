'use strict';

angular.module('ide')
  .directive('idetoolbar', ['$uibModal', function ($uibModal) {
    return {

      scope: {
        data: '=',
        profile: '='
      },

      templateUrl: 'app/ide/directive/ide.toolbar.directive.html',

      link: function ($scope, element, attrs) {

        $scope.events = $scope.data.events;

        /**
         * Change view
         */
        $scope.changeView = function (view) {
          $scope.data.events.changeView(view);
        };

        /**
         * Download the project in a ZIP file
         */
        $scope.download = function () {
          console.log('download');
          $scope.data.events.onDownload();
        };

        /**
         * Add a new project
         */
        $scope.addProject = function () {
          console.log('addProject');
          // Modal window to create a new project
          $uibModal.open({
            templateUrl: 'app/modal/modal.createproject.html',
            controller: 'modalCtrl',
            resolve: {
              data: {}
            }
          });
        };

        /**
         * Change the password for the current user
         * the function open a modal window
         */
        $scope.changePassword = function () {
         $uibModal.open({
            templateUrl: 'app/modal/modal.changepassword.html',
            controller: 'modalCtrl',
            resolve: {
              data: {}
            }
          });
        };

        /**
         * Init and Open a modal window to configure the project
         */
        $scope.openConfiguration = function () {
          $scope.data.configuration.events.getConfiguration(function () {
            $scope.configuration = true;
            var modalInstance = $uibModal.open({
              templateUrl: 'app/modal/modal.configuration.html',
              size: 'lg',
              controller: 'modalCtrl',
              resolve: {
                data: $scope.data.configuration
              }
            });
            modalInstance.result.then(function () {
              $scope.configuration = false;
            }, function () {
              $scope.configuration = false;
            });
          });
        }

      }
    }
  }]);