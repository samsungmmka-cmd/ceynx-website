import { Icon } from "../icon";

const steps = ["Theory", "Explore the model", "Take readings", "Share results"];

/**
 * Illustration of a 3D lesson screen: a rotating 3D model with guided steps.
 * Deliberately generic (no specific apparatus); swap in real CUBIPHY screenshots or video when available.
 */
export function LessonMockup({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative mx-auto w-full max-w-[34rem] ${className}`}>
      <div className="glass relative overflow-hidden" aria-hidden="true">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-mint to-lime text-on-brand">
            <Icon name="cube" className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-ink">Interactive 3D lesson</p>
            <p className="text-xs text-muted">Physics practical · Step 2 of 4</p>
          </div>
          <span className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] font-semibold text-mint-soft">EN · සිං · தமி</span>
        </div>

        <div className="grid sm:grid-cols-[1.35fr_1fr]">
          {/* 3D stage */}
          <div className="relative grid aspect-square place-items-center overflow-hidden bg-gradient-to-b from-emerald/10 to-transparent sm:aspect-auto sm:min-h-[19rem]">
            <div className="bg-grid absolute inset-0 opacity-80" />
            <div className="cube-scene relative">
              <div className="cube">
                {["front", "back", "right", "left", "top", "bottom"].map((f) => (
                  <span key={f} className={`cube-face cube-${f}`} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[0.65rem] text-muted">
              <span className="rounded-full bg-deep/80 px-2 py-1">Drag to rotate</span>
              <span className="rounded-full bg-deep/80 px-2 py-1">Zoom · Explode view</span>
            </div>
          </div>

          {/* Guided steps */}
          <div className="border-t border-line p-4 sm:border-l sm:border-t-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">Guided steps</p>
            <ol className="mt-3 space-y-2">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm ${
                    i === 1 ? "border-emerald/40 bg-emerald/10 font-semibold text-ink" : "border-line text-muted"
                  }`}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-full text-[0.6rem] font-bold ${
                      i < 1 ? "bg-emerald text-on-brand" : i === 1 ? "bg-gradient-to-br from-mint to-lime text-on-brand" : "border border-line"
                    }`}
                  >
                    {i < 1 ? "✓" : i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-xl border border-line bg-deep/60 p-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">Quick check</p>
              <p className="mt-1 text-sm text-ink">Which face is closest to you?</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-xs font-semibold">
                <span className="rounded-lg border border-emerald/40 bg-emerald/10 py-1.5 text-mint-soft">Front ✓</span>
                <span className="rounded-lg border border-line py-1.5 text-muted">Top</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                <span className="block h-full w-2/5 rounded-full bg-gradient-to-r from-mint to-lime" />
              </span>
              <span className="text-[0.65rem] text-muted">40%</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Illustration of a 3D learning lesson: a rotating 3D model beside guided steps, a quick quiz and a progress bar.
      </figcaption>
    </figure>
  );
}
