import angular from 'angular';

export const AlertModule = angular.module('alert.module', [])

.service('AlertService', class AlertService {
        constructor($timeout) {
            this.alert = {
                message: '',
                status: ''
            }
            this.$timeout = $timeout;
        }
        addAlert(message, status = "success") {
            this.alert.message = message;
            this.alert.status = "alert-" + status;
            this.$timeout(3000).then(() => this.alert.message = '');
        }
    })
    .controller('AlertController', class AlertController {
        constructor(AlertService) {
            this.alert = AlertService.alert;
        }
        close() {
            this.alert.message = '';
        }
    })

.name;