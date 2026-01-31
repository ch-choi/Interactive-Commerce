# 인터랙티브 쇼핑몰 바이브 코딩 가이드 by DDD

‣ 

안녕하세요 DDD입니다.

스레드에 제가 올린 **인터랙티브 쇼핑몰 예제**를 여러분이 따라 하실 수 있도록 가이드를 제공해 드립니다. 미리 말씀드리지만 이 예제는 절대 쉽지 않습니다. 하지만 혼자서 공부하면 막연했던 내용들과 비전공자가 바이브 코딩을 배울 때 취하면 좋을 태도와 방식을 정리해 보았습니다. 이 가이드를 통해 예제 구현뿐만 아니라 앞으로 바이브 코딩을 활용함에 있어 꼭 도움이 되셨으면 좋겠습니다.

먼저 작업물의 실제 페이지 링크를 공유드립니다.

페이지 링크: [https://dynamic-grid-rose.vercel.app/](https://dynamic-grid-rose.vercel.app/)

스토리북 링크: [https://dynamic-grid-storybook.vercel.app/](https://dynamic-grid-storybook.vercel.app/)

스타터 다운로드: ‣

*스토리북이 무엇인지는 아래에서 다시 설명드리겠습니다.

*스타터는 예제를 만들기 위한 기본 세팅을 올려놓은 프로젝트 파일입니다.

### 0. 바이브 코딩을 어떻게 받아들여야 할까?

일단 자세한 가이드에 앞서 이 논의를 한번 짚고 넘어가 봤으면 합니다. 이미 SNS의 여러 포스트에서 느끼셨겠지만 ‘바이브 코딩’에 대한 관점은 크게 두 가지로 극명하게 나뉩니다.

1. **패러다임 시프트, 새로운 희망이다.**

기존 개발자에게는 노동 집약 프로그래밍에서 벗어나고, 비개발자에게는 새로운 사업의 주체가 될 수 있는 희망이라는 관점입니다. 아이디어만 있으면 누구나 IT 서비스를 개발할 수 있다는 희망적 관점입니다.

1. **거품이다, 제대로 된 서비스를 만들 수 없다.**

퀄리티, 유지 보수, 보안 등의 측면에서 제대로 된 서비스를 만들기 제한된다는 부정적 관점입니다. 막상 작업해 보니 AI의 오류를 수정하는 데 더 많은 시간을 할애하게 된다는 주장입니다.

> 누가 더 맞는 말일까?
> 

저는 두 관점 모두 경계할 점이 있다고 생각합니다. 일단 **1번**은 비전공자들도 개발을 배울지 말지 고민하게 했다는 사실 자체로 긍정적인 효과가 있다고 생각합니다. 다만 교육 시장에서 과도하게 큰 희망과 과장을 불어넣는 탓에, 필연적으로 배워야 할 노력에 비해 너무 큰 기대감(쉬울 것이라는)을 심어 준 것도 사실입니다.

바이브 코딩은 쉽지 않습니다. 기존에 coding(코드를 오류 없이 쓰는 행위)을 AI가 대신해 주고 있지만, 그만큼 논리적·구조적 오류가 쌓이는 속도도 빨라지기 때문에 이를 관리하는 능력이 요구됩니다. 즉 AI 등장 전후로 배워야 할 지식의 성격이 바뀐 것이지, 바이브 코딩을 무책임하게 작업을 AI에게 던지는 행위로 오해하면 절대 안 됩니다.

그리고 2번은 잘못된 학습 방법을 경계하기 위해 참고하면 좋지만, 또 필요한 가능성을 부정하는 것도 경계해야 합니다. 대부분 바이브 코딩이 좋은 결과를 내지 못하는 이유는 단편적인 개발 지식이 부족한 이유도 있지만, 그것보다 필요한 사고 방식을 거치지 않았기 때문입니다. 우리가 사람과 대화를 할 때도 어떤 단어를 사용하고, 이야기의 순서를 어떻게 정하느냐에 따라 결과가 달라지듯 바이브 코딩에도 AI와 소통하는 훈련이 필요합니다.

### 1. 가이드 안내

이 가이드는 Cursor AI나 Claude Code 같은 에이전트를 통해 바이브 코딩을 한 번 이상 시도해 보신 분들이 따라할 수 있습니다. 만약 웹 프로그래밍에 대한 기초와 바이브 코딩에 대한 경험이 전혀 없으신 분들은 제가 작년에 진행한 ‘**디발자 챌린지**’의 자료를 먼저 읽으시길 권장합니다.

아래 자료들을 읽으시고 각자 컴퓨터의 OS에 Node.js를 설치하시고, React.js의 기초를 이해하셔야 아래 가이드를 따라오실 수 있습니다.

자료1: [개발이 더 이상 스펙이 아닌 이유](https://www.figma.com/slides/wSoHKjuCo2jzS5ai026E80/01---%EA%B0%9C%EB%B0%9C%EC%9D%B4-%EB%8D%94%EC%9D%B4%EC%83%81-%EC%8A%A4%ED%8E%99%EC%9D%B4-%EC%95%84%EB%8B%8C-%EC%9D%B4%EC%9C%A0?node-id=18-344&t=9IQBF7NCMX0LwPW5-1)

자료2: [React.js가 디자인 프로세스에 미친 영향](https://www.figma.com/slides/bGw21ThMjKoBPYK6AgPa2Q/02---React.js%EA%B0%80-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%97%90-%EB%AF%B8%EC%B9%9C-%EC%98%81%ED%96%A5?node-id=1-42&t=uHBK4ugE65ay9x3R-1)

자료3: [Cursor로 구글 검색 클론 코딩하기](https://www.figma.com/slides/2q59rLmsHG5ksDSyJW8Y3B/03---Cursor%EB%A1%9C-%EA%B5%AC%EA%B8%80-%EA%B2%80%EC%83%89-%ED%81%B4%EB%A1%A0%ED%95%98%EA%B8%B0?node-id=1-42&t=OGwFfAIqrkNLacp6-1)

그리고 예제 프로젝트는 React.js + MUI + Storybook으로 구성되어 있는데 각 역할은 다음과 같습니다.

**React.js**: 피그마처럼 UI를 컴포넌트 단위로 관리할 수 있는 프레임워크입니다.

**MUI**: 구글의 머티리얼 디자인을 기반으로 한 디자인 시스템입니다. 각 디자인 토큰을 수정해 컴포넌트를 각자 프로젝트에 맞게 사용할 수 있습니다.

**Storybook**: 개발을 하다 보면 디자인을 바꾸기 위한 작업과 실제 동작 및 로직을 수정하는 작업을 분리하는 것이 효율적입니다. 필요한 모든 컴포넌트를 UI만 펼쳐 넣고 제품과 고립된 상태에서 수정하기 위한 UI 관리 라이브러리입니다.

이 가이드에서는 위 3개가 기본 세팅되어 있는 [**starter**](https://github.com/groovelb/dynamic-grid-starter) 파일을 제공해 드리겠습니다. 스타터 파일은 완성본은 아니고 여러분의 편의성을 위해 이미지, 영상, 아이콘까지만 포함시킨 프로젝트 파일입니다.

starter 파일 링크: Git에 익숙하신 분들은 pull을 받으시고, 그렇지 않은 분들은 가입 후 바로 download를 받으세요.

다운받은 폴더를 Cursor에서 여시고 터미널에 아래 명령어를 차례대로 입력하세요. 혹시 이것도 헷갈리시다면 ‘내가 이 프로젝트를 어떻게 시작하면 좋겠니?’라고 Cursor의 Ask 모드로 물어보세요. (참고로 모델은 Sonnet 4.5, ChatGPT-5를 추천해 드립니다.)

```bash
# 프로젝트에 필요한 패키지 설치
pnpm install

# 프로젝트를 로컬 환경에서 실행
pnpm dev

# 스토리북 실행
pnpm storybook
```

**스토리북을 꼭 활용해야 하나요?**

스토리북을 반드시 써야 할 필요는 없습니다. 여기서 핵심은 AI에게 큰 임무를 한 번에 시키지 말고, 필요한 동작과 기능을 적당히 쪼개서 어떤 컴포넌트들이 필요한지 생각하는 훈련이 필요하다는 점입니다.

다만 이번 가이드에서는 편의상 제가 스토리북 자체를 튜토리얼처럼 사용했습니다. 각 컴포넌트의 docs에 상세 설명 및 이 컴포넌트를 만들기 위한 프롬프트를 적어 놓았습니다.

### 2. 클론 디자인 + 아이데이션 + 분석 과정

일단 이 예제는 [yeezy.com](http://yeezy.com)의 디자인에서 영감을 받은 것입니다. 이 디자인을 스레드에 공유한 후 사람들이 구현 방법을 궁금해 하셨고, 이를 바이브 코딩으로 어떻게 구현할까를 고민하다 지금의 컨셉으로 발전했습니다. 보통 이런 사이트를 디자인하고 구현하기 위해 가장 먼저 해야 할 일은 인터랙션을 단계별로 쪼개고 여기에 어떤 컴포넌트가 필요할지 리스트업해 보는 것입니다. 일단 저희 예제 사이트의 경우

1. 유저의 필터 결과에 따라 그리드가 재배치된다.
2. 이때 재배치되는 과정이 애니메이션으로 표현된다.
3. 상품 썸네일에 마우스를 갖다 대면 이미지가 영상으로 움직인다.
4. 상품을 클릭하면 그리드 전체가 확대되면서 해당 상품이 화면 중앙에 온다.
5. 상품 상세 뷰에서 세로 스크롤은 제품이 바뀌고, 가로 캐러셀은 착장샷이 바뀐다.
    
    

대략 이 정도의 규칙들을 발견했고

- 여기에 필요한 컴포넌트들이 무엇이고
- 컴포넌트들에게 어떤 data가 필요한지
- 그리고 그 data를 기반으로 어떻게 동작하는지
    
    

이 3가지를 AI와 함께 고민하는 것으로 시작합니다. 일단 위 규칙들을 종합했을 때 필요한 컴포넌트 리스트를 물어봅니다. 저의 경우는 아래와 같이 나왔습니다. (참고로 모든 예시 프롬프트)

| **컴포넌트** | **하는 일** |
| --- | --- |
| **MainPage** | 전체 페이지를 관리하고 필터링 처리 |
| **Header** | 상단 네비게이션과 필터 버튼 제공 |
| **GridContainer** | 그리드 확대/축소 애니메이션 담당 |
| **DynamicGrid** | 제품들을 그리드로 배치 |
| **ProductCard** | 개별 제품을 카드로 표시 (이미지, 가격, 호버 효과) |
| **ProductDetailView** | 제품 클릭 시 나타나는 상세 화면 |
| **Matrix2DCarousel** | 이미지(가로)와 제품(세로)을 2D로 탐색 |

### 3. 미드저니로 생성형 모션 만들기

이 예제에서 사용된 제품 사진, 모션은 미드저니를 사용했는데요 일단 통일된 제품 사진을 위해 구도, 스타일, 라이팅 등을 템플렛 처럼 사용하게 중요합니다. 이 템플렛 안에서 제품명, 색상등을 바꾸더라도 전반적으로 비슷한 브랜드의 느낌이 나도록요.

미드저니를 사용하는건 어렵지 않지만, 이 톤을 잡는게 어려운데 이번 예제에서는 그렇게 공을 들이진 못하고 모션의 움직임이 자연스러운지에만 초점을 두었습니다.

프롬프트 예시. (아래에서 색, 제품만 바꿔서 재사용합니다)

```bash
a fully unfolded pure [black] male avangrade style [sneakers], displayed flat from a direct frontal view on a perfectly even seamless white background (#FFFFFF), occupying roughly one quarter of the frame, surrounded by generous clean white space. avant-garde minimalist streetwear with sculptural silhouette and refined tailoring, clean structural lines, subtle natural fabric folds expressing form and material tension. no decorative details such as buttons, collars, pockets, or logos architectural minimalism with realistic fabric presence, intentional and balanced. illuminated with perfectly diffused ambient light, calibrated to maintain pure white balance without introducing any warmth or coolness absolute neutral white illumination. a Photoshop-style pure white surface (#FFFFFF) with consistent luminance and no gradient. exposure optimized for full dynamic range, no highlight clipping or tonal compression. the scene uses a 5500K daylight color temperature with noise-free even diffusion, ensuring white areas remain true neutral without grey or yellow tint. perfectly centered, no perspective distortion, wide negative space, professional product photography, Leica S3, 85mm lens, f/8, balanced ISO 100 exposure. ultra-detailed commercial studio shot, hyperreal clarity and tonal precision. captured under uniform white calibration environment white reference card set to #FFFFFF for accurate color and brightness consistency across the frame. no visible photo grain, white noise, or lighting inconsistencies. whites appear as pure optical white rather than off-white or tinted tones.
```

이제 다른 측면의 사진, 모델의 착용샷, 그리고 착용샷을 활용한 모션 영상을 만들어야하는데요

다른 측면의 사진: 이건 원본 이미지를 선택했을때 우측 패널에서 use의 style을 사용한 뒤

side of the sneakers**”** 와 같은 프롬프트를 입력해주시면 됩니다**.**  style은 해당 이미지와 비슷한 스타일 (연출, 렌더링 방식) 등을 뜻하고 여기에 더 정확성을 높이려면 omni paremeter에도 이미지를 추가하는데 omin는 특정 피사체를 그대로 사용하고 싶을때 사용합니다.

그리고 image prompt는 이미지 자체가 프롬프트일 경우인데 이는 이미지의 스타일을 일관성있게 도와주기도 하지만 변하고자 하는 속성을 억제시키는 효과도 있기때문에 상황에 맞게 사용하셔야합니다.

그리고 유사한 방식으로 모델 이미지도 만듭니다.

마지막으로 이 2개 이미지를 모션 파라미터를 활용해서 이어주면되는데 첫번째 이미지 선택후 우측하단에 Animate Manually를 클릭하신후 두번째 모델 사진을 last frame으로 지정합니다. (드래그)

그리고 프롬프트에 다음과 같이 적어줍니다.

```bash
a natural and continuos transiton between two image
```

미드저니와 같은 생성형 이미지, 영상툴은 숙련된 전문가들도 상황에 따라 매우 여러번 반복작업을 합니다. 그래서 한번에 원하는 이미지, 모션이 나오지 않더라도, chat gpt와 상의하며 더 적합한 키워드, 설명 방식이 없는기 계속 고민하셔야합니다.

이 프로젝트에서는 총 6개의 제품이 이런식으로 만들어졌으며.  스타터파일에 src>data>product.js 에 제가 미리 저장해놓은 상태입니다.

### 4. Storybook과 함께 살펴보기

이제 본격적으로 실습을 하기 앞서 프로젝트의 전체 구조를 스토리북과 함께 살펴봤습니다. 지금 제가 여러분에게 스토리북을 통해 웹사이트의 부분과 전체를 설명할 수 있듯이, 실제로 실무에서는 디자이너와 개발자가 결과물로 소통할 수 있는 역할을 합니다.

일단 크게 다음 섹션들이 있습니다.

1. overview: 프로젝트의 전반적인 설명 및 구조, 필요한 컴포넌트
2. style: 아이콘, 이미지, 영상
3. component: 필요한 컴포넌트
4. pages: 완성된 페이지
    
    

그래서 실습을 따라 하기 전에 각 섹션을 차례대로 읽으면서 각 컴포넌트가 어떻게 작동하는지, 이것들이 서로 어떻게 움직이는지를 살펴볼 필요가 있습니다. 저는 이 가이드에서 이 스토리북을 교재처럼 사용해서 어떤 컴포넌트를 먼저 작업하는 게 좋을지 설명드리겠습니다.

그리고 모든 컴포넌트의 docs에 이 컴포넌트를 만들기 위한 프롬프트가 적혀 있으니 사용해서 제가 제시한 순서대로 컴포넌트를 차근차근 만드시면 됩니다.

### 5. 프롬프트는 만능인가요?

당연히 모든 프롬프트가 완벽하지는 않습니다. 만약 프롬프트의 정확성이 99%에 가깝기를 원한다면 거의 입으로 코딩한 듯한 자세한 내용이 들어가야 합니다. 이것은 바이브 코딩을 처음 배우는 사람에게는 무리이며, 설령 이게 가능할지언정 프롬프트 한 방으로 모든 걸 끝내려는 방식은 너무 이상적입니다.

다만 가장 핵심 내용들을 먼저 전달하고 디테일을 잡기 위한 소통(프롬프트) 능력이 중요합니다. 중요한 것은 이 대화의 범위를 합리적인 양으로 줄이는 것이 첫 번째 프롬프트의 역할이라는 점입니다. 제가 실제 작업했을 때와 여러분에게 제공된 스토리북 상의 프롬프트 사이에 차이점이 있는데요,

저는 훨씬 개괄적인 프롬프트로 조금씩 좁혀 나갔지만, 이런 방식으로 하게 되면 익숙하지 않은 분들에게 난이도가 올라갈 것이기 때문에 제가 이미 완성한 코드를 역으로 접근해 처음 프롬프트와 결합한 내용을 전달드린 것입니다.

그럼에도 불구하고 첫 프롬프트의 결과가 당연히 100%가 아닐 테니 제가 완성한 스토리북과 계속 비교하면서 완성도를 높여 가셔야 합니다.

### 6. 실습하기

먼저 스토리북을 실행해 주세요. 제가 제공한 **스토리북의 각 컴포넌트 docs에 명시된 프롬프트**를 활용해서 직접 만드셔야 합니다. 먼저 위의 starter 파일에서 스토리북을 실행해 주세요.

```bash
# 스토리북 실행
pnpm storybook
```

여기서부터는 각 프롬프트에 대한 설명은 따로 하지 않겠습니다. 다만 순서와 주의할 점을 각 컴포넌트별로 간단히 적고 가겠습니다.

## 6-1. Component

컴포넌트 섹션은 아래 순서대로 만들셔야합니다. 다시 강조하지만 제가 제공한 스토리북 페이지의 각 컴퍼넌트 doc에 설명된 프롬프트를 사용하세요.

 제가 제공한 프롬프트로 컴포넌트를 생성하고, 그 이후에 “스토리북에 등록해 줘”라는 명령을 내리면 스토리북에 등록될 겁니다. 이 영역은 부품을 하나씩 만드는 과정입니다.

**ProductCard**: 제품 정보를 보여주는 Card UI. hover에서 영상이 재생됩니다. 만약 hover 인터랙션에 따른 jogging 효과(영상 역재생)가 잘 안 되면 이 부분은 넘어가셔도 좋습니다. **스토리북에 등록할 때는 제가 미리 넣어 둔 실제 제품 이미지, 영상을 활용하라고 요청하세요.  ("src/assets/products")**

**Matrix2DCarousel:** 일반적으로 아이템을 좌우로 넘기는 슬라이드 UI를 Carousel이라고 합니다. 여기서는 특이하게 좌우(제품 사진 변경), 상하(제품 전체 변경)가 carousel되어야 해서 matrix라는 키워드를 사용했습니다. **스토리북에 등록할 때는 제가 미리 넣어 둔 실제 제품 이미지, 영상을 활용하라고 요청하세요.  ("src/assets/products")**

**DynamicGrid:** 그리드가 소팅 옵션에 따라 바뀌는 과정이 애니메이션으로 보여집니다. 이를 가장 잘 도와주는 외부 라이브러리가 Framer Motion입니다. 이 라이브러리를 활용해 브라우저상의 위치를 자동으로 추적해 바꿔 주는 역할의 그리드 컴포넌트입니다.

**GridContainer:** 그리드 영역 전체의 위치와 scale이 변하는 역할입니다. 선택된 아이템이 정중앙에 오고 확대되는 효과를 보여줍니다. zoom-in 이후 ProductCard가 동작하는 것 같지만 실제는 동일한 위치·크기로 **ProductDetailView**가 올라오는 방식입니다.

**ProductDetailView:** **Matrix2DCarousel**를 담고 있는 제품 상세 영역입니다. 사실상 동일하게 보이지만, 나중에 제품에 대한 자세한 설명을 추가할 수 있습니다. 현재 예제에서는 공란입니다.

**Header:** DynamicGrid의 columns 수를 바꾸거나, 필터를 조정합니다. 그리드를 크고 작게 볼 때, 성별, 색상 필터가 필요할 때 사용합니다.

## 6-2. Pages

사실상 이 웹사이트는 1개의 페이지로 만들어졌습니다. 이제 위 재료들을 조합해 웹사이트다운 페이지를 만들어야 합니다. 헤더의 필터 옵션에 따라 그리드가 변하고, 그리드를 누르면 zoom-in 모드로 진입하고 캐러셀이 작동하는지 확인해야 합니다.

**MainPage**: 이제 UI 디자인은 완성되었지만 이를 완성시키기 위한 프롬프트를 3단계에 걸쳐 적어 놓았는데 목적은 다음과 같습니다.

**AI 프롬프트 - 1단계: 기본 레이아웃 구성 및 제품 표시**

**AI 프롬프트 - 2단계: 필터 기능 연동**

**AI 프롬프트 - 3단계: 제품 상세 뷰 연동**
