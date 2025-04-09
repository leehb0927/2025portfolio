const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)

/* 새로고침하면 최상단 이동 */
/* window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}; */

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
var mainVisualImageWrap = document.querySelector('.main-visual .visual-wrap .bg .img-wrap');
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
    scrollPerecnt = winScrollTop / scrollRealHeight;
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

        mainVisualImageWrap.style.clipPath = `inset(${insetTop}px ${insetSides}vw ${insetTop}px ${insetSides}vw round ${borderRadius}px)`;
        mainVisualImage.style.filter = 'blur(' + (bgStartValue + (percent / 10) * (bgBluerValue - bgStartValue)).toFixed(2) + 'px)';
    } else {
        mainVisualImageWrap.style.clipPath = `inset(0 0 0 0 round 0)`;
    }
}

function init() {
    mainScroll(); // 초기 실행
    window.addEventListener('scroll', function () {
        mainScroll();
    });
    window.addEventListener('resize', function () {
        mainScroll(); // 윈도우 리사이즈 시에도 반영
    });
}

init()











/* 메인비주얼 */
//처음 배경 고정
/* ScrollTrigger.create({
    trigger: '.main-visual .visual-wrap',
    pin: '.main-visual .visual-wrap .bg',
    start: 'top top',
    end: 'bottom bottom',
}); */

var loading = gsap.timeline({});
var mainVisualSpans = document.querySelectorAll('.main-visual .visual-wrap .visual-inner .text .first-line span');
var mainVisualSpans2 = document.querySelectorAll('.main-visual .visual-wrap .visual-inner .text .second-line span');

//글자(span)에 랜덤으로 On 클래스 추가하는 함수
function addOnSpans(spans) {
    spans.forEach(span => {
        gsap.to(span, {
            delay: Math.random(),
            onStart: () => {
                span.classList.add('on');
            }
        })
    })
}

loading
.to('.main-visual .visual-wrap .bg img' , {x: 0, y:0, ease: 'none', duration: .4}, 0)
.to(mainVisualSpans, {
    stagger: {
      from: "random", // 애니메이션 순서를 랜덤하게
    },
    //onStart : 애니메이션이 시작될 때 호출되는 함수
    //addOnSpans함수를 호출한다 매개변수로는 mainVisualSpans를 받는다.
    onStart: () => addOnSpans(mainVisualSpans)
    }, 0)
.to(mainVisualSpans2, {
    stagger: {
        from: "random",
    },
    onStart: () => addOnSpans(mainVisualSpans2), 
    delay: .5
    })
.to('.scroll-down', {opacity: 1, delay: .5})

//스크롤 내리면 scroll-down 사라졌다 스크롤 올리면 다시 나타남
//gsap로 안되서 스크립트
const scrollDown = document.querySelector('.scroll-down');

function scrollDownHandle() {
    if(window.scrollY > 200) {
        scrollDown.style.opacity = "0";
    }else {
        scrollDown.style.opacity = "1";
    }
}

window.addEventListener("scroll", scrollDownHandle);


/* 메인 비주얼 스크롤 이벤트 - 스크롤을 내릴 때마다 영역이 변함 */
function mainVisualScroll() {
    const vh = window.innerHeight;
    const trigger = '.main-visual .visual-wrap'

    //timeline 스크롤 트리거 공통
    function createTimeline(startOffset, endOffest, markers = false) {
        return gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: `${startOffset + vh}px bottom`,
                end: `${endOffest + vh}px bottom`,
                scrub: 1,
                markers: markers
            }
        })
    }

    //메인비주얼 텍스트 좌, 우로 사라짐
    gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            //top 값 때문에 공통함수를 호출해 쓸 수 없음
            start: 'top top',
            end: `${800 + window.innerHeight}px bottom`,
            scrub: 1,
        }
    })
    //메인비주얼 span이 옆으로 사라짐
    .to(`${trigger} .first-line`, {x: '-200%'}, 0)
    .to(`${trigger} .second-line`, {x: '200%'}, 0)

    /* timline 스크롤 트리거 순차 적용 */
    //아웃라인 top 텍스트 한 줄 씩 나타남
    const oulineTopText = document.querySelectorAll(`${trigger} .outline-wrap .top .outline-text .line p`);
    oulineTopText.forEach((el, index) => {
        createTimeline(800, 2000)
        .to(el, {
            y: 0,
            delay: (index + 1) * 0.08
        })
        .to(`${trigger} .outline-wrap .top .scroll-icon`, {opacity: 1})
    })

    const outlineBottomText = document.querySelectorAll(`${trigger} .outline-wrap .bottom .outline-text .line p`);
    outlineBottomText.forEach((el, index) => {
        createTimeline(2000, 3200)
        .to(el, {
            y: 0,
            delay: (index + 1) * 0.08
        })
        .to(`${trigger} .outline-wrap .bottom .img-wrap`, {opacity: 1})
    })

    /* 
    craeteTimeline(시작 지점 위치 (+ 윈도우 크기), 끝나는 지점 (+ 윈도우 크기)).타임라인 적용
    */
    //outline 영역 사라짐
    createTimeline(3800, 3900)
        .to(`${trigger} .outline-wrap .top`, {opacity: 0})
        .to(`${trigger} .outline-wrap .bottom`, {opacity: 0}, '<')

    /* work 영역 나타남 */
    createTimeline(4000, 5500)
        .to(`${trigger} .work-history .inner`, {height: '100vh'}, 0)
        .to(`${trigger} .intro-wrap.wrap2 .inner.top`, {y: '-50vh' , opacity: 0}, 0)
        .to(`${trigger} .intro-wrap.wrap2 .inner.bottom`, {y: '50vh', opacity: 0}, 0)
        .to(`${trigger} .work-history .horizontal-wrap`, {opacity: 1})
}

//호출
mainVisualScroll();







/* works */
//works 가로스크롤 페이지
let worksScrollTween = gsap.to(".main-visual .visual-wrap .work-history .horizontal-wrap", {
    xPercent: -80, // .horizontal-wrap의 길이만큼 이동
    ease: 'none',
    scrollTrigger: {
        trigger: ".work-history",
        scrub: 1,
        start: `${5500 + window.innerHeight}px bottom`,
        end: `${9000 + window.innerHeight}px bottom`,
    }
});

//works가로스크롤 페이지 view-more 버튼 돌아가게
gsap.to('.work-history .view-link > a', {
    rotation: 90,
    scrollTrigger: {
        trigger: '.work-history .view-more',
        containerAnimation: worksScrollTween,
        start: '60% bottom',
        end: 'bottom bottom',
        scrub: 1
    }
})










/* learning & tech stack */
//리스트 line 하나씩 나타나기
gsap.utils.toArray('.learning .list .line').forEach(
    (lines, index) => {
        gsap.to(lines, {
            scrollTrigger: {
                trigger: '.learning',
                start: 'top 50%',
                // markers: true
            },
            width: '100%',
            delay: (index + 1) * .06
        })
    }
)
//리스트 텍스트 움직임
gsap.utils.toArray('.learning .list a').forEach(
    (linkBox) => {
        gsap.to(linkBox, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: linkBox,
                start: 'top bottom'
            }
        })
    }
)

//learning 리스트에 cursor 올리면 이미지 나타나고, cursor에 맞춰서 움직임
gsap.utils.toArray('.learning .list li').forEach((item) => {
    const imgBox = item.querySelector('.img-box');

    // hover 시 opacity 변경
    item.addEventListener('mouseenter', () => {
        gsap.to(imgBox, { opacity: 1, duration: 0.3 });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(imgBox, { opacity: 0, duration: 0.3 });
    });

    // 마우스 움직임에 따라 이미지 박스 이동
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = e.clientX - (left + width / 2); 
        const y = e.clientY - (top + height / 2);

        gsap.to(imgBox, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

