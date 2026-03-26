import React, { useMemo, useState } from "react";
import { Search, MapPin, Mail, Building2, Filter, UserRound, ExternalLink, Compass, Sparkles, BookOpen, Tag, CalendarDays, Info, MessageSquare, Send, Bot } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ className = "", children }) {
  return <div className={cn("rounded-[28px] border border-[#D6E4FF] bg-white shadow-sm", className)}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <h3 className={cn("text-lg font-semibold text-[#111827]", className)}>{children}</h3>;
}

function CardDescription({ className = "", children }) {
  return <p className={cn("text-sm text-[#64748B]", className)}>{children}</p>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={cn(
        "w-full border border-[#D6E4FF] bg-white text-sm text-[#111827] outline-none transition placeholder:text-[#94A3B8] focus:border-[#8BB8FF] focus:ring-2 focus:ring-[#D6E4FF]",
        className
      )}
    />
  );
}

function Badge({ className = "", variant = "secondary", children }) {
  const variants = {
    secondary: "bg-[#EEF4FF] text-[#0B2A5B] border border-transparent",
    outline: "bg-white text-[#334155] border border-[#D6E4FF]",
  };
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", variants[variant] || variants.secondary, className)}>{children}</span>;
}

function Button({ className = "", variant = "default", asChild = false, children, ...props }) {
  const variants = {
    default: "bg-[#041E42] text-white border border-[#041E42] hover:bg-[#0B2A5B]",
    outline: "bg-white text-[#0B2A5B] border border-[#8BB8FF] hover:bg-[#F5F8FF]",
    ghost: "bg-transparent text-[#334155] border border-transparent hover:bg-[#F5F8FF]",
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
        variants[variant] || variants.default,
        className,
        children.props.className || ""
      ),
    });
  }

  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </button>
  );
}

function Tabs({ defaultValue, className = "", children }) {
  const childrenArray = React.Children.toArray(children);
  const [value, setValue] = useState(defaultValue);
  return <div className={cn(className)}>{childrenArray.map((child) => React.isValidElement(child) ? React.cloneElement(child, { tabsValue: value, setTabsValue: setValue }) : child)}</div>;
}

function TabsList({ className = "", children, tabsValue, setTabsValue }) {
  return <div className={cn(className)}>{React.Children.map(children, (child) => React.isValidElement(child) ? React.cloneElement(child, { tabsValue, setTabsValue }) : child)}</div>;
}

function TabsTrigger({ value, className = "", children, tabsValue, setTabsValue }) {
  const active = tabsValue === value;
  return (
    <button
      type="button"
      onClick={() => setTabsValue?.(value)}
      className={cn(
        "px-4 py-2 text-sm font-medium transition",
        active ? "bg-[#041E42] text-white shadow-sm" : "text-[#475569] hover:bg-white",
        className
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, className = "", children, tabsValue }) {
  if (tabsValue !== value) return null;
  return <div className={cn(className)}>{children}</div>;
}

function Select({ value, onValueChange, children }) {
  return React.Children.map(children, (child) => React.isValidElement(child) ? React.cloneElement(child, { value, onValueChange }) : child);
}

function SelectTrigger({ className = "", children, value }) {
  const label = React.Children.toArray(children).find((child) => React.isValidElement(child) && child.type === SelectValue);
  const iconChildren = React.Children.toArray(children).filter((child) => !(React.isValidElement(child) && child.type === SelectValue));
  return (
    <div className={cn("flex h-12 items-center rounded-full border border-[#D6E4FF] bg-white px-4 shadow-sm", className)}>
      {iconChildren}
      <span className="ml-2 text-sm text-[#111827]">{label?.props?.placeholder || value}</span>
    </div>
  );
}

function SelectValue() {
  return null;
}

function SelectContent({ children, value, onValueChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="mt-2 h-12 w-full rounded-full border border-[#D6E4FF] bg-white px-4 text-sm text-[#111827] shadow-sm outline-none focus:border-[#8BB8FF] focus:ring-2 focus:ring-[#D6E4FF]"
    >
      {React.Children.map(children, (child) => React.isValidElement(child) ? React.cloneElement(child) : child)}
    </select>
  );
}

function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

function ScrollArea({ className = "", children }) {
  return <div className={cn("overflow-y-auto", className)}>{children}</div>;
}

function Separator({ className = "" }) {
  return <div className={cn("h-px w-full bg-[#E2E8F0]", className)} />;
}

const experts = [
  { name: "백종환", field: "공간/인테리어", org: "WGNB", role: "대표", email: "kong-zone@hanmail.net", tags: ["플래그십", "브랜드 공간", "럭셔리 주거"], summary: "도산공원 준지 플래그십 스토어, 써밋 갤러리, 덱스터 스튜디오 등 브랜드 경험형 공간 프로젝트를 진행한 공간 디렉터.", relatedPlaces: ["준지 플래그십 스토어", "도산공원"] },
  { name: "심희준, 박수정", field: "공간/인테리어", org: "건축공방", role: "대표", email: "office@archiworkshop.kr", tags: ["건축", "공동주거", "공공성"], summary: "KT 광화문 사옥, 캠프통 아일랜드 청평, 백사마을 프로젝트를 수행했고 2019 젊은 건축가상을 수상한 건축가 팀.", relatedPlaces: ["건축공방 연희 사옥", "KT 광화문 사옥"] },
  { name: "이동일", field: "공간/인테리어", org: "스튜디오 언라벨", role: "대표", email: "cco@studiounravel.com", tags: ["브랜딩", "카페 공간", "리테일"], summary: "공간과 브랜딩을 함께 설계하는 크리에이티브 디렉터.", relatedPlaces: ["테르트르 카페"] },
  { name: "서승모", field: "공간/인테리어", org: "사무소효자동", role: "대표", email: "j@samusohyojadong.com", tags: ["동양적 미감", "주거", "전시"], summary: "동경예술대학 미술학 석사 출신으로 동양적 분위기를 현대적으로 풀어내는 건축 프로젝트를 진행.", relatedPlaces: ["막집", "온그라운드"] },
  { name: "유현준", field: "공간/인테리어", org: "유현준 건축사사무소", role: "대표 건축가", email: "yoo@hyunjoonyoo.com", tags: ["건축", "공간 인문학", "도시"], summary: "스페이스 컨설팅 그룹 대표이자 대중적 공간 인문학 담론을 이끄는 건축가.", relatedPlaces: [] },
  { name: "민성진", field: "공간/인테리어", org: "SKM 건축사무소", role: "대표", email: "yc.hwang@skma.com", tags: ["리조트", "하이엔드", "브랜드 건축"], summary: "아난티 코브, 아난티 남해, 아난티 앳 강남 등 아난티 주요 프로젝트를 맡아온 건축가.", relatedPlaces: ["민성진 아난티 펜트하우스 서울"] },
  { name: "조병수", field: "공간/인테리어", org: "조병수건축연구소", role: "대표", email: "bchoarch@gmail.com", tags: ["건축 거장", "막의 미", "문화 공간"], summary: "Architectural Record 선정 세계의 선도적 건축가 11인 중 한 명으로, 절제된 한국적 건축을 보여주는 건축가.", relatedPlaces: ["온그라운드", "황인용 뮤직스페이스 카메라타"] },
  { name: "양수인", field: "공간/인테리어", org: "삶것건축사사무소", role: "대표", email: "s@lifethings.in", tags: ["증축", "복합시설", "재생건축"], summary: "컬럼비아대 석사 출신으로 공동 건축주, 라이프스타일, 재생 건축을 결합한 프로젝트를 진행.", relatedPlaces: ["Cosmo 40", "삶것 건축사무실 상수 사옥"] },
  { name: "최인아", field: "크리에이티브 디렉터", org: "최인아책방", role: "대표", email: "inabooksna@naver.com", tags: ["브랜드", "책방", "콘텐츠 큐레이션"], summary: "전 제일기획 부사장으로, 책방과 문화 프로그램을 통해 지적 영감을 제공하는 크리에이티브 리더.", relatedPlaces: ["최인아 책방"] },
  { name: "전은경", field: "크리에이티브 디렉터", org: "Magazine C", role: "디렉터", email: "hello2lilith@gmail.com", tags: ["디자인 매거진", "전시 기획", "큐레이션"], summary: "월간 디자인 편집장 출신으로 전시와 디자인 담론을 기획해온 디렉터.", relatedPlaces: [] },
  { name: "한명수", field: "크리에이티브 디렉터", org: "우아한형제들", role: "CCO", email: "mshan@woowahan.com", tags: ["브랜드", "UX", "콘텐츠 전략"], summary: "SK플래닛, SK커뮤니케이션즈를 거쳐 우아한형제들 CCO를 맡고 있는 브랜드/UX 리더.", relatedPlaces: [] },
  { name: "여인택", field: "브랜딩", org: "피치스그룹코리아", role: "대표", email: "-", tags: ["자동차 라이프스타일", "문화 브랜딩", "성수"], summary: "자동차를 넘어서 문화를 만드는 라이프스타일 브랜드를 운영하며 콘텐츠와 커뮤니티를 결합.", relatedPlaces: ["피치스 성수"] },
  { name: "박지현", field: "브랜딩", org: "익선다다", role: "대표", email: "jh.park@iksundada.com", tags: ["도시 콘텐츠", "거리 재생", "IP"], summary: "익선동, 소제동 등 오래된 지역에 새로운 콘텐츠와 이야기를 입혀 장소성을 재창조한 기획자.", relatedPlaces: ["익선동 한옥거리"] },
  { name: "김재원", field: "브랜딩", org: "아틀리에 에크리튜", role: "대표", email: "ecriture.project@gmail.com", tags: ["성수", "공간 브랜드", "오브제"], summary: "성수동의 공간 브랜드와 문화 흐름을 디자인하는 기획자.", relatedPlaces: [] },
  { name: "김현종", field: "브랜딩", org: "백야드빌더", role: "대표", email: "stylebymj@naver.com", tags: ["바이크", "커뮤니티", "라이프스타일"], summary: "백야드빌더 성수점과 상수점을 운영하며 취향 공동체 중심의 공간 브랜드를 만든 대표.", relatedPlaces: ["백야드빌더 성수", "백야드빌더 온어스 상수"] },
  { name: "이승재", field: "스토리텔링", org: "아이디엇", role: "대표", email: "ideot@ideot.co.kr", tags: ["광고", "발상법", "콘텐츠"], summary: "토탈 마케팅 기획 전문가이자 광고제 심사위원 경력을 가진 스토리텔링 전문가.", relatedPlaces: [] },
  { name: "박근호", field: "미디어아트", org: "사일로랩", role: "대표", email: "silo.laboratory@gmail.com", tags: ["미디어 파사드", "인터랙티브", "공간 연출"], summary: "백화점, 타워, 브랜드 팝업에서 LED와 인터랙티브 콘텐츠를 활용한 공간 연출을 진행.", relatedPlaces: [] },
  { name: "김세규", field: "버추얼 콘텐츠/AI", org: "비브 스튜디오스", role: "대표", email: "eunice@vivestudios.com", tags: ["버추얼 프로덕션", "XR", "AI"], summary: "버추얼 프로덕션 시장을 개척하며 홀로그램과 실감형 콘텐츠 구현을 이끌어온 대표.", relatedPlaces: ["비브 스튜디오"] },
  { name: "김용주", field: "전시공간 기획", org: "국립현대미술관", role: "전시기획관", email: "cocoyj80@gmail.com", tags: ["전시", "미술관", "공간 기획"], summary: "MMCA 전시공간 기획관으로 미술관, 박물관, DDP 자문 등 전시 환경을 설계해온 전문가.", relatedPlaces: ["국립현대미술관", "김용주 국립현대미술관"] },
  { name: "유나리", field: "NFT 아트 전시 및 기획", org: "서울옥션블루", role: "이사", email: "nryu@seoulauctionblue.com", tags: ["디지털 아트", "NFT", "경매"], summary: "XXBLUE에서 디지털 아트 프로젝트, NFT 전시, 경매를 기획하는 디렉터.", relatedPlaces: ["서울옥션 강남센터"] },
  { name: "김상균", field: "메타버스", org: "경희대 경영대학원", role: "교수", email: "saviour@khu.ac.kr", tags: ["메타버스", "게임", "미래 트렌드"], summary: "메타버스와 게임 문화, 인재개발을 연결해 연구하는 교수.", relatedPlaces: [] },
  { name: "이희진", field: "공간 디자인", org: "Patricia Urquiola studio Korea", role: "한국 지사장", email: "heejin.lee@sonolee.com", tags: ["리빙관", "주거 체험", "하이엔드"], summary: "신세계 강남 리빙관과 래미안 갤러리 등 감각적인 라이프스타일 공간을 담당.", relatedPlaces: ["신세계 강남점 리빙관", "래미안 갤러리"] },
  { name: "정구호", field: "패션 디자이너", org: "INDF", role: "크리에이티브 디렉터", email: "homilldesign@gmail.com", tags: ["패션", "무대미술", "전시"], summary: "패션브랜드 KUHO를 런칭하고 영화·무대·전시의 미술감독으로도 활동한 크리에이티브 디렉터.", relatedPlaces: ["리움미술관"] },
  { name: "조화성", field: "영화 미술", org: "화성공작소", role: "대표", email: "joart@hanmail.net", tags: ["영화 미술", "세트", "디렉팅"], summary: "친절한 금자씨, 한산 등 다수 작품의 미술 디렉팅을 맡은 영화 미술감독.", relatedPlaces: [] },
  { name: "고기영", field: "조명/빛 디자인", org: "비츠로앤파트너스", role: "대표", email: "kky@bitzro.co.kr", tags: ["라이팅", "경복궁", "공공 프로젝트"], summary: "한국 1세대 조명 디자이너로 건축 조명과 공공공간 라이팅 프로젝트를 수행.", relatedPlaces: ["남양 성모성지"] },
  { name: "윤광준", field: "오디오", org: "윤광준사진", role: "대표", email: "yooniz@naver.com", tags: ["오디오", "사진", "칼럼"], summary: "사진작가이자 오디오 평론가로, 좋은 소리와 공간 경험을 함께 이야기하는 전문가.", relatedPlaces: ["오드메종", "황인용 뮤직스페이스 카메라타"] },
  { name: "류성희", field: "공간 디자인", org: "영화 미술감독", role: "미술감독", email: "-", tags: ["영화", "공간 미감", "아트 디렉션"], summary: "영화 아가씨, 헤어질 결심 미술감독으로 강한 미장센 감각을 보여준 전문가.", relatedPlaces: [] },
  {
  name: "윤소연",
  field: "공간/인테리어",
  org: "아파트멘터리",
  role: "공동대표",
  email: "mintshampoo@naver.com",
  tags: ["셀프 인테리어", "주거", "컨설팅"],
  summary: "개인화된 집은 개인의 스토리가 반영된 공간이라는 관점에서 출발하며, 인테리어 시장의 정보 비대칭과 불안 문제를 해결하기 위해 End-to-End 표준화와 가격 투명화를 구현하고, 고객 데이터 기반 맞춤형 서비스를 확장하는 인사이트를 제시함.",
  insights: [
    "집은 획일적 공간이 아니라 개인의 삶과 스토리가 반영된 개인화된 공간이어야 함",
    "불투명한 인테리어 시장은 End-to-End 프로세스와 가격 투명화로 해결해야 함",
    "데이터 기반 맞춤형 옵션과 서비스 확장이 핵심 경쟁력"
  ],
  docUrl: "https://caramel-hoodie-ee4.notion.site/32c5ebd36d40808495def7173e7bf6f0",
  relatedPlaces: ["아파트멘터리", "아크리니아", "유앤어스 학동역 쇼룸"]
},
  { name: "최진영", field: "공간/인테리어", org: "아파트멘터리", role: "공동대표", email: "mason@apartmentary.com", tags: ["주거", "쇼룸", "소재"], summary: "고객 맞춤형 인테리어 컨설팅과 쇼룸 경험을 운영하는 대표.", relatedPlaces: ["아파트멘터리"] },
  { name: "김찬중", field: "건축 디자인", org: "더 시스템 랩", role: "대표", email: "tsl@thesystemlab.com", tags: ["건축", "성수", "복합시설"], summary: "하버드 GSD 출신 건축가로 성수 일대의 브랜드/업무 복합시설을 설계해온 대표.", relatedPlaces: ["우란문화재단", "코너 25 성수", "팩토리얼 성수"] },
  { name: "박길종", field: "공간/가구 디자인", org: "길종상가", role: "대표", email: "bellroad15@naver.com", tags: ["가구", "공간 브랜딩", "오브제"], summary: "에르메스 쇼윈도우, 애쉬빌 베이커리, 뒷동산, 근정전 등을 디자인한 공간/가구 디자이너.", relatedPlaces: ["길종상가 사무실", "애쉬빌 베이커리 카페", "공간 뒷동산"] },
  { name: "최주연", field: "공간 디자인", org: "윤현상재", role: "대표", email: "spacebecoming@gmail.com", tags: ["쇼룸", "타일", "큐레이션"], summary: "윤현상재 대표이자 건국대 겸임교수로, 머티리얼 기반 공간 영감을 제안.", relatedPlaces: ["윤현상재 본사", "윤현상재 머티리얼 라이브러리"] },
  { name: "양태오", field: "공간 디자인", org: "테오양스튜디오", role: "대표", email: "info@teoyangstudio.com", tags: ["제품 브랜딩", "하이엔드", "공간"], summary: "공간과 제품 브랜딩을 넘나드는 감각적인 디렉터.", relatedPlaces: [] },
  { name: "장희영", field: "한식", org: "장토푸컴퍼니", role: "대표", email: "-", tags: ["한식", "푸드투어", "외국인 관광"], summary: "외국인 관광객에게 한식 쿠킹클래스와 푸드투어를 제공하는 미식 관광 기획자.", relatedPlaces: [] },
  { name: "전미영", field: "트렌드_소비자", org: "서울대학교", role: "연구교수", email: "jemma81@snu.ac.kr", tags: ["소비자행동", "트렌드", "트렌드코리아"], summary: "서울대 소비트렌드분석센터 수석연구원으로 소비자 행동과 트렌드 분석의 전문가.", relatedPlaces: [] },
  { name: "김난도", field: "트렌드_소비자", org: "서울대학교", role: "교수", email: "rando@snu.ac.kr", tags: ["트렌드", "소비자", "저술"], summary: "트렌드 코리아 시리즈로 잘 알려진 소비자 트렌드 권위자.", relatedPlaces: [] },
  { name: "김용섭", field: "트렌드 연구", org: "날카로운 상상력 연구소", role: "소장", email: "trendhitchhiking@gmail.com", tags: ["비즈니스 트렌드", "창의력", "전략"], summary: "라이프 트렌드 시리즈를 집필해온 트렌드 분석가이자 전략 컨설턴트.", relatedPlaces: [] },
  { name: "설채현", field: "수의학", org: "놀로 행동클리닉", role: "원장", email: "-", tags: ["동물행동", "수의학", "반려동물"], summary: "동물행동 전문가이자 방송과 유튜브를 통해 반려동물 행동을 알리는 수의사.", relatedPlaces: [] },
  { name: "박근하", field: "공간/가구 인테리어", org: "루밍(Rooming)", role: "대표", email: "hello@rooming.co.kr", tags: ["리빙 편집숍", "가구", "큐레이션"], summary: "국내 대표 리빙 편집숍 루밍을 운영하며 가구와 생활 소품의 큐레이션을 선보이는 대표.", relatedPlaces: ["루밍(Rooming)"] },
  { name: "오승욱", field: "공간/인테리어", org: "무아공간", role: "대표", email: "contact@muaspace.kr", tags: ["자아", "홈스타일링", "인문학"], summary: "공간을 통해 자아를 찾는 과정을 돕는 인테리어/건축/예술 융합형 서비스를 운영.", relatedPlaces: [] },
  { name: "최문규", field: "트렌드_IT", org: "나의 시선", role: "블로그/유튜브 운영", email: "coolmoonchoi@gmail.com", tags: ["IT 리뷰", "디자인", "컨설팅"], summary: "전 아이리버·삼성전자 경력을 바탕으로 IT 디자인 리뷰와 컨설팅을 진행.", relatedPlaces: [] },
  { name: "최범", field: "디자인 평론/미학", org: "디자인 평론가", role: "평론가", email: "dissae@hanmail.net", tags: ["시각예술", "미학", "평론"], summary: "34년 경력의 시각예술 분야 평론가로 디자인의 맥락을 해석하는 전문가.", relatedPlaces: [] },
  { name: "이정동", field: "공학", org: "서울대학교", role: "교수", email: "leejd@snu.ac.kr", tags: ["기술혁신", "산업정책", "공학"], summary: "기술경영과 산업정책, 혁신 전략을 연구하는 공학계 리더.", relatedPlaces: [] },
  { name: "윤나라", field: "애니메이션", org: "디즈니", role: "애니메이터", email: "bboynara@gmail.com", tags: ["캐릭터 애니메이션", "스토리", "디즈니"], summary: "드림웍스와 디즈니에서 쿵푸팬더, 겨울왕국, 모아나 등 프로젝트에 참여한 애니메이터.", relatedPlaces: [] },
  { name: "강윤제", field: "제품 디자인", org: "플랜에이앤디", role: "대표", email: "yj.kang6808@gmail.com", tags: ["삼성디자인", "제품혁신", "리더십"], summary: "전 삼성전자 디자인센터 전무로 보르도 TV 등 삼성 디자인 혁신을 이끈 리더.", relatedPlaces: [] },
  { name: "허명욱", field: "회화/공예/조각", org: "작가", role: "아티스트", email: "hmw.studiom@gmail.com", tags: ["옻칠", "조각", "오브제"], summary: "옻칠 기반 회화와 조각, 가구, 오브제를 넘나드는 현대 예술가.", relatedPlaces: ["용인 작업실1", "용인 작업실2", "용인 작업실3"] },
  { name: "강이연", field: "미디어 아트", org: "KAIST", role: "교수", email: "yiyunkang@kaist.ac.kr", tags: ["데이터 경험", "공공 미디어파사드", "기후미래"], summary: "KAIST XD Lab을 운영하며 NASA·Google Research 등과 협업한 미디어 아티스트.", relatedPlaces: [] },
];

const places = [
  { name: "준지 플래그십 스토어", area: "강남", location: "도산공원", category: ["리테일", "브랜드 공간"], experts: ["백종환"], summary: "검은색, 빛, 그림자, 야외 정원을 활용해 준지의 브랜드 아이덴티티를 공간적으로 체험하게 하는 플래그십 스토어.", liveInfo: { officialLabel: "공식/검색", officialUrl: "https://search.naver.com/search.naver?query=%EC%A4%80%EC%A7%80+%ED%94%8C%EB%9E%98%EA%B7%B8%EC%8B%AD+%EC%8A%A4%ED%86%A0%EC%96%B4", note: "최신 운영 정보는 네이버·구글 검색과 공식 채널 확인 권장" } },
  { name: "파피루스 안경점", area: "강남", location: "신사동", category: ["리테일", "브랜드 공간"], experts: [], summary: "금고 콘셉트와 어두운 톤으로 특별한 안경 경험을 강조한 공간." },
  { name: "미뗌바우하우스", area: "종로", location: "종로", category: ["디자인 오브제", "전시"], experts: [], summary: "바우하우스 공예성과 미니멀리즘이 결합된 디자인 오브제 공간." },
  { name: "한국 가구박물관", area: "성북", location: "성북동", category: ["박물관", "가구"], experts: [], summary: "한국 전통 가구의 곡선미와 균형미를 체험할 수 있는 박물관." },
  { name: "아모레퍼시픽 본사", area: "용산", location: "용산", category: ["오피스", "문화공간"], experts: [], summary: "문화 공간, 중정, 열린 오피스 구조를 통해 지역 소통과 내부 교류를 강화한 복합 오피스." },
  { name: "아름지기 재단", area: "종로", location: "통인동", category: ["문화공간", "한옥"], experts: [], summary: "한옥 보존, 문화유산 연구, 교육과 전시를 결합한 문화공간." },
  { name: "건축공방 연희 사옥", area: "서대문", location: "연희동", category: ["건축", "공동주거"], experts: ["심희준, 박수정"], summary: "사무실과 공동주거를 복합한 건축으로 미니멀 라이프의 가능성을 보여주는 사례." },
  { name: "LCDC 서울", area: "성동", location: "성수동", category: ["복합문화공간", "리테일"], experts: [], summary: "자동차 수리 공장을 중정이 있는 대형 복합공간으로 개조한 사례." },
  { name: "우란문화재단", area: "성동", location: "성수", category: ["문화공간", "복합시설"], experts: ["김찬중"], summary: "문화, 오피스, 근린시설이 결합된 복합건축으로 연속적인 발코니가 스케일을 분절한다." },
  { name: "종묘", area: "종로", location: "종로", category: ["문화유산", "건축"], experts: [], summary: "월대를 에워싼 담장과 정전의 단순한 구성으로 장엄미를 보여주는 조선 건축." },
  { name: "아라리오 뮤지엄", area: "종로", location: "종로", category: ["뮤지엄", "건축"], experts: [], summary: "검은 벽돌 건물, 통유리 건물, 한옥이 공존하는 근현대 건축 복합체." },
  { name: "피치스 성수", area: "성동", location: "성수동", category: ["브랜드 공간", "라이프스타일"], experts: ["여인택"], summary: "자동차 라이프스타일과 콘텐츠를 결합한 쇼잉 공간." },
  { name: "롯데뮤지엄", area: "송파", location: "송파구", category: ["뮤지엄", "전시"], experts: [], summary: "꿈을 주제로 공간을 나누고 다양한 시각예술 경험을 제공하는 공간." },
  { name: "금성오락실", area: "성동", location: "성동구", category: ["체험공간", "뉴트로"], experts: [], summary: "OLED TV와 뉴트로 감성으로 과거와 현재의 라이프스타일을 체험하게 하는 공간." },
  { name: "EV6 언플러그드 그라운드 성수", area: "성동", location: "성수동", category: ["브랜드 체험", "미디어아트"], experts: [], summary: "방직공장을 리모델링한 고객 체험공간으로 미디어 아트를 통해 브랜드 철학을 전달." },
  { name: "익선동 한옥거리", area: "종로", location: "익선동", category: ["도시재생", "거리"], experts: ["박지현"], summary: "오래된 한옥 마을에 새로운 콘텐츠가 입혀지며 뉴트로 문화 아이콘이 된 거리." },
  { name: "서울시립 미술아카이브", area: "종로", location: "평창동", category: ["미술관", "아카이브"], experts: [], summary: "기록과 예술이 함께하는 미술관으로 리서치랩과 아카이브 기능을 갖춘 공간." },
  { name: "포인트오브뷰 & 오르에르", area: "성동", location: "성동구", category: ["리테일", "문구", "큐레이션"], experts: [], summary: "문구와 아카이브, 팝업, 카페를 엮어 일상 도구를 새롭게 보게 하는 공간." },
  { name: "아모레 성수", area: "성동", location: "성동구", category: ["브랜드 체험", "뷰티"], experts: [], summary: "제품 체험부터 콘텐츠, 구매, 휴식까지 이어지는 뷰티 플래그십." },
  { name: "서울옥션 강남센터", area: "강남", location: "강남구", category: ["아트마켓", "전시", "경매"], experts: ["유나리"], summary: "경매장과 전시장, 아카데미홀을 갖춘 미술 시장 플랫폼." },
  { name: "아더 스페이스 3.0", area: "강남", location: "강남구", category: ["패션", "플래그십"], experts: [], summary: "층별로 다른 콘셉트와 디지털 아트 협업 작품을 보여주는 패션 플래그십." },
  { name: "젠틀몬스터 하우스 도산", area: "강남", location: "강남구", category: ["리테일", "브랜드 경험", "패션"], experts: [], summary: "퓨처 리테일 방향성을 보여주는 젠틀몬스터의 상징적 플래그십 스토어.", liveInfo: { officialLabel: "Gentle Monster 공식", officialUrl: "https://www.gentlemonster.com/kr/en/stories/2026-collection", hours: "매일 11:00–21:00", address: "서울 강남구 압구정로46길 50", note: "공식 사이트 기준 도산 스토어 운영 정보 확인 가능" } },
  { name: "JW 메리어트 서울 리뉴얼 공간", area: "서초", location: "서초구", category: ["호텔", "리뉴얼"], experts: [], summary: "기존 골조를 유지하면서 부드러운 고급스러움을 구현한 호텔 리뉴얼 공간." },
  { name: "신세계 강남점 리빙관", area: "서초", location: "서초구", category: ["리빙", "백화점"], experts: ["이희진"], summary: "Day/Night Zone으로 라이프스타일 사이클을 반영한 리빙 백화점." },
  { name: "래미안 갤러리", area: "송파", location: "송파구", category: ["주거 체험", "브랜드 갤러리"], experts: ["이희진"], summary: "새로운 주거 문화를 제안하는 모델하우스이자 주거 체험관." },
  { name: "비브 스튜디오", area: "경기", location: "경기도 광주", category: ["버추얼 프로덕션", "AI/XR"], experts: ["김세규"], summary: "곡면 LED 월과 VIT 제어 시스템을 활용한 버추얼 프로덕션 스튜디오." },
  { name: "무브먼트랩 한남", area: "용산", location: "한남", category: ["가구", "순환시장"], experts: [], summary: "국내 브랜드 가구의 순환 시장을 지향하며 전시, 수리, 재판매를 연결하는 플랫폼." },
  { name: "설화수의 집", area: "종로", location: "종로", category: ["브랜드 공간", "한옥"], experts: [], summary: "한옥과 양옥을 연결하며 전통을 현대적 형태로 해석한 브랜드 공간." },
  { name: "오설록 티하우스", area: "종로", location: "종로", category: ["F&B", "브랜드 공간"], experts: [], summary: "차 문화를 현대적으로 해석하고 티 칵테일까지 제안하는 공간." },
  { name: "보안여관", area: "종로", location: "종로", category: ["복합문화공간", "재생건축"], experts: [], summary: "옛 여관의 정체성을 살리면서 전시·책방·찻집·숙소 기능을 담은 공간." },
  { name: "막집", area: "종로", location: "종로", category: ["재생건축", "한옥"], experts: ["서승모"], summary: "원래 있던 것들을 보완·발전시킨 재생 건축 사례로 결함을 디자인 계기로 바꾼 공간." },
  { name: "온그라운드", area: "종로", location: "종로", category: ["복합공간", "재생건축"], experts: ["조병수", "서승모"], summary: "일본 적산가옥의 흔적과 막의 미를 살려 카페, 바, 작업실로 재탄생한 공간." },
  { name: "리움미술관", area: "용산", location: "용산구", category: ["미술관", "브랜드 리뉴얼"], experts: ["정구호"], summary: "자연과 건축의 조화를 바탕으로 재개관과 MI, 스토어, 디지털 서비스가 통합 리뉴얼된 미술관.", liveInfo: { officialLabel: "운영 정보 검색", officialUrl: "https://search.naver.com/search.naver?query=%EB%A6%AC%EC%9B%80%EB%AF%B8%EC%88%A0%EA%B4%80+%EC%9A%B4%EC%98%81%EC%8B%9C%EA%B0%84", hours: "화–일 10:00–18:00", note: "사전예약 여부와 특별전 일정은 최신 공지 확인 권장" } },
  { name: "최인아 책방", area: "강남", location: "강남구", category: ["책방", "문화공간"], experts: ["최인아"], summary: "책을 중심으로 공연, 토론, 만남 프로그램을 운영하는 지적 영감 공간." },
  { name: "현대카드 Travel Library", area: "강남", location: "강남구", category: ["라이브러리", "브랜드 콘텐츠"], experts: [], summary: "여행 관련 서적, 전시, 북토크를 통해 여행과 브랜드 스토리를 연결하는 공간." },
  { name: "현대 모터스튜디오 서울", area: "강남", location: "강남구", category: ["브랜드 체험", "모빌리티"], experts: [], summary: "자동차의 제작 과정과 브랜드 역사, 미래를 체험하도록 구성한 스튜디오." },
  { name: "백야드빌더 성수", area: "성동", location: "성동구", category: ["라이프스타일", "모빌리티"], experts: ["김현종"], summary: "바이크와 캠퍼 취향이 살아 있는 브랜드 시그니처 공간." },
  { name: "백야드빌더 온어스 상수", area: "마포", location: "마포구", category: ["라이프스타일", "세미나", "전시"], experts: ["김현종"], summary: "온어스와 협업한 상수점으로 지하 전시·세미나 공간을 함께 운영." },
  { name: "남양 성모성지", area: "경기", location: "화성시", category: ["종교건축", "빛"], experts: ["고기영"], summary: "빛과 조명을 통해 명상과 치유의 분위기를 강화한 성지." },
  { name: "황인용 뮤직스페이스 카메라타", area: "경기", location: "파주시", category: ["오디오", "음악 공간"], experts: ["조병수", "윤광준"], summary: "조병수 건축과 빈티지 오디오가 결합된 음악 감상 중심 공간." },
  { name: "미메시스 아트 뮤지엄", area: "경기", location: "파주시", category: ["미술관", "건축"], experts: [], summary: "알바루 시자가 설계한 ‘빛의 미술관’으로 자연광과 미니멀리즘이 돋보이는 공간." },
  { name: "Cosmo 40", area: "인천", location: "서구", category: ["재생건축", "복합문화공간"], experts: ["양수인"], summary: "화학공장 건물을 보존·증축해 복합문화공간으로 재탄생시킨 대표 사례." },
  { name: "삶것 건축사무실 상수 사옥", area: "마포", location: "상수", category: ["건축", "복합시설"], experts: ["양수인"], summary: "오피스, 카페/바, 문화 시설이 결합될 예정인 복합시설." },
  { name: "아파트멘터리", area: "강남", location: "도산", category: ["쇼룸", "인테리어"], experts: ["윤소연", "최진영"], summary: "고객 맞춤형 인테리어 컨설팅과 자재 비교 체험이 가능한 쇼룸으로, End-to-End 프로세스와 고객 중심 서비스 경험을 직접 확인할 수 있는 공간.", tourDocUrl: "https://caramel-hoodie-ee4.notion.site/32c5ebd36d4080c787b0c21299c24a17" },
  { name: "아크리니아", area: "강남", location: "삼성동", category: ["하이엔드 주방", "쇼룸"], experts: ["윤소연"], summary: "이탈리아 하이엔드 주방 브랜드로 디자인과 실용성이 결합된 맞춤형 키친을 제안하며, 고급 소재와 커스터마이징 경험을 통해 주방 공간의 새로운 기준을 제시하는 공간.", tourDocUrl: "https://caramel-hoodie-ee4.notion.site/32c5ebd36d4080c787b0c21299c24a17" },
  { name: "유앤어스 학동역 쇼룸", area: "강남", location: "학동", category: ["가구", "라이프스타일"], experts: ["윤소연"], summary: "이탈리아 하이엔드 가구 브랜드 뽀로(Porro)를 중심으로 미니멀 디자인과 장인정신, 모듈형 가구 시스템을 경험할 수 있는 쇼룸으로, 공간과 가구의 통합적 라이프스타일을 제안하는 공간.", tourDocUrl: "https://caramel-hoodie-ee4.notion.site/32c5ebd36d4080c787b0c21299c24a17" },
  { name: "길종상가 사무실", area: "중구", location: "을지로", category: ["작업실", "가구"], experts: ["박길종"], summary: "디자인 도구와 수집품이 공존하는 취향의 작업실." },
  { name: "윤현상재 본사", area: "강남", location: "논현동", category: ["쇼룸", "전시", "식경험"], experts: ["최주연"], summary: "타일과 예술 전시, 식 경험까지 연결되는 브랜드 본사 쇼룸." },
  { name: "윤현상재 머티리얼 라이브러리", area: "강남", location: "논현동", category: ["머티리얼", "라이브러리"], experts: ["최주연"], summary: "인테리어 자재와 전시를 함께 경험할 수 있는 소재 라이브러리." },
  { name: "루밍(Rooming)", area: "서초", location: "방배동", category: ["리빙 편집숍", "가구"], experts: ["박근하"], summary: "국내외 유명·신진 디자이너의 가구와 생활 소품을 선보이는 리빙 편집숍." },
  { name: "예올 북촌가", area: "종로", location: "북촌", category: ["전통문화", "큐레이션"], experts: [], summary: "우리 문화의 아름다움을 새 전통으로 연결하고자 하는 공간." },
  { name: "블루보틀 스튜디오 서울", area: "종로", location: "소격동", category: ["카페", "브랜드 공간"], experts: [], summary: "한옥 골목 속에서 스페셜티 커피 브랜드를 경험하는 스튜디오." },
  { name: "이스턴 에디션 아뜰리에", area: "강남", location: "논현동", category: ["라이프스타일", "브랜드 스토리텔링"], experts: [], summary: "브랜드 철학 인지→휴식→라이프스타일 제안으로 이어지는 스토리텔링형 조닝 공간." },
  { name: "용인 작업실1", area: "경기", location: "처인구", category: ["작업실", "예술"], experts: ["허명욱"], summary: "작업의 시초가 된 의미 있는 공간." },
  { name: "용인 작업실2", area: "경기", location: "처인구", category: ["작업실", "라운지", "스튜디오"], experts: ["허명욱"], summary: "작업 공간과 촬영 스튜디오, 라운지가 결합된 자연 친화형 작업실." },
  { name: "용인 작업실3", area: "경기", location: "처인구", category: ["전시", "예술"], experts: ["허명욱"], summary: "회화와 조각, 설치 작품을 함께 감상할 수 있는 전시형 공간." },
];

// Normalize fields into 12 buckets
const FIELD_MAP = (raw) => {
  const v = (raw || "").toLowerCase();
  if (v.includes("공간") || v.includes("인테리어") || v.includes("건축")) return "공간/건축";
  if (v.includes("브랜딩") || v.includes("크리에이티브") || v.includes("브랜드")) return "브랜딩/크리에이티브";
  if (v.includes("전시") || v.includes("뮤지엄") || v.includes("미술")) return "전시/뮤지엄";
  if (v.includes("미디어") || v.includes("아트")) return "미디어아트";
  if (v.includes("ai") || v.includes("xr") || v.includes("버추얼") || v.includes("메타버스")) return "AI/XR/메타버스";
  if (v.includes("트렌드") || v.includes("소비자")) return "트렌드/소비자";
  if (v.includes("제품")) return "제품 디자인";
  if (v.includes("패션")) return "패션";
  if (v.includes("조명") || v.includes("빛")) return "조명/라이팅";
  if (v.includes("오디오")) return "오디오/사운드";
  if (v.includes("스토리")) return "스토리텔링";
  if (v.includes("수의") || v.includes("동물")) return "반려/수의";
  return "기타";
};

const allFields = [
  "전체",
  ...Array.from(new Set(experts.map((e) => FIELD_MAP(e.field)))).sort(),
];
const allAreas = ["전체", ...Array.from(new Set(places.map((p) => p.area))).sort()];

const interviewSeeds = {
  "윤소연": {
    intro: "안녕하세요. 아파트멘터리 윤소연입니다. 집을 개인의 스토리가 반영된 공간으로 보고, 고객 중심의 인테리어 경험을 고민하고 있습니다. 질문을 남겨주시면 제 관점에서 답변하는 형태로 인터뷰를 진행할 수 있습니다.",
    suggested: [
      "주거공간은 어떻게 변화하고 있나요?",
      "스마트홈의 한계는 무엇인가요?",
      "이상적인 주거 경험이란 무엇인가요?",
      "개인화의 핵심은 무엇인가요?",
      "가전이 서비스로 확장되려면 어떻게 해야 하나요?",
      "삼성전자의 기회는 무엇인가요?",
      "공간 중심 전략이란 무엇인가요?"
    ]
  }
};

function makeNaverMapLink(place) {
  return `https://map.naver.com/p/search/${encodeURIComponent(place.name)}`;
}

function makeGoogleMapLink(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.location + " 서울")}`;
}

function makeNewsLink(place) {
  return `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(place.name)}`;
}

function makeInstagramSearchLink(place) {
  return `https://www.instagram.com/explore/tags/${encodeURIComponent(place.name.replace(/\s+/g, ""))}/`;
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-xs font-medium tracking-wide text-[#64748B]">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-[#111827]">{value}</div>
    </div>
  );
}

function ExpertCard({ expert, onSelect, isSelected }) {
  return (
    <button onClick={() => onSelect(expert)} className={`text-left w-full ${isSelected ? 'scale-[1.01]' : ''}`}>
      <Card className={`h-full rounded-[28px] border bg-white shadow-sm transition duration-200 ${isSelected ? 'border-[#0057D9] shadow-md' : 'border-[#D6E4FF] hover:border-[#8BB8FF]'} hover:-translate-y-1 hover:shadow-xl`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#111827]">{expert.name}</CardTitle>
              <CardDescription className="mt-1 text-[13px] font-medium leading-[1.5] tracking-[0.01em] text-[#64748B]">{FIELD_MAP(expert.field)}</CardDescription>
            </div>
            <Badge variant="secondary" className="rounded-full">{expert.role}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-[13px] leading-[1.6] tracking-[0.005em] text-[#475569]"><Building2 className="h-4 w-4" /> {expert.org}</div>
          <p className="text-[14px] leading-[1.75] tracking-[-0.01em] text-[#334155]">{expert.summary}</p>
          <div className="flex flex-wrap gap-2">
            {expert.tags.map((tag) => <Badge key={tag} variant="outline" className="rounded-full">{tag}</Badge>)}
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

function PlaceCard({ place, onSelect, isSelected }) {
  return (
    <button onClick={() => onSelect(place)} className={`text-left w-full ${isSelected ? 'scale-[1.01]' : ''}`}>
      <Card className={`h-full rounded-[28px] border bg-white shadow-sm transition duration-200 ${isSelected ? 'border-[#0057D9] shadow-md' : 'border-[#D6E4FF] hover:border-[#8BB8FF]'} hover:-translate-y-1 hover:shadow-xl`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#111827]">{place.name}</CardTitle>
              <CardDescription className="mt-1 text-[13px] font-medium leading-[1.5] tracking-[0.01em] text-[#64748B]">{place.location}</CardDescription>
            </div>
            <Badge className="rounded-full bg-[#041E42] text-white hover:bg-slate-900">{place.area}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-[14px] leading-[1.75] tracking-[-0.01em] text-[#334155]">{place.summary}</p>
          <div className="flex flex-wrap gap-2">
            {place.category.map((c) => <Badge key={c} variant="outline" className="rounded-full">{c}</Badge>)}
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

export default function InsperExpertPlaceExplorer() {
  const [expertQuery, setExpertQuery] = useState("");
  const [placeQuery, setPlaceQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState("전체");
  const [areaFilter, setAreaFilter] = useState("전체");
  const [selectedExpert, setSelectedExpert] = useState(experts[0]);
  const [selectedPlace, setSelectedPlace] = useState(places[0]);
  const [interviewInput, setInterviewInput] = useState("");
  const [interviewMessages, setInterviewMessages] = useState([
    {
      role: "assistant",
      text: interviewSeeds["윤소연"].intro,
      expertName: "윤소연",
    },
  ]);

  const filteredExperts = useMemo(() => {
    return experts.filter((e) => {
      const mapped = FIELD_MAP(e.field);
      const inField = fieldFilter === "전체" || mapped === fieldFilter;
      const q = expertQuery.trim().toLowerCase();
      const inQuery =
        !q ||
        [e.name, e.field, mapped, e.org, e.role, e.summary, ...e.tags, ...(e.relatedPlaces || [])]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return inField && inQuery;
    });
  }, [expertQuery, fieldFilter]);

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const inArea = areaFilter === "전체" || p.area === areaFilter;
      const q = placeQuery.trim().toLowerCase();
      const inQuery = !q || [p.name, p.location, p.summary, ...p.category, ...(p.experts || [])].join(" ").toLowerCase().includes(q);
      return inArea && inQuery;
    });
  }, [placeQuery, areaFilter]);

  const relatedPlacesForExpert = useMemo(() => {
    if (!selectedExpert) return [];
    return places.filter((p) => (selectedExpert.relatedPlaces || []).includes(p.name) || (p.experts || []).includes(selectedExpert.name));
  }, [selectedExpert]);

  const relatedExpertsForPlace = useMemo(() => {
    if (!selectedPlace) return [];
    return experts.filter((e) => (selectedPlace.experts || []).includes(e.name) || (e.relatedPlaces || []).includes(selectedPlace.name));
  }, [selectedPlace]);

  const activeInterviewSeed = interviewSeeds[selectedExpert?.name] || null;

  const resetInterviewForExpert = (expert) => {
    const seed = interviewSeeds[expert?.name];
    if (seed) {
      setInterviewMessages([{ role: "assistant", text: seed.intro, expertName: expert.name }]);
    } else {
      setInterviewMessages([
        {
          role: "assistant",
          text: `${expert?.name || "선택한 전문가"}에 대한 인터뷰 공간입니다. 질문을 입력하면 추후 해당 전문가의 자료를 기반으로 답변 흐름을 확장할 수 있습니다.`,
          expertName: expert?.name || "",
        },
      ]);
    }
    setInterviewInput("");
  };

  const handleSelectExpert = (expert) => {
    setSelectedExpert(expert);
    resetInterviewForExpert(expert);
  };

  const handleSendInterview = () => {
    const value = interviewInput.trim();
    if (!value) return;
    const currentExpert = selectedExpert?.name || "전문가";
    const normalized = value.replace(/\s+/g, "").toLowerCase();

    let answer = "";

    if (currentExpert === "윤소연") {
      if (normalized.includes("주거공간") || (normalized.includes("공간") && normalized.includes("변화"))) {
        answer = "지금 주거공간은 단순히 머무는 공간이 아니라, 각자의 삶과 취향이 반영되는 경험 공간으로 바뀌고 있다고 생각합니다. 특히 요즘 고객들은 집을 통해 자신을 표현하고 싶어하고, 그 안에서 보내는 시간이 굉장히 중요해졌기 때문에, 공간을 기능 중심이 아니라 어떤 경험을 하게 할 것인가라는 관점에서 설계하는 것이 훨씬 중요해졌습니다.";
      } else if ((normalized.includes("가전") || normalized.includes("제품")) && (normalized.includes("진화") || normalized.includes("변화"))) {
        answer = "가전제품도 이제는 각각의 기능이 잘 작동하는 것만으로는 부족하다고 생각합니다. 고객은 세탁기, 냉장고, TV를 따로 보는 게 아니라 하나의 생활 흐름 안에서 경험하기 때문에, 제품이 아니라 연결된 경험으로 느껴지도록 만드는 것이 중요합니다. 결국 가전은 도구가 아니라 생활의 맥락 안에서 자연스럽게 작동하는 경험 요소가 되어야 한다고 봅니다.";
      } else if (normalized.includes("스마트홈") || (normalized.includes("한계") && (normalized.includes("기술") || normalized.includes("연결")))) {
        answer = "지금 스마트홈이 잘 안 와닿는 이유는 기술이 부족해서가 아니라, 오히려 사용자가 신경 써야 할 부분이 많기 때문이라고 생각합니다. 설정해야 하고, 관리해야 하고, 배워야 하는 시스템은 결국 부담이 되거든요. 좋은 경험은 기술이 보이지 않는 상태에서 자연스럽게 작동하는 것인데, 아직은 그 부분이 부족하다고 느껴집니다.";
      } else if ((normalized.includes("고객") && normalized.includes("불편")) || normalized.includes("불안") || normalized.includes("선택")) {
        answer = "고객이 가장 불편함을 느끼는 순간은 사실 선택해야 할 때입니다. 특히 인테리어나 주거 관련 의사결정에서는 기준이 없고 정보가 불명확하기 때문에, 이 선택이 맞는지 계속 불안해하게 됩니다. 그래서 중요한 것은 선택지를 늘리는 것이 아니라, 선택을 쉽게 만들어주는 구조를 만드는 것이라고 생각합니다.";
      } else if (normalized.includes("이상적") || (normalized.includes("주거") && normalized.includes("경험"))) {
        answer = "이상적인 주거 경험은 사용자가 특별히 의식하지 않아도 편하다고 느끼는 상태라고 생각합니다. 동선이 자연스럽고, 필요한 순간에 필요한 기능이 잘 작동하고, 공간 안에서 흐름이 끊기지 않는 경험이 중요합니다. 좋은 공간은 설명하지 않아도 몸이 먼저 이해하는 공간이라고 봅니다.";
      } else if (normalized.includes("감성") || normalized.includes("기억") || normalized.includes("느낌")) {
        answer = "결국 사람은 공간을 기능으로 기억하기보다는 감정으로 기억한다고 생각합니다. 조명, 재질, 색감, 그리고 그 안에서의 순간들이 쌓이면서 좋았다는 느낌이 남는 거죠. 그래서 기능적인 완성도도 중요하지만, 그 공간에서 어떤 감정을 느끼게 할 것인지까지 같이 설계해야 한다고 봅니다.";
      } else if (normalized.includes("개인화") || normalized.includes("맞춤")) {
        answer = "개인화는 단순히 옵션을 선택하게 하는 수준이 아니라, 그 사람을 얼마나 이해하고 있느냐의 문제라고 생각합니다. 고객은 자신의 취향과 생활 방식이 반영된 공간을 원하기 때문에, 데이터를 기반으로 그 사람의 패턴과 선호를 읽어내는 것이 중요하고, 그 위에서 맞춤형 경험을 만들어가는 것이 핵심이라고 봅니다.";
      } else if (normalized.includes("데이터") || normalized.includes("활용")) {
        answer = "데이터는 굉장히 중요한 자산이지만, 고객 입장에서 느껴지는 것은 결국 편해졌는가입니다. 내부적으로는 복잡한 데이터 처리가 이루어지더라도, 사용자 경험은 최대한 단순하고 직관적이어야 합니다. 좋은 서비스는 복잡함을 사용자에게 드러내지 않는 것이라고 생각합니다.";
      } else if ((normalized.includes("서비스") && normalized.includes("확장")) || (normalized.includes("가전") && normalized.includes("서비스"))) {
        answer = "앞으로는 제품을 판매하는 것에서 끝나는 것이 아니라, 그 이후의 경험까지 이어지는 구조가 필요하다고 생각합니다. 유지관리, 업그레이드, 사용 패턴에 맞춘 추천까지 연결되면서 고객과의 관계가 계속 이어져야 하고, 그게 결국 서비스로 확장되는 방향이라고 봅니다.";
      } else if (normalized.includes("시장기회") || (normalized.includes("기회") && normalized.includes("시장")) || normalized.includes("새로운시장")) {
        answer = "지금 주거 관련 시장을 보면, 각각의 경험들이 굉장히 분절되어 있습니다. 고객은 하나의 통합된 경험을 원하지만, 실제로는 설계, 시공, 가전, 서비스가 다 따로 움직이고 있죠. 그래서 기회는 항상 그 끊어진 경험 사이를 연결하는 데 있다고 생각합니다.";
      } else if (normalized.includes("삼성") || normalized.includes("삼성전자")) {
        answer = "삼성전자는 이미 다양한 디바이스를 가지고 있기 때문에, 그 자체로 굉장히 큰 강점을 가지고 있다고 생각합니다. 다만 지금은 제품 단위로 경험이 나뉘어 있는 부분이 있어서, 이걸 하나의 공간 경험으로 통합해낸다면 훨씬 강력한 차별화가 가능하다고 봅니다.";
      } else if (normalized.includes("공간중심") || (normalized.includes("공간") && normalized.includes("전략"))) {
        answer = "지금까지는 제품 하나하나를 잘 만드는 데 집중해왔다면, 앞으로는 그 제품들이 모여서 어떤 공간 경험을 만들어내는지가 더 중요해질 것 같습니다. 고객은 제품이 아니라 공간 전체를 경험하기 때문에, 제품 중심이 아니라 공간 중심으로 사고를 전환하는 것이 필요하다고 생각합니다.";
      } else {
        answer = "윤소연 대표의 관점에서 보면, 주거공간 관련 혁신의 핵심은 불확실한 시장을 구조화하고 고객이 안심하고 선택할 수 있도록 만드는 데 있습니다. 질문을 조금 더 구체적으로 주시면 그 주제에 맞춰 답변을 더 정확하게 드릴 수 있습니다.";
      }
    } else {
      answer = `${currentExpert} 인터뷰 예시 응답 영역입니다. 이후 질문을 주시면 해당 전문가 자료와 인사이트를 기반으로 답변 문구를 구체화할 수 있습니다.`;
    }

    setInterviewMessages((prev) => [
      ...prev,
      { role: "user", text: value, expertName: currentExpert },
      {
        role: "assistant",
        text: answer,
        expertName: currentExpert,
      },
    ]);
    setInterviewInput("");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <div className="mb-8 overflow-hidden rounded-[32px] border border-[#D6E4FF] bg-[linear-gradient(135deg,#041E42_0%,#0B2A5B_42%,#EAF2FF_100%)]">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="p-7 md:p-10">
              <div className="mb-5 flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-white/82 uppercase"><Sparkles className="h-4 w-4 text-[#5DA9FF]" /> 마크로밀엠브레인</div>
              <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[48px] lg:text-[60px]">Expert Insight Navigator</h1>
              <p className="mt-5 max-w-3xl text-[17px] font-normal leading-[1.7] tracking-[-0.01em] text-white/92 md:text-[19px]">
                전문가의 시선으로 CX/UX/디자인 영감을 얻고 인사이트를 확장하는 탐색 플랫폼
              </p>
              <div className="mt-4 max-w-3xl text-[13px] font-medium leading-[1.7] tracking-[0.01em] text-white/72 md:text-[14px]">
                분야별 전문가 탐색 · 영감 공간 큐레이션 · 전문가–공간 연결 기반 인사이트 탐색을 하나의 흐름으로 제공
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge className="rounded-full border border-[#B9D3FF] bg-white/95 text-[#0B2A5B] hover:bg-white">분야별 필터</Badge>
                <Badge className="rounded-full border border-[#B9D3FF] bg-white/95 text-[#0B2A5B] hover:bg-white">전문가-장소 연동</Badge>
                <Badge className="rounded-full border border-[#B9D3FF] bg-white/95 text-[#0B2A5B] hover:bg-white">최신 외부 정보 링크</Badge>
                <Badge className="rounded-full border border-[#B9D3FF] bg-white/95 text-[#0B2A5B] hover:bg-white">투어/영감 큐레이션</Badge>
              </div>
            </div>
            <div className="grid gap-px bg-[#D7E6FF] md:grid-cols-2 md:grid-rows-2">
              <div className="bg-white p-6"><Stat label="등록 전문가" value={experts.length} /></div>
              <div className="bg-white p-6"><Stat label="등록 장소" value={places.length} /></div>
              <div className="bg-white p-6"><Stat label="전문 분야" value={allFields.length - 1} /></div>
              <div className="bg-white p-6"><Stat label="권역" value={allAreas.length - 1} /></div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="experts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 rounded-full border border-[#CFE0FF] bg-[#F5F8FF] p-1">
            <TabsTrigger value="experts" className="rounded-full data-[state=active]:bg-[#041E42] data-[state=active]:text-white data-[state=active]:shadow-sm">전문가 탐색</TabsTrigger>
            <TabsTrigger value="places" className="rounded-full data-[state=active]:bg-[#041E42] data-[state=active]:text-white data-[state=active]:shadow-sm">영감 공간 탐색</TabsTrigger>
          </TabsList>

          <TabsContent value="experts" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7EA7E8]" />
                    <Input value={expertQuery} onChange={(e) => setExpertQuery(e.target.value)} placeholder="이름, 분야, 소속, 키워드, 관련 장소 검색" className="h-12 rounded-full border-[#D6E4FF] bg-white pl-10 shadow-sm" />
                  </div>
                  <Select value={fieldFilter} onValueChange={setFieldFilter}>
                    <SelectTrigger className="h-12 rounded-full border-[#D6E4FF] bg-white shadow-sm"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="분야 선택" /></SelectTrigger>
                    <SelectContent>
                      {allFields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {filteredExperts.map((expert) => (
                    <ExpertCard
                      key={expert.name}
                      expert={expert}
                      onSelect={handleSelectExpert}
                      isSelected={selectedExpert?.name === expert.name}
                    />
                  ))}
                </div>
              </div>

              <Card className="rounded-[28px] border-[#D6E4FF] bg-white shadow-sm">
                <CardHeader>
  <div className="flex items-center gap-2 text-[14px] font-medium text-[#334155]">
    <UserRound className="h-5 w-5" />
    선택한 전문가의 정보와 연결된 공간을 확인할 수 있습니다.
  </div>
</CardHeader>
                <CardContent>
                  {selectedExpert && (
                    <ScrollArea className="h-[760px] pr-4">
                      <div className="space-y-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.025em]">{selectedExpert.name}</h3>
                            <Badge className="rounded-full">{FIELD_MAP(selectedExpert.field)}</Badge>
                          </div>
                          <p className="mt-2 text-[#475569]">{selectedExpert.org} · {selectedExpert.role}</p>
                        </div>
                        <div className="rounded-[24px] bg-[#F5F8FF] p-5 text-sm leading-7 text-[#334155]">{selectedExpert.summary}</div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[24px] border border-[#D6E4FF] p-5">
                            <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><Building2 className="h-4 w-4" /> 소속</div>
                            <div className="text-[14px] leading-[1.7] tracking-[-0.01em] text-[#334155]">{selectedExpert.org}</div>
                          </div>
                          <div className="rounded-[24px] border border-[#D6E4FF] p-5">
                            <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><Mail className="h-4 w-4" /> 연락처</div>
                            <div className="text-[14px] leading-[1.7] tracking-[-0.01em] text-[#334155] break-all">{selectedExpert.email}</div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><Tag className="h-4 w-4" /> 핵심 키워드</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedExpert.tags.map((tag) => <Badge key={tag} variant="outline" className="rounded-full">{tag}</Badge>)}
                          </div>
                        </div>

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><BookOpen className="h-4 w-4" /> 전문가 인사이트</div>
                          <div className="rounded-[24px] bg-[#F5F8FF] p-5 text-sm leading-7 text-[#334155]">
  {selectedExpert.insights ? (
    <ul className="list-disc pl-5 space-y-2">
      {selectedExpert.insights.map((i, idx) => (
        <li key={idx}>{i}</li>
      ))}
    </ul>
  ) : (
    selectedExpert.summary
  )}
  {selectedExpert.docUrl && (
    <div className="mt-4">
      <Button asChild variant="outline" className="rounded-full border-[#8BB8FF] px-5 text-[#0B2A5B] hover:bg-[#F5F8FF]">
        <a href={selectedExpert.docUrl} target="_blank" rel="noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" /> 전문가 자료 보기
        </a>
      </Button>
    </div>
  )}
</div>
                        </div>

                        <Separator />

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><Compass className="h-4 w-4" /> 인사이트 투어 포인트</div>
                          <div className="grid gap-3">
                            {relatedPlacesForExpert.length ? (
  <>
    {relatedPlacesForExpert.map((place) => (
      <button key={place.name} onClick={() => setSelectedPlace(place)} className="rounded-[24px] border border-[#D6E4FF] bg-white px-3 py-2 text-left transition duration-200 hover:bg-[#F5F8FF] hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-center justify-between gap-3 min-h-[44px]">
          <div className="pl-6 flex items-center gap-3 min-w-0">
            <div className="font-medium whitespace-nowrap">{place.name}</div>
            <div className="text-[13px] leading-[1.6] tracking-[0.005em] text-[#475569] truncate">{place.location} · {place.category.join(" · ")}</div>
          </div>
          <a
            href={makeNaverMapLink(place)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin className="h-4 w-4 text-[#7EA7E8] hover:text-[#0057D9]" />
          </a>
        </div>
      </button>
    ))}

    {relatedPlacesForExpert[0]?.tourDocUrl && (
      <div className="pt-2">
        <Button asChild variant="outline" className="w-full rounded-full border-[#8BB8FF] px-5 text-[#0B2A5B] hover:bg-[#F5F8FF]">
          <a href={relatedPlacesForExpert[0].tourDocUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> 투어 자료 보기
          </a>
        </Button>
      </div>
    )}
  </>
) : (
  <div className="text-sm text-[#64748B]">연결된 장소 정보가 아직 등록되지 않았습니다.</div>
)}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><MessageSquare className="h-4 w-4" /> 전문가 인터뷰</div>
                          <div className="rounded-[24px] border border-[#D6E4FF] bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <div>
                                <div className="text-[16px] font-semibold leading-[1.4] tracking-[-0.01em] text-[#111827]">{selectedExpert.name} 인터뷰 공간</div>
                                <div className="mt-1 text-[13px] leading-[1.6] tracking-[0.005em] text-[#475569]">전문가 자료와 인사이트를 바탕으로 궁금한 내용을 채팅형으로 탐색하는 공간</div>
                              </div>
                              <div className="rounded-full bg-[#F5F8FF] px-3 py-1.5 text-[12px] font-semibold tracking-[0.04em] text-[#0B2A5B]">INTERVIEW</div>
                            </div>

                            {activeInterviewSeed?.suggested && (
                              <div className="mb-4 flex flex-wrap gap-2">
                                {activeInterviewSeed.suggested.map((q) => (
                                  <button
                                    key={q}
                                    onClick={() => setInterviewInput(q)}
                                    className="rounded-full border border-[#D6E4FF] bg-[#F8FBFF] px-3 py-2 text-[12px] font-medium text-[#0B2A5B] transition hover:border-[#8BB8FF] hover:bg-white"
                                  >
                                    {q}
                                  </button>
                                ))}
                              </div>
                            )}

                            <div className="rounded-[20px] bg-[#F5F8FF] p-4">
                              <div className="max-h-[280px] space-y-3 overflow-y-auto pr-1">
                                {interviewMessages.map((msg, idx) => (
                                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[88%] rounded-[20px] px-4 py-3 text-[14px] leading-[1.7] tracking-[-0.01em] ${msg.role === "user" ? "bg-[#041E42] text-white" : "border border-[#D6E4FF] bg-white text-[#334155]"}`}>
                                      {msg.role === "assistant" && (
                                        <div className="mb-1 flex items-center gap-2 text-[12px] font-semibold tracking-[0.03em] text-[#0B2A5B]">
                                          <Bot className="h-3.5 w-3.5" /> {msg.expertName || selectedExpert.name}
                                        </div>
                                      )}
                                      {msg.text}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                              <Input
                                value={interviewInput}
                                onChange={(e) => setInterviewInput(e.target.value)}
                                placeholder={`${selectedExpert.name}에게 물어볼 질문을 입력하세요`}
                                className="h-12 rounded-full border-[#D6E4FF] bg-white px-5 shadow-sm"
                              />
                              <Button onClick={handleSendInterview} className="rounded-full bg-[#041E42] px-5 text-white hover:bg-[#0B2A5B]">
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="places" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7EA7E8]" />
                    <Input value={placeQuery} onChange={(e) => setPlaceQuery(e.target.value)} placeholder="장소명, 위치, 유형, 전문가 검색" className="h-12 rounded-full border-[#D6E4FF] bg-white pl-10 shadow-sm" />
                  </div>
                  <Select value={areaFilter} onValueChange={setAreaFilter}>
                    <SelectTrigger className="h-12 rounded-full border-[#D6E4FF] bg-white shadow-sm"><MapPin className="mr-2 h-4 w-4" /><SelectValue placeholder="권역 선택" /></SelectTrigger>
                    <SelectContent>
                      {allAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {filteredPlaces.map((place) => (
                    <PlaceCard
                      key={place.name}
                      place={place}
                      onSelect={setSelectedPlace}
                      isSelected={selectedPlace?.name === place.name}
                    />
                  ))}
                </div>
              </div>

              <Card className="rounded-[28px] border-[#D6E4FF] bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> 공간 상세</CardTitle>
                  <CardDescription>장소 설명, 연결된 전문가, 최신 외부 정보 확인 링크를 제공합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedPlace && (
                    <ScrollArea className="h-[760px] pr-4">
                      <div className="space-y-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.025em]">{selectedPlace.name}</h3>
                            <Badge className="rounded-full bg-[#041E42] text-white">{selectedPlace.area}</Badge>
                          </div>
                          <p className="mt-2 text-[#475569]">{selectedPlace.location}</p>
                        </div>

                        <div className="rounded-[24px] bg-[#F5F8FF] p-5 text-sm leading-7 text-[#334155]">{selectedPlace.summary}</div>

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><Tag className="h-4 w-4" /> 공간 유형</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedPlace.category.map((tag) => <Badge key={tag} variant="outline" className="rounded-full">{tag}</Badge>)}
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-[#D6E4FF] p-5">
                          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><CalendarDays className="h-4 w-4" /> 최신 외부 정보</div>
                          <div className="space-y-3 text-[14px] leading-[1.7] tracking-[-0.01em] text-[#334155]">
                            {selectedPlace.liveInfo ? (
                              <div className="rounded-xl bg-[#F5F8FF] p-3">
                                {selectedPlace.liveInfo.address && <div><span className="font-medium">주소:</span> {selectedPlace.liveInfo.address}</div>}
                                {selectedPlace.liveInfo.hours && <div><span className="font-medium">운영시간:</span> {selectedPlace.liveInfo.hours}</div>}
                                {selectedPlace.liveInfo.note && <div className="mt-1 text-[#475569]">{selectedPlace.liveInfo.note}</div>}
                              </div>
                            ) : (
                              <div className="rounded-xl bg-[#F5F8FF] p-3 text-[#475569]">별도 수집된 최신 운영 정보는 없지만 아래 외부 링크로 바로 확인할 수 있습니다.</div>
                            )}
                            <div className="grid gap-2 sm:grid-cols-2">
                              <Button asChild variant="outline" className="justify-start rounded-full border-[#8BB8FF] px-5 text-[#0B2A5B] hover:bg-[#F5F8FF]"><a href={makeNaverMapLink(selectedPlace)} target="_blank" rel="noreferrer"><MapPin className="mr-2 h-4 w-4" /> 네이버 지도</a></Button>
                              <Button asChild variant="outline" className="justify-start rounded-full border-[#8BB8FF] px-5 text-[#0B2A5B] hover:bg-[#F5F8FF]"><a href={makeGoogleMapLink(selectedPlace)} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> 구글 지도</a></Button>
                              <Button asChild variant="outline" className="justify-start rounded-full border-[#8BB8FF] px-5 text-[#0B2A5B] hover:bg-[#F5F8FF]"><a href={makeNewsLink(selectedPlace)} target="_blank" rel="noreferrer"><BookOpen className="mr-2 h-4 w-4" /> 최신 뉴스/기사</a></Button>
                              <Button asChild variant="outline" className="justify-start rounded-full border-[#8BB8FF] px-5 text-[#0B2A5B] hover:bg-[#F5F8FF]"><a href={makeInstagramSearchLink(selectedPlace)} target="_blank" rel="noreferrer"><Sparkles className="mr-2 h-4 w-4" /> 인스타그램 태그</a></Button>
                            </div>
                            {selectedPlace.liveInfo?.officialUrl && (
                              <Button asChild className="w-full rounded-full bg-[#041E42] px-5 text-white hover:bg-[#0B2A5B]">
                                <a href={selectedPlace.liveInfo.officialUrl} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> {selectedPlace.liveInfo.officialLabel || "공식 정보 보기"}</a>
                              </Button>
                            )}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><UserRound className="h-4 w-4" /> 연결된 전문가</div>
                          <div className="grid gap-3">
                            {relatedExpertsForPlace.length ? relatedExpertsForPlace.map((expert) => (
                              <button key={expert.name} onClick={() => handleSelectExpert(expert)} className="rounded-[24px] border border-[#D6E4FF] bg-white p-3 text-left transition duration-200 hover:bg-[#F5F8FF] hover:-translate-y-1 hover:shadow-lg">
                                <div className="font-medium">{expert.name}</div>
                                <div className="mt-1 text-[13px] leading-[1.6] tracking-[0.005em] text-[#475569]">{expert.field} · {expert.org}</div>
                                <div className="mt-2 text-[14px] leading-[1.7] tracking-[-0.01em] text-[#334155] line-clamp-2">{expert.summary}</div>
                              </button>
                            )) : <div className="text-sm text-[#64748B]">연결된 전문가 정보가 아직 등록되지 않았습니다.</div>}
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-dashed border-[#8BB8FF] p-5">
                          <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold leading-[1.5] tracking-[0.01em] text-[#0B2A5B]"><Info className="h-4 w-4" /> 확장 아이디어</div>
                          <ul className="space-y-2 text-[13px] leading-[1.6] tracking-[0.005em] text-[#475569] list-disc pl-5">
                            <li>투어 코스 저장, 즐겨찾기, 방문 체크 기능 추가</li>
                            <li>Google Sheets / Airtable 연동으로 데이터 실시간 업데이트</li>
                            <li>Maps API, RSS, 공연/전시 API와 연결해 행사·운영시간 자동 갱신</li>
                          </ul>
                        </div>
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
