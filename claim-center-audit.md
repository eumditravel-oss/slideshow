# CLAIM CENTER 화면 점검 기록

- 1366×768 COMMON FOUNDATION 기본 화면에서 `CLAIM CENTER` 제품 카드 제목은 한 줄이며 카드 경계 안에 유지됩니다.
- 해당 카드의 보조 문구는 한 줄로 표시되고, 제품 카드의 제목·설명 자동 검증은 통과했습니다.
- Claim 영상 재생 cue의 0.9초 캡처는 영상 자체의 오프닝 프레임으로, 제품 카드 제목 레이아웃 검증 대상과 분리해 확인해야 합니다.
- 1920×1080 기본 화면에서도 `CLAIM CENTER` 제품 카드 제목·설명·상태 라벨은 모두 한 줄이며 카드 경계 안에 유지됩니다.
- 1920×1080 video skip EndFrame에서는 `CONCOST · CLAIM CENTER STUDIO` 상단 라벨, `PRODUCT VISION` 배지, 하단 Claim 제목 카드가 서로 분리되어 있고, 제목의 두 줄 줄바꿈은 문장 단위로 유지됩니다.
- 1366×768 video skip EndFrame에서도 상단 제품명·우측 `PRODUCT VISION` 배지·하단 Claim 제목 카드가 서로 겹치지 않습니다. 제목은 `사건 · 쟁점 · 증거 · 기한을 / 하나의 체계로.`의 의도된 두 줄로 표시되고, 보조 문구는 같은 카드 안에 안전하게 유지됩니다.
- 1920×1080·1366×768 기본 화면과 Claim EndFrame을 함께 점검한 결과, 제품 카드·영상 제목·보조 문구에 수정이 필요한 겹침 또는 비의도적 줄바꿈은 발견되지 않았습니다.

## 첫 프레임 및 대비 리허설

Claim cue 전환 후 490ms 시점의 1366×768 캡처에서 EndFrame은 사라졌고 video element는 재생 중이지만 영상의 가시 콘텐츠가 아직 나타나지 않아 navy blank surface가 노출되었습니다. 현재 first-frame handoff는 자연스럽지 않으므로, EndFrame을 유지한 채 실제 video의 안정 프레임이 준비된 뒤 짧게 crossfade하는 방식으로 보정해야 합니다.

같은 cue의 약 1.15초 시점에는 영상 내부의 중앙 프레임이 나타나지만, 제목이 왼쪽에서 잘린 중간 연출 상태입니다. 따라서 영상의 0.18초 구간을 바로 노출하기보다, 시작 전 EndFrame을 유지하고 안정적으로 읽을 수 있는 첫 구간부터 재생하는 방식을 적용해야 합니다.

원본 영상의 0.18초와 0.60초 프레임을 직접 점검한 결과, 영상 자체는 이미 전체 canvas를 채우는 읽기 가능한 Claim Center Studio 타이틀 프레임을 갖고 있습니다. 브라우저에서 navy blank surface가 노출된 원인은 영상 소스가 아니라, video의 실제 프레임 paint 전에 EndFrame opacity를 낮춘 handoff 순서입니다. video가 재생될 때의 첫 실제 compositor frame을 확인한 뒤 EndFrame을 crossfade해야 합니다.

첫 frame handoff 보정 후 1366×768에서 약 0.79초 시점의 video surface는 Claim Center Studio 타이틀을 전체 화면으로 표시하며 navy blank surface가 나타나지 않았습니다. EndFrame은 정적 밝기·대비 보정을 적용해 상단 브랜드 라벨, 우측 PRODUCT VISION 배지, 하단 Claim 제목 카드가 밝은 제품 화면과 명확하게 분리되는 것을 확인했습니다.
