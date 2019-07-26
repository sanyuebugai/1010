var aType = [
	'row_2',
	'row_3',
	'row_4',
	'row_5',
	'clo_2',
	'clo_3',
	'clo_4',
	'clo_5',
	'square_1',
	'square_4',
	'square_9',
	'shape_s_lt',
	'shape_s_rt',
	'shape_s_lb',
	'shape_s_rb',
	'shape_l_lt',
	'shape_l_rt',
	'shape_l_lb',
	'shape_l_rb',
]
//记录各个方块基于左上角方块的增加个数，棋盘横排为10个
var type_info = {
	row_2: {point: [0,1], col:2, row:1, color:'#ffc107', class:'yellow'},
	row_3: {point: [0,1,2], col:3, row:1, color:'#ff9800', class:'org'},
	row_4: {point: [0,1,2,3], col:4, row:1, color:'#e91e63', class:'purplish'},
	row_5: {point: [0,1,2,3,4], col:5, row:1, color:'#ec1f10', class:'red'},
	clo_2: {point: [0,10], col:1, row:2, color:'#ffc107', class:'yellow'},
	clo_3: {point: [0,10,20], col:1, row:3, color:'#ff9800', class:'org'},
	clo_4: {point: [0,10,20,30], col:1, row:4, color:'#e91e63', class:'purplish'},
	clo_5: {point: [0,10,20,30,40], col:1, row:5, color:'#ec1f10', class:'red'},
	square_1: {point: [0], col:1, row:1, color:'#9b82da', class:'purple'},
	square_4: {point: [0,1,10,11], col:2, row:2, color:'#8bc34a', class:'green'},
	square_9: {point: [0,1,2,10,11,12,20,21,22], col:3, row:3, color:'#8bc34a', class:'green'},
	shape_s_lt: {point: [0,1,10], col:2, row:2, color:'#8bc34a', class:'green'},
	shape_s_rt: {point: [0,1,11], col:2, row:2, color:'#8bc34a', class:'green'},
	shape_s_lb: {point: [0,10,11], col:2, row:2, color:'#8bc34a', class:'green'},
	shape_s_rb: {point: [1,10,11], col:2, row:2, color:'#8bc34a', class:'green'},
	shape_l_lt: {point: [0,1,2,10,20], col:3, row:3, color:'#59daec', class:'blue'},
	shape_l_rt: {point: [0,1,2,12,22], col:3, row:3, color:'#59daec', class:'blue'},
	shape_l_lb: {point: [0,10,20,21,22], col:3, row:3, color:'#59daec', class:'blue'},
	shape_l_rb: {point: [2,12,20,21,22], col:3, row:3, color:'#59daec', class:'blue'},
}

var type_html = {
	row_2: '<div draggable="true" class="item row row_2" data-type="row_2"><div class="cube yellow"></div><div class="cube yellow"></div></div>',
	row_3: '<div draggable="true" class="item row row_3" data-type="row_3"><div class="cube org"></div><div class="cube org"></div><div class="cube org"></div></div>',
	row_4: '<div draggable="true" class="item row row_4" data-type="row_4"><div class="cube purplish"></div><div class="cube purplish"></div><div class="cube purplish"></div><div class="cube purplish"></div></div>',
	row_5: '<div draggable="true" class="item row row_5" data-type="row_5"><div class="cube red"></div><div class="cube red"></div><div class="cube red"></div><div class="cube red"></div><div class="cube red"></div></div>',
	clo_2: '<div draggable="true" class="item col clo_2" data-type="clo_2"><div class="cube yellow"></div><div class="cube yellow"></div></div>',
	clo_3: '<div draggable="true" class="item col clo_3" data-type="clo_3"><div class="cube org"></div><div class="cube org"></div><div class="cube org"></div></div>',
	clo_4: '<div draggable="true" class="item col clo_4" data-type="clo_4"><div class="cube purplish"></div><div class="cube purplish"></div><div class="cube purplish"></div><div class="cube purplish"></div></div>',
	clo_5: '<div draggable="true" class="item col clo_5" data-type="clo_5"><div class="cube red"></div><div class="cube red"></div><div class="cube red"></div><div class="cube red"></div><div class="cube red"></div></div>',
	square_1: '<div draggable="true" class="item square square_1" data-type="square_1"><div class="cube purple"></div></div>',
	square_4: '<div draggable="true" class="item square square_4" data-type="square_4"><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div></div>',
	square_9: '<div draggable="true" class="item square square_9" data-type="square_9"><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div></div>',
	shape_s_lt: '<div draggable="true" class="item shape_s shape_lt" data-type="shape_s_lt"><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div></div>',
	shape_s_rt: '<div draggable="true" class="item shape_s shape_rt" data-type="shape_s_rt"><div class="cube green"></div><div class="cube green"></div><div class="cube green transparent"></div><div class="cube green"></div></div>',
	shape_s_lb: '<div draggable="true" class="item shape_s shape_lb" data-type="shape_s_lb"><div class="cube green"></div><div class="cube green"></div><div class="cube green"></div></div>',
	shape_s_rb: '<div draggable="true" class="item shape_s shape_rb" data-type="shape_s_rb"><div class="cube green"></div><div class="cube green"></div><div class="cube green transparent"></div><div class="cube green"></div></div>',
	shape_l_lt: '<div draggable="true" class="item shape_l shape_lt" data-type="shape_l_lt"><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue transparent"></div><div class="cube blue transparent"></div><div class="cube blue"></div></div>',
	shape_l_rt: '<div draggable="true" class="item shape_l shape_rt" data-type="shape_l_rt"><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue transparent"></div><div class="cube blue transparent"></div><div class="cube blue"></div><div class="cube blue transparent"></div><div class="cube blue"></div></div>',
	shape_l_lb: '<div draggable="true" class="item shape_l shape_lb" data-type="shape_l_lb"><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue transparent"></div><div class="cube blue transparent"></div><div class="cube blue"></div></div>',
	shape_l_rb: '<div draggable="true" class="item shape_l shape_rb" data-type="shape_l_rb"><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue"></div><div class="cube blue transparent"></div><div class="cube blue transparent"></div><div class="cube blue"></div><div class="cube blue transparent"></div><div class="cube blue"></div></div>',
}