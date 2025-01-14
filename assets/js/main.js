window.onload = function() {
    gsap.registerPlugin(ScrollTrigger);

    //현재시간 표기하기
    const currentTime = document.querySelector('.header-wrap .time');
    
    function updateTime() {
        const now = new Date(); // 현재 시간 객체 생성
        const hours = String(now.getHours()).padStart(2, '0'); // 시
        const minutes = String(now.getMinutes()).padStart(2, '0'); // 분
        const seconds = String(now.getSeconds()).padStart(2, '0'); // 초
    
        // 시간 포맷: HH:MM:SS
        currentTime.textContent = `${hours}:${minutes}:${seconds}`;
    }
    updateTime();
    setInterval(updateTime, 1000);

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
        var bgStartValue = 0;
        var bgBluerValue = 10;

        //초기값에서 엔드값으로 값이 커져야함
        //90 ~ 100 이 되는 식을 만들어야함

        if (percent < 10) {
            const p = percent / 10; // 0 ~ 1 비율 계산
            const insetTop = 110 * (1 - p);
            const insetSides = 8 * (1 - p);
            const borderRadius = 25 * (1 - p);

            mainVisualImage.style.clipPath = `inset(${insetTop}px ${insetSides}vw ${insetTop}px ${insetSides}vw round ${borderRadius}px)`;
            mainVisualImage.style.filter = 'blur(' + (bgStartValue + (percent / 10) * (bgBluerValue - bgStartValue)).toFixed(2) + 'px)';
        } else {
            mainVisualImage.style.clipPath = `inset(0 0 0 0 round 0)`;
        }
    }

    function init() {
        mainScroll()
    }

    window.addEventListener('scroll', function() {
        mainScroll()
    })

    init()

    
    //메인 비주얼 배경 고정
    /* ScrollTrigger.create({
        trigger: '.main-visual .visual-wrap',
        pin: '.main-visual .visual-wrap .bg',
        start: 'top top',
        end: 'bottom bottom',
    }); */


    gsap.timeline({
        scrollTrigger: {
            trigger: '.main-visual .visual-wrap',
            start: '23% bottom',
            end: '90% top',
            scrub: 1,
            markers: true
        }
    })
    //h2 텍스트가 나타났다 사라짐
    .to('.main-visual .sticky-wrap h2',{opacity: 1, ease: 'none'})
    .to('.main-visual .sticky-wrap h2',{opacity: 1, ease: 'none', duration: 1})
    .to('.main-visual .sticky-wrap h2',{opacity: 0, ease: 'none'})
}