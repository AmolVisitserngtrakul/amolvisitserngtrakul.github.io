// NEW selector
var debug = false;
jQuery.expr[':'].Contains = function(a, i, m){
 return jQuery(a).text().toUpperCase()
   .indexOf(m[3].toUpperCase()) >= 0;
};

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("(\[" + key + "\])", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
　　　　　　　　　　   var reg= new RegExp("(\\[)" + i + "(\\])", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

$(document).ready(function(e) {
	setAgeRangeHTML();
	setTimeout("$('.pwd:eq(0) input').prop('type', 'password');", 1000);
	$('#step').animate({height: $('#step>div.on').outerHeight(true)}, '10',function(){
		// $('#step>div').hide();
		// $('#step>div.on').show();
		$('#step').animate({height: $('#step>div.on').outerHeight(true)}, 500);
	});

	$('#back').click(function(e) {
		beforePost = "";
		var _this = $('#step>div.on');

		if(typeof esy_registeParam.currentStepNum == "undefined"){
			esy_registeParam.currentStepNum = 0;
		}

		esy_registeParam.currentStepNum -=2;
		if(esyStep[esy_registeParam.currentStepNum]['column'] == 'nname'){
			esy_registeParam.currentStepNum--;
		}
		if(esy_registeParam.currentStepNum<0){
			esy_registeParam.currentStepNum =0;
		}
		nextStep();
		var _this = $('#step>div.on');
		_this.next().removeClass('ok');

		$('#step').animate({height: $('#step>div.on').outerHeight(true)}, '10',function(){
			$('#step').animate({height: $('#step>div.on').outerHeight(true)}, 500);
		});

		hideMsg();
	});
	$('#lang img,#lang span').click(function(e) {
		$(this).siblings('ul').slideToggle('slow');
	});
	$('#lang li').click(function(e) {
		var _this = $(this);
		_this.parent().slideUp('slow').siblings('span').html(_this.text());

		var args = {};
		args.c = "user";
		args.m = "setLanguage";
		args.lang = _this.attr('code');
		post(args,function(data){
			if(debug){
				console.log('select lang success');
			}
			window.location.reload();
		},function(data){
			if(debug){
				console.log('select lang failed');
			}
		})
	});
	$('.story textarea').keyup(function(e) {
		if($(this).val().length>1000){
			$(this).val($(this).val().substring(0,1000));
		}
		$('#step>div.on .char span').html($(this).val().length);
		$(this).next().attr('columnvalue', $(this).val());
	}).blur(function(e) {
		var _this = $(this);
		_this.next('input').val(_this.val());
	});
	$('.upload img').click(function(e) {
		$(this).siblings('input').click();
	});


	$('input').focus(function(e) {
		$(this).next('div.line').addClass('on');
		if(esy_registeParam.gender != null && esy_registeParam.gender == 'F'){
			$(this).next('div.line').addClass('female');
		}
	}).blur(function(e) {
		$(this).next('div.line').removeClass('on');
		if(esy_registeParam.gender != null && esy_registeParam.gender == 'F'){
			$(this).next('div.line').removeClass('female');
		}
	});
	$('.mail').blur(function(e) {
		var _this = $(this);
		if( _this.val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/) ){
			$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
			$('#msg').hide();
		}else{
			showMsg(_this);
		}
	});


	$('.showDrop, .dropInp').click(function(e) {
		e.stopPropagation();
		$(this).siblings('ul').slideToggle();
		$('#step').animate({height: $('#step>div.on').outerHeight(true)+180}, 1000);
		$(this).siblings('ul').children("li").children("lable").each(function(index, el) {
			var _this = $(this);
			if(_this.width() >= 295){
				_this.parent().addClass('overflow');
			}
		});
	});
	$('.showPwd').click(function(e) {
		e.stopPropagation();
		var _this = $(this);
		if(_this.attr('isClick')){
			_this.attr('isClick', '').html(_this.attr('show_password')).next('input').prop('type', 'password');
		}else{
			_this.attr('isClick', '1').html(_this.attr('hide_password')).next('input').prop('type', 'text');
		}
		_this.next('input').focus();
	});
	$('.dropList li').click(function(e) {
		var month = [31,29,31,30,31,30,31,31,30,31,30,31],
			_this = $(this),
			_parent =_this.parent();
		_this.addClass('on').siblings().removeClass('on');
		_parent.slideUp('slow').siblings('.dropInp').val(_this.text()).attr('columnvalue', _this.attr('code'));


		if(_parent.parent().parent().hasClass('career')){
			if($(this).attr('sp') == 'others'){
				$('#career').attr('column', 'career_other');
				$('[idx="career_other_div"]').show();
				return;
			}else{
				$('#career').attr('column', 'career');
				$('[idx="career_other_div"]').hide();
			}
		}


		// 根据选择的国家设置语言
		var cty_id = _parent.siblings("input[column='cty_id']").attr('columnvalue');
		if(cty_id){
			var args ={};
			args.c = "register";
			args.m = "update_sys_user";
			args.cty_id = cty_id;
			post(args,function(){
				if(debug){
					console.log('set lang/cty_id success');
				}
				location.href = location.href;
				location.replace(location.href);
				window.location.reload();
			},function(){
				if(debug){
					console.log('set lang/cty_id failed');
				}
			});
		}

		if(_parent.hasClass('month')){
			$('.dropList.day li').show();
			$('.dropList.day li:gt('+(month[_this.index()]-1)+')').hide();
			$('.timeDay .dropInp').val('');
		}
		if(_parent.hasClass('year')||_parent.hasClass('month')||_parent.hasClass('day')||_parent.hasClass('cty')||_parent.hasClass('changeLang')){
			$('#dob').val('1900-01-01');
			return;
		}
		runStep();
	});

	$('select').change(function(e) {

		$(this).blur();

		var month = [31,29,31,30,31,30,31,31,30,31,30,31],
			_this = $(this);
			_this.siblings('.dropInp').val(_this.val()).attr('columnvalue', _this.val());


		if(_this.parent().parent().hasClass('career')){
			if(_this.val() == '32'){
				$('#career').attr('column', 'career_other');
				$('[idx="career_other_div"]').show();
				$('#step').animate({height: $('#step>div.on').outerHeight(true)}, 1000);
				return;
			}else{
				$('#career').attr('column', 'career');
				$('[idx="career_other_div"]').hide();
			}
		}


		// 根据选择的国家设置语言
		if(_this.hasClass('selCty')){
			var cty_id = _this.val();
			if(cty_id){
				var args ={};
				args.c = "register";
				args.m = "update_sys_user";
				args.cty_id = cty_id;
				post(args,function(){
					if(debug){
						console.log('set lang/cty_id success');
					}
					// location.href = location.href;
					// location.replace(location.href);
					// window.location.reload();
					var action = window.location.href;
					form = jQuery("<form></form>");
    				form.attr('action', action);
    				form.attr('method', 'post');
    				form.appendTo("body");
    				form.css('display', 'none');
    				form.submit();


    				location.href = location.href;
					location.replace(location.href);
					window.location.reload();
				},function(){
					if(debug){
						console.log('set lang/cty_id failed');
					}
				});
			}
		}

//
//		if(_parent.hasClass('month')){
//			$('.dropList.day li').show();
//			$('.dropList.day li:gt('+(month[_this.index()]-1)+')').hide();
//			$('.timeDay .dropInp').val('');
//		}
//		if(_parent.hasClass('year')||_parent.hasClass('month')||_parent.hasClass('day')||_parent.hasClass('cty')||_parent.hasClass('changeLang')){
//			return;
//		}
		runStep();
	});

	$('.input').on('blur', this, function(event) {
		var _this = $(this);
		_this.attr('columnvalue', _this.val());
		if(_this.hasClass('opacity')){
			_this.addClass('opacity30');
			_this.prev('.opacity').addClass('opacity30');
			_this.parent().prev('.opacity').addClass('opacity40');
		}
		if(_this.attr('sp') == 'others'){
			$('#career').attr('columnvalue', _this.val());
		}
	});

	$('.input').on('focus', this, function(event) {
		var _this = $(this);
		_this.parent().siblings('div.opacity').addClass('opacity40').next().children('input').addClass('opacity30');

		if(_this.hasClass('opacity')){
			_this.removeClass('opacity30');
			_this.prev('.opacity').removeClass('opacity30');
			_this.parent().prev('.opacity').removeClass('opacity40');
			if(_this.parent().prev().prev().hasClass('opacity') ){
				_this.parent().prev().prev().removeClass('opacity40');
			}
		}
	});

	$('.user_info.career .dropInp').on('keyup', this, function(){
		var _this = $(this),
			_ul = _this.siblings('.dropList');
			if(_this.val() == ""){
				_ul.find('li').show();
			}

			if(_this.val()){
				_ul.find('li').hide();
				_ul.find('li:Contains('+_this.val()+')').show();
			}
	});

	$('.step2 .imgBox,.step2 .mimgBox').click(function(e) {
		$(this).addClass('on').siblings().removeClass('on');
		// $('#sex').val($(this).index());
		$('#sex').val($(this).attr('code')).attr("columnvalue",$(this).attr('code'));
//		var bg = $(this).index() ? 'rgba(120,120,120,.4)' : 'rgba(0,0,0,.4)';
//        $('.bgopacity').css('background-color', bg);
	});
	$('.pics .imgBox,.pics .mimgBox').click(function(e) {
		var _this = $(this);
		_this.addClass('on').siblings().removeClass('on');
		_this.siblings('input').val(_this.index()).attr('columnvalue',_this.index());
		runStep();
	});
	$('.quizType li, .elList li').click(function(){
		var _this = $(this);
		_this.toggleClass('on');
		var code = _this.parent().find('li.on').map(function(){
				// return $(this).text();
				return $(this).attr('code');
			}).get().join(',');
		_this.siblings('input').attr("columnvalue",code).val(code);
	});

	$('.opt li').click(function(e) {
		var _this =$(this);
		if( _this.is(':empty') ){ return;	}

		if(_this.parent().parent().hasClass('left')){
			var preParentClass = '#step>div.on .right';
			var addPosition = ' li:empty:eq(0)';
		}else{
			var preParentClass =  '#step>div.on .left';
			var addPosition = ' li:eq('+ _this.attr('code')+')';
		}

		$(preParentClass + addPosition).html(_this.html()).removeClass('on').attr('code', _this.attr('code'));;
		_this.addClass('on').html('').removeAttr('code');
		var code = $('#step>div.on .right li:not(.on)').map(function(){
				// return $(this).text();
				return $(this).attr('code');
			}).get().join(',');
		$('#step>div.on .rank').val(code).attr('columnvalue', code);
	});
	$('.opt2 li').click(function(e) {
		var _this =$(this),
			chosen1 = $('#step>div.on .chosen:eq(0)'),
			chosen2 = $('#step>div.on .chosen:eq(1)');
		if ( !_this.hasClass('on') ){
			if( chosen1.hasClass('on') ){
				// chosen2.hasClass('on') && chosen2.html(chosen1.html());
				chosen1.html(_this.html()).removeClass('on');
				$('#step>div.on .mostDescribe').val(_this.attr("code")).attr('columnvalue', _this.attr("code"));
				_this.addClass('on').html('');
			}else{
				if( chosen2.hasClass('on') ){
					chosen2.html(_this.html()).removeClass('on');
					$('#step>div.on .leastDescribe').val(_this.attr("code")).attr('columnvalue', _this.attr("code"));
					_this.addClass('on').html('');
				}else{return;}

			}

		}
	});
	$('.chosen').click(function(e) {
		var _this =$(this),
			chosen1 = $('#step>div.on .chosen:eq(0)'),
			chosen2 = $('#step>div.on .chosen:eq(1)');
		if ( _this.hasClass('on') ){
			return;
		}else{
			$('#step>div.on .opt2 li:empty:eq(0)').html(_this.html()).removeClass('on');
			_this.addClass('on').html(_this.attr("msg"));
		}
		if(chosen1.hasClass('on')){
			$('#step>div.on .mostDescribe').val("").attr('columnvalue', '');
		}
		if(chosen2.hasClass('on')){
			$('#step>div.on .leastDescribe').val("").attr('columnvalue', '');;
		}
	});
	$('.circle').each(function(index, el) {
		var num = $(this).find('span').text() * 3.6;
		if (num<=180) {
			$(this).find('.circle_right').css('transform', 'rotate(' + num + 'deg)');
		} else {
			$(this).find('.circle_right').css('transform', 'rotate(180deg)');
			$(this).find('.circle_left').css('transform', 'rotate(' + (num - 180) + 'deg)');
		};
	});


	$('.clickLogin, .clickRegister,.clickLoginNew, .clickRegisterNew').click(function(e) {
		$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
		$('#msg').hide();
		var _on = $('#step>div.on').removeClass('on');
		if ($(this).hasClass('clickRegister') || $(this).hasClass('clickRegisterNew')) {
			$('.indexRegister').addClass('on');
			sentAnalyticsData("/?c=register");
		}else{
			$('.indexLogin').addClass('on');
		}
		changeContinueText("");
	});

	$('.resend').click(function(e) {
		resendPin(this);
	});

	// 初始化步骤

	nextStep();

	$(window).keydown(function(event){
		if(event.which==13){

			var falg = true;
			if($(":focus").size() > 0){
				$('#step>div.on input').each(function(index, element) {
					var _this = $(this);
					if(_this.val() == '' && !_this.hasClass('hi') && falg){
						_this.focus();
						falg = false;
					}
				});
			}
			if(!falg){
				return;
			}
			var _this = $('#step>div.on');
			if( _this.hasClass('user_story')){
				return;
			}
			$('input').blur();
			runStep()
		}
	});

	$('.next,.nextNew, .press').click(function(e) {
		runStep($(this))
	});

	$("input[name='uploadedfile']").change(function(e) {
		runStep($(this));
	});
	$(window).click(function(e) {
		if(e.target.tagName == 'LI' || e.target.tagName == 'LABLE' || e.target.tagName == 'INPUT'){
			return;
		}
		if(!$('#step>div.on').find('ul.dropList').is(":hidden")){
			$('#step>div.on').find('ul.dropList').slideToggle();
		}
	});

	$('.del').click(function(){
		hidePop();
	});


	$('.user_info.height .dropInp').on('keyup', this, function(){
		var _this = $(this),
			_ul = _this.siblings('.dropList');
			if(_this.val() == ""){
				_ul.find('li').show();
			}

			if(_this.val()){
				_ul.find('li').hide();
				_ul.find('li:Contains('+_this.val()+')').show();
			}
	});

	$('.user_info.height .dropInp,.user_info.weight .dropInp').on('blur', this, function(){

		var careerFlag = false;
		var _this = $(this),
			_ul = _this.siblings('.dropList');
			_this.attr('columnvalue',"");
		if(_this.val() != ""){
			_ul.find('li:Contains('+_this.val()+')').each(function(index, el) {
				if($(this).text().toLowerCase() == _this.val()){
					careerFlag = true;
					_this.attr('columnvalue', $(this).attr('code'));
				}
			});
			if(!careerFlag){
				_this.attr('columnvalue',_this.val());
			}
		}

	});
	//  if user login once already , redirect to login
	if($('.indexRegister').hasClass('on') && $('#l_mail').val() != null && $('#l_mail').val() != ''){
		if ($('#r_mail').val() == null || $('#r_mail').val() == '') {
			$('.clickLogin').trigger('click');
		}
	}

	$('#dob').on('blur', this, function(){

		var dob = $(this).val();

		if(dob != ''){
			var dateArr = dob.split("-");
			$('[column="year"]').val(dateArr[0]);
			$('[column="month"]').val(dateArr[1]);
			$('[column="day"]').val(dateArr[2]);

			$('[column="year"]').attr('columnvalue',dateArr[0]);
			$('[column="month"]').attr('columnvalue',dateArr[1]);
			$('[column="day"]').attr('columnvalue',dateArr[2]);
		}
	});

});

$(window).load(function(e) {
	$('.opt2 > li div').each(function(index, el) {
		var _this = $(this);
		if(_this.children().height() >= 25){
			_this.addClass('overflow');
		}
		if(_this.children().width() >= _this.width()){
			_this.addClass('overflow');
		}
	});

	$('.elList > li').children("lable").each(function(index, el) {
		var _this = $(this);
		if(_this.height() >= 25){
			_this.parent().addClass('overflow');
		}
		if(_this.width() >= 220){
			_this.parent().addClass('overflow');
		}
		if(_this.width() >= _this.parent().width()){
			_this.parent().addClass('overflow');
		}
	});

	$('.quizType li').children("lable").each(function(index, el) {
		var _this = $(this);
		if(_this.height() >= 25){
			_this.parent().addClass('overflow');
		}
	});
});


function updateProcess(process,label){
	$(".process").each(function(){
		$(this).text(process);
	  });
	$(".processLabel").each(function(){
		$(this).text(label);
	  });
	var num = (process/100) * 360;
	if (num<=180) {
		$('.circle_right').css('transform', 'rotate(' + num + 'deg)');
	} else {
		$('.circle_right').css('transform', 'rotate(180deg)');
		$('.circle_left').css('transform', 'rotate(' + (num - 180) + 'deg)');
	};
}

function getRegisterStepData(success,failed){
	var args ={};
	args.c = "register";
	args.m = "registerStepData";
	post(args,function(data){
		esy_stepdata = data;
		esyStep = data.data;
		if(debug){
			console.log('reset Step ok');
		}
		success && success();
	},function(){
		if(debug){
			console.log('reset Step failed');
		}
		failed && failed();
	});
}
function login(args,success,failed){
	args.c = "user";
	args.m = "login";
	esyStep = [{"type":"update","table":"sys_user","column":"cty_id"},{"type":"update","table":"sys_user","column":"gender"},{"type":"update","table":"sys_user","column":"hear_us_from"},{"type":"update","table":"sys_user","column":"state_id"},{"type":"update","table":"sys_user","column":"date_place_ids"},{"type":"update","table":"sys_user","column":"dob"},{"type":"update","table":"sys_user","column":"nname"},{"type":"update","table":"sys_user","column":"handphone"},{"type":"update","table":"mobile_verify","column":"verify"},{"type":"meetyou","value":10,"msg":null},{"type":"update","table":"user_info","column":"career"},{"type":"update","table":"user_info","column":"income"},{"type":"update","table":"user_info","column":"education"},{"type":"update","table":"user_info","column":"smoking"},{"type":"update","table":"user_info","column":"drinking"},{"type":"update","table":"user_info","column":"travel"},{"type":"update","table":"user_info","column":"exercise"},{"type":"update","table":"user_info","column":"ethnicity"},{"type":"update","table":"sys_user","column":"mstatus"},{"type":"update","table":"user_info","column":"nationality"},{"type":"update","table":"user_info","column":"religion"},{"type":"update","table":"user_info","column":"planguage"},{"type":"update","table":"user_info","column":"slanguage"},{"type":"update","table":"user_info","column":"want_children"},{"type":"update","table":"user_info","column":"children_num"},{"type":"progress","value":20,"msg":"20% - คุณรู้หรือไม่ว่าสมาชิกส่วนใหญ่ของเราเป็นระดับผู้บริหาร ผู้จัดการ นักธุรกิจ และกำลังมองหาความสัมพันธ์ที่จริงจัง "},{"type":"update","table":"match_flex","column":"age"},{"type":"update","table":"match_flex","column":"height"},{"type":"update","table":"match_flex","column":"distance"},{"type":"update","table":"match_flex","column":"religion"},{"type":"update","table":"match_flex","column":"ethnicity"},{"type":"update","table":"match_flex","column":"income"},{"type":"update","table":"match_flex","column":"education"},{"type":"update","table":"match_flex","column":"children"},{"type":"update","table":"match_flex","column":"mstatus"},{"type":"update","table":"match_flex","column":"drink"},{"type":"update","table":"match_flex","column":"smoke"},{"type":"update","table":"match_flex","column":"exercise"},{"type":"progress","value":40,"msg":"40% คุณรู้หรือไม่ว่าเราได้จัดเดทไปมากกว่า 30,000 คู่แล้ว"},{"type":"update","table":"physical","column":"q1"},{"type":"update","table":"physical","column":"q2"},{"type":"update","table":"physical","column":"q3"},{"type":"update","table":"physical","column":"q6"},{"type":"update","table":"physical","column":"q10"},{"type":"update","table":"user_info","column":"height"},{"type":"update","table":"user_info","column":"weight"},{"type":"update","table":"user_info","column":"body"},{"type":"update","table":"interests","column":"food"},{"type":"update","table":"interests","column":"hobby"},{"type":"update","table":"interests","column":"sport"},{"type":"update","table":"interests","column":"film"},{"type":"update","table":"interests","column":"music"},{"type":"update","table":"interests","column":"holiday"},{"type":"update","table":"interests","column":"impt_hobby"},{"type":"update","table":"interests","column":"impt_pet"},{"type":"progress","value":60,"msg":"60% - จุดประสงค์ของการทำแบบทดสอบก็เพื่อให้คุณได้พบกับคนที่มีศักยภาพ ความคิดและทัศนคติคล้ายคลึงกัน"},{"type":"update","table":"tics","column":"set1"},{"type":"update","table":"tics","column":"set5"},{"type":"update","table":"readiness","column":"q4"},{"type":"update","table":"readiness","column":"q10"},{"type":"update","table":"culture","column":"q3"},{"type":"update","table":"culture","column":"q10"},{"type":"update","table":"agreeness","column":"q1"},{"type":"update","table":"agreeness","column":"q8"},{"type":"update","table":"money","column":"q1"},{"type":"update","table":"money","column":"q12"},{"type":"update","table":"admiration","column":"set1"},{"type":"update","table":"admiration","column":"set8"},{"type":"progress","value":80,"msg":"80% - โปรไฟล์ของคุณใกล้สมบูรณ์แล้ว อีกเพียงแค่ 20% เท่านั้น คุณจะได้พบกับคู่แมช 20 คน"},{"type":"update","table":"disc","column":"set6"},{"type":"update","table":"disc","column":"set8"},{"type":"update","table":"disc","column":"set11"},{"type":"update","table":"disc","column":"set12"},{"type":"update","table":"disc","column":"set14"},{"type":"update","table":"disc","column":"set20"},{"type":"update","table":"disc","column":"set24"},{"type":"update","table":"intimacy","column":"q2"},{"type":"update","table":"intimacy","column":"q3"},{"type":"update","table":"intimacy","column":"q5"},{"type":"update","table":"intimacy","column":"q9"},{"type":"update","table":"intimacy","column":"q10"},{"type":"update","table":"sys_user","column":"nric"},{"type":"update","table":"user_story","column":"story1"},{"type":"update","table":"user_story","column":"story2"},{"type":"update","table":"user_story","column":"story3"},{"type":"update","table":"photo","column":"visible"}];

	post(args,function(data){
		//  redirect user to old web when old user login new web
		if (data.data.register_from != "esync") {
			location.href = location.href;
			location.replace(location.href);
			//window.location.reload();
			return;
		}

		esy_registeParam.mobile = data.data.handphone;
		esy_registeParam.gender = data.data.gender;
		if(debug){
			console.log('login ok');
		}
		nextStep();
		//window.location.reload();
		//getRegisterStepData(success,failed);
	},function(data){
		showResponseMsg(data.error.code,data.error.variable);
		if(debug){
			console.log('login failed');
		}

	});
}
function createUser(args,success,failed){
	args.c = "user";
	args.m= "createUser";

	post(args,function(){
		if(debug){
			console.log('register ok');
		}
		success && success(args,nextStep);
	},function(data){
		showResponseMsg(data.error.code,data.error.variable);
		if(debug){
			console.log('register failed');
		}

	});

}
//Resend Pin
function resendPin(btn){

	var args ={};
	var _this = $('#step>div.on');
	_this.find('input').each(function(index, element) {
		if (typeof $(this).attr('column') != "undefined" && $(this).attr('column') == 'handphone') {
			args[$(this).attr('column')] = $(this).val();
		}
	});

	args.c = "register";
	args.m = "update_sys_user";

	$(btn).text($(btn).attr('sendingStr'));
	$(btn).prop('disabled',true);
	post(args,function(){
		esy_registeParam.mobile = args.handphone;
		if(debug){
			console.log('login ok');
		}
		$(btn).text($(btn).attr('resendStr'));
		$(btn).prop('disabled',false);
	},function(data){
		showResponseMsg(data.error.code,data.error.variable);
		if(debug){
			console.log('login failed');
		}
		$(btn).text($(btn).attr('resendStr'));
		$(btn).prop('disabled',false);
	});
}
function changeContinueText(type){
	$('div.foot > button > span').hide();
	$('div.foot > div').hide();
	if (type == "continue") {
		$('div.foot > button > span.continue-span').show();
	}else{
		if ($('#step>div.on').hasClass('indexRegister')) {
			$('div.foot > button > span.signup-span').show();
			$('div.foot > div.clickLogin').show();
		}else{
			$('div.foot > button > span.signin-span').show();
			$('div.foot > div.clickRegister').show();
		}
	}
}
function nextStep(){
	if(esy_registeParam.gender != null && esy_registeParam.gender == 'F'){
		$('.next').addClass('female');
	}
	$('#back').hide();
	if (typeof esyStep == "undefined") {
		// $('.foot').hide();
		changeContinueText("");
		return;
	}
	changeContinueText("continue");
	$('.foot').show();
	if(typeof esy_registeParam.currentStepNum == "undefined"){
		esy_registeParam.currentStepNum = 0;
	}
	if(esy_registeParam.currentStepNum>0){
		$('#back').show();
	}
	$currentStep = esyStep[esy_registeParam.currentStepNum];
	if (typeof $currentStep == "undefined") {
		window.location.reload();
		return "main page";
	}
	var _this = $('#step>div.on');
	_this.addClass('ok').removeClass('on').siblings().removeClass('ok');
	// _this.css("left","-1000");

// $('#step>div.on').siblings('.disc.set11').show.siblings('.disc.set13').hide();
	// esyStep.shift();
	esy_registeParam.currentStepNum ++;
	if ($currentStep.column == "cty_id" && esyStep[0].column == "gender") {
		// esyStep.shift();
		esy_registeParam.currentStepNum ++;
	}
	if ($currentStep.column == "nname" && esyStep[0].column == "handphone") {
		// esyStep.shift();
		esy_registeParam.currentStepNum ++;
	}
	if ($currentStep.type =="progress") {
		_next = $('.stepProgress');
	}else if ($currentStep.type =="load"){
		_next = $('.stepLoad');
	}else if ($currentStep.type =="meetyou"){
		_next = $('.stepMeetyou');
	}else{
		_next = $('.'+ $currentStep.table + '.' +$currentStep.column);
	}

	_next.show();
	_next.removeClass('ok').addClass('on');
	loadImg();

	backToTop();
	// _next = _this.addClass('ok').removeClass('on').next().addClass('on');
	$('#step').animate({height: $('#step>div.on').outerHeight(true)}, 10,function(){
//		$('#step').height($('#step>div.on').outerHeight(true));
		$('#step').animate({height: $('#step>div.on').outerHeight(true)}, 500);
		// $('#step>div').hide();
		// $('#step>div.on').show();
	});
	//
//	( _next.hasClass('step8') || _next.hasClass('step10') ) && $('.next').hide();
//	( _this.hasClass('step8') || _this.hasClass('step10') ) && $('.next').show();
	if(esy_registeParam.nname != null && esy_registeParam.nname != ''){
		var newStr = $('.meetyou').text().format(esy_registeParam.nname);
		$('.meetyou').text(newStr);
	}


	//set nname
	$('[column="handphone"]').val(esy_registeParam.mobile);
	$('[column="handphone"]').attr('columnvalue',esy_registeParam.mobile);

	//update process
	if($currentStep.type != null && $currentStep.type =='progress'){
		updateProcess($currentStep.value,$currentStep.msg);
	}
	googleAnalytics($currentStep);
}
var beforePost = "";
var currentPost = "";
function googleAnalytics(currentStep){
	if(typeof currentStep == "undefined"){
		return;
	}
	var page = "";
	var step = (currentStep.table || currentStep.type) + "|" + (currentStep.column || currentStep.value);

	switch(step){
		case "sys_user|cty_id":
		case "sys_user|gender":
			page = "basic_country2gender"
			break;
		case "sys_user|hear_us_from":
			page = "basic_hear_us_from"
			break;
		case "sys_user|state_id":
			page = "basic_state"
			break;
		case "sys_user|date_place_ids":
			page = "basic_willing_state"
			break;
		case "sys_user|dob":
			page = "basic_dob"
			break;
		case "sys_user|nname":
		case "sys_user|handphone":
			page = "basic_nname2handphone";
			break;
		case "mobile_verify|verify":
			page = "basic_mobile_verify";
			facebookPixelCode('Lead');
			GoogleAdwordsTracking();

			break;
		case "meetyou|10":
			page = "meetyou";
			facebookPixelCode('CompleteRegistration');
			break;
		case "user_info|career":
			page = "lifestyle_profession"
			break;
		case "user_info|income":
			page = "lifestyle_income"
			break;
		case "user_info|education":
			page = "lifestyle_education"
			break;
		case "user_info|smoking":
			page = "lifestyle_smoking"
			break;
		case "user_info|drinking":
			page = "lifestyle_drinking"
			break;
		case "user_info|travel":
			page = "lifestyle_travel"
			break;
		case "user_info|exercise":
			page = "lifestyle_exercise"
			break;
		case "user_info|ethnicity":
			page = "background_ethnicity"
			break;
		case "sys_user|mstatus":
			page = "background_mstatus"
			break;
		case "user_info|nationality":
			page = "background_nationality"
			break;
		case "user_info|religion":
			page = "background_religion"
			break;
		case "user_info|planguage":
			page = "background_language"
			break;
		case "user_info|slanguage":
			page = "background_otherlanguage"
			break;
		case "user_info|want_children":
			page = "background_want_children"
			break;
		case "user_info|children_num":
			page = "background_have_children"
			break;
		case "progress|20":
			page = "progress_20"
			break;
		case "match_flex|age":
			page = "criteria_age"
			break;
		case "match_flex|height":
			page = "criteria_height"
			break;
		case "match_flex|distance":
			page = "criteria_distance"
			break;
		case "match_flex|religion":
			page = "criteria_religion"
			break;
		case "match_flex|ethnicity":
			page = "criteria_ethnicity"
			break;
		case "match_flex|income":
			page = "criteria_income"
			break;
		case "match_flex|education":
			page = "criteria_education"
			break;
		case "match_flex|children":
			page = "criteria_children"
			break;
		case "match_flex|mstatus":
			page = "criteria_mstatus"
			break;
		case "match_flex|drink":
			page = "criteria_drink"
			break;
		case "match_flex|smoke":
			page = "criteria_smoke"
			break;
		case "match_flex|exercise":
			page = "criteria_exercise"
			break;
		case "progress|40":
			page = "progress_40"
			break;
		case "physical|q1":
			page = "appearance1"
			break;
		case "physical|q2":
			page = "appearance2"
			break;
		case "physical|q3":
			page = "appearance3"
			break;
		case "physical|q6":
			page = "appearance6"
			break;
		case "physical|q10":
			page = "appearance10"
			break;
		case "user_info|height":
			page = "appearance_height"
			break;
		case "user_info|weight":
			page = "appearance_weight"
			break;
		case "user_info|body":
			page = "appearance_body"
			break;
		case "interests|food":
			page = "interests_food"
			break;
		case "interests|hobby":
			page = "interests_hobby"
			break;
		case "interests|sport":
			page = "interests_sport"
			break;
		case "interests|film":
			page = "interests_film"
			break;
		case "interests|music":
			page = "interests_music"
			break;
		case "interests|holiday":
			page = "interests_holiday"
			break;
		case "interests|impt_hobby":
			page = "interests_impt_hobby"
			break;
		case "interests|impt_pet":
			page = "interests_impt_pet"
			break;
		case "progress|60":
			page = "progress_60"
			break;
		case "tics|set1":
			page = "tics1"
			break;
		case "tics|set5":
			page = "tics5"
			break;
		case "readiness|q4":
			page = "readiness4"
			break;
		case "readiness|q10":
			page = "readiness10"
			break;
		case "culture|q3":
			page = "culture3"
			break;
		case "culture|q10":
			page = "culture10"
			break;
		case "agreeness|q1":
			page = "agreeness1"
			break;
		case "agreeness|q8":
			page = "agreeness8"
			break;
		case "money|q1":
			page = "money1"
			break;
		case "money|q12":
			page = "money12"
			break;
		case "admiration|set1":
			page = "admiration1"
			break;
		case "admiration|set8":
			page = "admiration8"
			break;
		case "progress|80":
			page = "progress_80"
			break;
		case "disc|set6":
			page = "disc6"
			break;
		case "disc|set8":
			page = "disc8"
			break;
		case "disc|set11":
			page = "disc11"
			break;
		case "disc|set12":
			page = "disc12"
			break;
		case "disc|set14":
			page = "disc14"
			break;
		case "disc|set20":
			page = "disc20"
			break;
		case "disc|set24":
			page = "disc24"
			break;
		case "intimacy|q2":
			page = "intimacy2"
			break;
		case "intimacy|q3":
			page = "intimacy3"
			break;
		case "intimacy|q5":
			page = "intimacy5"
			break;
		case "intimacy|q9":
			page = "intimacy9"
			break;
		case "intimacy|q10":
			page = "intimacy10"
			break;
		case "sys_user|nric":
			page = "nric"
			break;
		case "user_story|story1":
			page = "story1"
			break;
		case "user_story|story2":
			page = "story2"
			break;
		case "user_story|story3":
			page = "story3"
			break;

		case "photo|visible":
			page = "photo";
			facebookPixelCode('AddToWishlist');
			break;

	}
	if (page != "") {
		sentAnalyticsData("/?c=register&page=" + page);
	}



}
function GoogleAdwordsTracking(){
	$("body").append("<img style='display:none;' src='//www.googleadservices.com/pagead/conversion/1039105568/?value=1.00&amp;currency_code=SGD&amp;label=TxZ7CIn56WoQoPy97wM&amp;guid=ON&amp;script=0'/>");
}
function sentAnalyticsData(page){
	if(!page){
		return false;
	}
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-81047825-1', 'auto');
	ga('set', 'page', page );
	ga('send', 'pageview');
}
var postLock = false;

function post(args,success,failed){

	currentPost = "";
	$.each(args, function(index, val) {
		 currentPost += '' + index + val;
	});
	// console.log("currentPost=",currentPost);
	if(beforePost == currentPost){
		if(debug){
			console.log('post runing : ' + currentPost);
		}
		if (!debug) {
			return;
		}
	}
	beforePost = currentPost;
	if(postLock){
		return;
	}
	//postLock = true;
	postLock = false;
	var data = {
		data:{
			acc_no:"206242",
			cty_id:null,
			gender:"",
			handphone:null,
			mail:"asfdasdf@google.com",
			register_from:"esync"
		},
		sid:"baobjth9st418matefrirpqug3",
		status:200
	};
	success && success(data);
	// $.post(esy_url.aipAddress, args, function(data, textStatus, xhr) {
	// 	if(debug){
	// 		console.log("request",args);
	// 		console.log("response",data);
	// 	}
	// 	postLock = false
	// 	if (data.status == 200) {
	// 		success && success(data);
	// 	}else{
	// 		failed && failed(data);
	// 	}
	// });
}

function runStep(__this){
	//nextStep();
	if(!checkClickTime()){
		return false;
	}
	var _this = $('#step>div.on');
	var args = {};
	_this.find('input').each(function(index, element) {
		if (typeof $(this).attr('column') != "undefined") {
			//sport
			if($currentStep != null && $currentStep.column == 'sport' && ($(this).attr('columnvalue') == '' || $(this).attr('columnvalue') == null)){
				$(this).attr('columnvalue','0').val('0');
			}
			args[$(this).attr('column')] = $(this).attr('columnvalue');
		}
	});
	$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
	$('#msg').hide();
	var result = verifyInp();
	if (!result) {
		return false;
	}


	if (typeof esyStep == "undefined") {
		beforePost = ""
		if (_this.hasClass('indexRegister')) {
			createUser(args,login);
		}else if (_this.hasClass('indexLogin')){
			login(args,nextStep);
		}
	}else{
		if(debug){
			console.log("currentStep",$currentStep);
		}
		if (typeof $currentStep != "undefined" && $currentStep.type == "update") {

			args.c = "register";
			args.m = "update_" + $currentStep.table;

			if ($currentStep.table == "sys_user" && ($currentStep.column=="cty_id" || $currentStep.column=="nname") ) {
				post(args,function(data){
					esy_registeParam.mobile = args.handphone;
					esy_registeParam.nname = args.nname;
					delete args.cty_id;
					if ("undefined" != typeof(args.gender)) {
						esy_registeParam.gender = args.gender;
					}
					// delete args.nname;
					delete args.handphone;
					esy_registeParam.currentStepNum++;
					post(args,nextStep,function(data){
						showResponseMsg(data.error.code,data.error.variable);
						esy_registeParam.currentStepNum--;
					});
				},function(data){
					showResponseMsg(data.error.code,data.error.variable);
				});
			}else if($currentStep.table == "sys_user" && $currentStep.column=="dob" ){

				args.dob = "" + args.year + "-" + args.month + "-" +  args.day;
				delete args.year;
				delete args.month;
				delete args.day;
				post(args,nextStep,function(data){
					showResponseMsg(data.error.code,data.error.variable);
				});
				esy_registeParam.age = ages(args.dob);
				setAgeRangeHTML();
			}else if($currentStep.table == "mobile_verify" && $currentStep.column=="verify"){
				args.mobile = esy_registeParam.mobile;
				post(args,nextStep,function(data){
					showResponseMsg(data.error.code,data.error.variable);
				});
			}else if($currentStep.table == "photo"){
				if(checkImage()){
					showHideLoading(true);
					$('#uploadForm').submit();
				}
			}else if($currentStep.table == "sys_user" && $currentStep.column=="gender"){
				delete args.cty_id;
				esy_registeParam.gender = args.gender;
				post(args,nextStep,function(data){
					showResponseMsg(data.error.code,data.error.variable);
				});
			}else if($currentStep.table == "match_flex"){
				args[$currentStep.column] = 4 - parseInt(args[$currentStep.column]);
				post(args,nextStep,function(data){
					showResponseMsg(data.error.code,data.error.variable);
				});
			}else{
				if (args.handphone) {
					esy_registeParam.mobile = args.handphone;
				}
				if (state_id) {
					esy_registeParam.state_id = args.state_id;
					autoSelectdate_place_ids()
				}
				post(args,nextStep,function(data){
					showResponseMsg(data.error.code,data.error.variable);
				});
			}

		}else{
			nextStep();
		}

	}

//	__this && __this.text( _this.hasClass('step3') ? 'Done' : 'Continue');
}
function autoSelectdate_place_ids(){
	var state_id = esy_registeParam.state_id;
	$('.date_place_ids .elList li').each(function(index, el) {
		var code = $(this).attr('code');
		if (parseInt(code) == parseInt(state_id) ) {
			$(this).click();
		}
	});
}
jQuery(document).ready(function($) {
	autoSelectdate_place_ids()
});
function setAgeRangeHTML(){
	$('.ageRang').each(function(index, el) {
		$(this).html(getAgeRange(index));
	});
}
function getAgeRange(index){
	index = 4 - index;
	return single(esy_registeParam.gender,esy_registeParam.age,index);
	function single(gender,age,index){
		if (index >4 || index <0) {return ""}
		age = parseInt(age);
		var age_tips = "[min] - [max]";
		var f_arr = {};
		f_arr[0] = {'sub':10,'add':25 }
		f_arr[1] = {'sub':5,'add':18 }
		f_arr[2] = {'sub':3,'add':15 }
		f_arr[3] = {'sub':3,'add':13 }
		f_arr[4] = {'sub':2,'add':10 }
		var m_arr = {};
		m_arr[0] = {'sub':25,'add':10 }
		m_arr[1] = {'sub':20,'add':5 }
		m_arr[2] = {'sub':15,'add':3 }
		m_arr[3] = {'sub':15,'add':2 }
		m_arr[4] = {'sub':13,'add':2 }

		var min = 21;
		var max = 21;
		var age_arr = {};
		if(gender == 'F'){
			age_arr = f_arr;

		}else{
			age_arr = m_arr;
		}
		min = (age - age_arr[index]['sub'])>min ? (age - age_arr[index]['sub']) : min;
		max	= age + age_arr[index]['add'];
		age_tips = age_tips.replace('[min]',min);
		age_tips = age_tips.replace('[max]',max);
		return age_tips;
	}
}
function defined(val){
	if(typeof val == "undefined"){
		return false;
	}
	return true;
}
function getErrorMessage(error_code,error_column){

	var loginStr = '';
	if(error_code == 20 && error_column == 'handphone'){
		loginStr = ' <a class="mobileused" href="?c=user&m=logout"> ' + $('.clickLogin').text() + '</a>';
	}

	if(defined(esy_error) && defined(esy_error[error_code]) && defined(esy_error[error_code][error_column])){
		return esy_error[error_code][error_column]+loginStr;
	}else if(defined(esy_error) && defined(esy_error[error_code])){
		return esy_error[error_code][0]+loginStr;
	}
	return esy_error[0][0];
}
function showMsg(_this){
	var errorMessage = $(_this).attr('msg');
	if($currentError != ""){
		errorMessage = $currentError;
	}
	$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
	if($(_this).attr('column') == 'visible'){
		$('#msg').html('<div class="closeMsg" onclick="hideMsg()">X</div><div class="arrow"></div>'+errorMessage).show('slow').css({'left': (_this.offset().left + (_this.width() - 170)/ 2 )+'px', 'top': (_this.offset().top + _this.height() + 20 )+'px', 'z-index':10 }, 1000);
	}else if(_this.attr("type") == 'checkBox'){
		$('#msg').html('<div class="closeMsg" onclick="hideMsg()">X</div><div class="arrow" style="left:15px"></div>'+errorMessage).show('slow').css({'left': (_this.offset().left -15)+'px', 'top': (_this.offset().top + _this.height() + 20 )+'px'}, 1000);
	}else{
		$('#msg').html('<div class="closeMsg" onclick="hideMsg()">X</div><div class="arrow"></div>'+errorMessage).show('slow').css({'left': (_this.offset().left + (_this.width() - 170)/ 2 )+'px', 'top': (_this.offset().top + _this.height() + 20 )+'px'}, 1000);
	}
	if($(_this).attr("type") == 'text' || $(_this).attr("type") == 'password'){
		if($(_this).attr("readonly") != 'readonly' && !$(_this).hasClass('hi')){
			$(_this).focus();
		}
	}
	// if interest  focus blur   not pop keyboard
	if (typeof($currentStep) != "undefined" && typeof($currentStep.table) != "undefined" &&
		$currentStep.table == "interests" &&
		$currentStep.column != "impt_hobby" && $currentStep.column != "impt_pet" ) {
		$('#step').animate({height: $('#step>div.on').outerHeight(true)}, 500);
		$(_this).focus();
		$(_this).blur();
	}

	$currentError = "";
}

function hideMsg(){
	$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
	$('#msg').hide();
}

function showResponseMsg(code,column){

	$currentError = getErrorMessage(code,column);
	$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
	$('#msg').hide();

	$('#step>div.on input').each(function(index, element) {
		var _this = $(this);
		if(_this.attr('column') == column){
			showMsg(_this);
		}
	});
}

function showResponseMsgWithMsg(msg,column){
	$currentError = msg;
	$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
	$('#msg').hide();

	$('#step>div.on input').each(function(index, element) {
		var _this = $(this);
		if(_this.attr('column') == column){
			showMsg(_this);
		}
	});
}

function verifyInp(){
	var result = true;
	$('#step>div.on input:checkbox').each(function(index, element) {
		var _this = $(this);
		if(!_this.is(':checked')){
			showMsg(_this);
			return result = false;
		}
	});
	if(!result){
		return result;
	}
	$('#step>div.on input').each(function(index, element) {
		var _this = $(this);
		if(_this.attr('sp') == 'others'){
			if(!_this.is(":hidden") && !_this.val()){
				showMsg(_this);
				return result = false;
			}
		}else{
			var interestFlag = true;
			if (typeof($currentStep) != "undefined" && typeof($currentStep.table) != "undefined" &&
				$currentStep.table == "interests" &&
				$currentStep.column != "impt_hobby" && $currentStep.column != "impt_pet" ) {

				var length = _this.val().split(",").length;
				if (length < 3) {
					interestFlag = false;
				}
			}
			if(!_this.val() && _this.attr('column') != 'slanguage' || !interestFlag){
				showMsg(_this);
				return result = false;
			}
		}
	});

	return result;
}

function backToTop(){
	$('html, body').animate({ scrollTop:0 }, 'fast');
//	$('html,body').animate({scrollTop:$('#logo').offset().top},'fast');
}

function checkImage(){
	var file = $("input[name='uploadedfile']");
	 var filepath=file.val();
	 var extStart=filepath.lastIndexOf(".");
	 var ext=filepath.substring(extStart,filepath.length).toUpperCase();
	 if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
		 showResponseMsgWithMsg(file.attr('msg_not_image'),'visible');
		 return false;
	 }
	 var file_size = 0;
	 file_size = file[0].files[0].size;
	 if(debug){
	 	console.log(file_size/1024/1024 + " MB");
	}
	 var size = file_size / 1024;
	 if(size > 2048){
		 showResponseMsgWithMsg(file.attr('msg_file_too_big'),'visible');
	 }
	 return true;
}

function checkClickTime(){
	var timestamp = new Date().getTime();
	$clickArr[$clickIndex++] = timestamp;
	if($clickIndex >= 3){
		if(($clickArr[$clickIndex-1] - $clickArr[$clickIndex-3])<2000){
			showErrorMsg(4);
			return false;
		}
		if($clickIndex >100){
			$clickArr = new Array();
			$clickIndex = 0;
			return true;
		}

		if(($clickArr[$clickIndex-1] - $clickArr[$clickIndex-3])>2000){
			$clickArr = new Array();
			$clickIndex = 0;
		}

	}
	return true;
}

function showErrorMsg(code){
	$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
	$('#msg').hide();

	$('#step>div.on input').each(function(index, element) {
		var _this = $(this);
		showError(_this,code);
	});
}

function showError(_this,code){
	var errorMessage = getErrorMessage(code);

	$('#msgDiv').html('<div id="msg"><div class="arrow"></div></div>');
	if($(_this).attr('column') == 'visible'){
		$('#msg').html('<div class="closeMsg" onclick="hideMsg()">X</div><div class="arrow"></div>'+errorMessage).show('slow').css({'left': (_this.offset().left + (_this.width() - 170)/ 2 )+'px', 'top': (_this.offset().top + _this.height() + 20 )+'px', 'z-index':10 }, 1000);
	}else if(_this.attr("type") == 'checkBox'){
		$('#msg').html('<div class="closeMsg" onclick="hideMsg()">X</div><div class="arrow" style="left:15px"></div>'+errorMessage).show('slow').css({'left': (_this.offset().left + (_this.width() - 170)/ 2 )+'px', 'top': (_this.offset().top + _this.height() + 20 )+'px'}, 1000);
	}else{
		$('#msg').html('<div class="closeMsg" onclick="hideMsg()">X</div><div class="arrow"></div>'+errorMessage).show('slow').css({'left': (_this.offset().left + (_this.width() - 170)/ 2 )+'px', 'top': (_this.offset().top + _this.height() + 20 )+'px'}, 1000);
	}

	$currentError = "";
}
function loadImg(){
	$('#step>div.on img').each(function() {
		if($(this).attr("data-url") != undefined){
			$(this).attr('src', $(this).attr("data-url"));
		}
	});
}

function showPop(){
	$('#bg').css('height',$(document).height());
	$('#bg').show();
	$('.subDiv').show()
}

function hidePop(){
	$('#bg').hide();
	$('.subDiv').hide();
}

function showHideLoading(show){
	if(show){
		$('#loading').height($(document).height());
		$('#loading').show();
	}else{
		$('#loading').hide();
	}
}
function   ages(str){
    var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null)return   false;
    var   d=   new   Date(r[1],   r[3]-1,   r[4]);
    if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
    {
          var   Y   =   new   Date().getFullYear();
          return (Y-r[1]);
    }
    return false;
 }