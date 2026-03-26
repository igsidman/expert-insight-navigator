# Expert Insight Navigator

GitHub 업로드 및 Vercel 배포를 위한 Vite + React 기본 프로젝트입니다.

## 1) 현재 필요한 작업
이 프로젝트의 `src/App.jsx` 파일에는 임시 안내 화면이 들어 있습니다.
대화 오른쪽 캔버스에 있는 최종 React 코드를 복사해서 `src/App.jsx`에 붙여넣으면 완성됩니다.

## 2) 설치
```bash
npm install
```

## 3) 로컬 실행
```bash
npm run dev
```

## 4) 빌드
```bash
npm run build
```

## 5) GitHub 업로드
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/expert-insight-navigator.git
git push -u origin main
```

## 6) Vercel 배포
- GitHub 저장소를 Vercel에 연결
- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist
