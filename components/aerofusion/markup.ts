export const AEROFUSION_MARKUP = `<noscript><style>.loader{display:none}</style></noscript>
    <div class="loader" id="loader" aria-hidden="true">
      <div class="loader__mark">HOiD</div>
      <div class="loader__bar"><span id="loader-fill"></span></div>
      <div class="loader__pct"><span id="loader-pct">0</span><i>%</i></div>
    </div>

    <!-- Grain overlay -->
    <div class="grain" aria-hidden="true"></div>

    <!-- Nav -->
    <header class="nav" id="nav">
      <a class="nav__logo" href="#top" aria-label="HOiD 홈">HOiD</a>
      <nav class="nav__links" id="nav-links">
        <a href="/as-center">A/S 센터</a>
        <a href="/faq">자주 묻는 질문</a>
        <a href="/bulk-purchase">대량 구매 문의</a>
        <a href="https://feedmall.co.kr/" target="_blank" rel="noopener">스토어 ↗</a>
        <a href="#lineup" class="nav__links-cta">전 제품 보기</a>
      </nav>
      <a href="#lineup" class="nav__cta">전 제품 보기</a>
      <button type="button" class="nav__toggle" id="nav-toggle" aria-label="메뉴 열기" aria-expanded="false" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
    </header>

    <main id="top">
      <!-- ========== HERO (pinned scrub) ========== -->
      <section class="hero" id="hero" data-scene="hero">
        <div class="hero__stage">
          <canvas class="scene__canvas" id="hero-canvas" role="img" aria-label="HOiD 에어로퓨전 공기청정 냉온풍기">HOiD 에어로퓨전 제품 이미지</canvas>
          <div class="hero__vignette" aria-hidden="true"></div>

          <div class="hero__copy">
            <p class="eyebrow" data-hero="eyebrow">
              <span class="eyebrow__dot"></span> HOiD · 기술로 완성한 클린 라이프
            </p>
            <h1 class="hero__title" data-hero="title">
              <span class="line"><span>공간의 숨결을</span></span>
              <span class="line"><span>다시 설계하다</span></span>
            </h1>
            <p class="hero__sub" data-hero="sub">
              공기청정기, 무선청소기, 무빙 스마트TV, 제습기까지.<br />
              프리미어 공기청정기 2세대가 그 시작입니다.
            </p>
          </div>

          <div class="hero__scroll" data-hero="scrollcue" aria-hidden="true">
            <span>SCROLL</span>
            <i></i>
          </div>
        </div>
      </section>

      <!-- ========== TRANSITION FLASH ========== -->
      <div class="flash" id="flash" aria-hidden="true"></div>

      <!-- ========== ORBIT (pinned scrub) ========== -->
      <section class="orbit" id="tech" data-scene="orbit">
        <div class="orbit__stage">
          <canvas class="scene__canvas" id="orbit-canvas" role="img" aria-label="HOiD 에어로퓨전 제품 구조">HOiD 에어로퓨전 제품 구조 이미지</canvas>

          <div class="orbit__intro" data-orbit="intro">
            <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> 프리미어 공기청정기 2세대 · 안을 들여다보다</p>
            <h2>하나의 조형,<br />다섯 가지 기능</h2>
          </div>

          <!-- leader-line overlay: connects each spec callout to a precise point on the product -->
          <svg class="orbit__leaders" aria-hidden="true"></svg>

          <!-- anchor points on the product itself (fixed to visual features, calibrated against the settled front-facing frame) -->
          <div class="specnode specnode--1" data-node="1"></div>
          <div class="specnode specnode--2" data-node="2"></div>
          <div class="specnode specnode--3" data-node="3"></div>
          <div class="specnode specnode--4" data-node="4"></div>

          <!-- floating spec callouts -->
          <ul class="specpins">
            <li class="specpin specpin--tl" data-pin="1">
              <span class="specpin__no">01</span>
              <h3>H14 HEPA 필터</h3>
              <p>성적서로 확인된 <b>H14</b> 등급 헤파 필터가 미세먼지를 <b>99.99%</b>까지 제거합니다.</p>
            </li>
            <li class="specpin specpin--tr" data-pin="2">
              <span class="specpin__no">02</span>
              <h3>UV-C 살균</h3>
              <p>버튼으로 켜고 끄는 UV 살균이 유해 미생물을 최대 <b>99.9995%</b> 제거합니다.</p>
            </li>
            <li class="specpin specpin--bl" data-pin="3">
              <span class="specpin__no">03</span>
              <h3>5-in-1 통합 기능</h3>
              <p>냉풍 · 온풍 · 공기청정 · 음이온 · UV살균, <b>다섯 기능</b>을 한 대에.</p>
            </li>
            <li class="specpin specpin--br" data-pin="4">
              <span class="specpin__no">04</span>
              <h3>LED 디스플레이</h3>
              <p>작동 모드와 설정 상태를 <b>직관적으로</b> 표시합니다.</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- ========== HUMAN BREAK (model-face) ========== -->
      <section class="human" id="human">
        <div class="human__media">
          <img class="human__img" src="/img/model-face.jpg" alt="HOiD 에어로퓨전이 놓인 맑고 편안한 실내" width="1600" height="872" loading="lazy" decoding="async" />
          <span class="human__scrim" aria-hidden="true"></span>
        </div>
        <div class="human__copy">
          <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> 매일의 호흡</p>
          <h2 class="human__title">
            <span class="l"><span>숨쉬고 있다는 걸</span></span>
            <span class="l"><span>잊게 되는 공기</span></span>
          </h2>
          <p class="human__sub">가장 좋은 공기는 느껴지지 않습니다. 다만, 하루가 조금 더 가벼워질 뿐입니다.</p>
        </div>
      </section>

      <!-- ========== DESIGN STATEMENT ========== -->
      <section class="design" id="design">
        <div class="design__inner">
          <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> 디자인 철학</p>
          <p class="design__lead reveal">
            <span class="cl">공기청정기 따로, 선풍기 따로, 온풍기 따로 —</span>
            <span class="cl">계절마다 가전을 꺼내고 넣는 일은 이제 없습니다.</span>
            <span class="cl"><em>에어로퓨전 5in1</em> 하나로, 사계절 내내 같은 자리에서.</span>
          </p>
          <div class="design__grid">
            <figure class="design__fig reveal">
              <video class="design__vid" src="/video/design-loop.mp4" poster="/img/product-base.png" autoplay muted loop playsinline preload="metadata" aria-label="HOiD 프리미어 공기청정기 2세대 시네마틱 영상"></video>
            </figure>
            <div class="design__notes">
              <div class="note reveal">
                <span class="note__k">사계절, 한 대로</span>
                <p>여름엔 냉풍, 겨울엔 온풍 — 공기청정 · 음이온 · UV살균은 365일. 계절 가전을 바꿔 꺼내는 일이 사라집니다.</p>
              </div>
              <div class="note reveal">
                <span class="note__k">아치형 에어 링</span>
                <p>날개 없는 순환 구조라 손끝이 닿아도 안전하고, 그대로 두어도 오브제가 됩니다.</p>
              </div>
              <div class="note reveal">
                <span class="note__k">하단 360° 흡입</span>
                <p>하단 360도 흡입 구조로 어느 방향에 두어도 방 전체의 공기를 끌어당깁니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== EXPLODE (pinned scrub — real video frame sequence) ========== -->
      <section class="explode" id="explode">
        <div class="explode__stage">
          <div class="explode__intro" data-explode="intro">
            <p class="eyebrow eyebrow--ko"><span class="eyebrow__dot"></span> 조립 구조</p>
            <h2>정밀하게 맞물린<br />조립 구조</h2>
            <p class="explode__sub">겉커버 · 프리필터 그릴 · 원통형 HEPA 필터 · 모터 · 하단 본체 — 스크롤을 내리며 에어로퓨전의 설계를 한 층씩 들여다보세요.</p>
          </div>

          <div class="explode__frame"><canvas class="scene__canvas" id="explode-canvas" role="img" aria-label="HOiD 에어로퓨전 5단 분해 구조">HOiD 에어로퓨전 분해 구조 이미지</canvas></div>

          <ul class="explode__labels">
            <li class="explode__label" data-label="1"><span class="explode__label-no">01</span>겉커버</li>
            <li class="explode__label" data-label="2"><span class="explode__label-no">02</span>프리필터 그릴</li>
            <li class="explode__label" data-label="3"><span class="explode__label-no">03</span>원통형 HEPA 필터</li>
            <li class="explode__label" data-label="4"><span class="explode__label-no">04</span>모터</li>
            <li class="explode__label" data-label="5"><span class="explode__label-no">05</span>하단 본체</li>
          </ul>
        </div>
      </section>

      <!-- ========== SPEC TABLE ========== -->
      <section class="spec" id="spec">
        <div class="spec__inner">
          <header class="spec__head">
            <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> 사양</p>
            <h2 class="reveal">숫자로 증명합니다</h2>
          </header>
          <div class="spec__stats">
            <div class="stat reveal">
              <span class="stat__num" data-count="99.99" data-suffix="%">0</span>
              <span class="stat__label">H14 필터 미세먼지 제거율</span>
            </div>
            <div class="stat reveal">
              <span class="stat__num" data-count="78" data-suffix="㎡">0</span>
              <span class="stat__label">청정 커버리지</span>
            </div>
            <div class="stat reveal">
              <span class="stat__num" data-count="8" data-suffix="단">0</span>
              <span class="stat__label">바람세기 조절</span>
            </div>
            <div class="stat reveal">
              <span class="stat__num" data-count="5" data-suffix="가지">0</span>
              <span class="stat__label">통합 기능 · 하나의 본체</span>
            </div>
          </div>

          <dl class="spec__list">
            <div class="reveal"><dt>필터 등급</dt><dd>H14 HEPA 필터 · 1년 교체 주기</dd></div>
            <div class="reveal"><dt>살균 방식</dt><dd>UV-C 살균 · 버튼으로 켜고 끄는 온/오프</dd></div>
            <div class="reveal"><dt>통합 기능</dt><dd>냉풍 · 온풍 · 공기청정 · 음이온 · UV살균</dd></div>
            <div class="reveal"><dt>운전 모드</dt><dd>일반풍 · 수면풍 · 풍속 8단 · 타이머 1~12시간</dd></div>
            <div class="reveal"><dt>회전 / 조작</dt><dd>좌우 80° 자동 회전 · 본체 터치 패널 · 리모컨</dd></div>
            <div class="reveal"><dt>제품 사양</dt><dd>210×210×820mm · 5.1kg · 220V 50/60Hz · 30W~1200W</dd></div>
          </dl>
        </div>
      </section>

      <!-- ========== REVIEWS (real-person UGC, 3 languages) ========== -->
      <section class="reviews" id="reviews">
        <div class="reviews__inner">
          <header class="reviews__head">
            <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> 사용 후기</p>
            <h2 class="reveal">전 세계가 먼저,<br />써보고 말합니다</h2>
            <p class="reviews__sub reveal">한국 · 일본 · 미국 — 세 나라의 실사용자가 직접 들려주는 프리미어 공기청정기 2세대 이야기.</p>
          </header>

          <div class="reviews__grid" id="reviews-carousel" tabindex="0" aria-label="사용 후기 영상 카드">
            <article class="rcard reveal">
              <div class="rcard__media">
                <video class="rcard__video" src="/video/reviews/review-kr.mp4" poster="/video/reviews/review-kr-poster.jpg" controls playsinline preload="none"></video>
              </div>
              <div class="rcard__body">
                <span class="rcard__flag">🇰🇷 KOREA</span>
                <p class="rcard__quote">"여름엔 선풍기, 겨울엔 온풍기 따로 썼는데 — 이젠 이거 하나예요."</p>
              </div>
            </article>

            <article class="rcard reveal">
              <div class="rcard__media">
                <video class="rcard__video" src="/video/reviews/review-jp.mp4" poster="/video/reviews/review-jp-poster.jpg" controls playsinline preload="none"></video>
              </div>
              <div class="rcard__body">
                <span class="rcard__flag">🇯🇵 JAPAN</span>
                <p class="rcard__quote">"扇風機もヒーターも別々に使ってたのに、今はこれ一台だけです。"</p>
              </div>
            </article>

            <article class="rcard reveal">
              <div class="rcard__media">
                <video class="rcard__video" src="/video/reviews/review-en.mp4" poster="/video/reviews/review-en-poster.jpg" controls playsinline preload="none"></video>
              </div>
              <div class="rcard__body">
                <span class="rcard__flag">🇺🇸 USA</span>
                <p class="rcard__quote">"A fan, a heater, a purifier — now it's just this one, all year round."</p>
              </div>
            </article>
          </div>
          <div class="reviews__pager" id="reviews-pager" aria-label="후기 국가 선택"></div>
        </div>
      </section>

      <!-- ========== PRODUCT LINEUP ========== -->
      <section class="lineup" id="lineup">
        <div class="lineup__inner">
          <header class="lineup__head">
            <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> HOiD 라인업</p>
            <h2 class="reveal">공기청정기부터 스마트TV까지,<br />기술로 완성한 클린 라이프</h2>
            <p class="lineup__sub reveal">공기청정기 · 무선청소기 · 무빙 스마트TV · 제습기 — HOiD가 만드는 공간의 기본기.</p>
          </header>

          <div class="lineup__grid" id="lineup-carousel" tabindex="0" aria-label="HOiD 제품 라인업 카드">
            <article class="pcard pcard--feature reveal">
              <div class="pcard__media"><img src="/img/ap2501-gen2.jpg" alt="호이드 에어로퓨전 5in1 공기청정 냉온풍기" width="450" height="400" loading="lazy" decoding="async" /></div>
              <div class="pcard__body">
                <span class="pcard__tag">FLAGSHIP</span>
                <h3>호이드 에어로퓨전 공기청정 냉온풍기<br />5in1 UV살균 음이온 사계절용</h3>
                <p class="pcard__model">HO-AP2501</p>
                <a href="#tech" class="pcard__link">기술 자세히 보기 →</a>
              </div>
            </article>

            <article class="pcard reveal">
              <div class="pcard__media"><img src="/img/ap2501-silver.jpg" alt="HOiD 프리미어 공기청정기 2세대 실버" width="522" height="400" loading="lazy" decoding="async" /></div>
              <div class="pcard__body">
                <h3>프리미어 공기청정기</h3>
                <p class="pcard__model">HO-AP2501-S · 실버</p>
              </div>
            </article>

            <article class="pcard reveal">
              <div class="pcard__media"><img src="/img/ap2501-white.jpg" alt="HOiD 프리미어 공기청정기 2세대 화이트" width="601" height="400" loading="lazy" decoding="async" /></div>
              <div class="pcard__body">
                <h3>프리미어 공기청정기</h3>
                <p class="pcard__model">HO-AP2501-W · 화이트</p>
              </div>
            </article>

            <article class="pcard reveal">
              <div class="pcard__media"><img src="/img/vacuum.jpg" alt="HOiD 오브제 무선청소기" width="600" height="400" loading="lazy" decoding="async" /></div>
              <div class="pcard__body">
                <h3>무선청소기</h3>
                <p class="pcard__model">HO-AC2506</p>
              </div>
            </article>

            <article class="pcard reveal">
              <div class="pcard__media"><img src="/img/tv.jpg" alt="HOiD MOVE 무빙 스마트TV 32인치" width="450" height="400" loading="lazy" decoding="async" /></div>
              <div class="pcard__body">
                <h3>MOVE 무빙 스마트TV 32</h3>
                <p class="pcard__model">SFSDA1132H</p>
              </div>
            </article>

            <article class="pcard reveal">
              <div class="pcard__media"><img src="/img/dehumidifier.jpg" alt="HOiD 더 데일리 제습기 13L" width="900" height="900" loading="lazy" decoding="async" /></div>
              <div class="pcard__body">
                <h3>더 데일리 제습기</h3>
                <p class="pcard__model">D1023 · 1일 제습량 13L</p>
              </div>
            </article>
          </div>
          <div class="lineup__dots" id="lineup-dots" aria-hidden="true"></div>
        </div>
      </section>

      <!-- ========== SERVICE / SUPPORT ========== -->
      <section class="service" id="service">
        <div class="service__inner">
          <header class="service__head">
            <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> 고객 지원</p>
            <h2 class="reveal">HOiD 서비스 센터</h2>
            <p class="service__sub reveal">제품 관련 문제사항을 해결할 수 있도록 도와드립니다.</p>
          </header>

          <div class="service__grid">
            <a class="scard reveal" href="/docs/manual.pdf" target="_blank" rel="noopener">
              <span class="scard__no">01</span>
              <h3>사용 설명서</h3>
              <p>제품에 대해 궁금하신가요? 사용설명서에서 확인하실 수 있습니다.</p>
            </a>
            <a class="scard reveal" href="/as-center">
              <span class="scard__no">02</span>
              <h3>A/S 안내</h3>
              <p>제품에 문제가 생기셨나요? 1544-9537로 연결해 서비스를 받아보세요.</p>
            </a>
            <a class="scard reveal" href="/faq">
              <span class="scard__no">03</span>
              <h3>FAQ</h3>
              <p>자주묻는 질문에서 궁금하신 사항을 바로 확인하실 수 있습니다.</p>
            </a>
            <!-- [개발자 수정 요청] 04 1:1 문의: 비밀글(작성자+관리자만 열람) 기능이 필요합니다. 정적 사이트라 서버 인증이 불가하니 (1) 백엔드 게시판 개발 또는 (2) 구글폼/채널톡 등 외부 폼 임베드 중 결정 후 아래 mailto 링크를 교체해주세요. -->
            <a class="scard reveal" href="mailto:hoidcscs@gmail.com?subject=%5B1%3A1%20%EB%AC%B8%EC%9D%98%5D">
              <span class="scard__no">04</span>
              <h3>1:1 문의</h3>
              <p>대량구매, 제품문의 등 무엇이든 문의주세요. 답변해드립니다.</p>
            </a>
          </div>

          <div class="service__as reveal">
            <div class="as__row">
              <span class="as__label">공기청정기 · 청소기 · 제습기</span>
              <a href="tel:15449537" class="as__num">1544-9537</a>
            </div>
            <div class="as__row">
              <span class="as__label">무빙 스마트TV</span>
              <a href="tel:07086481288" class="as__num">070-8648-1288</a>
            </div>
            <p class="as__hours">운영시간 AM 10:00 – PM 17:00 · 점심시간 PM 13:00 – PM 14:00 (토·일·공휴일 휴무)</p>
          </div>

          <div class="faq reveal" id="faq">
            <h3 class="faq__title">자주 묻는 질문</h3>
            <details class="faq__item">
              <summary>필터는 얼마나 자주 교체해야 하나요?</summary>
              <p>1년에 한 번 교체를 권장합니다. 본체 하단을 고정한 채 상단부를 열림 방향으로 돌려 분리한 뒤, 필터를 꺼내 새 필터로 교체하면 됩니다.</p>
            </details>
            <details class="faq__item">
              <summary>5가지 기능이 정확히 무엇인가요?</summary>
              <p>냉풍 · 온풍 · 공기청정 · 음이온 · UV살균 — 다섯 가지 기능이 한 대에 통합되어 있어, 계절이 바뀌어도 가전을 바꿔 꺼낼 필요가 없습니다.</p>
            </details>
            <details class="faq__item">
              <summary>어느 정도 크기의 공간까지 사용할 수 있나요?</summary>
              <p>청정 커버리지는 78㎡로, 거실 · 사무실 · 카페 등 넓은 공간에서도 사용할 수 있습니다.</p>
            </details>
            <details class="faq__item">
              <summary>UV 살균은 항상 켜져 있나요?</summary>
              <p>아니요. UV 살균은 본체 패널 또는 리모컨의 UV 버튼으로 필요할 때만 켜고 끌 수 있습니다.</p>
            </details>
            <details class="faq__item">
              <summary>전기요금이 많이 나오지 않나요?</summary>
              <p>공기청정 모드 기준 하루 12시간 사용 시 일 전력량 약 0.15kWh, 월 전기요금 약 2,600원 수준입니다. (냉풍/온풍 모드는 사용 환경에 따라 달라질 수 있습니다.)</p>
            </details>
            <details class="faq__item">
              <summary>A/S는 어떻게 받나요?</summary>
              <p>공기청정기 · 청소기 · 제습기는 1544-9537, 무빙 스마트TV는 070-8648-1288로 문의해주세요. 운영시간은 AM 10:00 – PM 17:00 (점심 PM 13:00–14:00, 토·일·공휴일 휴무)입니다.</p>
            </details>
          </div>
        </div>
      </section>

      <!-- ========== BULK PURCHASE ========== -->
      <section class="bulk" id="bulk">
        <div class="bulk__inner reveal">
          <div class="bulk__copy">
            <p class="eyebrow eyebrow--ink eyebrow--ko"><span class="eyebrow__dot"></span> 기업 · 단체 구매</p>
            <h3>대량 구매를 원하시나요?</h3>
            <p>대표 번호(1544-9537)로 전화 주시거나, 문의를 남겨주시면 빠르게 도와드리겠습니다.</p>
          </div>
          <!-- [개발자 수정 요청] 대량 구매 문의: 1:1 문의와 동일하게 폼(비밀글) 구축 시 아래 mailto 링크를 폼 링크로 교체해주세요. -->
          <a href="/bulk-purchase" class="btn btn--dark">대량 구매 문의하기 →</a>
        </div>
      </section>

      <!-- ========== CTA ========== -->
      <section class="cta" id="cta">
        <img class="cta__ghost" src="/img/product-base.png" alt="" aria-hidden="true" width="1142" height="3486" loading="lazy" decoding="async" />
        <div class="cta__inner">
          <p class="eyebrow eyebrow--ko"><span class="eyebrow__dot"></span> HOiD 공식 스토어</p>
          <h2 class="cta__title reveal">
            지금, HOiD를<br />만나보세요
          </h2>
          <p class="cta__sub reveal">에어로퓨전 공기청정 냉온풍기 5in1부터 무선청소기, 무빙 스마트TV, 제습기까지.</p>
          <div class="cta__actions reveal">
            <a href="https://feedmall.co.kr/" target="_blank" rel="noopener" class="btn btn--primary">스토어에서 보기</a>
            <a href="#top" class="btn btn--ghost">처음으로</a>
          </div>
        </div>
        <footer class="foot">
          <div class="foot__brand">
            <span class="foot__logo">HOiD</span>
            <p class="foot__legal">
              대표 : 정성현 · 인천광역시 연수구 송도과학로 32, 송도테크노파크IT센터 에스동 3003-3호 (송도동)<br />
              사업자등록번호 884-81-03587 · 통신판매업신고 제 2025-인천연수구-0287호 · 개인정보보호책임자 정성현 · E-mail hoidcscs@gmail.com
            </p>
          </div>
          <span class="foot__copy">Copyright © 2025 HOiD. All rights reserved.</span>
        </footer>
      </section>
    </main>`
