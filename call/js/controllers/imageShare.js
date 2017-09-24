/**
 * Image Share controller
 */
(function() {
angular
	.module('App')

	.controller('ImageShareController', [
		function () {
			'use strict';

			var vm = this;
/* https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/issues/692 */
			vm.share = {
				'networks':	['facebook', 'twitter', 'whatsapp', 'anywhere', 'sms', 'email'],
				'message':	'Custom share message',
				'subject':	'Custom share subject',
				'file':		'www/img/ionic.png',
				'link':		'',
				'toArr':	['info@surfit.mobi'],
				'bccArr':	[],
				'ccArr':	[], 
				'phone':	'098765432'
			}
		}
	]);

})();
