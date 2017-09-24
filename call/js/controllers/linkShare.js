/**
 * Link Share controller
 */
(function() {
angular
	.module('App')

	.controller('LinkShareController', [
		function () {
			'use strict';

			var vm = this;

			vm.share = {
				// 'networks':	['facebook', 'twitter', 'whatsapp', 'anywhere', 'sms', 'email'],
				'networks':	['anywhere'],
				'message':	'Custom share message',
				'subject':	'Custom share subject',
				'file':		'',
				'link':		'http://surfit.mobi',
				'toArr':	['info@surfit.mobi'],
				'bccArr':	[],
				'ccArr':	[], 
				'phone':	'098765432'
			}
		}
	]);

})();
