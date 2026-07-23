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
};

type ServiceBlueprintProps = {
  title: string;
  journeyLane: string;
  frontstageLane: string;
  stages: readonly BlueprintStage[];
  toneOffset?: number;
};

export function ServiceBlueprint({
  title,
  journeyLane,
  frontstageLane,
  stages,
  toneOffset = 0,
}: ServiceBlueprintProps) {
  const columns = `4.75rem repeat(${stages.length}, minmax(8.5rem, 1fr))`;

  return (
    <div>
      <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-neutral-950">
        {title}
      </h3>

      <div className="mt-5 -mx-5 md:mx-0 overflow-x-auto pb-2">
        <div className="min-w-[820px] md:min-w-0 px-5 md:px-0">
          <div
            className="grid items-stretch gap-x-3"
            style={{ gridTemplateColumns: columns }}
          >
            <div className="flex items-center justify-center self-stretch rounded-lg bg-neutral-100/80 px-1">
              <span className="max-w-[4.2rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-neutral-500 [writing-mode:vertical-rl] rotate-180">
                {journeyLane}
              </span>
            </div>
            {stages.map((stage, index) => (
              <PostItNote
                key={`journey-${stage.journey}`}
                index={index + toneOffset}
                tone={BLUEPRINT_STAGE_TONES[stage.tone]}
                compact
                className="min-h-[8rem] flex items-center !rotate-0"
              >
                <p className="text-sm leading-snug text-neutral-950 text-pretty">
                  {stage.journey}
                </p>
              </PostItNote>
            ))}
          </div>

          <div
            className="mt-3 grid items-stretch gap-x-3 border-t border-dashed border-neutral-300 pt-3"
            style={{ gridTemplateColumns: columns }}
          >
            <div className="flex items-center justify-center self-stretch rounded-lg bg-neutral-100/80 px-1">
              <span className="max-w-[4.2rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-neutral-500 [writing-mode:vertical-rl] rotate-180">
                {frontstageLane}
              </span>
            </div>
            {stages.map((stage, index) =>
              stage.frontstage ? (
                <PostItNote
                  key={`front-${stage.frontstage}-${index}`}
                  index={index + toneOffset + 3}
                  tone="post-it-peach"
                  compact
                  className="min-h-[5.75rem] flex items-center !rotate-0 opacity-95"
                >
                  <p className="text-sm leading-snug text-neutral-950 text-pretty">
                    {stage.frontstage}
                  </p>
                </PostItNote>
              ) : (
                <div
                  key={`front-empty-${index}`}
                  className="min-h-[5.75rem] flex items-center px-1"
                  aria-hidden
                >
                  <div className="w-full border-t-2 border-neutral-900" />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
