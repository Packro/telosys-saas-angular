'use strict';

/**
 * File editor
 */
angular.module('ide').directive('editor', function () {
    return {
      scope: {
        data: '='
      },

      templateUrl: 'app/ide/directive/ide.editor.directive.html',

      link: function ($scope, element, attrs) {
        /**
         * Watch "selected file"
         */
        $scope.$watch('data.selectedFile', function (newValue, oldValue) {
          if (newValue && newValue != null) {
            if (oldValue == null || newValue.id != oldValue.id) {
              // Cases :
              // - no selected file : the user opens a first file
              // - selected file id has changed : it is another file
              $scope.addEditor(newValue);
              element[0].children[0].children[0].style.display = 'block';
            }
          } else if (oldValue != null) {
            // Case :
            // - the user closes the selected file
            console.log("close editor", oldValue);
            var formatedFileId = $scope.formatFileId(oldValue.id);
            var numDiv = $scope.editors[formatedFileId].numDiv;
            element[0].children[1].children[numDiv].remove();
            delete $scope.editors[formatedFileId];
            element[0].children[0].children[0].style.display = 'none';
          } else {
            // by default : we close all files
            element[0].children[0].children[0].style.display = 'none';
          }
        }, true);

        /**
         * Update the display of Opened files
         */
        $scope.$watchCollection('workingFiles', function (newValue, oldValue) {

          // Files opened by user
          if (newValue) {
            // calculate new files
            var newFileIds = [];
            if (oldValue == null) {
              newFileIds = Object.keys(newValue);
            } else {
              for (var fileId in newValue) {
                if (oldValue[fileId] == null) {
                  newFileIds.push(fileId);
                }
              }
            }
            // add editor for new files
            for (var i = 0; i < newFileIds.length; i++) {
              var fileId = newFileIds[i];
              var file = newValue[fileId];
              $scope.addEditor(file);
            }
            console.log("new files", newFileIds);
          }

          // Files closed by user
          // TODO Close editors

        }, true);

        /**
         * Codemirror options for editor
         */
        $scope.editorOptions = {
          value: '',
          lineNumbers: true,
          extraKeys: {
            'Ctrl-S': function (cm) {
              console.log('Ctrl-S save method');
              $scope.saveFile();
            },
            'Cmd-S': function (cm) {
              console.log('Cmd-S save method');
              $scope.saveFile();
            }
          }
        };

        /**
         * Opened editors
         */
        $scope.editors = {};

        /**
         * Save the current selected file
         */
        $scope.saveFile = function() {
          if($scope.data.events.saveFile) {
            $scope.data.events.saveFile();
          }
        };

        /**
         * Close the current selected file
         */
        $scope.closeFile = function() {
          if($scope.data.selectedFile == null) {
            return;
          }

          // TODO Close editor

          if($scope.data.events.onCloseFile) {
            $scope.data.events.onCloseFile($scope.data.selectedFile.id);
          }
        };

        /**
         * Add an editor for the file
         * @param file File to opened in a new editor
         */
        $scope.addEditor = function (file) {
          if ($scope.editors[$scope.formatFileId(file.id)] != null) {
            $scope.showEditor(file.id);
            return;
          }

          $scope.hideAllEditors();
          var formatedFileId = $scope.formatFileId(file.id);
          console.log("add editor", element[0].children[1]);
          var newElement = $(element[0].children[1]).append('<div id="editorCodemirror_' + formatedFileId + '" class="codemirror"></div>');
          var editor = CodeMirror(newElement[0].children[newElement[0].children.length - 1], $scope.editorOptions);
          editor.setValue(file.content);
          editor.on('change', $scope.onContentChange);
          $scope.editors[formatedFileId] = {
            editor: editor,
            numDiv: newElement[0].children.length - 1
          };
        };

        /**
         * Hide all editors
         */
        $scope.hideAllEditors = function () {
          for (var i = 0; i < element[0].children[1].children.length; i++) {
            var div = element[0].children[1].children[i];
            if (div.style.display != 'none') {
              div.style.display = 'none';
            }
          }
        };

        /**
         * Show the editor for the file
         * @param fileId File id
         */
        $scope.showEditor = function (fileId) {
          var formatedFileId = $scope.formatFileId(fileId);
          if ($scope.editors[formatedFileId] == null) {
            return;
          }

          $scope.hideAllEditors();
          var numDiv = $scope.editors[formatedFileId].numDiv;
          var div = element[0].children[1].children[numDiv];
          div.style.display = 'block';
        };

        /**
         * Format the file id to an editor id
         * @param fileId File id
         * @returns Editor id
         */
        $scope.formatFileId = function (fileId) {
          return fileId.replace(/\./g, '_').replace(/\//g, '__').replace(/\\/g, '__');
        };

        /**
         * While editor content changes
         */
        $scope.onContentChange = function () {
          var formatedFileId = $scope.formatFileId($scope.data.selectedFile.id);
          $scope.data.selectedFile.content = $scope.editors[formatedFileId].editor.getValue();
          if ($scope.data.events.onContentChange) {
            $scope.data.events.onContentChange($scope.data.selectedFile.id);
          }
        };

        /**
         * Refresh the file content
         */
        $scope.refreshFile = function () {
          if ($scope.data.events.onRefreshFile) {
            $scope.data.events.onRefreshFile(function () {
              var formatedFileId = $scope.formatFileId($scope.data.selectedFile.id);
              $scope.editors[formatedFileId].editor.setValue($scope.data.selectedFile.content);
            });
          }
        }
      }
    }
  }
);