window.onload = function() {

    //메인비주얼 스크롤
    var mainVScrollBody = document.querySelector('.main-visual .visual-wrap');
    var mainVisualImageBox = document.querySelector('.main-visual .visual-wrap .bg');
    var mainVisualImage = document.querySelector('.main-visual .visual-wrap .bg img');

    var scrollHeight;
	var sectionOffsetTop;
	var sectionScrolTop;
	var scrollRealHeight;
	var winScrollTop;
	var scrollPerecnt;
	var percent;

    function mainScroll() {
        setProperty();
        motionRender();
    }

    function setProperty() {
        //메인비주얼 sticky 스크롤 영역 100분율 계산식
        scrollHeight = mainVScrollBody.offsetHeight;
        winScrollTop = window.pageYOffset;
        scrollRealHeight = (scrollHeight - window.innerHeight);
        scrollPerecnt = winScrollTop / scrollHeight; // 첫 시작점 0 ~ 끝 점 1
        percent = scrollPerecnt * 100; //스크롤 영역 백분율
    }

    function motionRender() {
        var bgRadiusValue = 24; //bg이미지 border-radius 초기값
        var bgEndValue = 100; //bg 이미지 width, height 변경 값

        var bgStartValue = 0;
        var bgBluerValue = 10;

        //초기값에서 엔드값으로 값이 커져야함
        //90 ~ 100 이 되는 식을 만들어야함

        if (percent < 30) {
            mainVisualImageBox.style.width = (90 + (percent / 30) * 10).toFixed(2) + '%';
            mainVisualImageBox.style.height = (80 + (percent / 30) * 20).toFixed(2) + 'vh';
            mainVisualImageBox.style.borderRadius = (bgRadiusValue - (percent / 30) * (bgRadiusValue - bgStartValue)).toFixed(2) + 'px';
            mainVisualImage.style.filter = 'blur(' + (bgStartValue + (percent / 30) * (bgBluerValue - bgStartValue)).toFixed(2) + 'px)';
        } else {
            mainVisualImageBox.style.width = '100%';
            mainVisualImageBox.style.height = '100vh'
        }
    }

    function init() {
        mainScroll()
    }

    window.addEventListener('scroll', function() {
        mainScroll()
    })

    init()
}