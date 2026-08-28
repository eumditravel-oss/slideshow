/**
 * Design: 운영 설계도 편집 디자인
 * Style anchors: warm limestone canvas, ink-navy editorial type, signal-teal flow markers,
 * asymmetric operational-grid composition, direct Korean copy, restrained motion.
 */
import { type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  FolderKanban,
  Grid3X3,
  Menu,
  MessageSquareText,
  Network,
  Route,
  Search,
  X,
} from "lucide-react";

const manusAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}manus-storage/${fileName}`;

const flowSteps = ["베트남 산출", "한국 검토", "내역 작성·납품", "건설사 질의·대응"];
const claimCenterEndFrameSrc = manusAsset("CONCOST_Claim_Center_EndFrame_aa68c5a5.png");
const claimCenterVideoSrc = manusAsset("CONCOST_Claim_Center_Studio_Cinematic_v2_72eac200.mp4");

const dailyImprovements = [
  {
    code: "01",
    title: "USB Share",
    issue: "락키 부족으로 유선 허브를 쓰거나, 자리를 옮겨 키를 빌려야 했습니다.",
    outcomeLead: "내부 LAN 단축키 공유",
    outcomeTail: "로 필요한 락키를 연결합니다.",
    accent: "#00a6a6",
    icon: Network,
  },
  {
    code: "02",
    title: "Excel Hub",
    issue: "Excel이 없는 베트남 현지에서는 RC 자료를 내보내기 어려웠습니다.",
    outcomeLead: "프로그램 내 Excel 내보내기",
    outcomeTail: "로 별도 Excel 없이도 자료를 활용합니다.",
    accent: "#55a7df",
    icon: Grid3X3,
  },
  {
    code: "03",
    title: "기존 업무 프로그램",
    issue: "입력·집계·출력에 반복 수작업과 기능 분산이 남아 있었습니다.",
    outcomeLead: "실제 사용 기능 중심",
    outcomeTail: "으로 업무 흐름을 다듬고 개선을 이어 갑니다.",
    accent: "#cf6e97",
    icon: FileText,
  },
  {
    code: "04",
    title: "웹사이트 개발",
    issue: "자체 관리체계가 없어 웹사이트 유지보수와 디자인 개선이 어려웠습니다.",
    outcomeLead: "자체 관리·유지보수",
    outcomeTail: "와 디자인 개선으로 회사 이미지를 높입니다.",
    accent: "#f6b73c",
    icon: Route,
  },
];

const ownedPlatforms = [
  {
    code: "PLATFORM 01",
    name: "공사비닷컴",
    category: "건설 데이터 실무 플랫폼",
    description: "공사비 검색부터 내역서 작성·교육·건설 장터까지, 견적 실무의 정보를 하나의 서비스 흐름으로 연결합니다.",
    tags: ["공사비 검색", "내역서 작성", "실무 교육"],
    workflow: [["FIELD INPUT", "건설 실무 정보"], ["SYSTEMIZED", "검색 · 내역서 작성"], ["ORG. OUTPUT", "견적 업무 흐름"]],
    image: manusAsset("gongsabi-platform_642d3556.webp"),
    href: "https://eumditravel-oss.github.io/gongsabi.com/",
  },
  {
    code: "PLATFORM 02",
    name: "Viet QS",
    category: "베트남 수량산출·공사비 컨설팅",
    description: "수량산출·공사비 검토·설계변경 정산을 바탕으로, 견적 전문성과 해외 프로젝트 실행을 연결합니다.",
    tags: ["Quantity Take-off", "BOQ / WBS", "구조 BIM"],
    workflow: [["FIELD INPUT", "베트남 산출 자료"], ["SYSTEMIZED", "수량 · BOQ 정리"], ["ORG. OUTPUT", "검토 · 프로젝트 실행"]],
    image: manusAsset("vietqs-platform_16246514.webp"),
    href: "https://eumditravel-oss.github.io/VietQS/",
  },
];

const clientWebsites = [
  { name: "한강엔지니어링", type: "안전진단 전문기관", image: manusAsset("hangang-client_9e421e31.webp"), href: "https://eumditravel-oss.github.io/website3/" },
  { name: "선진건설", type: "토건·현장 시공 안내", image: manusAsset("sunjin-client_0ec36a76.webp"), href: "https://eumditravel-oss.github.io/sample_site1/" },
  { name: "동성건설", type: "토목·건축·외부시설", image: manusAsset("dongseong-client_290b311b.webp"), href: "https://eumditravel-oss.github.io/sample_site2/" },
];

const departments = [
  ["베트남 산출팀", "우선순위와 담당 범위가 명확해지고, 자료·라이선스 접근 대기와 전달 혼선을 줄입니다."],
  ["한국 견적팀", "검토와 누락·중복·수량 이상값 확인이 빨라지고, 납품 버전과 수정 이력을 관리합니다."],
  ["클레임 부서", "사건별 문서·쟁점·증거·제출 일정을 연결해 유사 사례와 대응자료를 빠르게 찾습니다."],
  ["경영지원·경영진", "매출·비용·인력·계약·수금·미수금 등 프로젝트 업무부하를 한 흐름에서 확인합니다."],
];

function SectionKicker({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-extrabold tracking-[0.18em] text-[#008b8b]">
      <span>{number}</span>
      <span className="h-px w-8 bg-[#00a6a6]" />
      <span>{label}</span>
    </div>
  );
}

const presentationScenes = [
  ["hero", "시작"],
  ["why", "연결"],
  ["build", "협업"],
  ["work", "개선"],
  ["foundation", "기반"],
  ["showcase", "성과"],
  ["roadmap", "표준화"],
  ["impact", "변화"],
  ["message", "마무리"],
  ["brand-end", "로고"],
];

const presentationImageSources = [
  manusAsset("devlab-hero-operations_59460b74.jpg"),
  manusAsset("groupware-dashboard_c4f7d7ee.png"),
  manusAsset("groupware-board_45f13c16.png"),
  manusAsset("messenger-ui_25d14687.png"),
  claimCenterEndFrameSrc,
  manusAsset("gongsabi-platform_642d3556.webp"),
  manusAsset("vietqs-platform_16246514.webp"),
  manusAsset("hangang-client_9e421e31.webp"),
  manusAsset("sunjin-client_0ec36a76.webp"),
  manusAsset("dongseong-client_290b311b.webp"),
  manusAsset("devlab-roadmap_a1fcd200.jpg"),
  manusAsset("concost-logo_747fe330.png"),
];

const presentationStageTones: Record<string, string> = {
  hero: "#f3f0e9", why: "#101c2c", build: "#101c2c", work: "#e6e3da", foundation: "#0c1724",
  showcase: "#e6e3da", roadmap: "#f3f0e9", impact: "#e6e3da", message: "#101c2c", "brand-end": "#0c1724",
};

type StageTransitionDirection = "left" | "right" | "up" | "down" | "center" | "depth";

const sceneTransitionProfiles: Record<string, { duration: number; swap: number; inputHold?: number; direction: StageTransitionDirection }> = {
  hero: { duration: 760, swap: 342, inputHold: 5100, direction: "center" },
  why: { duration: 680, swap: 306, inputHold: 4750, direction: "left" },
  build: { duration: 680, swap: 306, direction: "right" },
  work: { duration: 760, swap: 342, direction: "down" },
  foundation: { duration: 760, swap: 342, direction: "center" },
  showcase: { duration: 700, swap: 316, direction: "right" },
  roadmap: { duration: 680, swap: 306, inputHold: 5650, direction: "up" },
  impact: { duration: 720, swap: 324, direction: "center" },
  message: { duration: 680, swap: 306, inputHold: 2650, direction: "right" },
  "brand-end": { duration: 900, swap: 405, inputHold: 6500, direction: "depth" },
};

const signatureSceneDurations: Record<string, number> = {
  hero: 4550,
  why: 4250,
  roadmap: 5150,
  "brand-end": 6000,
};

function ParallaxImage({
  src,
  alt,
  className,
  intensity = 1,
}: {
  src: string;
  alt: string;
  className: string;
  intensity?: number;
}) {
  return (
    <div className="parallax-image-layer absolute inset-0 overflow-hidden" style={{ "--parallax-intensity": intensity } as React.CSSProperties}>
      <img src={src} alt={alt} className={`parallax-image-asset ${className}`} />
    </div>
  );
}

function PresentationControls() {
  const [active, setActive] = useState(() => {
    const requestedScene = window.location.hash.slice(1) || new URLSearchParams(window.location.search).get("scene");
    const sceneIndex = presentationScenes.findIndex(([id]) => id === requestedScene);
    return sceneIndex >= 0 ? sceneIndex : 0;
  });
  const [isPresentation, setIsPresentation] = useState(() => new URLSearchParams(window.location.search).get("mode") === "presentation");
  const [cue, setCue] = useState(0);
  const [cueTotal, setCueTotal] = useState(0);
  const [safetyWarnings, setSafetyWarnings] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const wheelLocked = useRef(false);
  const cinematicInputLocked = useRef(false);
  const previousSceneId = useRef<string | null>(null);
  const claimPlaybackRef = useRef<"idle" | "playing" | "settled">("idle");
  const cueRef = useRef(0);
  const assetsReadyRef = useRef(false);
  const stageTransitionTimer = useRef<number | null>(null);
  const stageUnlockTimer = useRef<number | null>(null);
  const stageSwapTimer = useRef<number | null>(null);
  const foundationTransitionTimer = useRef<number | null>(null);
  const foundationCueSwapTimer = useRef<number | null>(null);
  const claimPlaybackTimer = useRef<number | null>(null);
  const signatureLockTimer = useRef<number | null>(null);

  const goTo = (index: number) => {
    cueRef.current = 0;
    setCue(0);
    setPanelOpen(false);
    if (isPresentation) {
      if (index === active || cinematicInputLocked.current || !assetsReadyRef.current) return;
      const canvas = document.querySelector<HTMLElement>(".presentation-canvas");
      const currentScene = document.getElementById(presentationScenes[active][0]);
      const nextScene = document.getElementById(presentationScenes[index][0]);
      if (!canvas || !nextScene) return;

      if (stageTransitionTimer.current) window.clearTimeout(stageTransitionTimer.current);
      if (stageUnlockTimer.current) window.clearTimeout(stageUnlockTimer.current);
      if (stageSwapTimer.current) window.clearTimeout(stageSwapTimer.current);
      const profile = sceneTransitionProfiles[nextScene.id] || { duration: 700, swap: 316, direction: "left" as const };
      cinematicInputLocked.current = true;
      previousSceneId.current = currentScene?.id || null;
      canvas.style.setProperty("--stage-transition-tone", presentationStageTones[nextScene.id] || "#101c2c");
      canvas.style.setProperty("--stage-transition-duration", `${profile.duration}ms`);
      canvas.style.setProperty("--stage-transition-cover", `${profile.swap / profile.duration * 100}%`);
      canvas.dataset.transitionDirection = profile.direction;
      canvas.classList.add("presentation-transitioning");
      currentScene?.classList.add("presentation-exiting");

      stageSwapTimer.current = window.setTimeout(() => {
        currentScene?.classList.remove("presentation-active", "presentation-exiting");
        currentScene && (currentScene.dataset.presentationState = "retired");
        nextScene.classList.add("presentation-entering", "presentation-active");
        nextScene.dataset.presentationState = "entering";
        setActive(index);
        cueRef.current = 1;
        setCue(1);
      }, profile.swap);

      stageTransitionTimer.current = window.setTimeout(() => {
        nextScene.classList.remove("presentation-entering");
        nextScene.classList.add("presentation-active");
        nextScene.dataset.presentationState = "active";
        canvas.classList.remove("presentation-transitioning");
      }, profile.duration);
      stageUnlockTimer.current = window.setTimeout(() => {
        cinematicInputLocked.current = false;
      }, profile.inputHold ?? profile.duration);
      return;
    }
    const target = document.getElementById(presentationScenes[index][0]);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getCueElements = () => {
    if (active === 0) return [] as HTMLElement[];
    const scene = document.getElementById(presentationScenes[active][0]);
    if (!scene) return [] as HTMLElement[];
    if (scene.id === "foundation") {
      return [
        scene.querySelector<HTMLElement>(".foundation-base"),
        scene.querySelector<HTMLElement>(".foundation-space-groupware"),
        scene.querySelector<HTMLElement>(".foundation-space-messenger"),
        scene.querySelector<HTMLElement>(".foundation-space-claim"),
        scene.querySelector<HTMLElement>(".foundation-space-products"),
        scene.querySelector<HTMLElement>(".foundation-space-vision"),
      ].filter((element): element is HTMLElement => Boolean(element));
    }
    return Array.from(scene.querySelectorAll<HTMLElement>("h1, h2, .parallax-image-layer, [data-cue]"));
  };

  const settleClaimPlayback = () => {
    const video = document.querySelector<HTMLVideoElement>(".claim-cinematic-video");
    if (claimPlaybackTimer.current) window.clearTimeout(claimPlaybackTimer.current);
    claimPlaybackTimer.current = null;
    claimPlaybackRef.current = "settled";
    if (video) {
      video.pause();
      if (Number.isFinite(video.duration) && video.duration > 0) video.currentTime = video.duration;
    }
    document.getElementById("foundation")?.classList.remove("claim-video-playing");
    document.getElementById("foundation")?.classList.add("claim-video-settled");
  };

  const startClaimPlayback = () => {
    const foundation = document.getElementById("foundation");
    const video = document.querySelector<HTMLVideoElement>(".claim-cinematic-video");
    if (!video || !claimCenterVideoSrc || claimPlaybackRef.current !== "idle") return;
    claimPlaybackRef.current = "playing";
    const play = () => {
      if (claimPlaybackRef.current !== "playing") return;
      foundation?.classList.remove("claim-video-settled");
      foundation?.classList.add("claim-video-playing");
      window.setTimeout(() => {
        if (claimPlaybackRef.current !== "playing") return;
        video.play().catch(() => {
          claimPlaybackRef.current = "settled";
          foundation?.classList.remove("claim-video-playing");
          foundation?.classList.add("claim-video-settled");
        });
      }, 90);
    };
    video.defaultPlaybackRate = 1.08;
    video.playbackRate = 1.08;
    video.currentTime = .18;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play();
    else video.addEventListener("canplay", play, { once: true });
  };

  const advanceCue = () => {
    const cueCount = getCueElements().length;
    const activeSceneId = presentationScenes[active][0];
    const isWorkScene = activeSceneId === "work";
    const currentCue = cueRef.current;
    const nextCueElement = getCueElements()[currentCue];
    const isFoundationTakeover = activeSceneId === "foundation" && nextCueElement?.classList.contains("foundation-space");
    const isClaimTakeover = isFoundationTakeover && nextCueElement?.classList.contains("foundation-space-claim");
    const isVisionTakeover = isFoundationTakeover && nextCueElement?.classList.contains("foundation-space-vision");
    const isProductsTakeover = isFoundationTakeover && nextCueElement?.classList.contains("foundation-space-products");
    if (cinematicInputLocked.current) return;
    if (isPresentation && !assetsReadyRef.current) return;
    const claimVideo = document.querySelector<HTMLVideoElement>(".claim-cinematic-video");
    if (activeSceneId === "foundation" && currentCue === 4 && claimVideo && !claimVideo.paused && !claimVideo.ended) {
      settleClaimPlayback();
      return;
    }
    if (currentCue < cueCount || (isWorkScene && currentCue === cueCount)) {
      if (isFoundationTakeover) {
        const foundation = document.getElementById("foundation");
        const currentCueElement = getCueElements()[currentCue - 1];
        const cueProfile = isVisionTakeover ? { duration: 1080, swap: 352, lock: 4200 } : isProductsTakeover ? { duration: 1020, swap: 326, lock: 2850 } : isClaimTakeover ? { duration: 980, swap: 314, lock: 1110 } : { duration: 920, swap: 294, lock: 1460 };
        cinematicInputLocked.current = true;
        foundation?.classList.add("foundation-cue-transitioning");
        foundation?.style.setProperty("--foundation-cue-duration", `${cueProfile.duration}ms`);
        currentCueElement?.classList.add("foundation-cue-hold");
        if (foundationTransitionTimer.current) window.clearTimeout(foundationTransitionTimer.current);
        if (foundationCueSwapTimer.current) window.clearTimeout(foundationCueSwapTimer.current);
        foundationCueSwapTimer.current = window.setTimeout(() => {
          currentCueElement?.classList.remove("foundation-cue-hold");
          currentCueElement?.classList.add("foundation-cue-retired");
          cueRef.current = currentCue + 1;
          setCue(cueRef.current);
        }, cueProfile.swap);
        foundationTransitionTimer.current = window.setTimeout(() => {
          foundation?.classList.remove("foundation-cue-transitioning");
        }, cueProfile.duration);
        window.setTimeout(() => { cinematicInputLocked.current = false; }, cueProfile.lock);
        return;
      }
      cueRef.current = currentCue + 1;
      setCue(cueRef.current);
      return;
    }
    if (active < presentationScenes.length - 1) goTo(active + 1);
  };

  const retreatCue = () => {
    if (cinematicInputLocked.current) return;
    const currentCue = cueRef.current;
    if (currentCue > 1) {
      if (presentationScenes[active][0] === "foundation" && currentCue === 4) {
        const video = document.querySelector<HTMLVideoElement>(".claim-cinematic-video");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
        claimPlaybackRef.current = "idle";
        document.getElementById("foundation")?.classList.remove("claim-video-playing", "claim-video-settled");
      }
      if (presentationScenes[active][0] === "foundation" && currentCue === 5) {
        claimPlaybackRef.current = "idle";
        document.getElementById("foundation")?.classList.remove("claim-video-settled");
      }
      cueRef.current = currentCue - 1;
      setCue(cueRef.current);
      return;
    }
    goTo(Math.max(active - 1, 0));
  };

  useEffect(() => {
    if (isPresentation) return;
    const canvas = document.querySelector(".presentation-canvas");
    if (!canvas) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const focused = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!focused) return;
        const index = presentationScenes.findIndex(([id]) => id === focused.target.id);
        if (index >= 0) setActive(index);
      },
      { root: canvas, threshold: [0.36, 0.58, 0.76] },
    );
    presentationScenes.forEach(([id]) => {
      const scene = document.getElementById(id);
      if (scene) observer.observe(scene);
    });
    return () => observer.disconnect();
  }, [isPresentation]);

  useEffect(() => {
    const requestedScene = window.location.hash.slice(1) || new URLSearchParams(window.location.search).get("scene");
    if (!requestedScene || isPresentation) return;
    requestAnimationFrame(() => document.getElementById(requestedScene)?.scrollIntoView({ behavior: "instant", block: "start" }));
  }, [isPresentation]);

  useEffect(() => {
    const sceneId = presentationScenes[active][0];
    const url = new URL(window.location.href);
    if (url.hash !== `#${sceneId}`) {
      url.hash = sceneId;
      window.history.replaceState(null, "", url);
    }
  }, [active]);

  useEffect(() => {
    document.body.classList.toggle("presentation-mode", isPresentation);
    document.documentElement.classList.toggle("presentation-mode", isPresentation);
    cueRef.current = isPresentation ? 1 : 0;
    setCue(cueRef.current);
    setPanelOpen(false);
    return () => {
      document.body.classList.remove("presentation-mode");
      document.documentElement.classList.remove("presentation-mode");
    };
  }, [isPresentation]);

  useEffect(() => {
    const onPresentationNavigate = (event: Event) => {
      const sceneId = (event as CustomEvent<{ sceneId?: string }>).detail?.sceneId;
      const index = presentationScenes.findIndex(([id]) => id === sceneId);
      if (isPresentation && index >= 0) goTo(index);
    };
    window.addEventListener("presentation:navigate", onPresentationNavigate);
    return () => window.removeEventListener("presentation:navigate", onPresentationNavigate);
  }, [active, isPresentation, assetsReady]);

  useEffect(() => {
    const syncDisplayMode = () => {
      const fullscreenByApi = Boolean(document.fullscreenElement);
      const fullscreenByViewport = Math.abs(window.screen.width - window.innerWidth) < 64 && Math.abs(window.screen.height - window.innerHeight) < 96;
      const fullscreenByWindowFrame = Math.abs(window.outerWidth - window.innerWidth) < 18 && Math.abs(window.outerHeight - window.innerHeight) < 18;
      const minimalUiRequested = new URLSearchParams(window.location.search).get("minimal-ui") === "1";
      const browserFullscreen = fullscreenByApi || fullscreenByViewport || fullscreenByWindowFrame || minimalUiRequested;
      const projectorPreset = window.innerWidth >= 1850 && window.innerHeight >= 1000;

      document.documentElement.classList.toggle("browser-fullscreen", browserFullscreen);
      document.documentElement.classList.toggle("projector-preset", projectorPreset);
    };

    syncDisplayMode();
    window.addEventListener("resize", syncDisplayMode);
    document.addEventListener("fullscreenchange", syncDisplayMode);
    return () => {
      window.removeEventListener("resize", syncDisplayMode);
      document.removeEventListener("fullscreenchange", syncDisplayMode);
      document.documentElement.classList.remove("browser-fullscreen", "projector-preset");
    };
  }, []);

  useEffect(() => {
    if (isPresentation || window.innerWidth < 1024 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>(".scene-scroll-parallax").forEach((element) => {
        gsap.fromTo(element, { y: 28, rotateX: 4, transformPerspective: 1500 }, {
          y: -20,
          rotateX: -2,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    });
    return () => context.revert();
  }, [isPresentation]);

  useEffect(() => {
    if (isPresentation && presentationScenes[active][0] === "showcase" && document.getElementById("foundation")?.classList.contains("foundation-match-exit")) return;
    cueRef.current = isPresentation ? 1 : 0;
    setCue(cueRef.current);
  }, [active, isPresentation]);

  useEffect(() => {
    const isClaimScene = isPresentation && presentationScenes[active][0] === "foundation" && cue === 4;
    const video = document.querySelector<HTMLVideoElement>(".claim-cinematic-video");
    if (!isClaimScene) {
      if (claimPlaybackTimer.current) window.clearTimeout(claimPlaybackTimer.current);
      claimPlaybackTimer.current = null;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      claimPlaybackRef.current = "idle";
      document.getElementById("foundation")?.classList.remove("claim-video-playing", "claim-video-settled");
      return;
    }
    if (!claimCenterVideoSrc || !video) return;
    claimPlaybackTimer.current = window.setTimeout(() => {
      claimPlaybackTimer.current = null;
      startClaimPlayback();
    }, 140);
    return () => {
      if (claimPlaybackTimer.current) window.clearTimeout(claimPlaybackTimer.current);
      claimPlaybackTimer.current = null;
    };
  }, [active, cue, isPresentation]);

  useEffect(() => {
    const isClaimScene = isPresentation && presentationScenes[active][0] === "foundation" && cue === 4;
    const video = document.querySelector<HTMLVideoElement>(".claim-cinematic-video");
    const progress = document.querySelector<HTMLElement>(".claim-video-progress i");
    if (!isClaimScene || !video) {
      progress?.style.setProperty("transform", "scaleX(0)");
      return;
    }
    const updateProgress = () => {
      const ratio = video.duration > 0 ? video.currentTime / video.duration : 0;
      progress?.style.setProperty("transform", `scaleX(${Math.min(1, Math.max(0, ratio))})`);
    };
    updateProgress();
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", updateProgress);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", updateProgress);
    };
  }, [active, cue, isPresentation]);

  useEffect(() => {
    let cancelled = false;
    const preloadImage = (src: string) => new Promise<void>((resolve) => {
      const image = new Image();
      const settle = () => resolve();
      image.addEventListener("error", settle, { once: true });
      image.addEventListener("load", () => {
        if (typeof image.decode === "function") image.decode().catch(() => undefined).finally(settle);
        else settle();
      }, { once: true });
      image.src = src;
    });
    const preloadVideo = () => new Promise<void>((resolve) => {
      if (!claimCenterVideoSrc) { resolve(); return; }
      const video = document.createElement("video");
      const settle = () => resolve();
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.addEventListener("canplaythrough", settle, { once: true });
      video.addEventListener("loadeddata", settle, { once: true });
      video.addEventListener("error", settle, { once: true });
      video.src = claimCenterVideoSrc;
      video.load();
    });
    void Promise.all([...presentationImageSources.map(preloadImage), preloadVideo()]).then(() => {
      if (cancelled) return;
      assetsReadyRef.current = true;
      setAssetsReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const canvas = document.querySelector<HTMLElement>(".presentation-canvas");
    if (canvas) canvas.dataset.assetsReady = assetsReady ? "ready" : "loading";
  }, [assetsReady]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-signature-scene]").forEach((scene) => {
      scene.dataset.signatureState = "idle";
      scene.classList.remove("signature-hold");
    });
    if (signatureLockTimer.current) window.clearTimeout(signatureLockTimer.current);
    signatureLockTimer.current = null;
    if (!isPresentation || !assetsReady) return;

    const activeSceneId = presentationScenes[active][0];
    const duration = signatureSceneDurations[activeSceneId];
    const scene = document.getElementById(activeSceneId);
    if (!duration || !scene) return;

    cinematicInputLocked.current = true;
    scene.dataset.signatureState = "idle";
    void scene.offsetWidth;
    scene.dataset.signatureState = "running";
    signatureLockTimer.current = window.setTimeout(() => {
      scene.classList.add("signature-hold");
      cinematicInputLocked.current = false;
      signatureLockTimer.current = null;
    }, duration);

    return () => {
      if (signatureLockTimer.current) window.clearTimeout(signatureLockTimer.current);
      signatureLockTimer.current = null;
    };
  }, [active, assetsReady, isPresentation]);

  useEffect(() => {
    const activeSceneId = presentationScenes[active][0];
    if (!isPresentation) {
      document.querySelectorAll<HTMLElement>(".presentation-scene").forEach((scene) => {
        scene.classList.remove("presentation-active", "presentation-exiting", "presentation-entering", "presentation-special-transition");
        delete scene.dataset.presentationState;
      });
      previousSceneId.current = null;
      return;
    }
    const activeScene = document.getElementById(activeSceneId);
    activeScene?.classList.remove("presentation-exiting");
    activeScene?.classList.add("presentation-active");
    if (!activeScene?.classList.contains("presentation-entering")) activeScene && (activeScene.dataset.presentationState = "active");
    previousSceneId.current = activeSceneId;
  }, [active, isPresentation]);

  useEffect(() => {
    document.querySelectorAll(".cue-target").forEach((element) => element.classList.remove("cue-target", "cue-visible"));
    if (!isPresentation) return;
    const cueElements = getCueElements();
    setCueTotal(cueElements.length);
    cueElements.forEach((element) => element.classList.add("cue-target"));
    cueElements.forEach((element, index) => {
      if (presentationScenes[active][0] !== "foundation" || index >= cue - 1) element.classList.remove("foundation-cue-retired");
    });
    cueElements.slice(0, cue).forEach((element) => element.classList.add("cue-visible"));
  }, [active, cue, isPresentation]);

  useEffect(() => {
    const canvas = document.querySelector<HTMLElement>(".presentation-canvas");
    const scene = document.getElementById(presentationScenes[active][0]);
    if (!canvas || !scene || !isPresentation) {
      setSafetyWarnings(0);
      return;
    }

    let frame = 0;
    const inspectSafetyMargins = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const canvasRect = canvas.getBoundingClientRect();
        const sceneRect = scene.getBoundingClientRect();
        const safeTop = Math.max(canvasRect.top, sceneRect.top) + 24;
        const safeBottom = Math.min(canvasRect.bottom, sceneRect.bottom) - 24;
        const textBlocks = Array.from(scene.querySelectorAll<HTMLElement>("h1, h2, h3, p, a, li"));
        const hasOverflow = textBlocks.some((element) => {
          const styles = window.getComputedStyle(element);
          if (styles.display === "none" || styles.visibility === "hidden" || Number(styles.opacity) < 0.15) return false;
          const rect = element.getBoundingClientRect();
          return rect.height > 0 && (rect.top < safeTop || rect.bottom > safeBottom);
        });

        scene.dataset.safety = hasOverflow ? "warning" : "safe";
        setSafetyWarnings(hasOverflow ? 1 : 0);
      });
    };

    inspectSafetyMargins();
    const observer = new ResizeObserver(inspectSafetyMargins);
    observer.observe(canvas);
    observer.observe(scene);
    window.addEventListener("resize", inspectSafetyMargins);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", inspectSafetyMargins);
    };
  }, [active, cue, isPresentation]);

  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>("#work .work-row"));
    rows.forEach((row) => row.classList.remove("work-row-focus", "work-row-past", "work-row-summary"));
    if (!isPresentation || presentationScenes[active][0] !== "work") return;

    const visibleRows = rows.filter((row) => row.classList.contains("cue-visible"));
    if (cue > getCueElements().length) {
      rows.forEach((row) => row.classList.add("work-row-summary"));
      return;
    }
    visibleRows.forEach((row, index) => {
      row.classList.add(index === visibleRows.length - 1 ? "work-row-focus" : "work-row-past");
    });
  }, [active, cue, isPresentation]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a")) return;
      if (event.code === "Space") {
        event.preventDefault();
        if (isPresentation) advanceCue();
        else goTo(Math.min(active + 1, presentationScenes.length - 1));
      }
      if (!isPresentation && ["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(Math.max(active - 1, 0));
      }
      if (!isPresentation && event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (!isPresentation && event.key === "End") {
        event.preventDefault();
        goTo(presentationScenes.length - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, cue, isPresentation]);

  useEffect(() => {
    const canvas = document.querySelector(".presentation-canvas");
    if (!canvas) return;
    const onCanvasClick = (event: Event) => {
      if (isPresentation) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, [data-no-cue]")) return;
    };
    canvas.addEventListener("click", onCanvasClick);
    return () => canvas.removeEventListener("click", onCanvasClick);
  }, [active, cue, isPresentation]);

  useEffect(() => {
    const canvas = document.querySelector<HTMLElement>(".presentation-canvas");
    if (!canvas) return;
    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024 || Math.abs(event.deltaY) < 8) return;
      if (isPresentation) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      if (wheelLocked.current) return;
      wheelLocked.current = true;
      if (event.deltaY > 0) {
        goTo(Math.min(active + 1, presentationScenes.length - 1));
      } else {
        goTo(Math.max(active - 1, 0));
      }
      window.setTimeout(() => { wheelLocked.current = false; }, 760);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [active, cue, isPresentation]);

  const pageNumber = String(active + 1).padStart(2, "0");
  const pageTotal = String(presentationScenes.length).padStart(2, "0");

  return (
    <>
      <div className="presentation-minimal-progress" aria-live="polite" aria-label={`현재 ${active + 1}번 장면, 내부 큐 ${Math.min(cue, cueTotal)}개 진행`}>
        <span>{pageNumber}<i>/</i>{pageTotal}</span>
        <b><em style={{ transform: `scaleX(${cueTotal ? Math.min(cue, cueTotal) / cueTotal : 0})` }} /></b>
      </div>
      <aside className="presentation-index-panel fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end">
        <button type="button" onClick={() => setPanelOpen((current) => !current)} aria-expanded={panelOpen} aria-label="발표 장면 목록 열기" className="flex min-w-[76px] items-center justify-between gap-2 border border-[#101c2c]/20 bg-[#f3f0e9]/92 px-2.5 py-2 text-[#101c2c] shadow-[0_8px_18px_rgba(16,28,44,0.09)] backdrop-blur-md transition-colors hover:border-[#00a6a6]">
          <span className="font-display text-[13px] font-extrabold">{pageNumber}<span className="text-[#00a6a6]">/</span>{pageTotal}</span>
          {panelOpen ? <X size={14} strokeWidth={2.5} /> : <Menu size={14} strokeWidth={2.5} />}
        </button>
        {panelOpen && <div className="mt-2 w-[154px] border border-[#101c2c]/20 bg-[#f3f0e9]/95 p-2 shadow-[0_12px_28px_rgba(16,28,44,0.14)] backdrop-blur-md">
          <p className="mb-2 px-1 text-[8px] font-extrabold tracking-[0.16em] text-[#547075]">SCENE INDEX</p>
          {presentationScenes.map(([id, label], index) => (
            <button key={id} type="button" onClick={() => goTo(index)} className="group flex h-7 w-full items-center gap-2 px-1 text-left" aria-label={`${index + 1}번 장면: ${label}`}>
              <span className={`h-1.5 transition-all duration-300 ${active === index ? "w-6 bg-[#00a6a6]" : "w-1.5 bg-[#101c2c]/30 group-hover:w-4 group-hover:bg-[#00a6a6]"}`} />
              <span className={`text-[10px] font-extrabold tracking-[0.08em] transition-colors ${active === index ? "text-[#101c2c]" : "text-[#547075]"}`}>{label}</span>
            </button>
          ))}
          <div className="mt-2 border-t border-[#101c2c]/15 pt-2 text-right">
            {isPresentation && <p className="text-[9px] font-extrabold tracking-[0.1em] text-[#008b8b]">CUE {Math.min(cue, cueTotal)} / {cueTotal}</p>}
            {isPresentation && <p className={`mt-1 text-[8px] font-extrabold tracking-[0.1em] ${safetyWarnings ? "text-[#b87411]" : "text-[#008b8b]"}`}>{safetyWarnings ? "SAFE EDGE CHECK" : "SAFE FRAME OK"}</p>}
            <button type="button" onClick={() => setIsPresentation((current) => !current)} className="mt-2 text-[9px] font-extrabold tracking-[0.08em] text-[#547075] hover:text-[#008b8b]">{isPresentation ? "발표 모드 종료" : "발표 모드 시작"}</button>
          </div>
        </div>}
      </aside>
      <div className="presentation-command-bar fixed bottom-5 left-1/2 z-[60] hidden -translate-x-1/2 items-center gap-1 border border-[#101c2c]/20 bg-[#f3f0e9]/92 p-1.5 shadow-[0_12px_34px_rgba(16,28,44,0.16)] backdrop-blur-md transition-all duration-300 lg:flex">
        <button type="button" onClick={isPresentation ? retreatCue : () => goTo(Math.max(active - 1, 0))} disabled={!isPresentation && active === 0} className="px-4 py-2 text-[11px] font-extrabold transition-colors hover:bg-[#101c2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30">← 이전</button>
        <button type="button" onClick={() => setIsPresentation((current) => !current)} className="border-x border-[#101c2c]/15 px-4 py-2 text-[11px] font-extrabold transition-colors hover:bg-[#00a6a6] hover:text-white">{isPresentation ? "발표 모드 종료" : "발표 모드"}</button>
        <button type="button" onClick={isPresentation ? advanceCue : () => goTo(Math.min(active + 1, presentationScenes.length - 1))} disabled={!isPresentation && active === presentationScenes.length - 1} className="px-4 py-2 text-[11px] font-extrabold transition-colors hover:bg-[#101c2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30">{isPresentation ? cue < cueTotal ? `큐 ${cue + 1} 표시` : "다음 장면 →" : "다음 →"}</button>
      </div>
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const scrollToScene = (event: ReactMouseEvent<HTMLAnchorElement>, sceneId: string) => {
    event.preventDefault();
    if (document.documentElement.classList.contains("presentation-mode")) {
      window.dispatchEvent(new CustomEvent("presentation:navigate", { detail: { sceneId } }));
      return;
    }
    const canvas = document.querySelector<HTMLElement>(".presentation-canvas");
    const scene = document.getElementById(sceneId);
    if (!scene) return;
    if (canvas) {
      const canvasRect = canvas.getBoundingClientRect();
      const sceneRect = scene.getBoundingClientRect();
      const targetTop = sceneId === "hero" ? 0 : canvas.scrollTop + sceneRect.top - canvasRect.top;
      canvas.scrollTo({ top: targetTop, behavior: "smooth" });
    } else {
      scene.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.history.replaceState(null, "", `#${sceneId}`);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f0e9] text-[#101c2c] selection:bg-[#00a6a6] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-[#101c2c]/10 bg-[#f3f0e9]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#hero" className="group flex items-center gap-3" aria-label="첫 화면으로 이동" onClick={(event) => { closeMenu(); scrollToScene(event, "hero"); }}>
            <img src={manusAsset("devlab-logo_ede2dbc7.png")} alt="개발팀 연결 프레임 로고" className="h-11 w-11 object-contain transition-transform duration-200 group-hover:-rotate-6" />
            <div className="leading-none">
              <div className="flex items-center gap-2">
                <p className="font-display text-[15px] font-extrabold tracking-[-0.05em]">DEVELOPMENT</p>
                <span className="h-1.5 w-1.5 bg-[#00a6a6]" />
              </div>
              <p className="mt-1 text-[9px] font-bold tracking-[0.18em] text-[#547075]">LAB / SYS.01 / OPERATIONS</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] font-bold text-[#395258] lg:flex" aria-label="주요 메뉴">
            <a className="transition-colors hover:text-[#008b8b]" href="#why">왜 지금인가</a>
            <a className="transition-colors hover:text-[#008b8b]" href="#work">무엇을 바꾸는가</a>
            <a className="transition-colors hover:text-[#008b8b]" href="#roadmap">어디로 가는가</a>
            <a className="transition-colors hover:text-[#008b8b]" href="#impact">누구에게 달라지는가</a>
          </nav>

          <a href="#message" className="hidden items-center gap-2 border border-[#101c2c] px-4 py-2.5 text-[12px] font-extrabold transition-all duration-200 hover:bg-[#101c2c] hover:text-white active:scale-[0.97] sm:flex">
            다음 과제 제안하기 <ArrowUpRight size={15} strokeWidth={2.25} />
          </a>
          <button type="button" className="grid h-10 w-10 place-items-center border border-[#101c2c]/20 lg:hidden" aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#101c2c]/10 bg-[#f3f0e9] px-5 py-5 lg:hidden" aria-label="모바일 주요 메뉴">
            <div className="grid gap-1">
              {[
                ["왜 지금인가", "#why"],
                ["무엇을 바꾸는가", "#work"],
                ["어디로 가는가", "#roadmap"],
                ["누구에게 달라지는가", "#impact"],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={closeMenu} className="flex items-center justify-between border-b border-[#101c2c]/10 py-4 text-lg font-extrabold">
                  {label}<ChevronRight size={18} className="text-[#00a6a6]" />
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="top" className="presentation-canvas relative lg:h-[calc(100vh-74px)] lg:snap-y lg:snap-mandatory lg:overflow-y-auto">
        <div aria-hidden="true" className="presentation-guide-rail pointer-events-none absolute inset-y-0 left-3 z-0 hidden border-l border-dashed border-[#00a6a6]/35 xl:block">
          <span className="absolute top-[7%] -left-[5px] h-2 w-2 bg-[#00a6a6]" />
          <span className="absolute top-[43%] -left-[5px] h-2 w-2 bg-[#00a6a6]" />
          <span className="absolute top-[79%] -left-[5px] h-2 w-2 bg-[#00a6a6]" />
        </div>
        <div aria-hidden="true" className="presentation-transition-surface" />
        <section id="hero" data-signature-scene className="presentation-scene relative mx-auto max-w-[1440px] border-x border-[#101c2c]/10 lg:min-h-[calc(100vh-74px)] lg:snap-start" aria-labelledby="hero-title">
          <div aria-hidden="true" className="signature-opening">
            <div className="signature-opening-camera">
              <div className="signature-opening-crosshair"><i /><i /><b /></div>
              <svg className="signature-opening-drawing" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
                <path pathLength="1" d="M105 150H1095M105 350H1095M105 550H1095M210 90V610M470 90V610M760 90V610M1010 90V610" />
                <path pathLength="1" d="M210 150L470 350L760 150L1010 350L760 550L470 350L210 550" />
                <path pathLength="1" d="M310 246H650V470H910V260H650V150" />
              </svg>
              <div className="signature-opening-sheet">
                {Array.from({ length: 30 }).map((_, index) => <i key={index}>{index % 7 === 0 ? (1240 + index * 37).toLocaleString() : ""}</i>)}
                <strong>QTY / 48,620</strong>
              </div>
              <div className="signature-opening-ui">
                <span>CONCOST / OPERATING GRID</span><i /><i /><i /><i /><i /><i />
              </div>
            </div>
          </div>
          <div className="grid min-h-[690px] lg:min-h-[calc(100vh-74px)] lg:grid-cols-[1.03fr_.97fr]">
            <div className="relative flex flex-col justify-between border-b border-[#101c2c]/10 px-5 pb-8 pt-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:pb-12 lg:pt-16">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#00a6a6]" />
              <div>
                <SectionKicker number="00" label="TOGETHER, WE BUILD BETTER WORK" />
                <h1 id="hero-title" className="font-display mt-8 max-w-[720px] text-[clamp(2.65rem,4.35vw,4.7rem)] font-extrabold leading-[0.98] tracking-[-0.075em] text-[#101c2c]">
                  <span className="block whitespace-nowrap">모두와 함께</span>
                  <span className="block whitespace-nowrap">일하는 방식을</span>
                  <span className="cue-highlight-marker cue-color-mint relative inline-block whitespace-nowrap"><span className="relative z-10">우리가 직접 만듭니다.</span><span className="absolute bottom-[8%] left-0 z-0 h-3 w-full bg-[#00a6a6]/35" /></span>
                </h1>
                <p data-cue className="mt-8 text-[clamp(14px,1.08vw,18px)] leading-7 text-[#456066]">
                  <span className="block whitespace-nowrap">모두가 마주한 문제를 듣고, 함께 쓰는 흐름부터 만듭니다.</span>
                  <span className="mt-1 block whitespace-nowrap">반복은 시스템이 맡고, 사람은 더 나은 판단에 함께 집중합니다.</span>
                </p>
              </div>
              <div data-cue className="border-l-2 border-[#00a6a6] py-2 pl-5">
                <p className="text-[10px] font-extrabold tracking-[0.17em] text-[#008b8b]">ONE TEAM, SHARED STANDARD</p>
                <p className="font-display mt-3 whitespace-nowrap text-[clamp(1.25rem,1.7vw,1.8rem)] font-extrabold tracking-[-0.055em] text-[#101c2c]">함께 발견한 개선이 모두의 표준이 됩니다.</p>
                <p className="mt-2 text-[11px] font-bold tracking-[0.08em] text-[#547075]">FIELD INSIGHT → SHARED STANDARD</p>
              </div>
              <div data-cue className="mt-12 flex flex-wrap items-center gap-5 lg:flex-nowrap">
                <a href="#why" className="inline-flex items-center gap-3 bg-[#101c2c] px-6 py-4 text-[14px] font-extrabold text-white transition-all duration-200 hover:bg-[#008b8b] active:scale-[0.97]">
                  변화의 흐름 보기 <ArrowDown size={17} />
                </a>
                <p className="whitespace-nowrap text-[clamp(10px,.72vw,12px)] font-semibold leading-5 text-[#547075]">모두가 발견한 개선이 함께 쓰는 표준이 됩니다.</p>
              </div>
            </div>

            <div className="relative min-h-[390px] overflow-hidden bg-[#e6e6dc] lg:min-h-0">
              <ParallaxImage src={manusAsset("devlab-hero-operations_59460b74.jpg")} alt="업무 흐름을 설계도처럼 표현한 추상 시각물" className="h-full w-full object-cover object-center" intensity={1.25} />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f3f0e9]/40" />
              <div aria-hidden="true" className="hero-cad-overlay pointer-events-none absolute inset-0 z-[1] opacity-80">
                <span className="absolute left-[11%] top-[19%] h-[25%] w-[31%] border-l border-t border-[#00a6a6]/35" />
                <span className="absolute left-[42%] top-[36%] h-[21%] w-[25%] border-r border-t border-[#00a6a6]/24" />
                <span className="absolute bottom-[21%] left-[19%] h-[16%] w-[42%] border-b border-l border-[#00a6a6]/28" />
                <span className="absolute left-[10.5%] top-[18%] h-2 w-2 bg-[#00a6a6]/80 shadow-[0_0_0_4px_rgba(243,240,233,0.45)]" />
                <span className="absolute left-[41.5%] top-[35.5%] h-1.5 w-1.5 bg-[#00a6a6]/70" />
                <span className="absolute bottom-[20.5%] left-[60%] h-2.5 w-2.5 bg-[#00a6a6]/70 shadow-[0_0_0_4px_rgba(243,240,233,0.35)]" />
                <span className="hero-cad-crosshair absolute left-[56%] top-[48%] h-8 w-8 border border-[#00a6a6]/70" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 border-t border-white/60 bg-[#101c2c]/92 text-white backdrop-blur-sm">
                {["현업 이해", "빠른 실행", "전문 개발"].map((item, index) => (
                  <div key={item} className={`px-4 py-5 text-center text-[11px] font-extrabold tracking-[0.08em] sm:text-[13px] ${index < 2 ? "border-r border-white/20" : ""}`}>
                    <span className="mr-2 text-[#38d1c9]">0{index + 1}</span>{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="why" data-signature-scene className="presentation-scene border-y border-[#101c2c] bg-[#101c2c] text-[#f3f0e9] lg:min-h-[calc(100vh-74px)] lg:snap-start" aria-labelledby="why-title">
          <div aria-hidden="true" className="signature-why">
            <div className="signature-why-camera">
              <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
                <path className="why-network-line why-network-main" pathLength="1" d="M100 350H1100M210 350V160H520V350M520 350V545H835V350M835 350V170H1030" />
                <path className="why-network-pulse" pathLength="1" d="M100 350H1100M210 350V160H520V350M520 350V545H835V350M835 350V170H1030" />
              </svg>
              <div className="signature-why-object why-object-excel"><Grid3X3 /><b>EXCEL</b><span>수량 데이터</span></div>
              <div className="signature-why-object why-object-pdf"><FileText /><b>PDF</b><span>납품 문서</span></div>
              <div className="signature-why-object why-object-message"><MessageSquareText /><b>MESSENGER</b><span>대화 기록</span></div>
              <div className="signature-why-object why-object-calendar"><Clock3 /><b>CALENDAR</b><span>일정</span></div>
              <div className="signature-why-object why-object-revision"><Route /><b>REVISION</b><span>수정 이력</span></div>
              <div className="signature-why-object why-object-approval"><Check /><b>APPROVAL</b><span>승인</span></div>
            </div>
          </div>
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
              <div>
                <SectionKicker number="01" label="WHY NOW" />
                <h2 id="why-title" className="font-display mt-7 text-[clamp(2.45rem,4.4vw,4.8rem)] font-extrabold leading-[1.12] tracking-[-0.065em]">
                  업무는 이미<br /><span className="cue-underline cue-underline-sweep cue-color-amber inline-block whitespace-nowrap text-[#42d5ce]">하나로 연결되어</span><span className="cue-title-followup block">있습니다.</span>
                </h2>
                <p data-cue className="scene-support-copy mt-7 max-w-[760px] text-[16px] leading-7 text-[#c2d0d0]"><span className="block">업무는 연결돼 있지만, 파일 전달·일정 확인·수정 이력·승인과 자료 검색은</span><span className="block">분리돼 있었습니다.</span></p>
              </div>
              <div data-cue className="relative border-t border-white/25 pt-6">
                <p className="why-flow-label mb-8 text-[11px] font-extrabold tracking-[0.18em] text-[#42d5ce]">THE OPERATING FLOW</p>
                <ol className="flow-sequence grid divide-y divide-white/15 border-y border-white/15">
                  {flowSteps.map((step, index) => (
                    <li key={step} className="flow-step group flex items-center gap-5 py-5 sm:gap-8 sm:py-6">
                      <span className="font-display text-2xl font-extrabold text-[#42d5ce]">0{index + 1}</span>
                      <span className="text-xl font-bold tracking-[-0.03em] sm:text-2xl">{step}</span>
                      {index < flowSteps.length - 1 && <ChevronRight className="ml-auto hidden text-[#42d5ce] transition-transform duration-200 group-hover:translate-x-1 sm:block" />}
                    </li>
                  ))}
                </ol>
                <div aria-hidden="true" className="flow-data-corridor scene-scroll-parallax"><span className="flow-data-base" /><span className="flow-data-token"><FileText size={14} /><em>산출 파일</em></span><span className="flow-data-token"><Check size={14} /><em>검토 승인</em></span><span className="flow-data-token"><Grid3X3 size={14} /><em>Excel 출력</em></span><span className="flow-data-token"><FileText size={14} /><em>납품 문서</em></span></div>
                <div className="why-expansion-cards mt-8 grid gap-3 md:grid-cols-3">
                  {["클레임: 자료·쟁점 관리", "경영지원: 계약·재정·수금", "경영진: 전체 의사결정"].map((item) => (
                    <div key={item} className="min-w-0 break-words border border-white/20 px-4 py-4 text-[13px] font-semibold leading-5 text-[#dbe6e5]">{item}</div>
                  ))}
                </div>
              </div>
            </div>
            <p className="why-problem-copy scene-support-copy mt-20 border-l-2 border-[#42d5ce] pl-5 text-xl font-bold leading-8 sm:text-2xl">
              업무는 연결되어 있지만, <span className="text-[#42d5ce]">도구와 데이터는 나뉘어 있었습니다.</span>
            </p>
          </div>
        </section>

        <section id="build" className="presentation-scene mx-auto max-w-[1440px] border-x border-[#101c2c]/10 px-5 py-20 sm:px-8 lg:min-h-[calc(100vh-74px)] lg:snap-start lg:px-12 lg:py-20" aria-labelledby="team-title">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <SectionKicker number="02" label="HOW WE BUILD" />
              <h2 id="team-title" className="font-display mt-7 max-w-xl text-[clamp(2.5rem,4.8vw,5.1rem)] font-extrabold leading-[.98] tracking-[-0.07em]">
                현업의 질문을<br />
                <span className="cue-highlight-marker cue-color-sky text-[#008b8b]">제품의 언어로</span><br />바꿉니다.
              </h2>
            </div>
            <p data-cue className="scene-support-copy max-w-lg border-l-2 border-[#101c2c] pl-5 text-[17px] font-medium leading-8 text-[#456066]">
              한국 개발팀은 현업 문제를 정의하고 설계·검증합니다.<br />베트남 개발팀은 이를 공통 기능과 데이터로 구현합니다.
            </p>
          </div>
          <div data-cue className="mt-12 grid border-y border-[#101c2c]/15 lg:grid-cols-[.8fr_1.2fr]">
            <div className="build-team build-team-korea flex min-h-[340px] flex-col justify-between border-b border-[#101c2c]/15 py-8 pr-0 lg:border-b-0 lg:border-r lg:pr-10">
              <div>
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-[#008b8b]">THE BUILDING LOOP</p>
                <p className="build-team-count mt-3 text-[12px] font-extrabold tracking-[0.14em] text-[#547075]">KOREA / FIELD × 2</p>
                <div className="mt-8 grid gap-3">
                  {["현업 문제 정의", "빠른 시제품 제작", "실무 검증과 개선", "전문 개발로 안정화"].map((item, index) => (
                    <div key={item} className="flex items-center gap-4 border-b border-[#101c2c]/10 pb-3 text-[17px] font-bold">
                      <span className="grid h-7 w-7 place-items-center bg-[#101c2c] text-[11px] text-white">{index + 1}</span>{item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-8 max-w-[560px] text-[13px] font-semibold leading-6 tracking-[-0.02em] text-[#547075]"><span className="block">현업 전문가가 AI 개발도구를 활용해</span><span className="block">빠르게 설계·검증하고, 전문 개발자가</span><span className="block">안정적인 제품으로 발전시키는 방식입니다.</span></p>
            </div>
            <div className="build-schematic build-team build-team-vietnam relative min-h-[340px] overflow-hidden bg-[#101c2c] p-7 sm:p-10 lg:min-h-[430px]">
              <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#9bb2b2 1px, transparent 1px), linear-gradient(90deg, #9bb2b2 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
              <div className="relative flex h-full flex-col justify-between">
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-[#42d5ce]">VIETNAM / DEVELOPMENT × 3</p>
                <div className="build-stages relative grid gap-5 py-10 sm:grid-cols-3 sm:gap-0">
                  {[["FIELD", "현업 문제", "00"], ["LOOP", "빠른 검증", "01"], ["SYSTEM", "전문 개발", "02"]].map(([tag, label, code], index) => (
                    <div key={tag} className={`relative border-[#42d5ce]/45 px-4 py-5 ${index < 2 ? "sm:border-r" : ""}`}>
                      <span className="absolute -top-3 left-4 h-2 w-2 bg-[#42d5ce]" />
                      <p className="text-[10px] font-extrabold tracking-[0.16em] text-[#9bb2b2]">{code} / {tag}</p>
                      <p className="mt-4 text-[18px] font-extrabold text-white">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="border-l-2 border-[#42d5ce] pl-5">
                  <p className="font-display text-2xl font-extrabold leading-tight tracking-[-0.05em] text-white">현업 이해 × 빠른 실행 × 전문 개발</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="presentation-scene bg-[#e6e3da] py-12 lg:min-h-[calc(100vh-74px)] lg:snap-start lg:py-5" aria-labelledby="work-title">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:flex lg:min-h-[calc(100vh-114px)] lg:flex-col lg:px-12">
            <div className="grid gap-6 border-b border-[#101c2c]/15 pb-6 lg:shrink-0 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <SectionKicker number="03" label="WHAT CHANGED" />
                <h2 id="work-title" className="font-display mt-5 text-[clamp(2.35rem,4.05vw,4.4rem)] font-extrabold leading-[.98] tracking-[-0.07em]">큰 시스템보다<br /><span className="cue-underline safe-underline cue-color-coral text-[#008b8b]">매일의 불편부터.</span></h2>
              </div>
              <p data-cue className="scene-support-copy max-w-xl break-words text-[16px] leading-7 text-[#456066]">기술의 규모보다 먼저 줄인 것은 직원의 시간입니다.<br />대기·전달·검색·반복의 마찰부터 줄여 왔습니다.</p>
            </div>
            <div data-cue className="work-horizontal-track mt-5 border-y border-[#101c2c]/15 lg:flex lg:flex-1 lg:flex-col">
              <div className="hidden grid-cols-[92px_1.05fr_.95fr] border-b border-[#101c2c]/15 px-6 py-3 text-[11px] font-extrabold tracking-[0.16em] text-[#547075] lg:grid">
                <span>NODE</span><span>현업의 마찰</span><span>연결된 변화</span>
              </div>
              {dailyImprovements.map(({ code, title, issue, outcomeLead, outcomeTail, accent, icon: Icon }, index) => (
                <article key={title} data-cue className="work-row group grid gap-3 border-b border-[#101c2c]/15 py-5 last:border-b-0 lg:grid-cols-[92px_1.05fr_.95fr] lg:gap-0 lg:flex-1 lg:py-0" style={{ "--work-accent": accent } as React.CSSProperties}>
                  <div className="relative flex items-start px-0 lg:min-h-0 lg:border-r lg:border-[#101c2c]/15 lg:px-6 lg:pt-6">
                    <span className="work-node font-display text-[18px] font-extrabold" style={{ color: accent }}>{code}</span>
                    <span className="absolute left-[67px] top-[67px] hidden h-[calc(100%-67px)] border-l border-dashed lg:block" style={{ borderColor: `${accent}70` }} />
                    <span className="absolute left-[63px] top-[61px] hidden h-2.5 w-2.5 lg:block" style={{ backgroundColor: accent }} />
                  </div>
                  <div className="px-0 lg:border-r lg:border-[#101c2c]/15 lg:px-7 lg:py-6">
                    <div className="flex items-center gap-3"><Icon className="work-icon" size={21} strokeWidth={1.9} style={{ color: accent }} /><h3 className="font-display text-2xl font-extrabold tracking-[-0.05em]">{title}</h3></div>
                    <p className="mt-3 max-w-none break-keep text-[15px] leading-6 text-[#547075]">{issue}</p>
                  </div>
                  <div className="relative border-l-2 pl-5 lg:my-6 lg:ml-7 lg:border-l-0 lg:pl-7 lg:pr-8" style={{ borderColor: accent }}>
                    <p className="text-[11px] font-extrabold tracking-[0.16em]" style={{ color: accent }}>SYSTEM RESPONSE</p>
                    <p className="mt-3 max-w-none break-keep text-[15px] font-bold leading-6 text-[#101c2c]"><span className="font-extrabold" style={{ color: accent }}>{outcomeLead}</span>{outcomeTail}</p>
                    {index < dailyImprovements.length - 1 && <ChevronRight size={19} className="absolute bottom-0 right-6 hidden translate-y-1/2 bg-[#e6e3da] lg:block" style={{ color: accent }} />}
                  </div>
                </article>
              ))}
            </div>
            <div data-cue className="mt-5 flex flex-col gap-3 border-l-2 border-[#00a6a6] pl-5 sm:flex-row sm:items-baseline sm:justify-between lg:shrink-0">
              <p className="font-display max-w-3xl text-xl font-extrabold tracking-[-0.04em]">내부의 시간과 비용을 줄이고, 외부 제작·유지보수 기반도 함께 만듭니다.</p>
              <span className="shrink-0 text-[12px] font-extrabold tracking-[0.14em] text-[#008b8b]">IMPROVEMENT STARTS SMALL</span>
            </div>
          </div>
        </section>

        <section id="foundation" className="presentation-scene relative overflow-hidden bg-[#101c2c] text-[#f3f0e9] lg:min-h-[calc(100vh-74px)] lg:snap-start" aria-labelledby="foundation-title">
          <div className="foundation-base mx-auto grid max-w-[1440px] lg:grid-cols-[1.1fr_.9fr]">
            <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
              <SectionKicker number="04" label="COMMON FOUNDATION" />
              <h2 id="foundation-title" className="font-display mt-7 max-w-2xl text-[clamp(2.5rem,4.5vw,5rem)] font-extrabold leading-[1.12] tracking-[-0.07em]">이제 시스템이<br /><span className="whitespace-nowrap"><span className="cue-highlight-marker cue-color-lime inline-block">흐름과 이력을</span> 관리합니다.</span></h2>
              <p data-cue className="scene-support-copy mt-8 max-w-xl text-[17px] leading-8 text-[#c2d0d0]">프로젝트·업무·일정·승인·변경 이력을 하나의 흐름에 놓습니다.<br />메신저는 대화에서 업무와 기록을 시작합니다.</p>
              <div data-cue className="foundation-product-plan mt-9">
                <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#42d5ce]">LONG-TERM PRODUCT PLAN</p>
                <p className="mt-3 max-w-xl text-[14px] leading-6 text-[#dbe6e5]">회사의 업무 방식을 외부 솔루션에 맞추는 것이 아니라,<br />우리 업무에 맞는 시스템을 직접 만듭니다.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-[1.16fr_.92fr_.92fr]">
                  {[["GROUPWARE", "프로젝트 · 업무 · 일정 · 승인 · 변경 이력", false], ["MESSENGER", "업무와 연결되는 사내 커뮤니케이션", false], ["CLAIM CENTER", "건설 클레임 업무 전용 독립 시스템", true]].map(([name, desc, isolated]) => (
                    <div key={name as string} className="foundation-product-card min-w-0 border border-white/20 p-4"><p className="whitespace-nowrap text-[11px] font-extrabold tracking-[0.12em] text-white">{name as string}</p><p className="mt-3 text-[12px] leading-5 text-[#c2d0d0]">{desc as string}</p>{isolated && <span className="mt-3 inline-block border border-[#42d5ce] px-2 py-1 text-[9px] font-extrabold tracking-[0.08em] text-[#42d5ce]">그룹웨어와 별도 운영</span>}</div>
                  ))}
                </div>
              </div>
              <div className="groupware-sequence mt-9" data-cue><span>MESSAGE</span><i /><span>CALENDAR</span><i /><span>REVIEW</span><i /><span>APPROVAL</span><i /><span>HISTORY</span></div>
            </div>
            <div data-cue className="foundation-preview relative min-h-[420px] overflow-hidden border-t border-white/15 lg:border-l lg:border-t-0">
              <img src={manusAsset("groupware-dashboard_c4f7d7ee.png")} alt="CONCOST 그룹웨어 통합 대시보드" className="foundation-dashboard-preview h-full w-full object-cover object-top" />
              <div aria-hidden="true" className="foundation-preview-scan" />
            </div>
          </div>

          <div aria-hidden="true" className="foundation-transition-surface" />

          <div data-cue className="foundation-space foundation-space-groupware"><div className="foundation-space-copy"><p>01 — GROUPWARE</p><h3>업무의 흐름을<br />한 곳에서.</h3><span>프로젝트 · 업무 · 일정 · 승인 · 변경 이력</span></div><div className="foundation-app-frame"><img src={manusAsset("groupware-board_45f13c16.png")} alt="CONCOST 그룹웨어 프로젝트 보드" className="groupware-board-screen" /><div aria-hidden="true" className="continuous-data-line data-line-project" /></div></div>
          <div data-cue className="foundation-space foundation-space-messenger"><div className="foundation-space-copy"><p>02 — MESSENGER</p><h3><span className="block whitespace-nowrap">대화에서 업무로,</span><span className="block whitespace-nowrap">메신저가 업무와 이어집니다.</span></h3><span>프로젝트별 대화 · 업무 생성 · 일정 변경 · 파일 · 승인 알림</span></div><div className="messenger-stage"><img src={manusAsset("messenger-ui_25d14687.png")} alt="CON-COST 사내 메신저 화면" className="messenger-product-screen" /><div aria-hidden="true" className="continuous-data-line data-line-message" /></div></div>
          <div data-cue className="foundation-space foundation-space-claim"><div className="foundation-space-copy"><p>03 — CLAIM CENTER</p><h3>사건 · 쟁점 · 증거 · 기한을<br />하나의 체계로.</h3><span>건설 클레임 업무 전용 독립 시스템</span></div><div className="claim-cinematic-stage"><img src={claimCenterEndFrameSrc} alt="CONCOST Claim Center Studio 제품 비전 최종 화면" className="claim-endframe-screen" />{claimCenterVideoSrc && <video className="claim-cinematic-video" src={claimCenterVideoSrc} poster={claimCenterEndFrameSrc} muted playsInline preload="auto" onEnded={(event) => { const foundation = event.currentTarget.closest("#foundation"); foundation?.classList.remove("claim-video-playing"); foundation?.classList.add("claim-video-settled"); }} onError={(event) => { const foundation = event.currentTarget.closest("#foundation"); foundation?.classList.remove("claim-video-playing"); foundation?.classList.add("claim-video-settled"); }} />}<div aria-hidden="true" className="claim-video-progress"><i /></div><div aria-hidden="true" className="continuous-data-line data-line-claim" /></div></div>
          <div data-cue className="foundation-space foundation-space-products"><div className="foundation-space-copy"><p>THREE PRODUCT VIEW</p><h3><span>세 개의 시스템,</span><span>하나의 업무 흐름.</span></h3></div><div className="product-camera-rig"><div className="product-spatial"><div className="product-screen product-screen-groupware"><img src={manusAsset("groupware-board_45f13c16.png")} alt="Groupware 제품 화면" className="product-screen-shot" /></div><div className="product-screen product-screen-messenger"><img src={manusAsset("messenger-ui_25d14687.png")} alt="Messenger 제품 화면" className="product-screen-shot" /></div><div className="product-screen product-screen-claim"><img src={claimCenterEndFrameSrc} alt="Claim Center 제품 비전 최종 화면" className="product-screen-shot" /></div><div aria-hidden="true" className="product-link product-link-one" /><div aria-hidden="true" className="product-link product-link-two" /><div aria-hidden="true" className="product-link product-link-three" /><div aria-hidden="true" className="continuous-data-line data-line-products" /></div></div></div>
          <div data-cue className="foundation-space foundation-space-vision"><div className="foundation-space-copy"><p>LONG-TERM PRODUCT PLAN</p><h3><span className="vision-main-line vision-tone-teal">우리 업무에 맞추고</span><span className="vision-main-line vision-tone-cyan">불편은 줄이고</span><span className="vision-main-line vision-tone-gold">필요한 시스템은</span><span className="vision-main-line vision-tone-gold">우리가 직접 만듭니다.</span></h3><strong>GROUPWARE · MESSENGER · CLAIM CENTER</strong><em>업무 친화성과 사용자의 불편 최소화를 최우선으로 하는 자체개발 시스템</em></div><div aria-hidden="true" className="vision-product-echo"><div><img src={manusAsset("groupware-board_45f13c16.png")} alt="" /><small>GROUPWARE</small><i /></div><div><img src={manusAsset("messenger-ui_25d14687.png")} alt="" /><small>MESSENGER</small><i /></div><div><img src={claimCenterEndFrameSrc} alt="" /><small>CLAIM CENTER</small><i /></div><span className="vision-link vision-link-one" /><span className="vision-link vision-link-two" /><span className="vision-link vision-link-three" /><span className="continuous-data-line data-line-exit" /></div></div>
        </section>

        <section id="showcase" className="presentation-scene relative overflow-hidden border-y border-[#101c2c]/15 bg-[#e6e3da] lg:min-h-[calc(100vh-74px)] lg:snap-start" aria-labelledby="showcase-title"><div aria-hidden="true" className="showcase-entry-line" /><div aria-hidden="true" className="showcase-operating-board"><i className="showcase-flow-corner showcase-flow-corner-one" /><i className="showcase-flow-corner showcase-flow-corner-two" /><i className="showcase-flow-corner showcase-flow-corner-three" /><b className="showcase-signal-block showcase-signal-one" /><b className="showcase-signal-block showcase-signal-two" /></div>
          <div className="showcase-content relative z-[1] mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:pr-44 lg:py-8">
            <div className="grid gap-5 border-b border-[#101c2c]/15 pb-5 lg:grid-cols-[.84fr_1.16fr] lg:items-end">
              <div>
                <SectionKicker number="05" label="DIGITAL PRODUCTS & CLIENT WORK" />
                <h2 id="showcase-title" className="font-display mt-4 text-[clamp(2.05rem,3.45vw,3.55rem)] font-extrabold leading-[1] tracking-[-0.07em]"><span className="block">우리가 만든 것은</span><span className="block whitespace-nowrap">업무 기반부터 <span className="cue-highlight-marker cue-color-sky">웹사이트까지.</span></span></h2>
              </div>
              <p data-cue className="scene-support-copy max-w-2xl text-[14px] leading-6 text-[#456066] sm:text-[15px]"><span className="block whitespace-nowrap">전문 지식과 실행 경험을 자체 플랫폼으로 서비스화합니다.</span><span className="block whitespace-nowrap">같은 개발 역량으로 고객사의 브랜 드 화면까지 구현합니다.</span></p>
            </div>

            <div data-cue className="showcase-conversion-axis" aria-label="현업 불편을 시스템화해 표준 자산으로 전환하는 흐름"><span><b>01</b> 현업 불편</span><i /><span><b>02</b> 시스템화</span><i /><span><b>03</b> 표준 자산</span></div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {ownedPlatforms.map((platform, index) => (
                <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer" aria-disabled={undefined} onClick={(event) => { if (document.documentElement.classList.contains("presentation-mode")) { event.preventDefault(); event.stopPropagation(); } }} onKeyDown={(event) => { if (document.documentElement.classList.contains("presentation-mode") && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); event.stopPropagation(); } }} data-presentation-link data-no-cue data-cue className={`showcase-platform showcase-platform-${index === 0 ? "primary" : "secondary"} group relative grid overflow-hidden border border-[#101c2c]/20 bg-[#f3f0e9] transition-transform duration-300 hover:-translate-y-1 lg:grid-cols-[1.05fr_.95fr]`}><span aria-hidden="true" className="showcase-case-node">0{index + 1}</span>
                  <div className="platform-evidence-stage relative min-h-[174px] overflow-hidden bg-[#101c2c]">
                    <img src={platform.image} alt={`${platform.name} 대표 화면`} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    <span aria-hidden="true" className="platform-evidence-coordinate">EVIDENCE / 0{index + 1}</span>
                    <span aria-hidden="true" className="platform-evidence-origin">LIVE SERVICE FRAME</span>
                    <div className="absolute inset-x-0 bottom-0 bg-[#101c2c]/88 px-4 py-3 text-[10px] font-extrabold tracking-[0.15em] text-white backdrop-blur-sm">{platform.code}</div>
                    <div aria-hidden="true" className="platform-live-screen"><div className="platform-browser-bar"><i /><i /><i /><span>LIVE / {platform.name}</span></div><img src={platform.image} alt="" className="h-full w-full object-cover object-top" /><p className="platform-feature-caption">{platform.name === "공사비닷컴" ? "공사비 검색 · 내역서 작성 · 실무 교육" : "Quantity Take-off · BOQ / WBS · 견적 검토"}</p></div>
                  </div>
                  <div className="flex flex-col justify-between p-4 sm:p-5">
                    <div>
                      <div className="flex items-start justify-between gap-3"><p className="text-[10px] font-extrabold tracking-[0.15em] text-[#008b8b]">OWNED PLATFORM</p><ArrowUpRight size={18} className="shrink-0 text-[#101c2c]" /></div>
                      <h3 className="font-display mt-3 text-2xl font-extrabold tracking-[-0.055em] text-[#101c2c]">{platform.name}</h3>
                      <p className="mt-1 text-[13px] font-bold text-[#456066]">{platform.category}</p>
                      <p className="mt-3 break-words text-[13px] leading-5 text-[#547075]">{platform.name === "공사비닷컴" ? <><span className="block">공사비 검색부터 내역서 작성·교육·건설 장터까지,</span><span className="block">견적 실무의 정보를 하나의 서비스 흐름으로 연결합니다.</span></> : <><span className="block">수량산출·공사비 검토·설계변경 정산을</span><span className="block">바탕으로, 견적 전문성과 해외 프로젝트 실행을</span><span className="block">연결합니다.</span></>}</p>
                      <div className="platform-workflow mt-4" aria-label={`${platform.name} 업무 흐름`}>
                        {platform.workflow.map(([label, value], workflowIndex) => <div key={label} className={workflowIndex === 1 ? "platform-workflow-active" : ""}><small>{label}</small><span>{value}</span></div>)}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">{platform.tags.map((tag) => <span key={tag} className="border border-[#101c2c]/15 px-2 py-1 text-[10px] font-bold text-[#395258]">{tag}</span>)}</div>
                  </div>
                </a>
              ))}
            </div>

            <div data-cue className="mt-5 border-t border-[#101c2c]/15 pt-4">
              <div className="flex items-end justify-between gap-4">
                <div><p className="text-[10px] font-extrabold tracking-[0.16em] text-[#547075]">CLIENT WEBSITE BUILD</p><p className="font-display mt-1 text-xl font-extrabold tracking-[-0.045em] text-[#101c2c]">외부 의뢰 웹사이트도 제작합니다.</p></div>
                <p className="hidden max-w-none whitespace-nowrap text-right text-[12px] leading-5 text-[#547075] sm:block">산업의 언어와 고객 경험을 이해한 뒤, 정보 구조·문의 흐름·브랜드 화면까지 구현합니다.</p>
              </div>
              <div className="client-website-evidence-grid mt-3 grid gap-3 sm:grid-cols-3">
                {clientWebsites.map((site, index) => (
                  <a key={site.name} href={site.href} target="_blank" rel="noreferrer" aria-disabled={undefined} onClick={(event) => { if (document.documentElement.classList.contains("presentation-mode")) { event.preventDefault(); event.stopPropagation(); } }} onKeyDown={(event) => { if (document.documentElement.classList.contains("presentation-mode") && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); event.stopPropagation(); } }} data-presentation-link data-no-cue className={`client-browser-card client-browser-card-${index + 1} group relative grid min-w-0 overflow-hidden border border-[#101c2c]/15 bg-[#f3f0e9]`}><span aria-hidden="true" className="showcase-case-node showcase-case-node-client">0{index + 3}</span>
                    <div className="client-site-frame relative overflow-hidden bg-[#101c2c]"><img src={site.image} alt={`${site.name} 웹사이트 화면`} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" /><span aria-hidden="true" className="client-site-frame-label">SITE EVIDENCE</span></div>
                    <div className="client-card-details flex min-w-0 flex-col justify-between"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-display break-words font-extrabold tracking-[-0.04em] text-[#101c2c]">{site.name}</p><p className="mt-1 break-words font-bold text-[#547075]">{site.type}</p></div><ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[#008b8b]" /></div><p className="client-card-meta text-[9px] font-extrabold tracking-[0.12em] text-[#008b8b]">CLIENT PROJECT · WEBSITE BUILD</p></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" data-signature-scene className="presentation-scene mx-auto max-w-[1440px] border-x border-[#101c2c]/10 px-5 py-20 sm:px-8 lg:min-h-[calc(100vh-74px)] lg:snap-start lg:px-12 lg:py-20" aria-labelledby="roadmap-title">
          <div aria-hidden="true" className="signature-rc-cad">
            <div className="signature-rc-crosshair"><i /><i /></div>
            <svg className="signature-rc-drawing" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet">
              <path className="rc-line" pathLength="1" d="M115 128H790M115 555H790" />
              <path className="rc-wall" pathLength="1" d="M170 180H735V510H170ZM235 242H670V450H235Z" />
              <path className="rc-beam" pathLength="1" d="M235 330H670M450 242V450" />
              <path className="rc-slab" pathLength="1" d="M250 260H435V315H250ZM465 345H650V430H465Z" />
              <path className="rc-dimension" pathLength="1" d="M170 130V108M735 130V108M170 116H735M158 180H135M158 510H135M145 180V510" />
              <text className="rc-label rc-label-one" x="270" y="292">SLAB S1</text>
              <text className="rc-label rc-label-two" x="492" y="390">BEAM B2</text>
              <text className="rc-label rc-label-three" x="410" y="102">5,650</text>
              <text className="rc-label rc-label-four" x="105" y="355">3,300</text>
            </svg>
            <div className="signature-rc-sequence"><span>LINE</span><span>WALL</span><span>BEAM</span><span>SLAB</span><span>LABEL</span><span>DIMENSION</span><span>QUANTITY</span></div>
            <div className="signature-rc-quantity"><small>AUTO QUANTITY</small><p><span>WALL</span><b>128.40 m²</b></p><p><span>BEAM</span><b>42.80 m</b></p><p><span>SLAB</span><b>86.25 m²</b></p><strong>TOTAL / 257.45</strong></div>
            <div className="signature-rc-copy"><p>반복 명령은 프로그램이</p><p>검토와 판단은 사람이</p></div>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.04fr_.96fr] lg:items-start">
            <div>
              <SectionKicker number="06" label="FROM CONNECTION TO INTELLIGENCE" />
              <h2 id="roadmap-title" className="font-display mt-7 text-[clamp(2.5rem,4.4vw,4.8rem)] font-extrabold leading-[.98] tracking-[-0.07em]">본업의 반복을 줄이고,<br /><span className="cue-highlight-marker cue-color-violet">표준을 만듭니다.</span></h2>
                <p data-cue className="roadmap-support-copy scene-support-copy mt-8 max-w-[540px] text-[17px] leading-8 text-[#456066]"><span className="block lg:whitespace-nowrap">RC-CAD와 전문 프로그램은 반복 입력·집계·양식 편차를 줄입니다.</span><span className="block lg:whitespace-nowrap">사람은 검토와 판단에 더 집중합니다.</span></p>
            </div>
            <div data-cue className="roadmap-draft relative min-h-[320px] overflow-hidden border border-[#101c2c]/15 bg-[#dfe5e0] lg:min-h-[370px]">
              <ParallaxImage src={manusAsset("devlab-roadmap_a1fcd200.jpg")} alt="연결에서 표준화와 지능화로 이어지는 발전 과정" className="h-full w-full object-cover" intensity={1.1} />
              <div aria-hidden="true" className="cad-draw-sequence"><i /><i /><i /><i /><i /></div>
              <div className="absolute inset-x-0 bottom-0 bg-[#f3f0e9]/95 p-5 backdrop-blur-sm sm:p-7">
                <p className="font-display text-xl font-extrabold tracking-[-0.045em]">반복 명령은 프로그램이, 검토와 판단은 사람이.</p>
              </div>
            </div>
          </div>
          <div data-cue className="relative mt-16 grid gap-0 border-y border-[#101c2c]/15 lg:grid-cols-3">
            {[
              ["현재", "연결", "그룹웨어 · 메신저 · 일정 · 업무 · 이력"],
              ["다음", "표준화", "RC-CAD · 토목 전문 프로그램 · 산출·검토·납품 양식"],
              ["이후", "지능화", "산출물 자동검토 · 과거 프로젝트 비교 · 경영 대시보드 · 지식 데이터베이스"],
            ].map(([stage, title, desc], index) => (
              <div key={title} className={`roadmap-stage relative min-h-[195px] px-6 py-7 sm:px-8 ${index < 2 ? "border-b border-[#101c2c]/15 lg:border-b-0 lg:border-r" : ""}`}>
                <p className="text-[11px] font-extrabold tracking-[0.18em] text-[#008b8b]">0{index + 1} / {stage}</p>
                <h3 className="font-display mt-5 text-3xl font-extrabold tracking-[-0.055em]">{title}</h3>
                <p className="mt-4 max-w-sm text-[14px] font-medium leading-6 text-[#547075]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="impact" className="presentation-scene border-y border-[#101c2c]/15 bg-[#e6e3da] lg:min-h-[calc(100vh-74px)] lg:snap-start" aria-labelledby="impact-title">
          <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-10">
            <div className="grid gap-6 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
              <div>
                <SectionKicker number="07" label="WHO BENEFITS" />
                <h2 id="impact-title" className="font-display mt-5 text-[clamp(2.25rem,3.85vw,4.15rem)] font-extrabold leading-[1.12] tracking-[-0.07em]">개발의 효과는<br /><span className="whitespace-nowrap"><span className="cue-underline safe-underline cue-color-rose inline-block text-[#008b8b]">모든 부서에</span> 나타납니다.</span></h2>
              </div>
              <p data-cue className="scene-support-copy min-w-0 max-w-none break-words text-[15px] leading-7 text-[#456066]"><span className="block">각 부서가 같은 맥락에서 일하고 필요한 정보를 빠르게 확인합니다.</span><span className="block">개발의 효과는 더 나은 결정으로 이어집니다.</span></p>
            </div>
            <div data-cue className="impact-ledger relative mt-6 border-y border-[#101c2c]/15 bg-[#f3f0e9]"><div aria-hidden="true" className="impact-system-core">SYSTEM</div>
              <div className="hidden grid-cols-[72px_.72fr_1.28fr] border-b border-[#101c2c]/15 px-6 py-2 text-[10px] font-extrabold tracking-[0.16em] text-[#547075] lg:grid"><span>AXIS</span><span>업무 조직</span><span>달라지는 경험</span></div>
              {departments.map(([title, desc], index) => (
                <article key={title} data-cue className="group grid min-w-0 gap-3 border-b border-[#101c2c]/15 px-0 py-4 last:border-b-0 lg:grid-cols-[72px_.72fr_1.28fr] lg:gap-0 lg:py-1">
                  <div className="relative px-0 lg:border-r lg:border-[#101c2c]/15 lg:px-6 lg:py-6"><span className="font-display text-[15px] font-extrabold text-[#008b8b]">0{index + 1}</span><span className="absolute bottom-0 left-[29px] top-[46px] hidden border-l border-dashed border-[#00a6a6]/35 lg:block" /></div>
                  <div className="min-w-0 px-0 lg:border-r lg:border-[#101c2c]/15 lg:px-6 lg:py-6"><h3 className="font-display break-words text-xl font-extrabold tracking-[-0.05em]">{title}</h3></div>
                  <div className="relative min-w-0 border-l-2 border-[#00a6a6] pl-5 lg:my-6 lg:ml-6 lg:border-l-0 lg:pl-6 lg:pr-7"><p className="min-w-0 max-w-none break-words text-[13px] leading-5 text-[#547075]">{desc}</p><ArrowUpRight size={16} className="absolute right-0 top-0 hidden text-[#00a6a6] lg:block" /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="message" className="presentation-scene relative overflow-hidden bg-[#101c2c] text-white lg:min-h-[calc(100vh-74px)] lg:snap-start" aria-labelledby="message-title">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-[#00a6a6]" />
          <div aria-hidden="true" className="message-convergence"><i /><i /><i /><i /><i /></div>
          <div className="relative z-[1] mx-auto flex min-h-[100svh] max-w-[1160px] flex-col items-center justify-center px-5 py-16 text-center sm:px-8 lg:min-h-[100vh] lg:px-12">
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#42d5ce]">THE NEXT TASK STARTS WITH YOU</p>
            <h2 id="message-title" className="font-display mt-7 max-w-[1050px] text-[clamp(3rem,6vw,6.8rem)] font-extrabold leading-[.92] tracking-[-0.08em]"><span className="ending-line ending-line-system cue-highlight-marker cue-color-coral">반복은 시스템이,</span><br /><span className="ending-line ending-line-human cue-underline safe-underline cue-color-amber">판단은 사람이.</span></h2>
            <div className="mt-12 w-full max-w-[900px] border-y border-white/20 px-4 py-8 sm:px-8 lg:mt-14 lg:px-12 lg:py-10">
              <p className="text-[clamp(1.35rem,1.65vw,1.9rem)] font-bold leading-[1.45] tracking-[-0.045em]">개인의 경험을 회사의 시스템과 자산으로 남기겠습니다.</p>
              <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#c2d0d0] lg:text-[17px] lg:leading-8">직원 한 명의 불편이 다음 개발과제가 됩니다. 더 잘 일하는 방식을 함께 만들어 갑니다.</p>
            </div>
          </div>
        </section>

        <section id="brand-end" data-signature-scene className="presentation-scene brand-end-scene relative grid overflow-hidden bg-[#0c1724] lg:min-h-[calc(100vh-74px)] lg:snap-start" aria-label="CONCOST 브랜드 엔드카드">
          <div aria-hidden="true" className="signature-ending">
            <div className="ending-object ending-object-excel"><Grid3X3 /><span>EXCEL CELL</span></div>
            <div className="ending-object ending-object-cad"><Route /><span>CAD LINE</span></div>
            <div className="ending-object ending-object-groupware"><FolderKanban /><span>GROUPWARE</span></div>
            <div className="ending-object ending-object-message"><MessageSquareText /><span>MESSENGER</span></div>
            <div className="ending-object ending-object-claim"><FileText /><span>CLAIM</span></div>
            <div className="ending-object ending-object-browser"><Network /><span>WEB BROWSER</span></div>
            <i className="ending-compression-line" />
            <div className="ending-blackout" />
            <div className="ending-signature-copy"><p>반복은 시스템이,</p><p>판단은 사람이.</p></div>
          </div>
          <div className="brand-end-logo" aria-label="CONCOST"><img src={manusAsset("concost-logo_747fe330.png")} alt="CONCOST" /><p className="ending-thanks">감사합니다</p></div>
        </section>
      </main>
      <PresentationControls />

      <footer className="bg-[#101c2c] text-[#c2d0d0]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-8 text-[12px] font-semibold sm:px-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <div className="flex items-center gap-3 text-white"><span className="h-2 w-2 bg-[#42d5ce]" /> DEVELOPMENT / OPERATION LAB</div>
          <p>우리의 전문성을 더 잘 일하는 방식으로 남깁니다.</p>
        </div>
      </footer>
    </div>
  );
}
