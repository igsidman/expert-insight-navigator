import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Mail,
  UserRound,
  Filter,
  Landmark,
  BookOpen,
  Compass,
} from "lucide-react";

const experts = [
  {
    id: 1,
    name: "백종환",
    title: "대표",
    field: "공간/건축",
    company: "WGNB",
    bio: "도산공원 준지 플래그십 스토어, 씨씨 갤러리, 데스크 스튜디오 등 브랜드 경험형 공간 프로젝트를 진행한 공간 디렉터.",
    tags: ["플래그십", "브랜드 공간", "덕셔리 주거"],
    affiliation: "WGNB",
    email: "kong-zone@hanmail.net",
    keywords: ["플래그십", "브랜드 공간", "덕셔리 주거"],
    insight:
      "도산공원 준지 플래그십 스토어, 씨씨 갤러리, 데스크 스튜디오 등 브랜드 경험형 공간 프로젝트를 진행한 공간 디렉터.",
    tourPoint: {
      title: "준지 플래그십 스토어",
      desc: "도산공원 · 리테일 · 브랜드 공간",
    },
    detail:
      "관점의 전환, 비움의 미학, 경계 없는 통합을 바탕으로 브랜드의 본질을 새롭게 해석한 공간 경험을 제안한다.",
  },
  {
    id: 2,
    name: "심희준, 박수정",
    title: "대표",
    field: "공간/건축",
    company: "건축공방",
    bio: "KT 광화문 사옥, 헬프동 아일랜드 청담, 백사마을 프로젝트를 수행했으며 2019 젊은 건축가상을 수상한 건축가 팀.",
    tags: ["건축", "공동주거", "공공성"],
    affiliation: "건축공방",
    email: "studio@archlab.kr",
    keywords: ["건축", "공동주거", "공공성"],
    insight:
      "도시와 사람의 관계를 새롭게 읽고, 일상의 움직임이 자연스럽게 스며드는 구조를 설계한다.",
    tourPoint: {
      title: "헬프동 아일랜드 청담",
      desc: "청담 · 복합공간 · 커뮤니티",
    },
    detail:
      "공간을 하나의 조형물보다 살아 있는 시스템으로 보고, 동선·체류·감정 리듬을 함께 설계하는 접근이 강점이다.",
  },
  {
    id: 3,
    name: "이동일",
    title: "대표",
    field: "공간/건축",
    company: "스튜디오 언라벨",
    bio: "공간과 브랜딩을 함께 설계하는 크리에이티브 디렉터.",
    tags: ["브랜딩", "카페 공간", "리테일"],
    affiliation: "스튜디오 언라벨",
    email: "contact@unlabel.co.kr",
    keywords: ["브랜딩", "카페", "리테일"],
    insight:
      "브랜드의 감정과 태도를 공간 언어로 번역해 일관된 경험을 만든다.",
    tourPoint: {
      title: "도심형 브랜드 쇼룸",
      desc: "성수 · 쇼룸 · 브랜드 경험",
    },
    detail:
      "공간은 시각적 연출만이 아니라 브랜드가 말하는 방식이라는 관점에서 설계가 이루어진다.",
  },
  {
    id: 4,
    name: "서승모",
    title: "대표",
    field: "공간/건축",
    company: "사우스오차드",
    bio: "중정예술대 미술학 석사 출신으로 동양적 분위기를 현대적으로 풀어내는 건축 프로젝트를 진행.",
    tags: ["동양적 미감", "주거", "전시"],
    affiliation: "사우스오차드",
    email: "hello@southorchard.kr",
    keywords: ["동양적 미감", "주거", "전시"],
    insight:
      "여백과 재료의 결을 통해 정서적 몰입을 끌어내는 공간 해석이 강하다.",
    tourPoint: {
      title: "동양적 라이프스타일 하우스",
      desc: "주거 · 라이프스타일 · 미감",
    },
    detail:
      "장식보다 공기감, 구조보다 정서를 우선시하는 설계 철학이 일관되게 드러난다.",
  },
  {
    id: 5,
    name: "유현준",
    title: "대표 건축가",
    field: "공간/건축",
    company: "유현준건축사사무소",
    bio: "도시와 건축, 사람의 행동 사이의 관계를 대중적으로 풀어내는 건축가.",
    tags: ["도시", "건축", "행동"],
    affiliation: "유현준건축사사무소",
    email: "office@hjy.kr",
    keywords: ["도시", "건축", "행동"],
    insight:
      "좋은 공간은 형태보다 사용자의 행위와 관계를 어떻게 바꾸는지가 더 중요하다.",
    tourPoint: {
      title: "도시행동 관찰 포인트",
      desc: "도시 · 공공 · 사용자 행동",
    },
    detail:
      "사람이 어떤 장면에서 멈추고, 연결되고, 머무는지를 해석하는 관점이 강하다.",
  },
  {
    id: 6,
    name: "민성진",
    title: "대표",
    field: "공간/건축",
    company: "건축사사무소 SKM",
    bio: "주거·상업·복합 공간을 넘나들며 맥락 기반 설계를 전개하는 건축가.",
    tags: ["복합공간", "주거", "맥락"],
    affiliation: "건축사사무소 SKM",
    email: "msj@skm.kr",
    keywords: ["복합공간", "주거", "맥락"],
    insight:
      "공간은 독립된 오브제가 아니라 주변 맥락과 관계를 맺으며 완성된다.",
    tourPoint: {
      title: "맥락형 복합공간 프로젝트",
      desc: "복합공간 · 동선 · 맥락",
    },
    detail:
      "건축이 주변과 충돌하지 않고 새로운 장면을 만들어내는 균형감이 핵심이다.",
  },
];

const categories = ["전체", "공간/건축", "브랜딩", "전시/문화", "리테일"];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children, active = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "border-[#0A2A5E] bg-[#0A2A5E] text-white"
          : "border-[#BFD2F4] bg-white text-[#24406D]"
      )}
    >
      {children}
    </span>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="flex min-h-[110px] flex-col justify-between border-l border-[#BFD2F4] p-5">
      <div className="text-xs text-[#6A7CA5]">{label}</div>
      <div className="text-[18px] font-bold text-[#12284C]">{value}</div>
    </div>
  );
}

function ExpertCard({ item, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className={cn(
        "w-full rounded-[24px] border bg-white p-5 text-left shadow-sm transition hover:-translate-y-[1px] hover:shadow-md",
        selected ? "border-[#6B94E6] ring-2 ring-[#DCE8FF]" : "border-[#D9E5FB]"
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <div className="text-[26px] font-bold tracking-[-0.03em] text-[#111827]">
            {item.name}
          </div>
          <div className="mt-1 text-sm text-[#4E5F7F]">{item.field}</div>
        </div>
        <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#28529A]">
          {item.title}
        </span>
      </div>

      <div className="mb-3 flex items-center gap-2 text-sm text-[#5E6F92]">
        <Building2 size={14} />
        <span>{item.company}</span>
      </div>

      <p className="mb-4 line-clamp-3 text-sm leading-6 text-[#44536F]">
        {item.bio}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#D3E1FB] px-3 py-1 text-xs text-[#51698F]"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

export default function App() {
  const [mode, setMode] = useState("전문가 탐색");
  const [category, setCategory] = useState("전체");
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(experts[0].id);

  const filteredExperts = useMemo(() => {
    return experts.filter((item) => {
      const matchesCategory =
        category === "전체" || item.field.includes(category) || item.tags.includes(category);

      const target = [
        item.name,
        item.field,
        item.company,
        item.bio,
        item.tags.join(" "),
        item.keywords.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesKeyword = target.includes(keyword.toLowerCase());

      return matchesCategory && matchesKeyword;
    });
  }, [category, keyword]);

  const selected =
    filteredExperts.find((item) => item.id === selectedId) || filteredExperts[0] || experts[0];

  React.useEffect(() => {
    if (filteredExperts.length > 0 && !filteredExperts.some((v) => v.id === selectedId)) {
      setSelectedId(filteredExperts[0].id);
    }
  }, [filteredExperts, selectedId]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] px-6 py-6 text-[#0F172A]">
      <div className="mx-auto max-w-[1400px]">
        <section className="overflow-hidden rounded-[28px] border border-[#BFD2F4] bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr]">
            <div className="bg-gradient-to-r from-[#06285C] to-[#516D9A] px-7 py-7 text-white">
              <div className="mb-8 text-[12px] font-semibold opacity-90">
                ✦ 마크로밀엠브레인
              </div>

              <h1 className="text-[36px] font-bold leading-tight tracking-[-0.04em] lg:text-[58px]">
                Expert Insight Navigator
              </h1>

              <p className="mt-4 text-[18px] font-semibold text-white/95">
                전문가의 시선으로 CX/UX/디자인 영감을 얻고 인사이트를 확장하는 탐색 플랫폼
              </p>

              <p className="mt-4 text-sm leading-6 text-white/85">
                분야별 전문가 탐색 · 영감 공간 큐레이션 · 전문가-공간 연결 기반 인사이트 탐색을
                하나의 흐름으로 제공
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>분야별 필터</Pill>
                <Pill>전문가-장소 연동</Pill>
                <Pill>최신 외부 정보 링크</Pill>
                <Pill>투어/영감 큐레이션</Pill>
              </div>
            </div>

            <div className="grid grid-cols-2 bg-white">
              <StatBox label="등록 전문가" value="47" />
              <StatBox label="등록 장소" value="56" />
              <StatBox label="전문 분야" value="13" />
              <StatBox label="채널" value="12" />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-full border border-[#BFD2F4] bg-[#EEF3FB] p-1">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setMode("전문가 탐색")}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-semibold transition",
                mode === "전문가 탐색"
                  ? "bg-[#07295E] text-white"
                  : "text-[#556987] hover:bg-white"
              )}
            >
              전문가 탐색
            </button>
            <button
              type="button"
              onClick={() => setMode("영감 공간 탐색")}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-semibold transition",
                mode === "영감 공간 탐색"
                  ? "bg-[#07295E] text-white"
                  : "text-[#556987] hover:bg-white"
              )}
            >
              영감 공간 탐색
            </button>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="mb-4 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA0C3]"
                />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="이름, 분야, 소속, 키워드, 관련 장소 검색"
                  className="h-[52px] w-full rounded-full border border-[#C9DAF8] bg-white pl-11 pr-4 text-sm outline-none ring-0 placeholder:text-[#96A9C8] focus:border-[#7EA2E8]"
                />
              </div>

              <div className="relative w-full md:w-[210px]">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8FB3]"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-[52px] w-full appearance-none rounded-full border border-[#C9DAF8] bg-white pl-11 pr-4 text-sm text-[#334155] outline-none focus:border-[#7EA2E8]"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "전체" ? "분야 선택" : item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-[52px] w-full rounded-[18px] border border-[#C9DAF8] bg-white px-4 text-sm text-[#334155] outline-none focus:border-[#7EA2E8]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredExperts.map((item) => (
                <ExpertCard
                  key={item.id}
                  item={item}
                  selected={selected?.id === item.id}
                  onClick={(expert) => setSelectedId(expert.id)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-[#D9E5FB] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3 text-sm text-[#5B6D90]">
              <UserRound size={18} className="mt-0.5" />
              <p>선택한 전문가의 정보와 연결된 공간을 확인할 수 있습니다.</p>
            </div>

            {selected ? (
              <div className="max-h-[980px] overflow-y-auto pr-2">
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-[40px] font-bold tracking-[-0.04em] text-[#111827]">
                    {selected.name}
                  </h2>
                  <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#28529A]">
                    공간/건축
                  </span>
                </div>

                <div className="mb-6 text-lg text-[#44536F]">
                  {selected.company} · {selected.title}
                </div>

                <div className="rounded-[18px] bg-[#F5F7FB] p-5 text-[15px] leading-7 text-[#44536F]">
                  {selected.bio}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-[20px] border border-[#D9E5FB] p-5">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#223A67]">
                      <Building2 size={16} />
                      소속
                    </div>
                    <div className="text-[#44536F]">{selected.affiliation}</div>
                  </div>

                  <div className="rounded-[20px] border border-[#D9E5FB] p-5">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#223A67]">
                      <Mail size={16} />
                      연락처
                    </div>
                    <div className="text-[#44536F]">{selected.email}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#223A67]">
                    <Compass size={16} />
                    핵심 키워드
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.keywords.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#D3E1FB] px-3 py-1 text-xs text-[#51698F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#223A67]">
                    <BookOpen size={16} />
                    전문가 인사이트
                  </div>
                  <div className="rounded-[18px] bg-[#F5F7FB] p-5 text-[15px] leading-7 text-[#44536F]">
                    {selected.insight}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#223A67]">
                    <MapPin size={16} />
                    인사이트 투어 포인트
                  </div>
                  <div className="rounded-[18px] border border-[#C9DAF8] bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold text-[#12284C]">
                          {selected.tourPoint.title}
                        </div>
                        <div className="mt-1 text-sm text-[#687B9C]">
                          {selected.tourPoint.desc}
                        </div>
                      </div>
                      <MapPin size={18} className="mt-1 text-[#7895C8]" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#E4ECFA] pt-6">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#223A67]">
                    <Landmark size={16} />
                    전문가 시선
                  </div>
                  <div className="rounded-[18px] bg-[#F5F7FB] p-5 text-[15px] leading-7 text-[#44536F]">
                    {selected.detail}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[18px] bg-[#F5F7FB] p-6 text-[#5B6D90]">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
