;(function ($, win, doc, undefined) {
	
	var namespace = 'eunjye';

	win[namespace] = {
		status: {
			scrollY: 0,
			scrollDirection: '',
			scrollOverElement: function(delta){
				return win[namespace].status.scrollY > delta ? true : false;
			},
			scrollIsHome: function(){
				return win[namespace].status.scrollY === 0 ? true : false;
			},
			scrollIsEnd: function(){
				return win[namespace].status.scrollY + $(win).outerHeight() === $(doc).outerHeight() ? true : false;
			},
			scrollCheck: {
				beforeScrollY: 0,
				direction: function(){
					return win[namespace].status.scrollCheck.beforeScrollY < win[namespace].status.scrollY ? 
						'down' : 'up';
				},
				init: function(){
					function bodyAddClass() {
						var $body = $('body');
						if (!!win[namespace].status.scrollIsHome()) {
							$body.addClass('is-home');
						} else if (!!win[namespace].status.scrollIsEnd()) {
							$body.addClass('is-end');
						} else {
							$body.removeClass('is-home is-end');
						}
					}
					win[namespace].status.scrollY = $('html').prop('scrollTop');
					win[namespace].status.scrollIsHome();
					win[namespace].status.scrollIsEnd();
					bodyAddClass();

					$(doc).off('scroll.scrollCheck').on('scroll.scrollCheck', function(){
						win[namespace].status.scrollY = $('html').prop('scrollTop');
						win[namespace].status.scrollDirection = win[namespace].status.scrollCheck.direction();
						win[namespace].status.scrollCheck.beforeScrollY = win[namespace].status.scrollY;
						win[namespace].status.scrollIsHome();
						win[namespace].status.scrollIsEnd();
						bodyAddClass();
					});

				}
			}
		},
		checkBrowserSize: function(){
			var _winW = $(win).outerWidth();
			var size = '';
			
			if (_winW < 764) {
				size = 'mobile';
			} else if (_winW < 1025) {
				size = 'tablet';
			} else {
				size = 'pc';
			}
			$('html').attr('data-size', size);

			return size;
		},
		isInview: function($el, callback){
			$.extend({}, {
				inBack: function() {},
				outBack: function() {}
			}, callback)
			$(doc).on('scroll.'+namespace, function(){
				if ($el.inView()) {
					$el.addClass('ui-in');
				} else {
					$el.removeClass('ui-in');
				}
			});
		},
		navFixed: {
			headerY: 0,
			beforeY: false,
			afterY: false,
			init: function(){
				$(win).off('scroll.scrollNavFixed').on('scroll.scrollNavFixed', function(){
					var $header = $('.header-area');
					var headerY = 0;
					var beforeY = win[namespace].navFixed.beforeY;
					var afterY = win[namespace].status.scrollOverElement(headerY);

					if (beforeY !== afterY) {
						
						if (afterY && !$header.hasClass('fixed')){
							$header.addClass('fixed');
						} else {
							$header.removeClass('fixed');
						}
						win[namespace].navFixed.beforeY = afterY;
					}

				});
			}
		},
		navLoad: function(){
			(function () {
				return new Promise(function(resolve, reject) {
					$.get('./include/header.html', function(response) {
						if (response) {
							resolve(response);
						}
						reject(new Error('Request is failed'));
					});
				});
			})()
			.then(function(data) {
				$('.header-area').html(data);
				win[namespace].nav.hoverMenu(); // hover evt on nav
				win[namespace].nav.slidingMenu(); // show/hide evt on nav
				win[namespace].nav.openDepth2(); // 2depth links evt on nav
				
			}).catch(function(err) {
				console.error('win.'+namespace+'.navLoad failed!!');
			});
		},
		footerLoad: function(){
			(function () {
				return new Promise(function(resolve, reject) {
					$.get('./include/footer.html', function(response) {
						if (response) {
							resolve(response);
						}
						reject(new Error('Request is failed'));
					});
				});
			})().then(function(data) {
				$('.footer-area').html(data);
			}).catch(function(err) {
				console.error('win.'+namespace+'.footerLoad failed!!');
			});
		},
		nav: {
			hoverMenu: function(){
				var $header = $('.header-area');
				var $links = $header.find('.gnb-area .nav-d1 a');
				var flag = {};

				$links
          .off('.openMenuPC')
          .on('mouseenter.openMenuPC focus.openMenuPC', function () {
						$header.addClass('hover');
						clearTimeout(flag);
            $header
              .off('.closeMenuPC')
              .on('mouseleave.closeMenuPC', removeHover);
            $links.off('.closeMenuPC').on('blur.closeMenuPC', removeHover);
          });
					
				function removeHover() {
					flag = setTimeout(function () {
            $header.removeClass('hover');
          }, 1);
        }
			},
			slidingMenu: function(){
				var $header = $('.header-area');
				var $btnMenu = $header.find('.btn-menu');
				
				$btnMenu
					.off('.openMenu')
					.on('click.openMenu', function(){


						if (!!$('.slider-banner').length) {
							var $banner = $('.slider-banner');
							var $bannerInner = $banner.find('.banner-inner');
							var $btn = $('.btn-toggle');

							if ($banner.attr('data-close') === 'true') { 
								$header.toggleClass('open')
								return false;
							}

							if ($header.hasClass('open')) {
								$header.toggleClass('open');
								setTimeout(function(){
									$bannerInner.slideDown(200, function(){
										$banner.removeClass('close');
									})
								}, 250);
								$btn.removeClass('close');
							} else {
								$btn.addClass('close');
								$bannerInner.slideUp(200, function(){
									$banner.addClass('close');
									$header.toggleClass('open');
								})
							}
						} else {
							
							$header.toggleClass('open')
						}
					});
			},
			openDepth2: function(){
				var $header = $('.header-area');
				var $listDepth1 = $header.find('.nav-d1 > li');
				var $btnDepth1 = $listDepth1.children('a');

				$btnDepth1.on('click', function(e){
					if ($(win).outerWidth() < 1025 && !!$(this).siblings('.nav-d2').length) {
						var $parentList = $(this).closest('li');
						e.preventDefault();
						$listDepth1.not($parentList).removeClass('on');
						$parentList.toggleClass('on');
					}
				})

			}
		},
		isBrowser: function(){
			var agt = navigator.userAgent.toLowerCase(); 
			if (agt.indexOf("chrome") != -1) return 'Chrome'; 
			if (agt.indexOf("opera") != -1) return 'Opera'; 
			if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
			if (agt.indexOf("webtv") != -1) return 'WebTV'; 
			if (agt.indexOf("beonex") != -1) return 'Beonex'; 
			if (agt.indexOf("chimera") != -1) return 'Chimera'; 
			if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
			if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
			if (agt.indexOf("firefox") != -1) return 'Firefox'; 
			if (agt.indexOf("safari") != -1) return 'Safari'; 
			if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
			if (agt.indexOf("netscape") != -1) return 'Netscape'; 
			if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'; 
			if (agt.indexOf("msie") != -1) { 
					var rv = -1; 
				if (navigator.appName == 'Microsoft Internet Explorer') { 
					var ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); 
				if (re.exec(ua) != null) 
					rv = parseFloat(RegExp.$1); 
				} 
				return 'Internet Explorer '+rv; 
			} 
		},
		acco: {
			open: function(SPEC){
				var _spec = $.extend({}, {
					openOnly: true
				}, SPEC);
				var openIndex = _spec.targetIndex;
				var openOnly = _spec.openOnly;
				
				var $acco = _spec.targetAcco || $('.ui-acco');
				var $item = $acco.children('.acco-item').eq(openIndex);
				var $tit = $item.children('.acco-tit');
				var $pnl = $item.children('.acco-pnl');

				if (openOnly) {
					function accoToggle(){
						$item.find('.acco-btn').addClass('on');
						$pnl.stop().slideDown(200, function(){
							$item.addClass('open');
						});
					}

					if (win[namespace].isBrowser().indexOf('Internet Explorer') !== -1
					 || win[namespace].isBrowser().indexOf('Mozilla') !== -1) {
						win[namespace].acco.close({
							noTargetIndex: openIndex,
							closeBack: accoToggle
						});
					} else {
						win[namespace].acco.close({
							noTargetIndex: openIndex
						});
						accoToggle();
					}
				}

			},
			close: function(SPEC){
				var _spec = $.extend({}, {
					targetIndex: null,
					noTargetIndex: null,
					closeBack: function(){}
				}, SPEC);
				var closeIndex = _spec.targetIndex;
				var noCloseIndex = _spec.noTargetIndex;
				
				var $acco = _spec.targetAcco || $('.ui-acco');
				var $item = closeIndex === null ? 
											noCloseIndex === null ?
												$acco.children('.acco-item') : 
												$acco.children('.acco-item:not(:eq('+ noCloseIndex +'))') :
											$acco.children('.acco-item').eq(closeIndex);
				var $pnl = $item.children('.acco-pnl');

				$item.find('.acco-btn').removeClass('on');
				$pnl.stop().slideUp(200, function(){
					$item.removeClass('open');
					_spec.closeBack();
				});
			},
			set: function(SPEC){
				var _spec = SPEC || false;
				var openIndex;
				if (!!_spec) {
					openIndex = _spec.openIndex;
				}
				
				var $acco = $('.ui-acco');
				var $item = $acco.children('.acco-item');
				var $tit = $acco.children('.acco-tit');
				var $pnl = $item.children('.acco-pnl');

				$item.each(function(idx, item){
					$(item).hasClass('open') && $(item).find('.acco-btn').addClass('on');
				});

				if (openIndex !== undefined) {
					win[namespace].acco.open({targetIndex: openIndex});
				}
			},
			init: function(SPEC){
				win[namespace].acco.set(SPEC);

				$(document).off('click.clickAccoBtn').on('click.clickAccoBtn', '.acco-btn', function(){
					if (!$(this).hasClass('type-link')) {
						var targetIndex = $('.ui-acco .acco-btn').index($(this));
						if ($(this).hasClass('on')) {
							win[namespace].acco.close({targetIndex: targetIndex});
						} else {
							win[namespace].acco.open({targetIndex: targetIndex});
						}
					}
				});
			}
		},
		mainSlider: {
			slide: {},
			init: function(){
				win[namespace].mainSlider.slide = $('.slider-visual .slider-inner').slick({
					infinite: true,
					speed: 400,
					autoplay: true,
					autoplaySpeed: 8000,
					prevArrow: $('.slider-visual .slick-prev'),
      		nextArrow: $('.slider-visual .slick-next'),
					pauseOnHover: false,
					dots: true,
					appendDots: '.slider-pagination',
					customPaging : function(slider, idx) {
							return '<a href="#">'+ ((idx < 9)?'0'+ ++idx : ++idx) +'</a>';
					},
				})
			}
		},
		kakaomap: {
			init: function(){
				var container = document.getElementById('map');
				var lating = [37.42815615851663, 126.98949376928282];
				var mark = new kakao.maps.LatLng(lating[0], lating[1]);
				var map = new kakao.maps.Map(container, {
					center: mark,
					level: 3
				}); // create map
				var marker = new kakao.maps.Marker({
					position: mark
				});
				marker.setMap(map);
			}
		},
		// toast popup
		toast: {
			opt : {
					type: 'default',
					target: false,  // $(target) : 필수 
					body: false,  // $(target)
					delay: 1400,  // number
					message: [''], // array
					callback: function(){} // callback
			},
			activeToast: [],
			timer: [],
			toggleToast: function(opt){
					var _opt = opt === undefined ? {} : opt
							, _opt = $.extend(true, {}, win[namespace].toast.opt, opt)
							, $ts = _opt.target 
							, alertType = _opt.type
							, $toast = $('.ui-toast.'+alertType)
							, $body = !_opt.body ? $('body') : _opt.body
							, delay = _opt.delay
							, msg = _opt.message
							, callback = _opt.callback;

					// 메세지 토글 여부
					if (msg.length > 1) {
							msg = !$ts.hasClass('on') ? msg[0] : msg[1];
							$ts.toggleClass('on');
							!$ts.find('.only-sr').length ? $ts.append('<span class="only-sr">선택됨</span>') : ''; // [20200904/jh] 접근성 관련 문구 추가
					}
			
					// 활성화 토스트 배열에 넣음
					var _idx = win[namespace].toast.activeToast.indexOf(alertType);
					if (_idx === -1) {
							_idx = win[namespace].toast.activeToast.length < 1 ? 0 : win[namespace].toast.activeToast.length;
							win[namespace].toast.activeToast.push(alertType);
					}

					// 이미 같은 타입의 toast가 없을 때
					if (!$body.find('.ui-toast.' + alertType).length){
							var _html = '<div class="ui-toast '+alertType+'"><span>'+msg+'</span></div>';
							$body.append(_html);
							$toast = $('.ui-toast.'+alertType);
							setTimeout(function () {
									$toast.addClass('on');
							}, 10);
					} else { // 있을 때
							$toast.removeClass('on');
							setTimeout(function () {
									$toast.addClass('on').text(msg);
							}, 100);
					}
					clearTimeout(win[namespace].toast.timer[_idx]);

					win[namespace].toast.timer[_idx] = setTimeout(function () {
						win[namespace].toast.hideToast(alertType);
							callback(); // [20200720/jh] callback 추가
					}, delay);
			},
			hideToast: function(alertType) {
					$('.ui-toast.'+alertType).removeClass('on');
					setTimeout(function () {
							$('.ui-toast.'+alertType).remove();
							if (!$('.ui-toast').length) {
									win[namespace].toast.activeToast = [];
							}
					}, 200);
			},
			run: function(){
					// $(document).off('click.toastFavorite').on('click.toastFavorite', '.ui-toast-btn.btn-favorite', function(){
					//     toast.toggleToast({
					//         type: 'favorite-fund',
					//         target: $(this),
					//         message: [
					//             '관심펀드로 저장되었습니다.', 
					//             '관심펀드가 해제되였습니다.'
					//         ]
					//     });
					// });
					// $(document).off('click.toastDelete').on('click.toastDelete', '.ui-toast-btn.btn-delete', function(){
					//     toast.toggleToast({
					//         target: $(this),
					//         message: [
					//             '펀드가 삭제되었습니다.'
					//         ]
					//     });
					// });
			},
		},
		// cookieControl: {
		// 	setCookie: function ( name, value, expiredays ) {
		// 		var todayDate = new Date();
		// 		todayDate.setDate( todayDate.getDate() + expiredays );
		// 		document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
		// 		console.log(document.cookie);
		// 	},
		// 	isHasCookie: function () {
		// 		var cookiedata = document.cookie;
		// 		console.log(cookiedata);
		// 		if ( cookiedata.indexOf('todayCookie=done') < 0 ){
		// 				return false;
		// 		}
		// 		else {
		// 				return true;
		// 		}
		// 	}
		// },
		init: function(){

			$(win).off('.'+namespace)
				.on('resize.'+namespace, function(){
					win[namespace].checkBrowserSize();
				});

			$(doc).on('ready.'+namespace, function(){
				win[namespace].checkBrowserSize();

				win[namespace].navLoad();
				win[namespace].footerLoad();
				win[namespace].status.scrollCheck.init();

				win[namespace].nav.hoverMenu(); // hover evt on nav
				win[namespace].nav.slidingMenu(); // show/hide evt on nav
				win[namespace].nav.openDepth2(); // 2depth links evt on nav

				win[namespace].acco.init();

				$(doc).on('click', '.btn-top', function(){
					$('body, html').animate({
						scrollTop: 0
					}, 200)
				})


			})
			$(doc).on('scroll.'+namespace, function(){

			})
		}
	}
	
	win[namespace].init();
})(jQuery, window, document);