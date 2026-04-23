# 보안 이슈 대응 정리 (interactive-commerce)

작성일: 2026-04-23
프로젝트: Interactive Commerce

## 1) 배경
- 배포 전 `pnpm audit --prod`에서 심각도 높은 취약점이 탐지됨.
- Vercel 배포 시 `ERR_PNPM_OUTDATED_LOCKFILE` 오류가 반복적으로 발생함.

## 2) 식별된 취약점
`pnpm audit --prod` (초기 결과)
- **critical: 1**
  - `protobufjs` 경유: `@google/genai` 사용으로 인한 RCE
- **high: 4**, **moderate: 2**

## 3) 조치 내용
### 3-1. `@google/genai` 업데이트
- 루트 패키지 `package.json`
  - `@google/genai: ^1.38.0` -> `@google/genai: ^1.50.1`
- 하위 스튜디오 패키지 `veo-morph-studio/package.json`
  - `@google/genai: ^1.38.0` -> `@google/genai: ^1.50.1`

### 3-2. 의존성 잠금파일 재생성
- `pnpm-lock.yaml` 재생성/동기화 (`pnpm install --lockfile-only` 및 재검증)

### 3-3. 재감사 및 결과
- `pnpm audit --prod` 실행 → **No known vulnerabilities found**

### 3-4. Vercel 배포 실패 원인 대응
- 이전 `pnpm-lock.yaml`-`package.json` 불일치 해소 확인
- `pnpm install --frozen-lockfile` 및 `pnpm install --prod --frozen-lockfile` 재실행
  - 결과: `Lockfile is up to date`, `resolution step is skipped`
  - 즉, `ERR_PNPM_OUTDATED_LOCKFILE` 재현되지 않음

### 3-5. 빌드 정합성 검증
- `pnpm run build` 성공
- 참고: 빌드 구성(`vite.config.js`) 상 `@vitest/browser-playwright` 사용으로 인한 잠재적 누락 이슈를 방지하기 위해 아래 패키지도 `devDependencies`로 복구 반영됨
  - `@vitest/browser-playwright`
  - `playwright`

## 4) 현재 상태
- 보안 취약점: **초기 이슈(critical/high/moderate) 해소됨**
- Vercel 배포 블로킹 오류: **lockfile 불일치 없음으로 정상 기대**

## 5) 변경 파일
- `package.json`
- `veo-morph-studio/package.json`
- `pnpm-lock.yaml`

## 6) 남은 알림 (참고)
- `pnpm run lint`는 기존 코드베이스의 lint 규칙 위반이 다수 존재하여 별도 조치 필요
  - 본 보안/lockfile 조치와는 별개이며, 배포 직후에는 배포 스크립트 동작 범위에 따라 영향도 검토 필요
