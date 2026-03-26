import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Mail,
  Building2,
  Filter,
  UserRound,
  ExternalLink,
  Compass,
  Sparkles,
  BookOpen,
  Tag,
  CalendarDays,
  Info,
  MessageSquare,
  Send,
  Bot,
} from "lucide-react";

// ------------------------------
// 아래 experts, places, FIELD_MAP,
// interviewSeeds, makeNaverMapLink,
// makeGoogleMapLink, makeNewsLink,
// makeInstagramSearchLink
// 원본 그대로 유지
// ------------------------------

// 예시:
// const experts = [...]
// const places = [...]
// const FIELD_MAP = ...
// const allFields = ...
// const allAreas = ...
// const interviewSeeds = ...
// function makeNaverMapLink(place) { ... }
// function makeGoogleMapLink(place) { ... }
// function makeNewsLink(place) { ... }
// function makeInstagramSearchLink(place) { ... }

function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function Chip({ children, dark = false }) {
  return <span className={`chip ${dark ? "chip-dark" : ""}`}>{children}</span>;
}

function ExpertCard({ expert, onSelect, isSelected }) {
  return (
    <button
      type="button"
      className={`entity-card ${isSelected ? "entity-card-selected" : ""}`}
      onClick={() => onSelect(expert)}
    >
      <div className="entity-card-top">
        <div>
          <div className="entity-card-title">{expert.name}</div>
          <div className="entity-card-subtitle">{FIELD_MAP(expert.field)}</div>
        </div>
        <span className="role-badge">{expert.role}</span>
      </div>

      <div className="entity-row muted">
        <Building2 size={14} />
        <span>{expert.org}</span>
      </div>

      <p className="entity-summary">{expert.summary}</p>

      <div className="chip-wrap">
        {expert.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </button>
  );
}

function PlaceCard({ place, onSelect, isSelected }) {
  return (
    <button
      type="button"
      className={`entity-card ${isSelected ? "entity-card-selected" : ""}`}
      onClick={() => onSelect(place)}
    >
      <div className="entity-card-top">
        <div>
          <div className="entity-card-title">{place.name}</div>
          <div className="entity-card-subtitle">{place.location}</div>
        </div>
        <span className="area-badge">{place.area}</span>
      </div>

      <p className="entity-summary">{place.summary}</p>

      <div className="chip-wrap">
        {place.category.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </button>
  );
}

export default function InsperExpertPlaceExplorer() {
  const [tab, setTab] = useState("experts");
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
        [
          e.name,
          e.field,
          mapped,
          e.org,
          e.role,
          e.summary,
          ...(e.tags || []),
          ...(e.relatedPlaces || []),
        ]
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
      const inQuery =
        !q ||
        [p.name, p.location, p.summary, ...(p.category || []), ...(p.experts || [])]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return inArea && inQuery;
    });
  }, [placeQuery, areaFilter]);

  const relatedPlacesForExpert = useMemo(() => {
    if (!selectedExpert) return [];
    return places.filter(
      (p) =>
        (selectedExpert.relatedPlaces || []).includes(p.name) ||
        (p.experts || []).includes(selectedExpert.name)
    );
  }, [selectedExpert]);

  const relatedExpertsForPlace = useMemo(() => {
    if (!selectedPlace) return [];
    return experts.filter(
      (e) =>
        (selectedPlace.experts || []).includes(e.name) ||
        (e.relatedPlaces || []).includes(selectedPlace.name)
    );
  }, [selectedPlace]);

  const activeInterviewSeed = interviewSeeds[selectedExpert?.name] || null;

  const resetInterviewForExpert = (expert) => {
    const seed = interviewSeeds[expert?.name];
    if (seed) {
      setInterviewMessages([
        { role: "assistant", text: seed.intro, expertName: expert.name },
      ]);
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
      if (
        normalized.includes("주거공간") ||
        (normalized.includes("공간") && normalized.includes("변화"))
      ) {
        answer =
          "지금 주거공간은 단순히 머무는 공간이 아니라, 각자의 삶과 취향이 반영되는 경험 공간으로 바뀌고 있다고 생각합니다. 특히 요즘 고객들은 집을 통해 자신을 표현하고 싶어하고, 그 안에서 보내는 시간이 굉장히 중요해졌기 때문에, 공간을 기능 중심이 아니라 어떤 경험을 하게 할 것인가라는 관점에서 설계하는 것이 훨씬 중요해졌습니다.";
      } else if (
        (normalized.includes("가전") || normalized.includes("제품")) &&
        (normalized.includes("진화") || normalized.includes("변화"))
      ) {
        answer =
          "가전제품도 이제는 각각의 기능이 잘 작동하는 것만으로는 부족하다고 생각합니다. 고객은 세탁기, 냉장고, TV를 따로 보는 게 아니라 하나의 생활 흐름 안에서 경험하기 때문에, 제품이 아니라 연결된 경험으로 느껴지도록 만드는 것이 중요합니다. 결국 가전은 도구가 아니라 생활의 맥락 안에서 자연스럽게 작동하는 경험 요소가 되어야 한다고 봅니다.";
      } else if (
        normalized.includes("스마트홈") ||
        (normalized.includes("한계") &&
          (normalized.includes("기술") || normalized.includes("연결")))
      ) {
        answer =
          "지금 스마트홈이 잘 안 와닿는 이유는 기술이 부족해서가 아니라, 오히려 사용자가 신경 써야 할 부분이 많기 때문이라고 생각합니다. 설정해야 하고, 관리해야 하고, 배워야 하는 시스템은 결국 부담이 되거든요. 좋은 경험은 기술이 보이지 않는 상태에서 자연스럽게 작동하는 것인데, 아직은 그 부분이 부족하다고 느껴집니다.";
      } else if (
        (normalized.includes("고객") && normalized.includes("불편")) ||
        normalized.includes("불안") ||
        normalized.includes("선택")
      ) {
        answer =
          "고객이 가장 불편함을 느끼는 순간은 사실 선택해야 할 때입니다. 특히 인테리어나 주거 관련 의사결정에서는 기준이 없고 정보가 불명확하기 때문에, 이 선택이 맞는지 계속 불안해하게 됩니다. 그래서 중요한 것은 선택지를 늘리는 것이 아니라, 선택을 쉽게 만들어주는 구조를 만드는 것이라고 생각합니다.";
      } else if (
        normalized.includes("이상적") ||
        (normalized.includes("주거") && normalized.includes("경험"))
      ) {
        answer =
          "이상적인 주거 경험은 사용자가 특별히 의식하지 않아도 편하다고 느끼는 상태라고 생각합니다. 동선이 자연스럽고, 필요한 순간에 필요한 기능이 잘 작동하고, 공간 안에서 흐름이 끊기지 않는 경험이 중요합니다. 좋은 공간은 설명하지 않아도 몸이 먼저 이해하는 공간이라고 봅니다.";
      } else if (
        normalized.includes("감성") ||
        normalized.includes("기억") ||
        normalized.includes("느낌")
      ) {
        answer =
          "결국 사람은 공간을 기능으로 기억하기보다는 감정으로 기억한다고 생각합니다. 조명, 재질, 색감, 그리고 그 안에서의 순간들이 쌓이면서 좋았다는 느낌이 남는 거죠. 그래서 기능적인 완성도도 중요하지만, 그 공간에서 어떤 감정을 느끼게 할 것인지까지 같이 설계해야 한다고 봅니다.";
      } else if (normalized.includes("개인화") || normalized.includes("맞춤")) {
        answer =
          "개인화는 단순히 옵션을 선택하게 하는 수준이 아니라, 그 사람을 얼마나 이해하고 있느냐의 문제라고 생각합니다. 고객은 자신의 취향과 생활 방식이 반영된 공간을 원하기 때문에, 데이터를 기반으로 그 사람의 패턴과 선호를 읽어내는 것이 중요하고, 그 위에서 맞춤형 경험을 만들어가는 것이 핵심이라고 봅니다.";
      } else if (normalized.includes("데이터") || normalized.includes("활용")) {
        answer =
          "데이터는 굉장히 중요한 자산이지만, 고객 입장에서 느껴지는 것은 결국 편해졌는가입니다. 내부적으로는 복잡한 데이터 처리가 이루어지더라도, 사용자 경험은 최대한 단순하고 직관적이어야 합니다. 좋은 서비스는 복잡함을 사용자에게 드러내지 않는 것이라고 생각합니다.";
      } else if (
        (normalized.includes("서비스") && normalized.includes("확장")) ||
        (normalized.includes("가전") && normalized.includes("서비스"))
      ) {
        answer =
          "앞으로는 제품을 판매하는 것에서 끝나는 것이 아니라, 그 이후의 경험까지 이어지는 구조가 필요하다고 생각합니다. 유지관리, 업그레이드, 사용 패턴에 맞춘 추천까지 연결되면서 고객과의 관계가 계속 이어져야 하고, 그게 결국 서비스로 확장되는 방향이라고 봅니다.";
      } else if (
        normalized.includes("시장기회") ||
        (normalized.includes("기회") && normalized.includes("시장")) ||
        normalized.includes("새로운시장")
      ) {
        answer =
          "지금 주거 관련 시장을 보면, 각각의 경험들이 굉장히 분절되어 있습니다. 고객은 하나의 통합된 경험을 원하지만, 실제로는 설계, 시공, 가전, 서비스가 다 따로 움직이고 있죠. 그래서 기회는 항상 그 끊어진 경험 사이를 연결하는 데 있다고 생각합니다.";
      } else if (
        normalized.includes("삼성") ||
        normalized.includes("삼성전자")
      ) {
        answer =
          "삼성전자는 이미 다양한 디바이스를 가지고 있기 때문에, 그 자체로 굉장히 큰 강점을 가지고 있다고 생각합니다. 다만 지금은 제품 단위로 경험이 나뉘어 있는 부분이 있어서, 이걸 하나의 공간 경험으로 통합해낸다면 훨씬 강력한 차별화가 가능하다고 봅니다.";
      } else if (
        normalized.includes("공간중심") ||
        (normalized.includes("공간") && normalized.includes("전략"))
      ) {
        answer =
          "지금까지는 제품 하나하나를 잘 만드는 데 집중해왔다면, 앞으로는 그 제품들이 모여서 어떤 공간 경험을 만들어내는지가 더 중요해질 것 같습니다. 고객은 제품이 아니라 공간 전체를 경험하기 때문에, 제품 중심이 아니라 공간 중심으로 사고를 전환하는 것이 필요하다고 생각합니다.";
      } else {
        answer =
          "윤소연 대표의 관점에서 보면, 주거공간 관련 혁신의 핵심은 불확실한 시장을 구조화하고 고객이 안심하고 선택할 수 있도록 만드는 데 있습니다. 질문을 조금 더 구체적으로 주시면 그 주제에 맞춰 답변을 더 정확하게 드릴 수 있습니다.";
      }
    } else {
      answer = `${currentExpert} 인터뷰 예시 응답 영역입니다. 이후 질문을 주시면 해당 전문가 자료와 인사이트를 기반으로 답변 문구를 구체화할 수 있습니다.`;
    }

    setInterviewMessages((prev) => [
      ...prev,
      { role: "user", text: value, expertName: currentExpert },
      { role: "assistant", text: answer, expertName: currentExpert },
    ]);
    setInterviewInput("");
  };

  return (
    <div className="page-shell">
      <div className="page-inner">
        <section className="hero-panel">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker">
                <Sparkles size={14} />
                <span>마크로밀엠브레인</span>
              </div>

              <h1 className="hero-title">Expert Insight Navigator</h1>

              <p className="hero-subtitle">
                전문가의 시선으로 CX/UX/디자인 영감을 얻고 인사이트를 확장하는 탐색 플랫폼
              </p>

              <p className="hero-description">
                분야별 전문가 탐색 · 영감 공간 큐레이션 · 전문가–공간 연결 기반 인사이트 탐색을
                하나의 흐름으로 제공
              </p>

              <div className="chip-wrap hero-chip-wrap">
                <Chip>분야별 필터</Chip>
                <Chip>전문가-장소 연동</Chip>
                <Chip>최신 외부 정보 링크</Chip>
                <Chip>투어/영감 큐레이션</Chip>
              </div>
            </div>

            <div className="hero-stats">
              <StatBox label="등록 전문가" value={experts.length} />
              <StatBox label="등록 장소" value={places.length} />
              <StatBox label="전문 분야" value={allFields.length - 1} />
              <StatBox label="권역" value={allAreas.length - 1} />
            </div>
          </div>
        </section>

        <div className="tab-switch">
          <button
            type="button"
            className={`tab-btn ${tab === "experts" ? "tab-btn-active" : ""}`}
            onClick={() => setTab("experts")}
          >
            전문가 탐색
          </button>
          <button
            type="button"
            className={`tab-btn ${tab === "places" ? "tab-btn-active" : ""}`}
            onClick={() => setTab("places")}
          >
            영감 공간 탐색
          </button>
        </div>

        {tab === "experts" && (
          <section className="content-grid">
            <div className="left-column">
              <div className="toolbar">
                <div className="search-box">
                  <Search size={16} className="search-icon" />
                  <input
                    value={expertQuery}
                    onChange={(e) => setExpertQuery(e.target.value)}
                    placeholder="이름, 분야, 소속, 키워드, 관련 장소 검색"
                    className="search-input"
                  />
                </div>

                <div className="select-box">
                  <Filter size={16} className="select-icon" />
                  <select
                    value={fieldFilter}
                    onChange={(e) => setFieldFilter(e.target.value)}
                    className="select-input"
                  >
                    {allFields.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card-grid">
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

            <div className="detail-panel">
              <div className="panel-note">
                <UserRound size={18} />
                <span>선택한 전문가의 정보와 연결된 공간을 확인할 수 있습니다.</span>
              </div>

              {selectedExpert && (
                <div className="detail-scroll">
                  <div className="detail-section">
                    <div className="detail-title-row">
                      <h3 className="detail-title">{selectedExpert.name}</h3>
                      <Chip dark>{FIELD_MAP(selectedExpert.field)}</Chip>
                    </div>
                    <p className="detail-subtitle">
                      {selectedExpert.org} · {selectedExpert.role}
                    </p>
                  </div>

                  <div className="highlight-box">{selectedExpert.summary}</div>

                  <div className="info-grid two-cols">
                    <div className="info-card">
                      <div className="info-card-head">
                        <Building2 size={14} />
                        <span>소속</span>
                      </div>
                      <div className="info-card-body">{selectedExpert.org}</div>
                    </div>

                    <div className="info-card">
                      <div className="info-card-head">
                        <Mail size={14} />
                        <span>연락처</span>
                      </div>
                      <div className="info-card-body break-word">{selectedExpert.email}</div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <div className="section-head">
                      <Tag size={14} />
                      <span>핵심 키워드</span>
                    </div>
                    <div className="chip-wrap">
                      {selectedExpert.tags.map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <div className="section-head">
                      <Compass size={14} />
                      <span>연결된 장소</span>
                    </div>
                    <div className="mini-list">
                      {relatedPlacesForExpert.length ? (
                        relatedPlacesForExpert.map((place) => (
                          <button
                            key={place.name}
                            type="button"
                            className="mini-card"
                            onClick={() => {
                              setSelectedPlace(place);
                              setTab("places");
                            }}
                          >
                            <div className="mini-card-title">{place.name}</div>
                            <div className="mini-card-sub">{place.location}</div>
                          </button>
                        ))
                      ) : (
                        <div className="empty-note">연결된 장소 정보가 없습니다.</div>
                      )}
                    </div>
                  </div>

                  <div className="detail-section">
                    <div className="section-head">
                      <Bot size={14} />
                      <span>전문가 인터뷰</span>
                    </div>

                    {activeInterviewSeed?.suggested?.length > 0 && (
                      <div className="chip-wrap">
                        {activeInterviewSeed.suggested.map((item) => (
                          <button
                            key={item}
                            type="button"
                            className="suggestion-chip"
                            onClick={() => setInterviewInput(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="chat-box">
                      <div className="chat-scroll">
                        {interviewMessages.map((msg, idx) => (
                          <div
                            key={`${msg.role}-${idx}`}
                            className={`chat-message ${
                              msg.role === "user" ? "chat-user" : "chat-assistant"
                            }`}
                          >
                            <div className="chat-role">
                              {msg.role === "user" ? "질문" : msg.expertName || "전문가"}
                            </div>
                            <div className="chat-text">{msg.text}</div>
                          </div>
                        ))}
                      </div>

                      <div className="chat-input-row">
                        <textarea
                          value={interviewInput}
                          onChange={(e) => setInterviewInput(e.target.value)}
                          placeholder="전문가에게 질문을 입력하세요"
                          className="chat-input"
                          rows={3}
                        />
                        <button
                          type="button"
                          className="primary-btn"
                          onClick={handleSendInterview}
                        >
                          <Send size={16} />
                          <span>보내기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {tab === "places" && (
          <section className="content-grid">
            <div className="left-column">
              <div className="toolbar">
                <div className="search-box">
                  <Search size={16} className="search-icon" />
                  <input
                    value={placeQuery}
                    onChange={(e) => setPlaceQuery(e.target.value)}
                    placeholder="장소명, 위치, 유형, 전문가 검색"
                    className="search-input"
                  />
                </div>

                <div className="select-box">
                  <MapPin size={16} className="select-icon" />
                  <select
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className="select-input"
                  >
                    {allAreas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="card-grid">
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

            <div className="detail-panel">
              <div className="panel-head">
                <div className="panel-title-row">
                  <MapPin size={18} />
                  <span>공간 상세</span>
                </div>
                <div className="panel-description">
                  장소 설명, 연결된 전문가, 최신 외부 정보 확인 링크를 제공합니다.
                </div>
              </div>

              {selectedPlace && (
                <div className="detail-scroll">
                  <div className="detail-section">
                    <div className="detail-title-row">
                      <h3 className="detail-title">{selectedPlace.name}</h3>
                      <span className="area-badge">{selectedPlace.area}</span>
                    </div>
                    <p className="detail-subtitle">{selectedPlace.location}</p>
                  </div>

                  <div className="highlight-box">{selectedPlace.summary}</div>

                  <div className="detail-section">
                    <div className="section-head">
                      <Tag size={14} />
                      <span>공간 유형</span>
                    </div>
                    <div className="chip-wrap">
                      {selectedPlace.category.map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="section-head">
                      <Info size={14} />
                      <span>바로가기</span>
                    </div>
                    <div className="link-grid">
                      <a
                        href={makeNaverMapLink(selectedPlace)}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-btn"
                      >
                        <ExternalLink size={14} />
                        <span>네이버 지도</span>
                      </a>
                      <a
                        href={makeGoogleMapLink(selectedPlace)}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-btn"
                      >
                        <ExternalLink size={14} />
                        <span>구글 지도</span>
                      </a>
                      <a
                        href={makeNewsLink(selectedPlace)}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-btn"
                      >
                        <BookOpen size={14} />
                        <span>최신 뉴스/기사</span>
                      </a>
                      <a
                        href={makeInstagramSearchLink(selectedPlace)}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-btn"
                      >
                        <Sparkles size={14} />
                        <span>인스타그램 태그</span>
                      </a>
                    </div>

                    {selectedPlace.liveInfo?.officialUrl && (
                      <a
                        href={selectedPlace.liveInfo.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-btn full-width-btn"
                      >
                        <ExternalLink size={14} />
                        <span>
                          {selectedPlace.liveInfo.officialLabel || "공식 정보 보기"}
                        </span>
                      </a>
                    )}
                  </div>

                  <hr className="divider" />

                  <div className="detail-section">
                    <div className="section-head">
                      <UserRound size={14} />
                      <span>연결된 전문가</span>
                    </div>
                    <div className="mini-list">
                      {relatedExpertsForPlace.length ? (
                        relatedExpertsForPlace.map((expert) => (
                          <button
                            key={expert.name}
                            type="button"
                            className="mini-card"
                            onClick={() => {
                              handleSelectExpert(expert);
                              setTab("experts");
                            }}
                          >
                            <div className="mini-card-title">{expert.name}</div>
                            <div className="mini-card-sub">
                              {expert.field} · {expert.org}
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="empty-note">연결된 전문가 정보가 없습니다.</div>
                      )}
                    </div>
                  </div>

                  {selectedPlace.liveInfo && (
                    <div className="info-card">
                      <div className="section-head">
                        <CalendarDays size={14} />
                        <span>운영 참고 정보</span>
                      </div>
                      <div className="info-note-stack">
                        {selectedPlace.liveInfo.hours && (
                          <div className="info-note-line">
                            <strong>운영시간:</strong> {selectedPlace.liveInfo.hours}
                          </div>
                        )}
                        {selectedPlace.liveInfo.address && (
                          <div className="info-note-line">
                            <strong>주소:</strong> {selectedPlace.liveInfo.address}
                          </div>
                        )}
                        {selectedPlace.liveInfo.note && (
                          <div className="info-note-line">{selectedPlace.liveInfo.note}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedPlace.tourDocUrl && (
                    <div className="info-card">
                      <div className="section-head">
                        <MessageSquare size={14} />
                        <span>투어 문서</span>
                      </div>
                      <a
                        href={selectedPlace.tourDocUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-btn full-width-btn"
                      >
                        <ExternalLink size={14} />
                        <span>관련 문서 보기</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
