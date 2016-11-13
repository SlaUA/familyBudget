define([
		'jquery',
		'underscore',
		'backbone',
		'Dropbox',
		'text!../templates/mainSyncTemplate.html'
], function (jQuery,
             _,
             Backbone,
             Dropbox,
             mainSyncTemplate) {

		return Backbone.View.extend({

				el: '#mainWrapper',

				CLIENT_ID         : 'kwtn9lz5ronhbk1',
				APP_CONFIG_PATH   : '/savingsAppSettings.json',
				APP_REDIRECT_URL  : 'http://localhost/savingsApp',
				DEVICE_READY_EVENT: 'deviceready',

				oAuthToken  : localStorage.getItem('oauth') || '',
				dbxClient   : null,
				target      : '_self',
				options     : 'location=no,hidden=no',
				inAppBrowser: null,
				$syncDate   : null,
				authDeferred: null,

				events: {
						'click .saveInfo'    : 'saveDataToServer',
						'click .downloadInfo': 'downloadData'
				},

				initialize: function () {

						this.$el.append(mainSyncTemplate);
						this.$syncDate = this.$el.find('.syncDate');

						this.authorize()
						    .done(this.render.bind(this))
						    .fail(this.authReject.bind(this));
				},

				authorize: function () {

						this.authDeferred = jQuery.Deferred();

						if (this.oAuthToken) {
								return this.authDeferred.resolve();
						}

						this.inAppBrowser =
							cordova.InAppBrowser
							       .open(this.dbxClient.getAuthenticationUrl(this.APP_REDIRECT_URL), target, options);

						this.inAppBrowser.addEventListener('loadstart', this.onAuthUrlChange.bind(this));

						return this.authDeferred.promise();
				},

				onAuthUrlChange: function (data) {

						if (!~data.url.indexOf('#access_token')) {
								return;
						}
						this.oAuthToken = (/access_token=(.*?)\&/g.exec(data.url) || [, ''])[1];
						localStorage.setItem('oauth', this.oAuthToken);
						this.inAppBrowser.close();
						this.inAppBrowser = null;
						this.authDeferred.resolve();
				},

				authReject: function () {

						history.back();
						window.app.trigger('spinnerHide');
						localStorage.removeItem('oauth');
				},

				render: function () {

						this.dbxClient = new Dropbox({
								accessToken: this.oAuthToken,
								clientId   : this.CLIENT_ID
						});

						this.dbxClient
						    .filesGetMetadata({path: this.APP_CONFIG_PATH})
						    .then(function (response) {

								    this.updateLastChange(response.server_modified);
						    }.bind(this))
						    .catch(function () {
						    });

						window.app.trigger('addNewView', this);
						window.app.trigger('pageChangeEnd');
				},

				saveDataToServer: function () {

						var appSettings = {};

						Object.keys(localStorage).forEach(function (key) {

								if (!(~key.indexOf('Collection'))) {
										return;
								}
								appSettings[key] = localStorage.getItem(key);
						});

						window.app.trigger('spinnerShow');

						this.dbxClient.filesUpload({
								    path    : this.APP_CONFIG_PATH,
								    contents: JSON.stringify(appSettings),
								    mode    : 'overwrite'
						    })
						    .then(function (response) {

								    this.updateLastChange(response.server_modified);
								    window.app.trigger('spinnerHide');
								    alert('Сохранено!');
						    }.bind(this))
						    .catch(this.authReject);
				},

				downloadData: function () {

						var fileIsReady = jQuery.Deferred();

						window.app.trigger('spinnerShow');

						this.dbxClient.filesDownload({
								path: this.APP_CONFIG_PATH
						}).then(function (response) {

								    var reader = new FileReader();
								    reader.addEventListener('load', function () {

										    fileIsReady.resolve(JSON.parse(this.result));
								    });
								    reader.readAsText(response.fileBlob);

								    return fileIsReady.promise();
						    }.bind(this))

						    .then(function (data) {

								    Object.keys(data)
								          .forEach(function (key) {

										          localStorage.setItem(key, data[key]);
								          });
								    window.app.trigger('spinnerHide');
								    alert('Готово!');
								    location.reload();
						    }).catch(function () {

								alert('Нечего загружать :(');
						});
				},

				updateLastChange: function (lastTimeModify) {

						var date = new Date(lastTimeModify);
						this.$syncDate.text(
							date.getDate() +
							'.' +
							(date.getMonth() + 1) +
							'.' +
							date.getFullYear() +
							', в ' +
							date.getHours() +
							':' +
							date.getMinutes() +
							':' +
							date.getSeconds()
						);
				}
		});
});