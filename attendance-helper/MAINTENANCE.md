# 출석부 도와줘 상세페이지 운영

실제 공개 페이지: https://youthgreen.github.io/attendance-helper/

## 저장소 구분

- 이 사이트: `youthgreen/youthgreen.github.io`, `attendance-helper/index.html`.
- 앱: `seoeum1711-jpg/Attendance`, React/Tauri/Rust, 현재 검증 버전 1.3.2.
- 분석 기준: 사이트 `87b0a064eaad529433a775317507bfff678b7532`, 앱 `55654c7ed96140b5a3f967a79f99cee0d8fdc1c9`.
- 변경 전 공개 HTML과 사이트 파일을 비교했고 줄바꿈 외 차이는 없었습니다.

## 구조와 배포

HTML + CSS + 작은 바닐라 JavaScript + 로컬 WebP/GIF로 구성됩니다. 프로덕션 빌드 단계, 외부 폰트, CDN, 분석 도구, GitHub API 요청이 없습니다. 기존 GitHub Pages의 `/attendance-helper/` 경로를 유지합니다.

페이지와 함께 `styles.css`, `page.js`, `assets/`를 배포해야 합니다. 홈페이지와 개인정보처리방침의 파일은 변경하지 않았습니다. Pages 원본 브랜치·폴더 설정은 GitHub 설정에서 확인해야 하며, 이번 작업에서 원격 설정이나 라이브 배포를 변경하지 않았습니다.

다운로드 링크는 실제 존재하는 v1.3.2 `Attendance-Helper-V1.3.2-Online.zip`입니다. 새 릴리스 때 `index.html`의 다운로드 URL, 릴리스 URL, 버전·날짜·용량을 함께 갱신하고 `tools/verify.mjs`의 기대값도 바꾸세요. 기존 다운로드 횟수 조회는 잘못된 v1.2 오프라인 파일을 찾고 있어 제거했습니다. 다운로드 링크는 JavaScript가 없어도 동작합니다.

## 화면 재촬영

1. 앱 저장소의 `docs/promotion-demo.md`를 따라 PNG 9장과 WebM 원본을 촬영합니다.
2. 같은 fixture로 앱의 실제 Rust 생성기를 실행해 XLSX 2개와 PDF 1개를 만듭니다.
3. PDF를 `pdftoppm -scale-to 1800 -png -singlefile ... 10-badge-pdf`로 렌더링하여 PNG 옆에 둡니다.
4. 이 저장소 루트에서 다음을 실행합니다.

```powershell
npm ci
$env:PROMOTION_ASSET_DIR = 'C:/absolute/capture/folder'
npm run assets
npm run preview
# 미리보기 서버 실행 후, 별도 터미널에서 움직이는 이미지 생성
npm run gif
# 별도 터미널
npm test
```

`tools/prepare-assets.mjs`는 실제 이미지를 리사이즈·크롭하여 WebP로 변환합니다. 원본 UI의 글자·기능·상태를 바꾸지 않습니다. `assets/manifest.json`은 해상도, 용량, 크롭 범위를 기록합니다. 촬영 크기를 바꾸면 크롭 좌표도 검토해야 합니다.

## 표현과 접근성

- 움직이는 이미지: 실제 녹화본에서 추출한 60프레임, 640×430, 7fps, GIF 846,813바이트. 영상 컨트롤 없이 자동 반복됩니다.
- 모션 줄이기 설정에서는 GIF 대신 실제 명단 확인 정지 화면을 표시합니다. JavaScript를 끄더라도 GIF 또는 정지 화면과 단계별 이미지가 표시됩니다.
- 단계 버튼: 화살표/Home/End 키, ARIA 선택 상태. 이미지 확대: 모달, Escape, 포커스 복귀. 원본 이미지 링크도 유지합니다.
- 브라우저 UI에는 실제 파일 생성이 없습니다. 저장 완료를 촬영한 것처럼 표현하지 않습니다.
- 출석부/식비명단 이미지는 실제 앱 인쇄 미리보기입니다. 명찰 이미지는 실제 생성 PDF를 렌더링했습니다.
- 가상 참가자 6명 중 5명을 선택하는 예시를 촬영한 뒤 모두 다시 선택했습니다. 결과물 3종은 동일한 6명 기준입니다.
- Windows 저장 폴더 대화상자·설치 EXE의 전체 GUI 흐름은 자동화 검증하지 않았습니다. Rust 출력 기능은 별도로 직접 실행했습니다.
- 로컬 처리 설명은 Windows 앱의 명단 처리를 의미합니다. 웹페이지와 설치 파일 다운로드에는 인터넷을 사용하며, WebView2가 없는 PC는 설치 시 추가 다운로드가 필요할 수 있습니다.

## 용량

최적화 WebP 12개 약 476KB, GIF 약 847KB입니다. 페이지는 PDF 원본, WebM 원본, 앱 번들을 로드하지 않습니다. 가상 명찰 PDF 원본은 현재 생성기의 글꼴 포함 방식으로 약 40.3MB이며, 페이지에는 약 36KB의 렌더링 WebP만 사용합니다. PDF 글꼴 포함 용량 최적화는 별도 앱 개선 과제입니다.

## 검증

`npm test`는 1440/768/390/320px에서 6개 탭, 가로 넘침, 이미지 로딩, 확대/Escape/포커스 복귀, 다운로드/앵커, JavaScript 비활성화, 모션 줄이기 정지 화면, 60프레임 GIF, 요청 문구 삭제, 기존 푸터 복원, 리소스 오류·외부 요청을 확인합니다. 결과 JSON과 화면은 `outputs/qa/`에 저장됩니다. Node 도구는 배포 시 실행할 필요가 없습니다.
