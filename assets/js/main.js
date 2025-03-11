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

        mainVisualImageWrap.style.clipPath = `inset(${insetTop}px ${insetSides}vw ${insetTop}px ${insetSides}vw round ${borderRadius}px)`;
        mainVisualImage.style.filter = 'blur(' + (bgStartValue + (percent / 10) * (bgBluerValue - bgStartValue)).toFixed(2) + 'px)';
    } else {
        mainVisualImageWrap.style.clipPath = `inset(0 0 0 0 round 0)`;
    }
}

function init() {
    mainScroll()
}

window.addEventListener('scroll', function() {
    mainScroll()
})

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

//메인비주얼 gsap
gsap.timeline({
    scrollTrigger: {
        trigger: '.main-visual .visual-wrap',
        start: 'top top',
        end: `${800 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
//메인비주얼 span이 옆으로 사라짐
.to('.main-visual .visual-wrap .first-line', {x: '-200%'}, 0)
.to('.main-visual .visual-wrap .second-line', {x: '200%'}, 0)

gsap.timeline({
    scrollTrigger: {
        trigger: '.main-visual .visual-wrap',
        start: `${800 + window.innerHeight}px bottom`,
        end: `${1800 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.main-visual .visual-wrap .intro-wrap.wrap1', {opacity: 1})
.to('.main-visual .visual-wrap .intro-wrap.wrap1', {opacity: 0,  delay: .3})

gsap.timeline({
    scrollTrigger: {
        trigger: '.main-visual .visual-wrap',
        start: `${2200 + window.innerHeight}px bottom`,
        end: `${2700 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.main-visual .visual-wrap .intro-wrap.wrap2', {opacity: 1})

gsap.timeline({
    scrollTrigger: {
        trigger: '.main-visual .visual-wrap',
        start: `${2700 + window.innerHeight}px bottom`,
        end: `${3000 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.main-visual .visual-wrap .intro-wrap .intro-eng span.interactions' ,{marginLeft: '6vw'})

gsap.timeline({
    scrollTrigger: {
        trigger: '.main-visual .visual-wrap',
        start: `${3500 + window.innerHeight}px bottom`,
        end: `${3700 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.main-visual .visual-wrap .intro-wrap .intro-eng span.interactions .icon' ,{opacity: 1})


gsap.timeline({
    scrollTrigger: {
        trigger: '.main-visual .visual-wrap',
        start: `${4000 + window.innerHeight}px bottom`,
        end: `${5500 + window.innerHeight}px bottom`,
        scrub: 1,
        // markers: true
    }
})
.to('.main-visual .visual-wrap .work-history .inner', {height: '100vh'}, 0)
.to('.main-visual .visual-wrap .intro-wrap.wrap2 .inner.top' ,{y: '-50vh' , opacity: 0}, 0)
.to('.main-visual .visual-wrap .intro-wrap.wrap2 .inner.bottom' ,{y: '50vh', opacity: 0}, 0)
.to('.main-visual .visual-wrap .work-history .horizontal-wrap', {opacity: 1})










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
                start: 'top top',
                markers: true
            },
            width: '100%',
            delay: (index + 1) * .06
        })
    }
)
