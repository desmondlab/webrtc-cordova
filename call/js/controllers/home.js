/**
 * Home controller
 */
(function() {
angular
	.module('App')

	.controller('HomeController', [
		function () {
			'use strict';

			var vm = this;

			vm.share = {
				'networks':	['facebook', 'twitter', 'whatsapp', 'anywhere', 'sms', 'email'],
				'message':	'Custom share message',
				'subject':	'Custom share subject',
				'file':		'www/img/ionic.png',
				'link':		'http://surfit.mobi',
				'toArr':	['info@surfit.mobi'],
				'bccArr':	[],
				'ccArr':	[], 
				'phone':	'098765432'
			}
		}
	]);

})();
