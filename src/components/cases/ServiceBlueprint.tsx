import { PostItNote } from "../ui/PostItTag";

export const BLUEPRINT_STAGE_TONES = {
  blue: "post-it-blue",
  mint: "post-it-mint",
  lavender: "post-it-lavender",
} as const;

export type BlueprintStageTone = keyof typeof BLUEPRINT_STAGE_TONES;

export type BlueprintStage = {
  journey: string;
  frontstage: string | null;
  tone: BlueprintStageTone;
  userAction?: string;
  backstage?: string;
  /** When set, the frontstage cell spans this many columns. */
  frontstageSpan?: number;
};

type ServiceBlueprintProps = {
  title: string;
  journeyLane: string;
  frontstageLane: string;
  stages: readonly BlueprintStage[];
  toneOffset?: number;
  userActionLane?: string;
  backstageLane?: string;
};

function LaneLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center self-stretch rounded-lg bg-neutral-100/80 px-1">
      <span className="max-w-[4.2rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-neutral-500 [writing-mode:vertical-rl] rotate-180">
        {label}
      </span>
    </div>
  );
}

function EmptyFrontstage({ index }: { index: number }) {
  return (
    <div
      key={`front-empty-${index}`}
      className="min-h-[5.75rem] flex items-center px-1"
      aria-hidden
    >
      <div className="w-full border-t-2 border-neutral-900" />
    </div>
  );
}

export function ServiceBlueprint({
  title,
  journeyLane,
  frontstageLane,
  stages,
  toneOffset = 0,
  userActionLane,
  backstageLane,
}: ServiceBlueprintProps) {
  const hasExtendedLanes = stages.some(
    (stage) => stage.userAction != null || stage.backstage != null,
  );
  const columns = `4.75rem repeat(${stages.length}, minmax(${hasExtendedLanes ? "9.5rem" : "8.5rem"}, 1fr))`;
  const noteMinH = hasExtendedLanes ? "min-h-[7.5rem]" : "min-h-[8rem]";
  const frontMinH = hasExtendedLanes ? "min-h-[7.5rem]" : "min-h-[5.75rem]";

  const frontstageCells: Array<{
    stage: BlueprintStage;
    index: number;
    span: number;
  }> = [];

  for (let index = 0; index < stages.length; ) {
    const stage = stages[index];
    const span = stage.frontstage ? (stage.frontstageSpan ?? 1) : 1;
    frontstageCells.push({ stage, index, span });
    index += span;
  }

  return (
    <div>
      <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-neutral-950">
        {title}
      </h3>

      <div className="mt-5 -mx-5 md:mx-0 overflow-x-auto pb-2">
        <div
          className={`px-5 md:px-0 ${hasExtendedLanes ? "min-w-[1100px]" : "min-w-[820px] md:min-w-0"}`}
        >
          <div
            className="grid items-stretch gap-x-3"
            style={{ gridTemplateColumns: columns }}
          >
            <LaneLabel label={journeyLane} />
            {stages.map((stage, index) => (
              <PostItNote
                key={`journey-${stage.journey}-${index}`}
                index={index + toneOffset}
                tone={BLUEPRINT_STAGE_TONES[stage.tone]}
                compact
                className={`${noteMinH} flex items-center !rotate-0`}
              >
                <p className="text-sm leading-snug text-neutral-950 text-pretty">
                  {stage.journey}
                </p>
              </PostItNote>
            ))}
          </div>

          {hasExtendedLanes && userActionLane ? (
            <div
              className="mt-3 grid items-stretch gap-x-3 border-t border-dashed border-neutral-300 pt-3"
              style={{ gridTemplateColumns: columns }}
            >
              <LaneLabel label={userActionLane} />
              {stages.map((stage, index) =>
                stage.userAction ? (
                  <PostItNote
                    key={`action-${index}`}
                    index={index + toneOffset + 2}
                    tone="post-it-peach"
                    compact
                    className={`${frontMinH} flex items-center !rotate-0 opacity-95`}
                  >
                    <p className="text-sm leading-snug text-neutral-950 text-pretty">
                      {stage.userAction}
                    </p>
                  </PostItNote>
                ) : (
                  <EmptyFrontstage key={`action-empty-${index}`} index={index} />
                ),
              )}
            </div>
          ) : null}

          <div
            className="mt-3 grid items-stretch gap-x-3 border-t border-dashed border-neutral-300 pt-3"
            style={{ gridTemplateColumns: columns }}
          >
            <LaneLabel label={frontstageLane} />
            {frontstageCells.map(({ stage, index, span }) =>
              stage.frontstage ? (
                <div
                  key={`front-${index}`}
                  style={span > 1 ? { gridColumn: `span ${span}` } : undefined}
                >
                  <PostItNote
                    index={index + toneOffset + 3}
                    tone="post-it-peach"
                    compact
                    className={`${frontMinH} flex h-full items-center !rotate-0 opacity-95`}
                  >
                    <p className="text-sm leading-snug text-neutral-950 text-pretty">
                      {stage.frontstage}
                    </p>
                  </PostItNote>
                </div>
              ) : (
                <EmptyFrontstage index={index} />
              ),
            )}
          </div>

          {hasExtendedLanes && backstageLane ? (
            <div
              className="mt-3 grid items-stretch gap-x-3 border-t border-dashed border-neutral-300 pt-3"
              style={{ gridTemplateColumns: columns }}
            >
              <LaneLabel label={backstageLane} />
              {stages.map((stage, index) =>
                stage.backstage ? (
                  <PostItNote
                    key={`back-${index}`}
                    index={index + toneOffset + 5}
                    tone="post-it-mint"
                    compact
                    className={`${frontMinH} flex items-center !rotate-0 opacity-95`}
                  >
                    <p className="text-sm leading-snug text-neutral-950 text-pretty">
                      {stage.backstage}
                    </p>
                  </PostItNote>
                ) : (
                  <EmptyFrontstage key={`back-empty-${index}`} index={index} />
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
