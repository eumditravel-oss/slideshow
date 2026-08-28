import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");

describe("long presentation copy wrapping", () => {
  it("keeps build support copy in semantic blocks", () => {
    expect(source).toContain("현업 전문가가 AI 개발도구를 활용해</span>");
    expect(source).toContain("빠르게 설계·검증하고, 전문 개발자가</span>");
    expect(source).toContain("안정적인 제품으로 발전시키는 방식입니다.</span>");
  });

  it("keeps WHY NOW and impact support copy in complete sentence blocks", () => {
    expect(source).toContain("파일 전달·일정 확인·수정 이력·승인과 자료 검색은</span>");
    expect(source).toContain("분리돼 있었습니다.</span>");
    expect(source).toContain("필요한 정보를 빠르게 확인합니다.</span>");
    expect(source).toContain("개발의 효과는 더 나은 결정으로 이어집니다.</span>");
  });

  it("keeps owned platform descriptions readable by semantic line", () => {
    expect(source).toContain("공사비 검색부터 내역서 작성·교육·건설 장터까지,");
    expect(source).toContain("바탕으로, 견적 전문성과 해외 프로젝트 실행을");
  });
});

  it("guards owned and client website links during presentation mode", () => {
    expect(source).toContain('data-presentation-link');
    expect(source).toContain('document.documentElement.classList.contains("presentation-mode")');
    expect(source).toContain('event.preventDefault(); event.stopPropagation();');
    expect(source).toContain('href={platform.href} target="_blank"');
    expect(source).toContain('href={site.href} target="_blank"');
  });
