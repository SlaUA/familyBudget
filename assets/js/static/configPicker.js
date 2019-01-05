define([
	'jquery'
], function (jQuery) {

	return function () {
		jQuery.extend(jQuery.fn.pickadate.defaults, {
			monthsFull: [
				'Январь',
				'Февраль',
				'Март',
				'Апрель',
				'Май',
				'Июнь',
				'Июль',
				'Август',
				'Сентябрь',
				'Октябрь',
				'Ноябрь',
				'Декабрь'
			],
			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			weekdaysFull: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			weekdaysShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
			today: 'сегодня',
			clear: 'удалить',
			close: 'закрыть',
			firstDay: 1,
			format: 'dd.mm.yyyy',
			formatSubmit: 'dd.mm.yyyy'
		});

		jQuery.extend(jQuery.fn.pickadate.defaults, {
			clear: 'удалить'
		});
	};
});
