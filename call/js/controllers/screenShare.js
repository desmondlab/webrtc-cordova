/**
 * Screen Share controller
 */
(function() {
angular
	.module('App')

	.controller('ScreenShareController', [
		function () {
			'use strict';

			var vm = this;

			vm.share = {
				'networks':	['facebook', 'twitter', 'whatsapp', 'anywhere', 'sms', 'email'],
				'message':	'Custom share message',
				'subject':	'Custom share subject',
				'file':		'screenshot',
				'link':		'',
				'toArr':	['info@surfit.mobi'],
				'bccArr':	[],
				'ccArr':	[], 
				'phone':	'098765432'
			}
		}
	]);

})();
