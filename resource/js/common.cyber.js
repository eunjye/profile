// eventListener
$(window).on({
    'load': function(){
        cyberUI.pageSetting.header();
        cyberUI.pageSetting.footer();
        cyberUI.pageSetting.rnb();
        
        // 2020.07.22 메뉴 찾기 추가
        cyberUI.searchMenu.init();
    },
});
$(document).on({
    'ready': function(){
        cyberUI.listAct.init();
        cyberUI.listAct.dataAcco.init(); // data-wrap의 ui-acco-btn click evt
        cyberUI.chartTableChange.init();
    },
    'scroll': function(){
        cyberUI.scrollAct.fnDir();
        cyberUI.scrollAct.fnFlag();
        cyberUI.scrollAct.fnIsTopOrEnd();
    },
});


// [20200914/jh] Start : 접근성 & 디자인 수정 : 계좌번호 슬라이드 라디오버튼 선택 시 자동 슬라이딩
$(document)
    .off('change.changeRdoInAccount, click.checkLabelInAccount', 'click.checkFirstRdoInAccount')
    .on('change.changeRdoInAccount', '.ui-carousel.type-account input[type="radio"]', goAccountSlide)
    .on('click.checkLabelInAccount','.ui-carousel.type-account label, .ui-carousel.type-account .account-add', goAccountSlide)
    .on('click.checkFirstRdoInAccount', '.ui-carousel.type-account .ui-carousel-item.init', goFirstSlide);

function goAccountSlide() {
    var $ts = $(this)
        , $sldWrap = $ts.closest('.slick-slider')
        , $sld = $ts.closest('.slick-slide');

    if ($ts.prop('checked')) {
        $sldWrap.find('.ui-carousel-item').removeClass('checked');
        $ts.closest('.ui-carousel-item').addClass('checked');
    }
    if (!$sld.hasClass('slick-active')){
        var _sldIdx = parseInt($sld.attr('data-slick-index'));
        (!isMobileChk && _sldIdx === $sldWrap.find('.slick-slide').length - 1) ? --_sldIdx : '';
        $sldWrap.slick('slickGoTo', _sldIdx);
        console.log(_sldIdx);
    }
}
function goFirstSlide() {
    var $ts = $(this)
        , $sldWrap = $ts.closest('.slick-slider');

    $sldWrap.slick('slickGoTo', 1).find('input[type="radio"]').eq(0).click();
}
// [20200914/jh] End : 접근성 & 디자인

var cyberUI = {
    isTabLoadFile: false, // 탭 로드 방식이 true:.html load / false:파일 내부에 있음
    setTabIdx: 0,
    pageSetting: {
        header: function() {
//            $('.gnb-menu').load('../cyber/header.html', function() {
        	
        	/*
            if (!isMobileChk) {
                // 2020.08.20 headerId 주석 처리
                // var headerId = $('.gnb').attr('id');
                var pTitle;
                switch(pageInfo.category) {
                    case 'cyberVari':
                        pTitle = '변액보험자산관리센터';
                        break;
                    case 'cyberPension':
                        pTitle = '연금자산관리센터';
                        break;
                    case 'cyberInsure':
                        pTitle = '보험';
                        break;
                    case 'cyberLoan':
                        pTitle = '대출';
                        break;
                    case 'cyberIRP':
                        pTitle = '개인IRP';
                        break;
                    case 'cyberPersonal':
                        pTitle = '퇴직연금(개인)';
                        break;
                    case 'cyberBiz':
                        pTitle = '퇴직연금(기업)';
                        break;
                    case 'cyberFund':
                        pTitle = '펀드';
                        break;
                    case 'cyberCerti':
                        pTitle = '증명서발급';
                        break;
                    case 'cyberCustomer':
                        pTitle = '고객센터';
                        break;
                    case 'cyberVIP':
                        pTitle = 'VIP 프로그램';
                        break;
                    case 'cyberMyinfo':
                        pTitle = '내정보관리';
                        break;
                    case 'certiCenter':
                        pTitle = '인증센터';
                        break;
                        // 2020.07.06 추가 - 로그인화면일 때 제목
                    case 'login':
                        pTitle = '로그인';
                        break;
                }

                // 공통화면일 때
                // 2020.08.20 조건 수정
                if ($('.wrap').hasClass('commPage')) {
                    $('.headerTitle').find('.h2').html(pTitle);
                    $('.pageTitle').remove();
                    // 2020.08.20 추후 오픈 시점에는 아래 주석문 풀어주세요.
                    // $('.sub-gnb').remove();
                } else {
                    $('.pageTitle').html(pTitle);
                }
            } else {
                $('.headerTitle').remove();

            }
        	*/
        	
            if (!isMobileChk) {
                // var headerId = $('.gnb').attr('id');
                var pTitle = "";
                switch(pageInfo.category) {
                    case 'cyberVari':
                        pTitle = '변액보험자산관리센터';
                        break;
                    case 'cyberPension':
                        pTitle = '연금자산관리센터';
                        break;
                    case 'cyberInsure':
                        pTitle = '보험';
                        break;
                    case 'cyberLoan':
                        pTitle = '대출';
                        break;
                    case 'cyberIRP':
                        pTitle = '개인IRP';
                        break;
                    case 'cyberPersonal':
                        pTitle = '퇴직연금(개인)';
                        break;
                    case 'cyberBiz':
                        pTitle = '퇴직연금(기업)';
                        break;
                    case 'cyberFund':
                        pTitle = '펀드/신탁';
                        break;
                    case 'cyberCerti':
                        pTitle = '증명서발급';
                        break;
                    case 'cyberCustomer':
                        pTitle = '고객센터';
                        break;
                    case 'cyberVIP':
                        pTitle = 'VIP 프로그램';
                        break;
                    case 'cyberMyinfo':
                        pTitle = '내정보관리';
                        break;
                    case 'certiCenter':
                        pTitle = '인증센터';
                        break;
                    // 2020.07.06 추가 - 로그인화면일 때 제목
                    case 'login':
                        pTitle = '로그인';
                        break;
                }
                
                // 공통화면일 때
                if ($('.wrap').hasClass('commPage')) {
                    $('.headerTitle').find('.h2').html("사이버창구");
                    $('.headerTitle').find('.pageTitle').html(pTitle);
                    //$('.pageTitle').remove();
                    // 2020.08.20 추후 오픈 시점에는 아래 주석문 풀어주세요.
                    //$('.sub-gnb').remove();
                } else {
                	$('.headerTitle').find('.pageTitle').html(pTitle);
                }

                // 2020.08.06 PC에서는 개인화영역 나타나지 않음
                $('.personal-wrap').remove();
            } else {
                $('.headerTitle').remove();

            }
    	
    	
            // 인증센터/로그인/통합검색
            if (!!!isMobileChk) {
                // 인증센터/로그인/통합검색
                var subGnb = $('.sub-gnb');
                // 2020.09.10 사이트 바로가기 추가
                var goSite = $('.site-jump');
                var gnbMenu = $('.gnb-menu');
                if (pageInfo.menu || typeof pageInfo.menu === 'undefined') {
                    // 2020.09.10 사이트 바로가기 추가 관련 수정
                    $('#menuArea').before(subGnb).before(goSite);
                } else {
                    $('.logo').after(subGnb);
                }
                
            } else {
                // mobile에서 메인일 경우, 로고 표시
                if (pageInfo.main) {
                    $('.gnb-wrap').find('.logo').css({display:'block'});
                }
            }

            // 2020.07.06 수정 - drawer 메뉴 높이 계산 script 삭제
            var totMenu = $('.cyber-menu');
            var personal = $('.personal-wrap');
            var pcQuick = $('.quick-menu');
            var contact = $('.contactCont');
            !!!isMobileChk ? personal.remove() : null;
            !!!isMobileChk ? contact.remove() : null;
            // 2020.09.02 웹접근성 관련 전체 메뉴 이동
            !!!isMobileChk ? $('#menuArea').after(totMenu) : null;
            var menuDim = $('<div class="gnbDim"></div>');

            var winH = $(window).innerHeight();
            var gnbH = $('.gnb').outerHeight();
            var totMenuH = !!!isMobileChk ? winH - gnbH + 1 - 100 : winH - personal.outerHeight();
            //totMenu.css({ height: totMenuH+'px' });
            
            // 전체 메뉴
            var lnbOpen = false;
            var timer;
            $('.lnb-open').on('click', function() {
                if (!!!lnbOpen) {
                    // 2020.07.22 메뉴검색 열려있을 때 조건 추가
                    $('.search-menu-area').hasClass('on') ? null : pcQuick.css('z-index', '0');
                    // 2020.09.02 웹접근성 대응 대체 텍스트 추가
                    $(this).addClass('open').children('i').find('span').html('전체메뉴 닫기');
                    totMenu.removeClass('off');
                    totMenu.find('a:not(.mMenu)').attr('tabindex', '0');
                    $('.sub-gnb').css({display: 'none'});
                    // 2020.09.10 사이트 바로가기 추가 관련 수정
                    $('.site-jump').css({ display: 'block' });
                    $('.main-wrap').find('a, button').attr('tabindex', '-1');
                    $('.goTop').find('button').attr('tabindex', '-1');
                    pcQuick.find('a, button').attr('tabindex', '-1');
                    if (isMobileChk) {
                        $('.gnb-menu').addClass('on');
                        if(!$('.gnbDim').hasClass()) $('.gnb-wrap').append(menuDim);

                        // 2020.08.27 m,Life포인트 아이콘 관련
                        var mPoint = $('.main-wrap').find('.mPoint');
                        if (mPoint.length > 0) mPoint.css({ zIndex: '9' }).removeClass('on');
                    } else {
                    	if(!$('.gnbDim').hasClass()) $('.wrap').append(menuDim);
                    }

                    timer = setTimeout(function() {
                        menuDim.addClass('on');
                        clearTimeout(timer);
                    }, 100);

                    // 2020.07.22 메뉴검색 열려있을 때 조건 추가
                    $('.search-menu-area').hasClass('on') ? null : stopScroll();
                    lnbOpen = true;
                } else {
                    // 2020.07.22 메뉴검색 열려있을 때 조건 추가
                    $('.search-menu-area').hasClass('on') ? null : pcQuick.removeAttr('style');
                        // 2020.09.02 웹접근성 대응 대체 텍스트 추가
                        $(this).removeClass('open').children('i').find('span').html('전체메뉴 열기');
                    totMenu.addClass('off');
                    totMenu.find('a:not(.mMenu)').attr('tabindex', '-1');
                    $('.sub-gnb').css({display: 'block'});
                    
                    // 2020.09.02 로그인 화면에서의 처리
                    pageInfo.category !== 'login' ? $('.sub-gnb').css({display: 'block'}) : '';
                    // 2020.09.10 사이트 바로가기 추가 관련 수정
                    $('.site-jump').css({ display: 'none' });
                    
                    $('.main-wrap').find('a, button').removeAttr('tabindex');
                    $('.goTop').find('button').removeAttr('tabindex');
                    isMobileChk ? $('.gnb-menu').removeClass('on') : null;
                    $('.gnbDim').removeClass('on');

                    timer = setTimeout(function() {
                        $('.gnbDim').remove();
                        clearTimeout(timer);
                    }, 100);

                    // 2020.07.22 메뉴검색 열려있을 때 조건 추가
                    $('.search-menu-area').hasClass('on') ? null : allowScroll();
                    lnbOpen = false;

                    // 2020.08.27 m,Life포인트 아이콘 관련
                    if (isMobileChk) {
                        var mPoint = $('.main-wrap').find('.mPoint');
                        if (mPoint.length > 0) mPoint.css({ zIndex: '10' });
                        var gTimer = setTimeout(function() {
                            mPoint.addClass('on');
                            clearTimeout(gTimer);
                        }, 1000);
                    }
                }
            });
            //});
                // 2020.09.17 웹접근성 :: 전체메뉴의 링크 선택 시 logo로 focus 이동 
                if (!!!isMobileChk) {
                    $('.sub-gnb').find('a').on('keydown keypress', function(e) {
                        if (e.keyCode === 13) {
                            $('.gnb-wrap').find('.logo').focus();
                        }
                    });

                    $('.link-jump').on('keydown keypress', function(e) {
                        if (e.keyCode === 13) {
                            $('.gnb-wrap').find('.logo').focus();
                            $('.lnb-open').removeClass('open').children('i').find('span').html('전체메뉴 열기');
                            totMenu.addClass('off');
                            totMenu.find('a:not(.mMenu)').attr('tabindex', '-1');
                            pageInfo.category !== 'login' ? $('.sub-gnb').css({display: 'block'}) : '';
                            $('.site-jump').css({ display: 'none' });
                            $('.main-wrap').find('a, button').removeAttr('tabindex');
                            $('.goTop').find('button').removeAttr('tabindex');
                            $('.gnb-menu').removeClass('on');
                            $('.gnbDim').removeClass('on');

                            timer = setTimeout(function() {
                                $('.gnbDim').remove();
                                clearTimeout(timer);
                            }, 100);

                            // 2020.07.22 메뉴검색 열려있을 때 조건 추가
                            $('.search-menu-area').hasClass('on') ? null : allowScroll();
                            lnbOpen = false;
                        }
                    });

                    $('.menu-wrap').find('a').on('keydown keypress', function(e) {
                        if (e.keyCode === 13) {
                            $('.gnb-wrap').find('.logo').focus();
                            $('.lnb-open').removeClass('open').children('i').find('span').html('전체메뉴 열기');
                            totMenu.addClass('off');
                            totMenu.find('a:not(.mMenu)').attr('tabindex', '-1');
                            pageInfo.category !== 'login' ? $('.sub-gnb').css({display: 'block'}) : '';
                            $('.site-jump').css({ display: 'none' });
                            $('.main-wrap').find('a, button').removeAttr('tabindex');
                            $('.goTop').find('button').removeAttr('tabindex');
                            $('.gnb-menu').removeClass('on');
                            $('.gnbDim').removeClass('on');

                            timer = setTimeout(function() {
                                $('.gnbDim').remove();
                                clearTimeout(timer);
                            }, 100);

                            // 2020.07.22 메뉴검색 열려있을 때 조건 추가
                            $('.search-menu-area').hasClass('on') ? null : allowScroll();
                            lnbOpen = false;
                        }
                    });
                }            
            
        },
        footer: function() {
            // 2020.06.17 수정 - footer 조건 수정
            //if (!isMobileChk && pageInfo.footer !== false) {
            //    $('body').append('<div class="footer"></div>');
            //    $('.footer').load('/html/cmmn/footer.html');
            //}
            // else {
            //     $('.main-wrap').append('<div class="footer"></div>');

            //     if ($('.btn-wrap-fixed').length > 0) {
            //         $('.main-wrap').append($('.btn-wrap-fixed'));
            //     }
            // }
        },
        rnb: function() {
            // 2020.08.15 rnb 추가 조건 수정 : pageInfo의 category값 기준
            // 2020.08.20 rnb 추가 관련 script 수정
            if (!isMobileChk) {
                // 2020.06.05 수정 - RNB load 수정
                $('.rnb').load('/html/cmmn/rnb.html');
            }

            // if (pageInfo.category === 'cyberBiz' || pageInfo.category === 'cyberPersonal' || pageInfo.category === 'cyberPoint' || pageInfo.category === 'login' || !!!pageInfo.category) {
            //     $('.main-wrap').addClass('non-rnb');
            //     $("#rnbCont").hide();
            // } else {
            // 	$("#rnbCont").show();
            // }

            // 2020.08.31 rnb에 따른 layout 설정 script 수정
            if (!!!pageInfo.category) {
                $('.main-wrap').addClass('non-rnb');
                $('#rnbCont').hide();
            } else {
                if (pageInfo.category === 'cyberIRP' || pageInfo.category === 'cyberBiz' || pageInfo.category === 'cyberPoint' || pageInfo.category === 'cyberPersonal' || pageInfo.category === 'login') {
                    if (pageInfo.category === 'cyberBiz'){
                    	$('.main-wrap').addClass('non-rnb');
                    }
                    $('#rnbCont').hide();
                } else {
                    $('#rnbCont').show();
                }
            }

            // 2020.08.31 화면 깜빡임 방지
            $('.cyber-wrap').css({ opacity: '1' });
        },
        
        lnbOpenEvt: function() {

            var lnbOpen = false;
            $('.lnb-open').off('click').on('click', function() {
                if (!!!lnbOpen) {
                    $('.rnb').find('a, button').attr('tabindex', '-1');
                    lnbOpen = true;
                } else {
                    $('.rnb').find('a, button').removeAttr('tabindex');
                    lnbOpen = false;
                }
            });
        }        
    },
    scrollAct: { // 스크롤 방향 체크
        prev: 0,
        now: 0,
        prevDir: '', 
        dir: true, // 현재 방향 ('up', 'down)
        flag: true, // 현재 방향과 이전 방향이 같은지 여부 (같음:true, 다름:false)
        isTop: false,
        isEnd: false, // 페이지의 최하단인지 여부 (true, false)
        init: function(){
            var evt = '';
            if (isMobileChk) {
                evt = 'scroll.scrollAct touchstart.scrollAct touchend.scrollAct';
            } else {
                evt = 'scroll.scrollAct';
            }
            $(document).off(evt).on(evt, function(){
                cyberUI.scrollAct.fnDir();
                cyberUI.scrollAct.fnFlag();
                cyberUI.scrollAct.fnIsTopOrEnd();
            });
        },
        fnDir: function(){ 
            var nowDir;
            if (!!$('.ui-modal.view').length) {
                var $modal = $('.ui-modal.view').not('.modal-system')
                    , _id = $modal.attr('id');

                if (!!$modal.find('.ui-modal-inner').length) {
                    cyberUI.scrollAct.now = -$modal.find('.ui-modal-inner').position().top;
                }

                /* -----------------------
                 * [200510/jh] Issues
                 * 1. 모달 내에서 header, footer 날리고 cont height 100%으로 돼야 함 ㅜㅜ
                   ----------------------- */
                $('.ui-modal-cont').off('scroll.'+_id).on('scroll.'+_id, function(){
                    cyberUI.scrollAct.fnDir();
                    cyberUI.scrollAct.fnFlag();
                    cyberUI.scrollAct.fnIsTopOrEnd();
                });
            } else {
                cyberUI.scrollAct.now = $(window).scrollTop();
            }
            nowDir = cyberUI.scrollAct.prev > cyberUI.scrollAct.now ? 'up' : 'down';
            cyberUI.scrollAct.prev = cyberUI.scrollAct.now;
            cyberUI.scrollAct.dir = nowDir;
            return nowDir;
        },
        fnFlag: function(){ 
            var nowDir = cyberUI.scrollAct.dir
                , _flag = cyberUI.scrollAct.prevDir === nowDir ? true : false;
            if (!_flag) {
                cyberUI.scrollAct.prevDir = nowDir;
            }
            cyberUI.scrollAct.flag = _flag;
            return _flag;
        },
        fnIsTopOrEnd: function(){
            var isTop = false
                , isEnd = false;
            // modal 내에서 스크롤 시
            if (!!$('.ui-modal.view').length){
                var $wrap = $('.ui-modal.view')
                    , $inner = $wrap.find('.ui-modal-inner')
                    , $header = $wrap.find('.ui-modal-header')
                    , $footer = $wrap.find('.ui-modal-footer')
                    , _popH = $wrap.find('.ui-modal-cont').outerHeight()
                    , _headerH = $header.outerHeight()
                    , _footerH = !!$footer.length ? $footer.outerHeight() : 0
                    , _innerH = $inner.prop('scrollHeight');

                if (cyberUI.scrollAct.now + _popH > _innerH - _footerH){
                    isEnd = true;
                } else {
                    isEnd = false
                };
                if (cyberUI.scrollAct.now < _headerH) {
                    isTop = true;
                } else {
                    isTop = false;
                }
            } else {
                var $header = !!$('.header-wrap').length ? $('.header-wrap') : $('header')
                    , $footer = $('.btn-wrap-fixed')
                    , _docH = $('body').outerHeight()
                    , _headerH = $header.outerHeight()
                    , _footerH = !!$footer.length ? $footer.outerHeight() : 0
                    , _innerH = $('body').prop('scrollHeight');
                if (!!$('.ui-fixed-top').length) {
                    $('.ui-fixed-top').each(function(idx, item){
                        _headerH += $(item).outerHeight();
                    });
                }
                if (cyberUI.scrollAct.now + _docH > _innerH - _footerH){
                    isEnd = true;
                } else {
                    isEnd = false;
                }
                if (cyberUI.scrollAct.now < _headerH) {
                    isTop = true;
                } else {
                    isTop = false;
                }
            }
            cyberUI.scrollAct.isTop = isTop;
            cyberUI.scrollAct.isEnd = isEnd;
        }
    },
    /* =========================
     *  name: isInView 
     *  author: ejh
     *  date (init/latest): 2020.05.06 / 2020.05.17
     *  reutrn value: boolean
     *  how to use: cyberUI.isInView($elements)
     *  description: 화면 내에 element가 존재하는지 여부 체크
     *  ========================= */
    isInView: function($el){
        var _flag = false;

        if ($el.length > 1) { // 여러개의 elements일 때 (ex:클래스 선택자)
            $el.each(function(_idx, item){
                var _top = $(item).offset().top
                    , _left = $(item).offset().left
                    , _height = $(item).outerHeight()
                    , _width = $(item).outerWidth();

                // 하나라도 true이면 true이도록
                _flag = _top < (window.pageYOffset + window.innerHeight) &&
                    _left < (window.pageXOffset + window.innerWidth) &&
                    (_top + _height) > window.pageYOffset &&
                    (_left + _width) > window.pageXOffset || _flag ? true : false;
            })
        } else { // 단독 element일 때
            var _top = $el.offset().top
                , _left = $el.offset().left
                , _height = $el.outerHeight()
                , _width = $el.outerWidth();

            _flag = _top < (window.pageYOffset + window.innerHeight) &&
                _left < (window.pageXOffset + window.innerWidth) &&
                (_top + _height) > window.pageYOffset &&
                (_left + _width) > window.pageXOffset;
        }

        return _flag;
    },
    /* =========================
     *  name: navShowHide 
     *  author: ejh
     *  date (init/latest): 2020.05.06 / 2020.05.17
     *  option: {
     *      headerShow: {true/false}, // false 시 헤더 숨김
     *      footerShow: {true/false},  // false 시 푸터 숨김
     *      topFloatingShow: {true/false},  // false 시 상단 floating 숨김
     *  }
     *  reutrn value: -
     *  how to use: cyberUI.navShowHide(option)
     *  description: 헤더, 푸터 숨김/나타남 제어
     *  ========================= */
    navShowHide: function(_opt){
        var $header = !!$('.header-wrap').length ? $('.header-wrap') : $('header')
            , $footer = $('.btn-wrap-fixed .floating-wrap')
            , $topFloating = $('.ui-floating.ui-fixed-top .ui-floating-wrap')
            , isModal = false;

        if (!!$('.ui-modal.view').not('.modal-system').length) {
            var $modal = $('.ui-modal.view')
                , $modalInner = $modal.find('.ui-modal-cont');
            $header = !!$modal.find('.modal-header-wrap').length ? $modal.find('.modal-header-wrap') : $modal.find('.ui-modal-header');
            $footer = $modal.find('.ui-modal-footer');
            isModal = true;
        }
        
        $footer = cyberUI.setElementInTab({element: $footer});
            

        var opt = {
            headerShow: isShow($header),
            footerShow: isShow($footer),
            topFloatingShow: isShow($topFloating)
        };

        function isShow($el) {
            if (!$el.length) { 
                return false; 
            };
            var _isShow = $el.attr('data-show');
            if (_isShow === 'false') {
                _isShow = false
            } else if( _isShow === undefined ) {
                _isShow = true 
            } else { _isShow = true }
            return _isShow;
        }

        var opt = $.extend(false, {}, opt, _opt)
            , headerDir = opt.headerShow ? 'down' : 'up'
            , footerDir = opt.footerShow ? 'up' : 'down'
            , topFloatingDir = opt.topFloatingShow ? 'down' : 'up';

        // Header
        if (!!$header.length && _opt.headerShow !== undefined) {
            objShowHide({
                obj: $header, 
                show: opt.headerShow,
                base: 'top', 
                direction: headerDir
            });
        }
        
        // Footer
        if (!!$footer.length && _opt.footerShow !== undefined) {
            objShowHide({
                obj: $footer, 
                show: opt.footerShow,
                base: 'bottom', 
                direction: footerDir
            });
        }

        // Top Floating Element
        if (!!$topFloating.length && _opt.topFloatingShow !== undefined) {
            objShowHide({
                obj: $topFloating, 
                show: opt.topFloatingShow,
                base: 'top', 
                direction: topFloatingDir,
                rootY: $header.attr('data-show') === 'false' ? 0 : $header.outerHeight()
            });
        }

        function objShowHide(e) {
            var $el = e.obj
                , show =  e.show
                , base = e.base
                , dir = e.direction
                , rootY = e.rootY === undefined ? 0 : e.rootY
                , action;
                
            if (isModal) {
                var _modalH = !!$modal.find('.ui-modal-footer').length ? $(window).outerHeight() - $modal.find('.ui-modal-footer').outerHeight() : $(window).outerHeight();
            }
            if ($el.data('moving')) { return false; }
            var delta = 300;
            
            $el.data('moving', true);
            if (dir === 'down') {
                if (base === 'top') {
                    action = isModal ? {marginTop: rootY} : {top: rootY}
                    $el.stop().animate(action, delta, callback);
                    if (isModal) {
                        $modalInner.animate({
                            height: _modalH - $header.outerHeight()
                        }, delta);
                    }
                } else {
                    $el.stop().animate({
                        bottom: -$el.outerHeight()
                    }, delta, callback);
                }
            } else {
                if (base === 'top') {
                    action = isModal ? {marginTop: -$el.outerHeight()} : {top: -$el.outerHeight()}
                    $el.stop().animate(action, delta, callback);
                    if (isModal) {
                        $modalInner.animate({
                            height: _modalH
                        }, delta);
                    }
                } else {
                    $el.stop().animate({
                        bottom: rootY
                    }, delta, callback);
                }
            }
            $el.attr('data-show', show);

            function callback(){
                $el.data('moving', false);
            };
        }
    },
    fnGetParam: function(sname) {
        var params = location.search.substr(location.search.indexOf("?") + 1);
        var sval = "";
        params = params.split("&");
        for (var i = 0; i < params.length; i++) {
            temp = params[i].split("=");
            if ([temp[0]] == sname) { sval = temp[1]; }
        }
        return sval;
    },
    // list upper에 있는 버튼형 콤보박스
    combobox: {
        value: '',
        change: function(_opt) {
            var opt = {
                element: {},
                index: 0,
                callback: function() {}
            };
            opt = $.extend(true, opt, _opt);

            var $combo = opt.element
                , _idx = opt.index
                , callback = opt.callback
                
                , $btnCombo = $combo.find('.combo-btn')
                , $btn = $combo.find('.combo-list-btn')
                , $btnCurr = $btn.eq(_idx)
                
                , v = $btnCurr.text();

            $combo.removeClass('on');
            if ($combo.length > 1){ // combobox 여러개 제어할 시
                var arrData = [];
                $combo.each(function(_elIdx, item){
                    $btnCombo = $(item).find('.combo-btn');
                    $btn = $(item).find('.combo-list-btn');
                    $btnCurr = $btn.eq(_idx);
                    v = $btnCurr.text();

                    comboSet();

                    cyberUI.combobox.value = [];
                    cyberUI.combobox.value.push(v);

                    var data = [$btnCurr, $(item), v];
                    arrData.push(data);
                })
                callback(arrData);
            } else {
                comboSet();
                cyberUI.combobox.value = v;
                
                callback($btnCurr, $combo, v);
            }
            function comboSet($el) {
                $btnCombo.text(v);
                $btn.removeClass('selected');
                $btnCurr.addClass('selected');
            }
        },
        init: function(_opt) {
            var evtCombobox = isMobileChk ? 
                'touch.comboToggle click.comboToggle touchstart.comboClose' : 
                'click.comboToggle'
                , opt = {
                    element: '.combo-box',
                    callback: function() {}
                };
            opt = $.extend(true, opt, _opt);

            // 모달 로딩중인지 체크
            var chkPageLoading = setInterval(function(){
                if (!isModalLoading) {
                    clearInterval(chkPageLoading);
                    $(opt.element).data('combo-opt', opt);
            	}
            }, 10);

            $(document).off(evtCombobox).on(evtCombobox, function(event){
                var $ts = $(event.target)
                    , isComboEvt = !!$ts.closest('.combo-box').length; // 콤보박스 내 이벤트인가

                function comboAct() {
                    var $combo = $ts.closest('.combo-box')
                        , opt = $combo.data('combo-opt');
                    // 콤보박스 리스트  선택 시
                    if ($ts.hasClass('combo-list-btn') || !!$ts.closest('.combo-list-btn').length) { // [20200825/jh] 리스트 버튼 내 다른 태그 선택 시
                    	$ts = !$ts.hasClass('combo-list-btn') ? $ts.closest('.combo-list-btn') : $ts;
                        var v = $ts.text();
                        $combo.find('.combo-list-btn').removeClass('selected');
                        $ts.addClass('selected');
                        $combo.find('.combo-btn').text(v);
                        cyberUI.combobox.value = v;
                        opt.callback($ts, $combo, v);
                    }

                    if (!!$('.combo-box.on').length) {
                        $('.combo-box.on').not($combo).removeClass('on');
                    }
                    if ($combo.hasClass('on')) {
                        $combo.removeClass('on');
                    } else {
                        $combo.addClass('on');
                    }
                }
                function comboClose() {
                    // 콤보박스 외 터치 시
                    if (!!$('.combo-box.on').length) {
                        $('.combo-box.on').removeClass('on');
                    }
                }
                // 콤보박스 버튼 클릭 시
                if (isComboEvt) {
                    if (!isMobileChk) {
                        comboAct();
                    } else if (event.type !== 'touchstart') {
                        comboAct();
                    }
                } else {
                    if (!isMobileChk) {
                        comboClose();
                    } else if (event.type === 'touchstart') {
                        comboClose();
                    }
                }
            })
        }
    },
    setElementInTab: function(opt) {
        var _opt = {
            tabIdx: false
        }
        _opt = $.extend(true, _opt, opt);
        var $el = _opt.element
            , tabIdx = _opt.tabIdx;
        if (!$el.closest('.tab-wrap').length) { return $el; }
        // 탭 안에 element 있을 시 보이는 element로 기준
        var $tabWrap = $('.tab-wrap');

        if (tabIdx === false) {
            var $tabBtn = $('.tab-btns-wrap .btn-tab');
            tabIdx = $tabBtn.index($tabBtn.filter('.now'));
        }

        $el.data('hidden', true);
        $el = $tabWrap.find('.tab-cont').eq(tabIdx).find($el);
        $el.data('hidden', false);
        return $el;
    },
    chartTableChange: {
        init: function() {
            $(document).on('change.changeChartTable', '.chartTbl-btn input', function(){
                if ($(this).closest('.chartTbl-btn').attr('data-change') === 'false') { return false; } // [20200814/jh] 내부 컨텐츠 토글 막는 case 추가
                var $ts = $(this)
                    , $wrap = $ts.closest('.chart-tbl-wrap')
                    , $chart = $wrap.find('.chart-cont')
                    , $table = $wrap.find('.tbl-cont')
                    , _id = $ts.attr('id')
                    , $btnChartPattern = $ts.closest('.chart-tbl-btns').find('.btn-base.chart')
                    , $btnNoChange = $ts.closest('.chart-tbl-btns').find('[data-change="false"]');
                if (!!$ts.prop('checked')) {
                    $chart.removeClass('on');
                    $table.addClass('on');
                    $btnChartPattern.length ? $btnChartPattern.hide() : '';
                    $btnNoChange.length ? $btnNoChange.hide() : '';
                } else {
                    $chart.addClass('on');
                    $table.removeClass('on');
                    $btnChartPattern.length ? $btnChartPattern.show() : '';
                    $btnNoChange.length ? $btnNoChange.show() : '';
                }
            })
        }
    },
    // 리스트에서 위아래 스크롤 시 nav 액션
    scrollOnList: {
        refresh: function(opt) {
            var _opt = {
                    tabIdx: false
                };
            _opt = $.extend(true, _opt, opt);

            if (_opt.tabIdx !== false){
                var $modal = $('.ui-modal.view');
                if (!!$modal.hasClass('modal-system')) {
                    return false;
                }
                var $tabCont = $modal.find('.tab-cont').eq(_opt.tabIdx)
                    , $headerWrap = $tabCont.find('.modal-header-wrap')
                    , $floating = $tabCont.find('.ui-floating .ui-floating-wrap');

                $headerWrap.find('.inner.toggle').remove();
            }
            cyberUI.scrollAct.fnDir();
            cyberUI.scrollAct.fnFlag();
            cyberUI.scrollAct.fnIsTopOrEnd();
            cyberUI.scrollOnList.init(_opt);
        },
        preventEvt: false,
        navAniFromDir: function(){
            var noFooter = cyberUI.scrollAct.isEnd
                , noHeader = cyberUI.scrollAct.isTop
                , _show;

            if (cyberUI.scrollAct.dir === 'up') {
                _show = true;
            } else {
                _show = false;
            }

            if (noFooter && noHeader){
                return false;
            } else if (noFooter){
                cyberUI.navShowHide({
                    headerShow: _show,
                    topFloatingShow: _show
                })
            } else if (noHeader) {
                cyberUI.navShowHide({
                    footerShow: _show,
                })
            } else {
                cyberUI.navShowHide({
                    headerShow: _show,
                    footerShow: _show,
                    topFloatingShow: _show
                })
            }
        },
        init: function(opt){
            if (!isMobileChk) { return false; } // 모바일에서만 || event 막은게 없을때 실행되도록

            var $list = !!$('.ui-modal .list-wrap').length ? $('.ui-modal .list-wrap'): $('.list-wrap')
                , _opt = {
                    tabIdx: false,
                    callback: function(){}
                };
                _opt = $.extend(true, _opt, opt);
            
            var tabIdx = !cyberUI.isTabLoadFile ? _opt.tabIdx : 0 // 파일 로드 방식이 아닐 때 옵션값 적용
                , callback = _opt.callback;
            
            setTimeout(function(){
                $list = cyberUI.setElementInTab({element: $list, tabIdx:0});
            }, 1000);

            console.log($list, $list.data('hidden'));

            if (!$list.length || !isMobileChk || !!$list.data('hidden')) { return false; }

            /* Case 1. modal 존재 시
            -------------------------- */
            if (isModalLoading) {
                // // 모달 로딩중인지 체크
                // var chkPageLoading = setInterval(function(){
                //     if (!isModalLoading) {
                //         clearInterval(chkPageLoading);
                //         if (!$('.ui-modal').eq(0).find('.list-wrap').length) { return false; }
                        
                // var $modal = $list.closest('.ui-modal')
                //     , namespace = $modal.attr('id')+'List';

                // var _initY = cyberUI.scrollAct.now
                //     , _initDir = 'up'
                //     , $headerWrap = $modal.find('.modal-header-wrap')
                //     , $header = $modal.find('.ui-modal-header')
                //     , $cont = $modal.find('.ui-modal-cont')
                //     , $footer = $modal.find('.ui-modal-footer')
                //     , $floating = $modal.find('.ui-floating .ui-floating-wrap')
                //     , $floatingInTab = cyberUI.setElementInTab({element: $floating, tabIdx:tabIdx});

                // // header + floating setting
                // !$headerWrap.length ? $header.wrap('<div class="modal-header-wrap"></div>') : '';
                // $headerWrap = $('.modal-header-wrap');

                // // $header를 감싸줌
                // if (!!$floating.length && !$headerWrap.find('.inner').length){
                //     $floating.not($('.tab-cont .ui-floating-wrap')).wrapInner('<div class="inner"></div>');
                //     $headerWrap.append($floating.not($('.tab-cont .ui-floating-wrap')).find('.inner'));
                // }
                // if (!!$headerWrap.find('.in-tab').length) {
                //     $headerWrap.find('.in-tab').remove();
                // }
                // // tab 내의 floating 요소 붙여줌
                // if(!!$floatingInTab.length) {
                //     if (!$floatingInTab.find('.inner').length) {
                //         $floatingInTab.wrapInner('<div class="inner in-tab"></div>');
                //     };
                //     var $floatingInTab_clone = $floatingInTab.find('.inner').clone();
                //     $headerWrap.append($floatingInTab_clone.show().addClass('in-tab'));
                //     $floatingInTab.hide();
                // }

                // $headerWrap.css({'background': '#fff', 'z-index':'10'});
                // $header.css({'position': 'relative'});

                // // $cont의 높이 재설정
                // var remainH = $headerWrap.outerHeight() + $footer.outerHeight();
                // $cont.css({ height: 'calc(100% - '+remainH+'px)' });

                // var timer
                //     , flag_header = false // header가 relative일 때
                //     , flag_footer = false; // footer가 초기상태일 때

                // $('.ui-modal .ui-modal-cont').off('touchstart.'+namespace+' scroll.'+namespace).on('touchstart.'+namespace+' scroll.'+namespace, function(){
                //     if (cyberUI.scrollOnList.preventEvt) { return false; }
                //     // 화면 안에 list 있으면 실행
                //     if (cyberUI.isInView($list)){
                //         if (event.type === 'touchstart') {
                //             // 터치 시작할 때마다 위치 초기화
                //             initPosition();
                //         }
                //         if (event.type === 'scroll') {
                //             // 방향 달라질 때마다 위치 초기화
                //             if (_initDir != cyberUI.scrollAct.dir) {
                //                 _initDir = cyberUI.scrollAct.dir;
                //                 initPosition();
                //             }
                //             // document에서 스크롤 시 (수정 필요)
                //             // scrollOnModal(_initY);
                //         }
                //     } else {
                //         clearTimeout(timer);
                //         cyberUI.navShowHide({
                //             headerShow:true,
                //             footerShow:true
                //         })
                //     };

                //     // 위치 초기화
                //     function initPosition(){
                //         _initY = cyberUI.scrollAct.now;

                //         var $footer =  $modal.find('.ui-modal-footer')
                //             , $header = $modal.find('.modal-header-wrap');
                        
                //         $footer = cyberUI.setElementInTab({element: $footer, tabIdx:tabIdx});

                //         !!$header.length ? $header.data('initY', $header.position().top) : '';
                //         !!$footer.length ? $footer.data('initY', $(window).outerHeight() - $footer.position().top - $footer.outerHeight()) : '';
                //     }

                //     // 스크롤 action (Modal)
                //     function scrollOnModal(initY) {
                //         var _initY = initY
                //             , _nowY = cyberUI.scrollAct.now
                //             , delta = _initY - _nowY;
        
                //         var $footer =  $modal.find('.ui-modal-footer')
                //             , $header = $modal.find('.modal-header-wrap');

                //         $footer = cyberUI.setElementInTab({element: $footer, tabIdx:tabIdx});
                        
                //         // 타이머 초기화
                //         clearTimeout(timer);

                //         if (!!$header.length) {
                //             if (cyberUI.scrollAct.isTop) {
                //                 flag_header = true;
                //                 $header.stop().css('top', -cyberUI.scrollAct.now);
                //             } else {
                //                 if (flag_header && cyberUI.scrollAct.dir === 'down'){
                //                     $header.stop().css('top', -$header.outerHeight()).data('moving', false);
                //                     flag_header = false;
                //                 } else {
                //                     controlElement({
                //                         element: $header,
                //                         dir: 'top',
                //                         maxY: 0,
                //                         minY: -$header.outerHeight(),
                //                         initY: $header.data('initY')
                //                     })
                //                 }
                //             }
                //         }
                //         if (!!$footer.length) {
                //             if (cyberUI.scrollAct.isEnd) {
                //                 flag_footer = true;
                //                 $footer.stop().css({'bottom':0}).attr('data-show', true);
                //             } else {
                //                 if (flag_footer && cyberUI.scrollAct.dir === 'up'){
                //                     setTimeout(function(){
                //                         $footer.css({'bottom': 0}).data('moving', false);
                //                         flag_footer = false;
                //                     }, 200)
                                    
                //                 } else {
                //                     controlElement({
                //                         element: $footer,
                //                         dir: 'bottom',
                //                         maxY: 0,
                //                         minY: -$footer.outerHeight(),
                //                         initY: $footer.data('initY')
                //                     })
                //                 }
                //             }
                //         } 
                //         // 스크롤 마지막에 실행시키기위해
                //         timer = setTimeout(function(){
                //             cyberUI.scrollOnList.navAniFromDir();
                //         }, 250)
        
                //         function controlElement(opt) {
                //             var $el = opt.element
                //                 , dir = opt.dir
                //                 , _maxY = opt.maxY
                //                 , _minY = opt.minY
                //                 , _el_initY = opt.initY
                //                 , _delta = _initY - _nowY + _el_initY;
                                
                //             // cyberUI.navShowHide() 실행 시 동작 막음
                //             if (!!$el.data('moving')) {
                //                 return false;
                //             }
                //             if (_delta > _maxY){
                //                 _delta = _maxY;
                //                 $el.attr('data-show', 'true');
                //             } else if (_delta < _minY) {
                //                 _delta = _minY;
                //                 $el.attr('data-show', 'false');
                //             }
                //             if ($el.hasClass('modal-header-wrap')) {
                //                 $el.stop().css('margin-top', _delta);
                //             } else $el.stop().css(dir, _delta);
                //         }
        
                //     }
                // })
            
            } else { 
                /* Case 2. modal이 아닐 때
                -------------------------- */
                var _initY = cyberUI.scrollAct.now
                    , _initDir = 'up'
                    , $headerWrap = $('.header-wrap')
                    , $header = $('header')
                    , $footer = $('.btn-wrap-fixed')
                    , $floating = $('.ui-floating .ui-floating-wrap');

                // header + floating setting
                !$headerWrap.length ? $header.wrap('<div class="header-wrap"></div>') : '';
                $headerWrap = $('.header-wrap');

                if (!!$floating.length && !$headerWrap.find('.inner').length){
                    $floating.closest('.ui-floating').css('height', $floating.outerHeight());
                    $floating.wrapInner('<div class="inner"></div>');
                    $headerWrap.append($floating.find('.inner'));
                }
                $headerWrap.css({'position': 'fixed', 'background': '#fff', 'width': '100%', 'z-index':'10'});
                $header.css({'position': 'relative'});

                // footer setting
                $('.main-wrap').css('padding-bottom', 0);
                // !!$footer.length ? $('.main-wrap').css('padding-bottom', 0) : '';

                var timer
                    , flag_header = false // header가 relative일 때
                    , flag_footer = false; // footer가 relative일 때

                $(window).off('touchstart.onList scroll.onList').on('touchstart.onList scroll.onList', function(){
                    if (cyberUI.scrollOnList.preventEvt) { return false; }
                    // 화면 안에 list 있으면 실행
                    if (cyberUI.isInView($list)){
                        if (event.type === 'touchstart') {
                            // 터치 시작할 때마다 위치 초기화
                            initPosition();
                        }
                        if (event.type === 'scroll') {
                            // 방향 달라질 때마다 위치 초기화
                            if (_initDir != cyberUI.scrollAct.dir) {
                                _initDir = cyberUI.scrollAct.dir;
                                initPosition();
                            }
                            // document에서 스크롤 시
                            scrollOnDoc(_initY);
                        }
                    } else {
                        clearTimeout(timer);
                        cyberUI.navShowHide({
                            headerShow:true,
                            footerShow:true
                        })
                    };

                    // 위치 초기화
                    function initPosition(){
                        _initY = cyberUI.scrollAct.now;

                        var $footer =  $('.btn-wrap-fixed .floating-wrap')
                            , $headerWrap = $('.header-wrap');
                        
                        $footer = cyberUI.setElementInTab({element: $footer, tabIdx:tabIdx});

                        !!$headerWrap.length ? $headerWrap.data('initY', $headerWrap.position().top) : '';
                        !!$footer.length ? $footer.data('initY', $(window).outerHeight() - $footer.position().top - $footer.outerHeight()) : '';
                    }

                    // 스크롤 action (not Modal)
                    function scrollOnDoc(initY) {
                        var _initY = initY
                            , _nowY = cyberUI.scrollAct.now
                            , delta = _initY - _nowY;
        
                        var $header = $('.header-wrap')
                            , $footer = $('.btn-wrap-fixed .floating-wrap')
                            , $floating = $('.ui-fixed-top .ui-floating-wrap');
                        
                        $footer = cyberUI.setElementInTab({element: $footer, tabIdx:tabIdx});
                        
                        // 타이머 초기화
                        clearTimeout(timer);

                        if (!!$header.length) {
                            if (cyberUI.scrollAct.isTop) {
                                flag_header = true;
                                $header.stop().css('top', -cyberUI.scrollAct.now);
                            } else {
                                if (flag_header && cyberUI.scrollAct.dir === 'down'){
                                    $header.stop().css('top', -$header.outerHeight()).data('moving', false);
                                    flag_header = false;
                                } else {
                                    controlElement({
                                        element: $header,
                                        dir: 'top',
                                        maxY: 0,
                                        minY: -$header.outerHeight(),
                                        initY: $header.data('initY')
                                    })
                                }
                            }
                        }
                        if (!!$footer.length) {
                            if (cyberUI.scrollAct.isEnd) {
                                flag_footer = true;
                                $footer.stop().css({'position':'relative', 'bottom':0}).attr('data-show', true);
                            } else {
                                if (flag_footer && cyberUI.scrollAct.dir === 'up'){
                                    setTimeout(function(){
                                        $footer.css({'position': 'fixed', 'bottom': 0}).data('moving', false);
                                        flag_footer = false;
                                    }, 200)
                                    
                                } else {
                                    controlElement({
                                        element: $footer,
                                        dir: 'bottom',
                                        maxY: 0,
                                        minY: -$footer.outerHeight(),
                                        initY: $footer.data('initY')
                                    })
                                }
                            }
                        } 
                        // 스크롤 마지막에 실행시키기위해
                        timer = setTimeout(function(){
                            cyberUI.scrollOnList.navAniFromDir();
                        }, 250)
        
                        function controlElement(opt) {
                            var $el = opt.element
                                , dir = opt.dir
                                , _maxY = opt.maxY
                                , _minY = opt.minY
                                , _el_initY = opt.initY
                                , _delta = _initY - _nowY + _el_initY;
                                
                            // cyberUI.navShowHide() 실행 시 동작 막음
                            if (!!$el.data('moving')) {
                                return false;
                            }
                            if (_delta > _maxY){
                                _delta = _maxY;
                                $el.attr('data-show', 'true');
                            } else if (_delta < _minY) {
                                _delta = _minY;
                                $el.attr('data-show', 'false');
                            }
                            $el.stop().css(dir, _delta);
                        }
        
                    }
                })
            }

            callback();

        }
    },
    /* 리스트 관련 Action
    ======================== */
    listAct: {
        /* Run!!
        ---------------------- */
        init: function() {
            // cyberUI.listAct.footer({
            //     btnShow: false
            // });
            cyberUI.listAct.acco.init();
            cyberUI.listAct.moveData.init();
            cyberUI.listAct.overlay.init();
            // cyberUI.listAct.CRUD.init();
        },
        /* 아코디언 Action
        ---------------------- */
        acco: {
            togglePnl: function($item){
                var $pnl = $item.children('.list-pnl')
                    , $toggleElements = $item.find('[data-showhide="true"]')
                    , isOpened = $pnl.hasClass('on');

                if (isOpened) {
                    if (!!$toggleElements.length){
                        $toggleElements.css({'visibility': 'visible'}).attr('aria-hidden', 'false').stop().animate({
                            opacity:1
                        }, 200);
                    }
                    $pnl.slideUp(200, function(){
                        $pnl.removeClass('on');
                    });
                    $item.find('.list-view-btn').removeClass('on');
                    $item.find('.list-view-btn span').text('열기');
                } else {
                    if (!!$toggleElements.length){
                        $toggleElements.stop().animate({
                            opacity:0
                        }, 200, function(){
                            $toggleElements.css({'visibility': 'hidden'}).attr('aria-hidden', 'true');
                        });
                    }
                    if (!!$item.closest('.tab-cont').length){
                        cyberUI.listAct.moveData.nowPnlX = $('.data-items').eq(0).prop('scrollLeft');
                    }
                    $pnl.slideDown(200, function(){
                        $pnl.addClass('on');
                    }).find('.data-items').prop('scrollLeft', cyberUI.listAct.moveData.nowPnlX);
                    $item.find('.list-view-btn').addClass('on');
                    $item.find('.list-view-btn span').text('닫기');
                };
            },
            // accordion event run!!
            init: function() {
                if (isMobileChk) {
                    var evtClick = 'touch.list click.list'
                } else {
                    var evtClick = 'click.list';
                }
                $(document)
                    .off(evtClick)
                    .on(evtClick, '.list-wrap .list-view-btn', function(){
                        cyberUI.listAct.acco.togglePnl($(this).closest('.list-item'));
                    })
                    .on(evtClick, '.list-wrap .list-item', function(e){
                        var noTarget = ['a', 'label', 'button', 'input','.list-overlay', '.list-cover', '.unit']
                            , _flag = true;

                        if (!isMobileChk) noTarget.push('.list-item.open-pc'); // PC에서 open 막음

                        noTarget.forEach(function(element){
                            if (!!$(e.target).closest(element).length) {
                                _flag = false;
                            }
                        })
                        if (_flag && !!$(this).find('.list-pnl').length) {
                            cyberUI.listAct.acco.togglePnl($(this));
                        };
                    });
            }
        },
        // data-wrap ui-acco-btn evt
        dataAcco: {
            init: function() {
                if (isMobileChk) {
                    var evtClick = 'touch.dataList click.dataList'
                } else {
                    var evtClick = 'click.dataList';
                }
                $(document)
                    .off(evtClick)
                    .on(evtClick, '.data-wrap .ui-acco-btn', function(e){
                        $(this).closest('.data-item').toggleClass('on');
                    })
                    .on(evtClick, '.data-wrap .data-item', function(e){
                        var noTarget = ['a', 'label', 'button', 'input']
                            , _flag = true;

                        noTarget.forEach(function(element){
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
            move: function() {
                $('.list-wrap .data-items')
                    .off('touchstart.moveListData').on('touchstart.moveListData', function(){
                        $('.list-wrap .data-items').removeClass('target');
                        $(this).addClass('target');
                    })
                    .off('scroll.moveListData').on('scroll.moveListData', function(){
                        if (!$(this).hasClass('target')) { return false; }
                        var $ts = $(this)
                            , $wrap = $('.list-wrap');
                        if (!!$ts.closest('.ui-modal-cont').length) {
                            $wrap = $ts.closest('.ui-modal-cont').find('.list-wrap');
                        }
                        if (!!$ts.closest('.tab-cont').length) { 
                            $wrap = $ts.closest('.tab-cont').find('.list-wrap');
                        }

                        var $scr = $wrap.find('.data-items')
                            , _x = $ts.prop('scrollLeft');

                        _x = _x <= 0 ? 0 : _x;

                        cyberUI.listAct.moveData.nowPnlX = _x;
                        $scr.not($ts).prop('scrollLeft', _x);
                    });
            },
            init: function() {
                cyberUI.listAct.moveData.move();
                $(document)
                    .on('DOMNodeInserted', '.list-wrap .list-item', function(){
                        cyberUI.listAct.moveData.move();
                    });
            }
        },
        /* Overlay Action
        ---------------------- */
        overlay: {
            // overlay 열기
            open: function(opt) {
                var $el = opt.item
                    , $wrap = opt.wrap;
    
                $el.children('.inner').css('width', $wrap.outerWidth());
                $el.addClass('on').attr('aria-hidden', 'false').stop().animate({
                    width: $wrap.outerWidth()
                }, 300);
            },
            // overlay 닫기
            close: function(opt) {
                var $el = opt.item
                    , $wrap = opt.wrap;
    
                $el.attr('aria-hidden', 'true').stop().animate({
                    width: 0
                }, 300, function() {
                    $el.removeClass('on');
                });
            },
            // overlay event run!!
            init: function() {
                var evt = '';
                if (isMobileChk) {
                    evt = 'touch.listOverlay click.listOverlay';
                } else {
                    evt = 'click.listOverlay';
                }
                isMobileChk ? $('.list-pnl').attr('tabIndex', 0) : '';
                $('.list-pnl.on').closest('.list-item').find('[data-showhide="true"]').css({'opacity': 0, 'visibility': 'hidden'}).attr('aria-hidden', 'true');
                $('.list-overlay').not('.on').attr('aria-hidden', 'true');
    
                $(document).off(evt).on(evt, '.btn-myfund', function(e){
                    var $ts = $(e.target)
                        , $btn = $ts.closest('.btn-myfund')
                        , $wrap = $ts.closest('.list-item')
                        , $overlay = $wrap.find('.list-overlay');

                    if (!$btn.hasClass('on')) {
                        cyberUI.listAct.overlay.open({
                            item: $overlay,
                            wrap: $wrap
                        });
                        $btn.addClass('on');
                    } else {
                        cyberUI.listAct.overlay.close({
                            item: $overlay,
                            wrap: $wrap
                        });
                        $btn.removeClass('on');
                    }
                }).on(evt, '.btn-overlay-x', function(e){
                    var $ts = $(e.target)
                        , $btn = $ts.closest('.btn-overlay-x')
                        , $wrap = $btn.closest('.list-item')
                        , $overlay = $wrap.find('.list-overlay')
                        , $btnFund = $wrap.find('.btn-myfund');

                    cyberUI.listAct.overlay.close({
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
                $item.find('.data-items').prop('scrollLeft', cyberUI.listAct.moveData.nowPnlX);

                $wrap.css('overflow', 'hidden');
                $inner.animate({
                    left: -$inner.closest('.list-wrap').outerWidth(),
                }, 600, 'easeInOutCubic', function(){
                    $item.animate({
                        height: 0
                    }, 350, 'easeInOutCubic', function(){
                        $item.remove();
                        $wrap.css('overflow', 'visible');
                    });
                });
            },
            init: function(){
                $(document).off('click.deleteListItem').on('click.deleteListItem', '.list-item .btn-delete', function(){
                    cyberUI.listAct.CRUD.delete({
                        item: $(this).closest('.list-item') // 삭제하고자하는 list-item 객체
                    });
                })
            }
        },
        footer: function(opt){
            var _opt = {
                    id: undefined, // [20200814/jh] id selector option 추가
                    btnShow: false
                };
            _opt = $.extend(true, _opt, opt);
            var $footer = _opt.id === undefined ? $('.btn-wrap-fixed') : $('#'+_opt.id),
                btnShow = _opt.btnShow;

            $footer.length > 1 ? footerSet() : '';

            if (!!$('.ui-modal.view .ui-modal-footer .list-footer-btns').length) {
                $footer = $('.ui-modal.view .ui-modal-footer');
            }
            var $btnWrap = $footer.find('.list-footer-btns')
                , $summ = $footer.find('.list-summary');

            if (btnShow) {
                cyberUI.navShowHide({
                    footerShow: true
                });

                $btnWrap.show().stop().animate({
                    height: 55,
                    opacity: 1
                }, 250, function(){
                    $btnWrap.css('overflow', 'visible').addClass('on');
                });
                $summ.addClass('on');
            } else {
                $btnWrap.stop().css('overflow', 'hidden').animate({
                    height: 0,
                    opacity: 0
                }, 250, function(){
                    $btnWrap.hide().removeClass('on');
                });
                $summ.removeClass('on');
            }

            function footerSet() {
                // tab 안에 btn fixed 있을 시
                if (!!$footer.closest('.tab-cont').length) {
                    var $tabBtn = $('.tab-btns-wrap .btn-tab');
                    $footer = $footer.eq($tabBtn.index($tabBtn.filter('.now')));
                }
            }
        },
        chkSame: function(isSame){
            cyberUI.scrollOnList.preventEvt = true;
            var floatH = $('.ui-floating').outerHeight()
                , $tabBtnWrap = $('.tab-btns-wrap')
                , tabH = $tabBtnWrap.outerHeight();

            if (isSame){
                if (!!$('.ui-floating .tab-btns-wrap').length) {
                    $('.ui-floating').animate({
                        height: floatH - tabH
                    }, 200, 'easeOutQuad');
                } 
                $tabBtnWrap.slideUp(200, 'easeOutQuad', callback);
            } else {
                if (!!$('.ui-floating .tab-btns-wrap').length) {
                	$('.ui-floating').animate({
                    	height: floatH + tabH
                    }, 200, 'easeOutQuad');
                } 
                $tabBtnWrap.slideDown(200, 'easeOutQuad', callback);
            }
            function callback() {
                cyberUI.scrollOnList.preventEvt = false;
            }
        }
    },

    // 2020.07.22 메뉴 찾기 추가
    searchMenu: {
        init: function() {
            var $gnb = $('.gnb');
            // 2020.08.05 랜딩페이지의 경우 실행X
            if (!!$gnb.length && pageInfo.search != false) {
                $gnb.append('<div class="search-menu-area"></div>');
                $('.search-menu-area').load('/html/cmmn/search_menu.html', function() {
                    cyberUI.searchMenu.event();
                    if(typeof getCyberMenuList == "function"){
                    	getCyberMenuList();
                    }
                });
            }
        },
        getList: function(str){
        	return menuList.filter(function(menuObj){
	    		return menuObj.name.indexOf(str) > -1 && menuObj.obj["data-url"] != undefined;
	    	});
        },
        setList: function(list, keyword){
        	var autoObj = $('.search-menu-area').find('.search-auto');
        	var str = '';
        	list.forEach(function(o){
        		//var auth = o.obj["data-auth"] == undefined ? "" : ' data-auth="'+o.obj["data-auth"]+'"';
        		var id = o.obj["data-menu-id"] == undefined ? "" : o.obj["data-menu-id"];
        		var url = o.obj["data-url"] == undefined ? "" : o.obj["data-url"];
        		var title = o.name.split(keyword).join("<strong>"+keyword+"</strong>");
        		str += '<li><a href="javascript:cyberUI.searchMenu.pageGo(\'#'+id+'\',\''+url+'\');" tabindex="-1">'+title+'</a></li>';
        	});
        	autoObj.html(str);
        },
        pageGo: function(id, url){
        	$('.search-menu-area').find('.btn-close').trigger("click");
        	$("#gnbCont").find(".lnb-open.open").trigger("click");
        	pageGo(id, url);
        	
        },
        event: function() {
            inputClear();
            var $gnb = $('.gnb-wrap')
                , srchBtn = $gnb.find('.btn-search')
                , srchWrap = $('.search-menu-area')
                , srchInp = srchWrap.find('.inp-base')
                , closeBtn = srchWrap.find('.btn-close')
                , prevBtn = srchWrap.find('.lnb-prev')
                , favorObj = srchWrap.find('.favor-menu')
                , autoObj = srchWrap.find('.search-auto')
                , srchDim = $('<div class="srchDim"></div>')
                , quickMenu = $('.quick-menu')
                , srchProp = false;

            srchBtn.on('click', function() {
                if (srchProp === false) {
                    srchWrap.addClass('on')
                    !!!isMobileChk ? srchWrap.slideDown(200) : null;
                    srchInp.focus();
                    !!!isMobileChk ? srchDim.appendTo('body') : null;
                    !!!isMobileChk ? stopScroll() : null;
                    quickMenu.css({ zIndex: '0' });
                    srchWrap.find('input, button, a').attr('tabindex', '0');
                    $('.main-wrap').find('a, button').attr('tabindex', '-1');
                    $('.quick-menu').find('a, button').attr('tabindex', '-1');
                    srchProp = true;
                }
            });

            closeBtn.on('click', function() {
                if (srchProp === true) {
                    srchWrap.removeClass('on');
                    !!!isMobileChk ? srchWrap.slideUp(200) : null;
                    !!!isMobileChk ? srchDim.remove() : null;
                    !!!isMobileChk ? allowScroll() : null;
                    !!!isMobileChk ? srchBtn.focus() : null;
                    quickMenu.css({ zIndex: '' });
                    srchWrap.find('input, button, a').attr('tabindex', '-1');
                    $('.main-wrap').find('a, button').attr('tabindex', '0');
                    $('.quick-menu').find('a, button').attr('tabindex', '0');
                    srchProp = false;
                    favorObj.removeClass('off');
                    autoObj.removeClass('on');
                    srchInp.val("");
                }
            });

            // 2020.09.18 웹접근성 추가 :: 검색 닫기 버튼에서 tab키 눌렀을 때
            if (!!!isMobileChk) {
                closeBtn.on('keypress keydown', function(e) {
                    if (e.shiftKey && e.keyCode === 9) {
                        // e.preventDefault();
                        $(this).prev().focus();
                    } else if (e.keyCode === 9) {
                        srchWrap.removeClass('on');
                        srchWrap.slideUp(200);
                        srchDim.remove();
                        allowScroll();
                        srchBtn.prev().focus();
                        quickMenu.css({ zIndex: '' });
                        srchWrap.find('input, button, a').attr('tabindex', '-1');
                        $('.main-wrap').find('a, button').attr('tabindex', '0');
                        $('.quick-menu').find('a, button').attr('tabindex', '0');
                        srchProp = false;
                    }
                });
            }
            
            if (isMobileChk) {
                prevBtn.on('click', function() {
                    if (srchProp === true) {
                        srchWrap.removeClass('on')
                        !!!isMobileChk ? srchWrap.slideUp(200) : null;
                        !!!isMobileChk ? srchDim.remove() : null;
                        !!!isMobileChk ? allowScroll() : null;
                        quickMenu.css({ zIndex: '' });
                        srchWrap.find('input, button, a').attr('tabindex', '-1');
                        $('.main-wrap').find('a, button').attr('tabindex', '0');
                        $('.quick-menu').find('a, button').attr('tabindex', '0');
                        srchProp = false;
                    }
                });
            }

            srchInp.off().on('input', function(e) {
                if ($(this).val()) {
                	var resultMenuList = cyberUI.searchMenu.getList($(this).val());
                	cyberUI.searchMenu.setList(resultMenuList, $(this).val());
                	console.log(resultMenuList);
                    favorObj.addClass('off');
                    autoObj.addClass('on');
                } else {
                    favorObj.removeClass('off');
                    autoObj.removeClass('on');
                }
            });
            srchWrap.find('.inp-del').off().on('click', function() {
                favorObj.removeClass('off');
                autoObj.removeClass('on');
                $(this).val("");
            });
            
            // 2020.09.17 웹접근성 :: 로고로 focus 이동
            if (!!!isMobileChk) {
                favorObj.find('button').on('keydown keypress', function(e) {
                    if (e.keyCode === 13) {
                        $('.gnb-wrap').find('.logo').focus();
                        srchWrap.removeClass('on').slideUp(200);
                        srchDim.remove();
                        allowScroll();
                        quickMenu.css({ zIndex: '' });
                        srchWrap.find('input, button, a').attr('tabindex', '-1');
                        $('.main-wrap').find('a, button').attr('tabindex', '0');
                        $('.quick-menu').find('a, button').attr('tabindex', '0');
                        srchProp = false;
                    }
                });
                
                autoObj.find('a').on('keydown keypress', function(e) {
                    if (e.keyCode === 13) {
                        $('.gnb-wrap').find('.logo').focus();
                        srchWrap.removeClass('on').slideUp(200);
                        srchDim.remove();
                        allowScroll();
                        quickMenu.css({ zIndex: '' });
                        srchWrap.find('input, button, a').attr('tabindex', '-1');
                        $('.main-wrap').find('a, button').attr('tabindex', '0');
                        $('.quick-menu').find('a, button').attr('tabindex', '0');
                        srchProp = false;
                    }
                });
            }
            
        }
    },
    // [20200914/jh] 계좌 슬라이드 기능 추가
    selectRdoInAccount: function() {
        $('.ui-carousel.type-account').on('init', function(slick){
            if (!!$('input[type="radio"]:checked').length) {
                $('input[type="radio"]:checked').closest('.ui-carousel-item').addClass('checked');
            }
        })
    }
};

// data list accordion check and set & run
function setlistAcco() {
    var $acco = $('.data-wrap');
    if ($acco.length > 1) { // multiple
        $acco.each(function(_idx, item){
            !!$(item).data('acco') ? init($(item)) : '';
        })
    } else { // single
        !!$acco.data('acco') ? init($acco) : '';
    }

    // id setting
    function setAccoId() {
        var _idx = 0,
            _flag = $('#accoDataList'+_idx).length;
        while (!!_flag) {
            _idx++;
            _flag = $('#accoDataList'+_idx).length;
        }
        return 'accoDataList'+_idx;
    }

    // set and run
    function init(v) {
        var $acco = v;
        $acco.addClass('ui-acco');
        var _id = v.attr('id') !== undefined ? v.attr('id') : setAccoId(v),
            $wrap = $acco.children('.data-item'),
            $pnl = $wrap.children('.data-cont'),
            $tit = $wrap.children('.data-head');

        $acco.attr('id', _id);
        $wrap.addClass('ui-acco-wrap');
        $pnl.addClass('ui-acco-pnl');
        $tit.addClass('ui-acco-tit');

        var htmlBtn = '';
        htmlBtn += '<button type="button" class="ui-acco-btn">';
        htmlBtn += '    <span class="ui-acco-arrow">열기</span>';
        htmlBtn += '</button>';
        $tit.append(htmlBtn);

        $plugins.uiAccordion({
            id: _id,
            autoclose:false
        });
    }
}

/* List More
---------------------- */
$(document).on('click', '.item-more-btn', function() {
    var moreMenus = $('.item-more-menu');
    var thisMenu = $(this).siblings('.item-more-menu');
    var moreObj = $(this).closest('.item-more');
    var moreDim = $('<div class="moreDim"></div>');
    
    moreMenus.removeClass('show');

    if (thisMenu.css('display') === 'none') {
        thisMenu.addClass('show');
        moreObj.after(moreDim).addClass('on');
        stopScroll();
    } else {
        thisMenu.removeClass('show');
        allowScroll();
    }

    $('.moreDim').on('touch mousedown', function(e) {
        moreObj.removeClass('on');
        thisMenu.removeClass('show');
        $(this).remove();
        allowScroll();
    });
});

/* Make List
---------------------- */
function makeDataList(v) {
    var $list = v.wrap !== undefined ? v.wrap : $('.data-wrap'),
        listArray = v.items;
        
    var isAllChk = $list.closest('.main-page').find('.list-total .check-item').length || $list.closest('.ui-modal-inner').find('.list-total .check-item').length ? true : false;
    var listObj = '';
    if (listArray < 1) {
        $list.addClass('type-caution');
        listObj += '<div class="data-item">';
        listObj += '    <p>조회내역이 없습니다</p>';
        listObj += '</div>';
    } else {
        $.each(listArray, function(index, item) {
            var isDataDetail = !!item.detailData ? true : false,
                isSubData = !!item.subData ? true : false,
                isTit = !!item.tit ? true : false,
                isTitSub = !!item.titSub ? true : false;
            
            if (isDataDetail) {
                var detailCaption = '';
                for (var i=0; i < item.detailData.length; i++) {
                    detailCaption += item.detailData[i].key;
                    detailCaption += i < item.detailData.length - 1 ? ', ' : ' ';
                }
            }
            
            listObj += '<div class="data-item">';
            if (isTit || isTitSub) {
                listObj += '    <div class="data-head">';
                if (isTit) {
                    listObj += '        <div class="data-title">';
                    // checkbox/radio
                    if (!!$list.data('check') || !!$list.data('radio')) { 
                        var isChk = !!$list.data('check') ? true : false;

                        if (isChk) {
                            // checkbox
                            listObj += '                <div class="check-item">';
                            if (isAllChk) {
                                listObj += '                <input type="checkbox" id="inpDataList' + index + '" name="agree" onchange="javascript:agreeChk();">';
                            } else {                            
                                listObj += '                <input type="checkbox" id="inpDataList' + index + '" name="inpDataList">';
                            }
                            listObj += '                <label for="inpDataList' + index + '">' + item.tit + '</label>';
                            listObj += '            </div>';
                        } else {
                            // radio
                            listObj += '                <div class="radio-item">';
                            listObj += '                <input type="radio" id="inpDataList' + index + '" name="inpDataList">';
                            listObj += '                <label for="inpDataList' + index + '">' + item.tit + '</label>';
                            listObj += '            </div>';
                        }
                    } else { // no check/radio
                        listObj += '            <strong>' + item.tit + '</strong>';
                    }
                    // sub title
                    if (isTitSub) { 
                        listObj += '            <span>' + item.titSub + '</span>';
                    }
                    listObj += '            </div>';
                } // end of Title
                // sub data
                if (isSubData){
                    listObj += '        <div class="data-info">';
                    for (var i=0; i < item.subData.length; i++) {
                        listObj += '            <span>' + item.subData[i] + '</span>';
                    };
                    listObj += '        </div>';
                }
                listObj += '    </div>';
            } // end of Head
            // make table row
            if (isDataDetail) {
                listObj += '    <div class="data-cont">';
                listObj += '        <table>';
                listObj += '            <caption>' + detailCaption + '정보입니다.</caption>';
                listObj += '            <colgroup>';
                listObj += '                <col class="col-w60">';
                listObj += '                <col class="col-w40">';
                listObj += '            </colgroup>';
                listObj += '            <tbody>';
                for (var i=0; i < item.detailData.length; i++) {
                    listObj += '                <tr>';
                    listObj += '                    <th scope="row">' + item.detailData[i].key + '</th>';
                    listObj += '                    <td>' + item.detailData[i].value + '</td>';
                    listObj += '                </tr>';
                }
                listObj += '            </tbody>';
                listObj += '        </table>';
                listObj += '    </div>';
            }
            listObj += '</div>';

        });
    }

    $list.html(listObj);
    !!$list.data('check') ? $list.find('.data-item').addClass('type-check') : '';
    !!$list.data('radio') ? $list.find('.data-item').addClass('type-radio') : '';
}
