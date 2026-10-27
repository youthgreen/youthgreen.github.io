# 출석부 도와줘 상세페이지 운영

공개 페이지: https://youthgreen.github.io/attendance-helper/

## 저장소와 버전

- 현재 앱: **v1.4.5**, React + Tauri 2 + Rust 기반 Windows x64 앱.
- 실제 앱 소스: `youthgreen/Attendance` (**비공개**), 기본 브랜치 `main`. 저장소 소유자/허가된 계정으로 접근합니다.
- 앱 v1.4.5 소스 커밋: `8f91e974751e6f3d05d19aab33523d5a3c2cc893` (태그 `v1.4.5`).
- 앱 수정 작업 기준: `5a7bd30b11bbe56e5ce1344c01d719b169ae73cc` (v1.4.2).
- 사이트: `youthgreen/youthgreen.github.io`, `attendance-helper/index.html`.
- 사이트 작업 기준: `7c1cac031245436395a9c1e1a230b1f2f3c82104`.
- 공개 Windows 다운로드 파일 보관 위치: **사이트 저장소의 GitHub Releases**.
- 현재 파일: `Attendance-Helper-v1.4.5-Windows-x64.zip`.
- 직접 다운로드 URL: https://github.com/youthgreen/youthgreen.github.io/releases/download/v1.4.5/Attendance-Helper-v1.4.5-Windows-x64.zip
- 기존 v1.3.3/v1.3.4/v1.4.0/v1.4.1/v1.4.2 태그·릴리스·파일은 보존합니다.

`seoeum1711-jpg/Attendance`, 앱 v1.3.2, 예전 asset 이름을 참조하던 운영 정보는 더 이상 현재 기준이 아닙니다.

## 구조와 배포

이 체크아웃은 HTML + CSS + 바닐라 JavaScript + 로컬 WebP/GIF/PNG 정적 사이트입니다. **package.json, npm 빌드·테스트·이미지 생성 도구가 없습니다.** `npm ci`, `npm test`, `npm run assets/gif/preview`를 이 저장소에서 실행하지 마세요.

GitHub Pages는 `main` 브랜치의 `/`를 배포합니다. 상세페이지와 함께 `styles.css`, `page.js`, `assets/`를 유지합니다. 외부 폰트·CDN·분석 스크립트·GitHub API 조회는 없습니다. 이미지와 링크는 로컬 상대 경로를 유지합니다.

로컬 실행:

```sh
cd /workspace/youthgreen.github.io
python3 -m http.server 8000 --bind 127.0.0.1
```

홈 `/`, 개인정보 `/privacy/`, 상세 `/attendance-helper/`의 HTTP 응답과 자산 로딩을 확인합니다. 로컬 주소는 내부 검증용입니다.

## 다음 버전 다운로드 변경 순서

1. 앱의 `docs/release.md`와 `scripts/build-release.ps1`을 사용합니다. 기존 Windows GitHub Actions가 프런트엔드·Rust 테스트와 NSIS 빌드를 수행합니다.
2. 앱 버전과 새 태그가 일치해야 합니다. `package.json`, npm lockfile, Cargo package/lockfile, Tauri 설정을 함께 올립니다. 앱 표시 버전은 package.json에서 가져옵니다.
3. Windows 결과물의 ProductVersion을 확인하고 ZIP 내부 설치 EXE와 `release-info.json`을 검사합니다. manifest에는 버전, 정확한 앱 커밋과 EXE SHA-256이 있습니다.
4. 앱 저장소에서 검증한 ZIP을 사이트 저장소의 **새** Release에 올립니다. 기존 태그·릴리스를 삭제하거나 덮어쓰지 마세요.
5. **사이트 Release의 실제 공개 ZIP URL로 다운로드하고 SHA-256을 비교한 후에만** 홈페이지를 수정합니다.
6. `attendance-helper/index.html`의 최신 버전, 업데이트 날짜(한국 기준), 다운로드 URL, 파일 안내와 기능 설명을 함께 갱신합니다.
7. 이 운영문서의 버전·asset 이름·소스 커밋을 갱신하고 site main에 commit/push합니다.
8. Pages 빌드 완료 후 저장소 HTML과 **실제 공개 응답** 모두에서 새 버전과 정확한 다운로드 URL을 확인합니다. CDN 캐시로 구버전이 보이면 배포 결과를 확인한 뒤 다시 검증합니다.

## 사이트 Actions를 이용한 업로드

현재 클라우드의 GitHub 인증은 API 읽기/쓰기에는 동작하지만 `uploads.github.com` 파일 업로드에서 401이 발생할 수 있습니다. 비공개 앱 저장소의 asset을 공개 curl URL로 읽으려 하면 404가 반환됩니다. 토큰을 채팅이나 파일에 복사하지 말고 기존 인증으로 `gh release download --repo youthgreen/Attendance`를 사용하세요.

이를 해결하기 위한 사이트 워크플로는 `.github/workflows/mirror-attendance.yml`입니다. `.github/release-mirror.json`의 tag/source_commit/sha256과 `.github/release-notes.md`를 실제 새 빌드 정보로 갱신합니다. 검증된 ZIP을 임시로 `.github/release-assets/`에 넣어 함께 commit/push하면 사이트 Actions가 자체 임시 `GITHUB_TOKEN`으로 게시합니다. 비공개 소스나 인증정보를 배포하지 않습니다. 기존 asset은 덮어쓰지 않고 동일 체크섬일 때만 재사용합니다. 공개 업로드가 확인되면 임시 ZIP을 현재 브랜치에서 제거하고 홈페이지 변경과 함께 commit합니다. 기존 커밋·태그는 다시 쓰지 않습니다.

v1.4.0 중계 커밋은 `e0d02ff9e5c025bdf34c5d38399adcdf5382f921`입니다. 임시 ZIP이 제거된 이후 재실행은 이미 공개된 사이트 asset을 받아 체크섬을 검증합니다. 미래 버전에는 새 ZIP을 다시 준비해야 합니다.

## 대량 명찰 저장과 진행 표시

v1.4.5는 같은 앞면·뒷면·로고 이미지를 명찰마다 반복해서 읽고 PDF에 복사하던 처리를 수정합니다. 경로·맞춤·실제 출력 영역별로 픽셀을 한 번 준비하고, 무손실 압축한 RGB 이미지와 필요한 투명도 마스크를 모든 페이지에서 공유합니다. 해상도를 낮추거나 실제 규격을 바꾸지 않습니다.

파일 생성과 미리보기는 Tauri의 백그라운드 작업에서 실행합니다. 참가자 정보가 없는 요청별 IPC 채널로 실제 명찰 처리 개수와 고정 단계만 전달합니다. 화면에는 현재 단계와 경과 시간이 표시되며 전체 작업의 가짜 백분율을 만들지 않습니다. 명찰 구성 뒤 PDF 압축·마무리·파일 저장이 남아 있습니다. 저장 중 편집·다른 미리보기·이전 이동을 비활성화합니다.

미리보기 PDF는 JSON 숫자 배열 대신 바이너리로 전달합니다. PDF.js 페이지 표시 진행 상황도 보여줍니다. 미리보기 파일을 디스크에 남기지 않습니다.

동일한 가상 참가자 150명과 372×496 뒷면 이미지를 사용한 Linux headless debug 측정에서 v1.4.2 대비 약 11.5→3.1초, 90.4→7.3MB PDF, 367→51MiB 최대 메모리를 관측했습니다. PC·이미지·저장 장치에 따라 시간은 달라집니다. 대표 페이지의 이전/새 PDF 렌더링은 픽셀이 일치했고, 별도로 4,000×3,000 원본 이미지가 150명/75쪽에서 한 번만 포함되는 것을 검사합니다.

## 소속 표시 일괄 편집

명찰의 소속을 더블클릭해 Enter로 줄바꿈을 넣고 ‘같은 소속 N명에 적용’ 또는 ‘이 참가자만 적용’을 선택합니다. 앞면 텍스트 설정의 ‘소속별 일괄 편집’은 인원수, 검색, 여러 소속의 동시 적용과 원래 표시 복원을 제공합니다. 오류가 있으면 부분 적용하지 않습니다.

그룹은 원래 소속을 NFC 정규화하고 연속 공백·줄바꿈을 한 칸으로 합친 기준입니다. 기관이 같아도 동아리명이 다르면 구분하고 빈 소속은 제외합니다. 현재 선택 인원에게만 적용하며 나중에 추가한 사람에게 자동 전파하지 않습니다. 개인별 예외는 이후 명시적인 일괄 적용으로 대체됩니다.

기존 참가자별 명찰 표시를 재사용하고 이름·디자인을 보존합니다. 복원은 소속 표시와 소속의 예전 줄바꿈만 지웁니다. 명단 원본·보관 명단·두 XLSX에는 반영하지 않으며, 참가자별 문구는 템플릿·설정·로그에 저장하지 않습니다. 각 창의 취소와 명찰 편집기 전체 취소 범위를 구분합니다.

## 명찰 규격과 접이식 출력

새 작업과 규격 버튼의 한 면은 세로 **93×124mm**, 가로 **124×93mm**입니다. 접이식 펼침은 각각 **186×124mm**, **248×93mm**로 한 면의 폭에서 파생됩니다. 세로형 접이식은 A4 세로(210×297mm), 가로형 접이식은 A4 가로(297×210mm)에 **최대 2명/페이지**를 배치합니다. 명찰을 페이지에 맞춰 축소하지 않습니다.

기존 90×60mm 템플릿은 원래 크기와 좌표로 열립니다. 가로형/세로형 규격 버튼을 직접 눌렀을 때만 새 표준을 적용합니다. 앞면만의 A4 배치 계산은 기존 방식이며, 기존 90×60mm는 8명/페이지, 93×124mm는 4명/페이지, 새 124×93mm는 2명/페이지입니다.

`src/badge-sizes.json`을 앱 TypeScript와 Rust가 같이 읽습니다. 편집기는 이미지가 없어도 두 면 전체를 같은 비율로 표시합니다. 편집 면 버튼은 대상을 선택하고 캔버스를 교체하지 않습니다. 접는 선은 한 면의 실제 폭에서 계산합니다. 앞면 디자인/뒷면 디자인에서 배경색·배경 이미지·맞춤을 대칭적으로 편집합니다. 이미지와 PDF는 면의 경계에서 clipping하며, 편집기의 면 이름·규격·강조 표시는 PDF 콘텐츠가 아닙니다.

PNG/JPG/JPEG/WebP 이미지 한 장을 모든 참가자의 뒷면으로 사용합니다. 영역 채우기(기본)와 전체 이미지 맞춤을 지원합니다. 전체 외곽은 재단선, 가운데 옅은 점선은 접는 선입니다. 한 면에 100% 실제 크기로 출력하고 뒤로 접습니다. 프린터 duplex 양면 인쇄 기능이 아닙니다. 템플릿에 뒷면 설정이 없으면 앞면만으로 열립니다.

기존 이미지는 예전 버전의 실제 앱/결과물 촬영본이며 새 기능 화면을 촬영한 것처럼 표시하지 않습니다. 전체 스크린샷 재촬영 없이 기능 설명만 추가했습니다. 새로운 촬영본을 받는 경우 원본 UI·내용을 임의로 바꾸지 말고 `assets/manifest.json`의 크롭·해상도·용량과 실제 파일을 함께 검토하세요. 이 저장소에 없는 촬영/변환 스크립트가 있다고 가정하지 마세요.

## 검증 항목과 제한

- 1440/768/390/320px: 가로 넘침, 이미지 로딩, 6개 탭과 선택 상태.
- 키보드 방향키/Home/End, 확대 모달/Escape/포커스 복귀.
- 움직임 줄이기 설정의 정지 이미지와 JavaScript를 끈 다운로드 링크.
- 실제 최신 버전·업데이트 날짜·Release asset URL, HTTP 404와 JavaScript 오류.
- 홈페이지 다운로드 ZIP과 검증한 Windows 빌드 ZIP의 SHA-256 일치.
- 기존 릴리스·태그의 ID/SHA와 자산 ID·크기 보존.

앱의 Rust 테스트는 PDF 배치·이미지 방향·fit·재단선/접는 선·템플릿·기존 출력 회귀를 검증합니다. 비대칭 fixture로 PDF 렌더링도 확인합니다. 클라우드에서는 실제 프린터 출력과 종이를 접는 물리 검증을 대신할 수 없으므로 목표 프린터에서 첫 장을 확인하세요. Windows 설치 EXE의 전체 수동 설치/GUI 흐름도 자동 검증했다고 간주하지 않습니다.

명단 로컬 처리는 설치된 Windows 앱의 기능입니다. 브라우저 데모는 파일 생성 기능을 제공하지 않습니다. 공개 페이지와 설치 파일 다운로드에는 인터넷이 사용되며, WebView2가 없는 PC에는 설치 중 추가 다운로드가 필요할 수 있습니다.

## v1.4.0 배포 검증 기록

- 프런트엔드 44개 테스트, TypeScript/Vite 빌드 통과.
- Windows Rust 16개 테스트 통과: https://github.com/youthgreen/Attendance/actions/runs/40474831194 (앱 저장소 접근 권한 필요).
- Windows NSIS 빌드 및 앱/설치 EXE ProductVersion 1.4.0 확인: https://github.com/youthgreen/Attendance/actions/runs/40474877976.
- 사이트 Release 게시 성공: https://github.com/youthgreen/youthgreen.github.io/actions/runs/40477844402.
- 사이트 공개 ZIP을 실제 다운로드해 검증한 빌드 ZIP과 SHA-256 일치를 확인했습니다.
- ZIP SHA-256: `aa7824c1efeb8d3253c88fd1307fbc9428330b212cc1a67b9a0778c4c6ff4247` (4,772,196바이트).
- 앱 UI에서 Rust 생성기와 PDF.js를 연결해 5명/3쪽의 실제 PDF 렌더링을 확인했습니다. 기존 앞면 생성기의 출력 명령도 가로/세로 규격에서 v1.3.4와 일치했습니다.

## v1.4.1 검증 방식

- 93×124 / 124×93mm 앞면과 186×124 / 248×93mm 펼침의 실제 PDF 좌표를 ±0.2mm 이하로 확인합니다.
- MediaBox의 A4 세로/가로 크기, 두 면의 clipping 사각형, 재단 외곽, 접는 x 위치를 실제 출력 명령에서 읽습니다.
- 브라우저에서 앞/뒤 면의 같은 픽셀 크기, 틈 없는 접합과 접는 선 중심, 세로→가로→세로 전환, 빈 뒷면, 창 크기에 따른 단일 배율을 확인합니다.
- 정사각형/가로/세로 이미지와 4000×3000 이미지가 물리 규격을 변경하지 않는지 확인합니다.
- 사용자 확인에 따라 구형 90×60mm 템플릿은 변환하지 않습니다.

## v1.4.1 배포 검증 기록

- 앱 소스: c435f6405deb537372bb62adb96841f01f23ef3e. 기존 템플릿의 90×60mm 유지 정책을 사용자에게 확인했습니다.
- Windows 프런트엔드 48개 테스트, Rust 18개 테스트가 통과했습니다. 실패/건너뜀은 0개입니다.
- Windows CI: https://github.com/youthgreen/Attendance/actions/runs/40482316282.
- Windows NSIS 빌드 및 앱/설치 EXE 버전 1.4.1 확인: https://github.com/youthgreen/Attendance/actions/runs/40482319773.
- 공개 ZIP 게시: https://github.com/youthgreen/youthgreen.github.io/actions/runs/40484733539.
- 임시 중계 커밋: dc451af1ab6b1d42eefca6aded52ddd432dfad84. 이후 홈페이지 반영 시 임시 ZIP을 제거했습니다.
- 공개 Release ZIP을 내려받아 검증한 Windows 빌드 ZIP과 일치함을 확인했습니다.
- ZIP SHA-256: `f35a6ae8d99489056b78b6c0fd473190d7536c808e6804b4331ee73c74b74d13` (4,779,074바이트).

## v1.4.2 배포 검증 기록

- 앱 소스: `5a7bd30b11bbe56e5ce1344c01d719b169ae73cc`. v1.4.1을 기준으로 소속 표시 일괄 편집을 추가했습니다.
- Windows 프런트엔드 68개, Rust 21개 테스트 통과. 실패·건너뜀은 0개입니다.
- Windows CI: https://github.com/youthgreen/Attendance/actions/runs/40494325532.
- Windows NSIS 빌드 및 앱/설치 EXE 버전 1.4.2 확인: https://github.com/youthgreen/Attendance/actions/runs/40494342869.
- 공개 ZIP 게시: https://github.com/youthgreen/youthgreen.github.io/actions/runs/40496773713.
- 임시 중계 커밋: `5a64da44da9121b6aa99c80f4de38849f1370ba6`. 공개 ZIP 검증 후 홈페이지 변경과 함께 임시 ZIP을 제거했습니다.
- 실제 화면에서 가상 참가자 150명/소속 5개(32·24·30·34·30명)의 편집, 개별 예외 대체, 오류 시 미적용, 템플릿 제외와 새 명단 초기화를 확인했습니다. 실제 Rust PDF의 75쪽을 PDF.js로 모두 표시하고 전원 문구·줄바꿈 및 XLSX/PDF 파일 생성을 확인했습니다.
- Rust는 앞면만/접이식 × 세로/가로 네 조합에서 150명 전체의 PDF 글리프와 두 줄 좌표, 두 XLSX XML의 기존 출력 일치, 템플릿의 참가자별 문구 제거를 검사합니다. v1.4.1의 실제 규격·구형 템플릿 테스트도 유지했습니다.
- 공개 Release ZIP을 직접 내려받아 검증한 Windows 빌드 ZIP과 SHA-256 일치를 확인했습니다.
- ZIP SHA-256: `3c336f9bb28f77027d6e0a813d164787616e6aa2aa441b44cc5575bcef68339e` (4,784,265바이트).

## v1.4.5 배포 검증 기록

- 앱 소스: `8f91e974751e6f3d05d19aab33523d5a3c2cc893`.
- Windows 프런트엔드 72개·Rust 25개 테스트 통과. 실패·건너뜀 0개.
- Windows CI: https://github.com/youthgreen/Attendance/actions/runs/40505395880.
- Windows NSIS 빌드와 앱/설치 EXE 버전 1.4.5 확인: https://github.com/youthgreen/Attendance/actions/runs/40505399158.
- 공개 ZIP 게시: https://github.com/youthgreen/youthgreen.github.io/actions/runs/40508089300.
- 임시 중계 커밋: `7c8dd19981c95c80ff575bd3400ba9e93f471d42`. 공개 ZIP 검증 후 홈페이지 변경과 함께 임시 ZIP을 제거했습니다.
- 실제 Rust 생성기와 Chromium 화면을 연결해 150명·원래 372×496 뒷면 이미지로 75쪽 표시, 요청별 실제 진행 알림, 경과 시간, 저장 중 조작 비활성화, XLSX/PDF 파일 생성과 새 명단 초기화를 확인했습니다. Windows 수동 설치·전체 GUI 검증과 구분합니다.
- 추가 Rust 회귀: 150명에 동일 이미지 객체 1개 공유, 12MP/150명 저장, 원본 RGB/투명도 바이트 보존, 실제 개수 증가 뒤 마무리·저장 단계. 기존 소속 일괄 편집·실제 규격·이전 템플릿·엑셀·원본 보호 테스트도 유지했습니다.
- 공개 ZIP을 내려받아 검증한 Windows 빌드와 SHA-256 일치를 확인했습니다.
- ZIP SHA-256: `f21480d852c3db5b62a2f38bb5b9caef9101fa17af7a6b43bd9449bb876a9a6b` (4,795,279바이트).

앱의 v1.4.3·v1.4.4 태그는 미게시 빌드 검증 시도로 보존합니다. 설치 파일은 게시되지 않았으며 태그를 덮어쓰지 않습니다. 최종 배포본은 v1.4.5입니다.
