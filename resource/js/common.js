;
(function ($, win, doc, undefined) {

  'use strict';

  var namespace = 'eunjye';

  $.fn.inView = function () {
    var $el = $(this);
    var _flag = false;

    var _top = $el.offset().top;
    var _left = $el.offset().left;
    var _height = $el.outerHeight();
    var _width = $el.outerWidth();

    _flag = _top < (win.pageYOffset + win.innerHeight) &&
      _left < (win.pageXOffset + win.innerWidth) &&
      (_top + _height) > win.pageYOffset &&
      (_left + _width) > win.pageXOffset;

    return _flag;
  };

  win[namespace] = {
    status: {
      scrollY: 0,
      scrollDirection: '',
      scrollOverElement: function (delta) {
        return win[namespace].status.scrollY > delta ? true : false;
      },
      scrollIsHome: function () {
        return win[namespace].status.scrollY === 0 ? true : false;
      },
      scrollIsEnd: function () {
        return win[namespace].status.scrollY + $(win).outerHeight() === $(doc).outerHeight() ? true : false;
      },
      scrollCheck: {
        beforeScrollY: 0,
        direction: function () {
          return win[namespace].status.scrollCheck.beforeScrollY < win[namespace].status.scrollY ?
            'down' : 'up';
        },
        init: function () {
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

          $(doc).off('scroll.scrollCheck').on('scroll.scrollCheck', function () {
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
    checkBrowserSize: function () {
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
    isInview: function ($el, callback) {
      $.extend({}, {
        inBack: function () {},
        outBack: function () {}
      }, callback)
      $(doc).on('scroll.' + namespace, function () {
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
      init: function () {
        $(win).off('scroll.scrollNavFixed').on('scroll.scrollNavFixed', function () {
          var $header = $('.header-area');
          var headerY = 0;
          var beforeY = win[namespace].navFixed.beforeY;
          var afterY = win[namespace].status.scrollOverElement(headerY);

          if (beforeY !== afterY) {

            if (afterY && !$header.hasClass('fixed')) {
              $header.addClass('fixed');
            } else {
              $header.removeClass('fixed');
            }
            win[namespace].navFixed.beforeY = afterY;
          }

        });
      }
    },
    navLoad: function () {
      (function () {
        return new Promise(function (resolve, reject) {
          $.get('/profile/html/include/header.html', function (response) {
            if (response) {
              resolve(response);
            }
            reject(new Error('Request is failed'));
          });
        });
      })()
      .then(function (data) {
        $('.header-area').html(data);
        win[namespace].nav.hoverMenu(); // hover evt on nav
        win[namespace].nav.slidingMenu(); // show/hide evt on nav
        win[namespace].nav.openDepth2(); // 2depth links evt on nav

      }).catch(function (err) {
        console.error('win.' + namespace + '.navLoad failed!!');
      });
    },
    footerLoad: function () {
      (function () {
        return new Promise(function (resolve, reject) {
          $.get('/profile/html/include/footer.html', function (response) {
            if (response) {
              resolve(response);
            }
            reject(new Error('Request is failed'));
          });
        });
      })().then(function (data) {
        $('.footer-area').html(data);
      }).catch(function (err) {
        console.error('win.' + namespace + '.footerLoad failed!!');
      });
    },
    nav: {
      hoverMenu: function () {
        var $header = $('.header-area');
        var $links = $header.find('.gnb-area .nav-d1 .item, .gnb-area .nav-d1 a');
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
      slidingMenu: function () {
        var $header = $('.header-area');
        var $btnMenu = $header.find('.btn-menu');

        $btnMenu
          .off('.openMenu')
          .on('click.openMenu', function () {


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
                setTimeout(function () {
                  $bannerInner.slideDown(200, function () {
                    $banner.removeClass('close');
                  })
                }, 250);
                $btn.removeClass('close');
              } else {
                $btn.addClass('close');
                $bannerInner.slideUp(200, function () {
                  $banner.addClass('close');
                  $header.toggleClass('open');
                })
              }
            } else {

              $header.toggleClass('open')
            }
          });
      },
      openDepth2: function () {
        var $header = $('.header-area');
        var $listDepth1 = $header.find('.nav-d1 > li');
        var $btnDepth1 = $listDepth1.children('.item');

        $btnDepth1.on('click', function (e) {
          if ($(win).outerWidth() < 1025 && !!$(this).siblings('.nav-d2').length) {
            var $parentList = $(this).closest('li');
            e.preventDefault();
            $listDepth1.not($parentList).removeClass('on');
            $parentList.toggleClass('on');
          }
        })

      }
    },
    isBrowser: function () {
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
          var ua = navigator.userAgent;
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
          if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
        }
        return 'Internet Explorer ' + rv;
      }
    },
    accordion: {
      open: function (SPEC) {
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
          function accoToggle() {
            $item.find('.acco-btn').addClass('on');
            $pnl.stop().slideDown(200, function () {
              $item.addClass('open');
            });
          }

          if (win[namespace].isBrowser().indexOf('Internet Explorer') !== -1 ||
            win[namespace].isBrowser().indexOf('Mozilla') !== -1) {
            win[namespace].accordion.close({
              noTargetIndex: openIndex,
              closeBack: accoToggle
            });
          } else {
            win[namespace].accordion.close({
              noTargetIndex: openIndex
            });
            accoToggle();
          }
        }

      },
      close: function (SPEC) {
        var _spec = $.extend({}, {
          targetIndex: null,
          noTargetIndex: null,
          closeBack: function () {}
        }, SPEC);
        var closeIndex = _spec.targetIndex;
        var noCloseIndex = _spec.noTargetIndex;

        var $acco = _spec.targetAcco || $('.ui-acco');
        var $item = closeIndex === null ?
          noCloseIndex === null ?
          $acco.children('.acco-item') :
          $acco.children('.acco-item:not(:eq(' + noCloseIndex + '))') :
          $acco.children('.acco-item').eq(closeIndex);
        var $pnl = $item.children('.acco-pnl');

        $item.find('.acco-btn').removeClass('on');
        $pnl.stop().slideUp(200, function () {
          $item.removeClass('open');
          _spec.closeBack();
        });
      },
      set: function (SPEC) {
        var _spec = SPEC || false;
        var openIndex;
        if (!!_spec) {
          openIndex = _spec.openIndex;
        }

        var $acco = $('.ui-acco');
        var $item = $acco.children('.acco-item');
        var $tit = $acco.children('.acco-tit');
        var $pnl = $item.children('.acco-pnl');

        $item.each(function (idx, item) {
          $(item).hasClass('open') && $(item).find('.acco-btn').addClass('on');
        });

        if (openIndex !== undefined) {
          win[namespace].accordion.open({
            targetIndex: openIndex
          });
        }
      },
      init: function (SPEC) {
        win[namespace].accordion.set(SPEC);

        $(document).off('click.clickAccoBtn').on('click.clickAccoBtn', '.acco-btn', function () {
          if (!$(this).hasClass('type-link')) {
            var targetIndex = $('.ui-acco .acco-btn').index($(this));
            if ($(this).hasClass('on')) {
              win[namespace].accordion.close({
                targetIndex: targetIndex
              });
            } else {
              win[namespace].accordion.open({
                targetIndex: targetIndex
              });
            }
          }
        });
      }
    },

    /* 아코디언 Action
    ---------------------- */
    listAcco: {
      togglePnl: function ($item) {
        var $pnl = $item.children('.list-pnl')
        var $toggleElements = $item.find('[data-showhide="true"]')
        var isOpened = $pnl.hasClass('on');

        if (isOpened) {
          if (!!$toggleElements.length) {
            $toggleElements.css({
              'visibility': 'visible'
            }).attr('aria-hidden', 'false').stop().animate({
              opacity: 1
            }, 200);
          }
          $pnl.slideUp(200, function () {
            $pnl.removeClass('on');
          });
          $item.find('.list-view-btn').removeClass('on');
          $item.find('.list-view-btn span').text('열기');
        } else {
          if (!!$toggleElements.length) {
            $toggleElements.stop().animate({
              opacity: 0
            }, 200, function () {
              $toggleElements.css({
                'visibility': 'hidden'
              }).attr('aria-hidden', 'true');
            });
          }
          if (!!$item.closest('.tab-cont').length) {
            win[namespace].moveData.nowPnlX = $('.data-items').eq(0).prop('scrollLeft');
          }
          $pnl.slideDown(200, function () {
            $pnl.addClass('on');
          }).find('.data-items').prop('scrollLeft', win[namespace].moveData.nowPnlX);
          $item.find('.list-view-btn').addClass('on');
          $item.find('.list-view-btn span').text('닫기');
        };
      },
      // accordion event run!!
      init: function () {
        if ((win[namespace].checkBrowserSize() !== 'pc')) {
          var evtClick = 'touch.list click.list'
        } else {
          var evtClick = 'click.list';
        }
        $(document)
          .off(evtClick)
          .on(evtClick, '.list-wrap .list-view-btn', function () {
            win[namespace].listAcco.togglePnl($(this).closest('.list-item'));
          })
          .on(evtClick, '.list-wrap .list-item', function (e) {
            var noTarget = ['a', 'label', 'button', 'input', '.list-overlay', '.list-cover', '.unit'];
            var _flag = true;

            if (!(win[namespace].checkBrowserSize() !== 'pc')) noTarget.push('.list-item.open-pc'); // PC에서 open 막음

            noTarget.forEach(function (element) {
              if (!!$(e.target).closest(element).length) {
                _flag = false;
              }
            })
            if (_flag && !!$(this).find('.list-pnl').length) {
              win[namespace].listAcco.togglePnl($(this));
            };
          });
      }
    },
    // data-wrap ui-acco-btn evt
    dataAcco: {
      init: function () {
        if ((win[namespace].checkBrowserSize() !== 'pc')) {
          var evtClick = 'touch.dataList click.dataList';
        } else {
          var evtClick = 'click.dataList';
        }
        $(document)
          .off(evtClick)
          .on(evtClick, '.data-wrap .ui-acco-btn', function (e) {
            $(this).closest('.data-item').toggleClass('on');
          })
          .on(evtClick, '.data-wrap .data-item', function (e) {
            var noTarget = ['a', 'label', 'button', 'input'];
            var _flag = true;

            noTarget.forEach(function (element) {
              if (!!$(e.target).closest(element).length) {
                _flag = false;
              }
            })
            if (_flag && !!$(this).find('.ui-acco-btn').length) {
              $(this).find('.ui-acco-btn').click();
            };
          });
      }
    },
    /* 데이터 좌우 스크롤 Action
    ---------------------- */
    moveData: {
      // 현재 패널의 X좌표값 가져오기
      nowPnlX: 0,
      move: function () {
        $('.list-wrap .data-items')
          .off('touchstart.moveListData').on('touchstart.moveListData', function () {
            $('.list-wrap .data-items').removeClass('target');
            $(this).addClass('target');
          })
          .off('scroll.moveListData').on('scroll.moveListData', function () {
            if (!$(this).hasClass('target')) {
              return false;
            }
            var $ts = $(this);
            var $wrap = $('.list-wrap');
            if (!!$ts.closest('.ui-modal-cont').length) {
              $wrap = $ts.closest('.ui-modal-cont').find('.list-wrap');
            }
            if (!!$ts.closest('.tab-cont').length) {
              $wrap = $ts.closest('.tab-cont').find('.list-wrap');
            }

            var $scr = $wrap.find('.data-items');
            var _x = $ts.prop('scrollLeft');

            _x = _x <= 0 ? 0 : _x;

            win[namespace].moveData.nowPnlX = _x;
            $scr.not($ts).prop('scrollLeft', _x);
          });
      },
      init: function () {
        win[namespace].moveData.move();
        $(document)
          .on('DOMNodeInserted', '.list-wrap .list-item', function () {
            win[namespace].moveData.move();
          });
      }
    },
    /* Overlay Action
    ---------------------- */
    overlay: {
      // overlay 열기
      open: function (opt) {
        var $el = opt.item;
        var $wrap = opt.wrap;

        $el.children('.inner').css('width', $wrap.outerWidth());
        $el.addClass('on').attr('aria-hidden', 'false').stop().animate({
          width: $wrap.outerWidth()
        }, 300);
      },
      // overlay 닫기
      close: function (opt) {
        var $el = opt.item;
        var $wrap = opt.wrap;

        $el.attr('aria-hidden', 'true').stop().animate({
          width: 0
        }, 300, function () {
          $el.removeClass('on');
        });
      },
      // overlay event run!!
      init: function () {
        var evt = '';
        if ((win[namespace].checkBrowserSize() !== 'pc')) {
          evt = 'touch.listOverlay click.listOverlay';
        } else {
          evt = 'click.listOverlay';
        }
        (win[namespace].checkBrowserSize() !== 'pc') ? $('.list-pnl').attr('tabIndex', 0): '';
        $('.list-pnl.on').closest('.list-item').find('[data-showhide="true"]').css({
          'opacity': 0,
          'visibility': 'hidden'
        }).attr('aria-hidden', 'true');
        $('.list-overlay').not('.on').attr('aria-hidden', 'true');

        $(document).off(evt).on(evt, '.btn-myfund', function (e) {
          var $ts = $(e.target);
          var $btn = $ts.closest('.btn-myfund');
          var $wrap = $ts.closest('.list-item');
          var $overlay = $wrap.find('.list-overlay');

          if (!$btn.hasClass('on')) {
            win[namespace].overlay.open({
              item: $overlay,
              wrap: $wrap
            });
            $btn.addClass('on');
          } else {
            win[namespace].overlay.close({
              item: $overlay,
              wrap: $wrap
            });
            $btn.removeClass('on');
          }
        }).on(evt, '.btn-overlay-x', function (e) {
          var $ts = $(e.target);
          var $btn = $ts.closest('.btn-overlay-x');
          var $wrap = $btn.closest('.list-item');
          var $overlay = $wrap.find('.list-overlay');
          var $btnFund = $wrap.find('.btn-myfund');

          win[namespace].overlay.close({
            item: $overlay,
            wrap: $wrap
          });
          $btnFund.removeClass('on');
        });
      }
    },
    /* CRUD Action
    ---------------------- */
    CRUD: {
      delete: function(_opt){
          var $btn;
          if (_opt !== undefined) {
              var opt = {
                  item: {}
              };
              opt = $.extend(true, opt, _opt);
              $btn = opt.item;
          } else {
              $btn = $(event.target)
          }
          var $wrap = $btn.closest('.list-wrap')
              , $item = $btn.closest('.list-item')
              , _w = $item.outerWidth()
              , _h = $item.outerHeight();

          $item.css({'height': _h});
          !$item.children('.inner').length ? $item.wrapInner('<div class="inner"></div>') : '';
          var $inner = $item.children('.inner');
          $inner.css('width', _w);
          $item.find('.data-items').prop('scrollLeft', win[namespace].moveData.nowPnlX);

          $wrap.css('overflow', 'hidden');
          $inner.animate({
              left: -$inner.closest('.list-wrap').outerWidth(),
          }, 600, '', function(){
              $item.animate({
                  height: 0
              }, 350, '', function(){
                  $item.remove();
                  $wrap.css('overflow', 'visible');
              });
          });
      },
      init: function(){
      }
  },

    mainSlider: {
      slide: {},
      init: function () {
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
          customPaging: function (slider, idx) {
            return '<a href="#">' + ((idx < 9) ? '0' + ++idx : ++idx) + '</a>';
          },
        })
      }
    },
    kakaomap: {
      init: function () {
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
      opt: {
        type: 'default',
        target: false, // $(target) : 필수 
        body: false, // $(target)
        delay: 1400, // number
        message: [''], // array
        endCallback: function () {} // endCallback
      },
      activeToast: [],
      timer: [],
      toggleToast: function (opt) {
        var _opt = opt === undefined ? {} : opt;
        var _opt = $.extend(true, {}, win[namespace].toast.opt, opt);
        var $toggleTarget = _opt.target;
        var alertType = _opt.type;
        var $toast = $('.ui-toast.' + alertType);
        var $body = !_opt.body ? $('body') : _opt.body;
        var delay = _opt.delay;
        var msg = _opt.message;
        var endCallback = _opt.endCallback;

        // 메세지 토글 여부
        if (msg.length > 1) {
          msg = !$toggleTarget.hasClass('on') ? msg[0] : msg[1];
          $toggleTarget.toggleClass('on');
          !$toggleTarget.find('.only-sr').length ? $toggleTarget.append('<span class="only-sr">선택됨</span>') : ''; // [20200904/jh] 접근성 관련 문구 추가
        }

        // 활성화 토스트 배열에 넣음
        var _idx = win[namespace].toast.activeToast.indexOf(alertType);
        if (_idx === -1) {
          _idx = win[namespace].toast.activeToast.length < 1 ? 0 : win[namespace].toast.activeToast.length;
          win[namespace].toast.activeToast.push(alertType);
        }

        // 이미 같은 타입의 toast가 없을 때
        if (!$body.find('.ui-toast.' + alertType).length) {
          var _html = '<div class="ui-toast ' + alertType + '"><span>' + msg + '</span></div>';
          $body.append(_html);
          $toast = $('.ui-toast.' + alertType);
          setTimeout(function () {
            $toast.addClass('on');
          }, 10);
        } else { // 있을 때
          $toast.removeClass('on');
          setTimeout(function () {
            $toast.addClass('on').html(msg);
          }, 100);
        }
        clearTimeout(win[namespace].toast.timer[_idx]);

        win[namespace].toast.timer[_idx] = setTimeout(function () {
          win[namespace].toast.hideToast(alertType);
          endCallback(); // [20200720/jh] endCallback 추가
        }, delay);
      },
      hideToast: function (alertType) {
        $('.ui-toast.' + alertType).removeClass('on');
        setTimeout(function () {
          $('.ui-toast.' + alertType).remove();
          win[namespace].toast.activeToast.splice(win[namespace].toast.activeToast.indexOf(alertType), 1);
        }, 200);
      },
      run: function () {
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
    /**
     * 
     * @param {String} status (ready, play)
     * @param {String} type
     * @param {Number || String} duration (1000 || 'infinite')
     * @param {function} callback
     */
    animationTimer: {},
    animationStop: {},
    sequence: undefined,
    animationStatus: function (status, type, duration, callback) {
      if (status === 'stop') {
        clearTimeout(win[namespace].animationStop);
        cancelAnimationFrame(win[namespace].animationTimer);
        return;
      }

      var jsonSource;

      if (win[namespace].sequence === undefined) {
        $.ajax({
          url: '/profile/resource/js/json/animation.json',
          dataType: 'json',
          success: function (data) {
            win[namespace].sequence = data;
            startAnimation();
          }
        })
      } else {
        startAnimation();
      }

      function startAnimation() {

        jsonSource = win[namespace].sequence[type];


        var _cvs = document.querySelector('#canvasCharacter');
        var _ctx = _cvs.getContext('2d');
        var _maxFrame = 30;
        var _minHeight = 700;

        var _dx = 0;
        var _dy = 0;

        // switch (type)	{
        //   case 'b':
        //   _dx = 240;
        //   break;

        //   case 'c':
        //   _dx = 380;
        //   break;

        //   case 'd':
        //   _dx = 270;
        //   break;

        //   case 'e1':
        //   _dx = 400;
        //   break;

        //   case 'e2':
        //   _dx = 400;
        //   break;
        // }

        // switch (type)	{

        //   case 'f':
        //   _dy = 80;
        //   break;

        //   case 'c':
        //   _dy = 70;
        //   break;

        //   case 'e2':
        //   _dy = 120;
        //   break;
        // }

        var _img = new Image();
        _img.src = '/profile/resource/img/' + type + '.png';
        _img.onload = function (e) {
          _cvs.width = 500;
          _cvs.height = _minHeight;

          _ctx.drawImage(_img, 0, 0, _cvs.width, _minHeight, _dx, _dy, _cvs.width, _minHeight); // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          _cvs.classList = 'type-' + type;

          if (status !== 'play') {
            !!callback && callback();
          }
        }

        if (status === 'play') {
          _img.onload = function (e) {
            !!callback && callback();
            _cvs.classList = 'type-'+type;
            doAnimation();
          }

          var count = 0;
          var frame = 10000;
          var frameLength = Object.keys(jsonSource.frames).length;
          clearTimeout(win[namespace].animationStop);
          doAnimation();

          function doAnimation() {
            cancelAnimationFrame(win[namespace].animationTimer);
            count++;
            frame = 10000 + parseInt(count / 3);
            if (frame - 10000 < frameLength - 1) {
              setBgAndTimer();
            } else if (!duration) { // duration이 없을 땐 1세트만
              cancelAnimationFrame(win[namespace].animationTimer);
            } else { // duration이 있고 시간이 아직 남았으면
              count = 0;

              if (type === 'f') {
                count = 27 * 3;
              }

              setBgAndTimer();
            }

            function setBgAndTimer() {
              var frameInfo = jsonSource.frames['character' + frame].frame;
              _cvs.width = _cvs.width;
              _ctx.drawImage(_img, frameInfo.x, frameInfo.y, frameInfo.w, _minHeight, _dx, _dy, frameInfo.w, _minHeight); // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
              win[namespace].animationTimer = requestAnimationFrame(doAnimation)
            }
          }

          function endMotion() {
            frame = frameLength - 1 + 10000;

            switch (type) {
              case 'animation1':
                frame = frameLength - 6 + 10000;
                break;
            }
            var frameInfo = jsonSource.frames['character' + frame].frame;

            _cvs.width = _cvs.width;
            _ctx.drawImage(_img, frameInfo.x, frameInfo.y, frameInfo.w, _minHeight, _dx, _dy, frameInfo.w, _minHeight);
          }

          if (!!duration && duration !== 'infinite') {
            win[namespace].animationStop = setTimeout(function () {
              endMotion();
              cancelAnimationFrame(win[namespace].animationTimer);
            }, duration)
          }
        }

      }
    },
    init: function () {

      $(win).off('.' + namespace)
        .on('resize.' + namespace, function () {
          win[namespace].checkBrowserSize();
        });

      $(doc).on('ready.' + namespace, function () {
        win[namespace].checkBrowserSize();

        win[namespace].navLoad();
        win[namespace].footerLoad();
        win[namespace].status.scrollCheck.init();

        win[namespace].nav.hoverMenu(); // hover evt on nav
        win[namespace].nav.slidingMenu(); // show/hide evt on nav
        win[namespace].nav.openDepth2(); // 2depth links evt on nav

        win[namespace].accordion.init();

        $(doc).on('click', '.btn-top', function () {
          $('body, html').animate({
            scrollTop: 0
          }, 200)
        })


      })
      $(doc).on('scroll.' + namespace, function () {

      })
    }
  }

  win[namespace].init();
})(jQuery, window, document);