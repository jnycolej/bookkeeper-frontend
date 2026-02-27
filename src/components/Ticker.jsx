import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

function wrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function useMeasure() {
  const ref = React.useRef(null);
  const [rect, setRect] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setRect({ width: cr.width, height: cr.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, rect];
}

export function Ticker({
  items,
  renderItem,
  speed = 50,
  gap = 20,
  dir,
  className = "",
  fade = true,
  fadeSize = 80,
  fadeColor = "rgba(0,0,0,1)", // set to your page bg
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);

  const [viewportRef, viewport] = useMeasure();
  const [seqRef, seq] = useMeasure();

  const [paused, setPaused] = React.useState(false);
  const [repeat, setRepeat] = React.useState(2);

  const effectiveDir = React.useMemo(() => {
    if (dir === "ltr" || dir === "rtl") return dir;
    if (typeof document !== "undefined")
      return document?.dir === "rtl" ? "rtl" : "ltr";
    return "ltr";
  }, [dir]);

  // Ensure ONE sequence is wider than the viewport (plus buffer)
  React.useEffect(() => {
    if (!viewport.width || !seq.width) return;

    // Make the sequence comfortably longer than the viewport
    const buffer = viewport.width; // <-- key change
    const minWidth = viewport.width + buffer;

    // Estimate base width (one repeat chunk)
    const perRepeat = seq.width / repeat || 1;
    const needed = Math.max(1, Math.ceil(minWidth / perRepeat));

    // Only increase — never shrink (prevents empty stretches / flicker)
    setRepeat((r) => Math.max(r, needed));
  }, [viewport.width, seq.width, repeat]);

  // Reset x when sequence width changes (prevents “wrap while loading” glitches)
  React.useEffect(() => {
    if (!seq.width) return;
    x.set(wrap(-seq.width, 0, x.get())); // keep continuity when width changes
  }, [seq.width]); // eslint-disable-line react-hooks/exhaustive-deps

  const loopWidth = seq.width; // wrap distance = one sequence width

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    if (paused) return;
    if (!loopWidth) return;

    const direction = -1;
    const moveBy = direction * (speed * (delta / 1000));
    const next = x.get() + moveBy;

    const epsilon = 0.5; //px
    x.set(wrap(-loopWidth + epsilon, -epsilon, next));
  });

  const repeated = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < repeat; i++) out.push(...items);
    return out;
  }, [items, repeat]);

  const sequence = (
    <div
      ref={seqRef}
      style={{
        display: "flex",
        alignItems: "center",
        gap,
      }}
    >
      {repeated.map((item, i) => (
        <div key={`${i}`} style={{ flex: "0 0 auto" }}>
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={viewportRef}
        className={className}
        dir={effectiveDir}
        style={{
          overflow: "hidden",
          width: "100%",
          // OPTIONAL: mask fade instead of overlays (uncomment if you prefer)
          // WebkitMaskImage: fade
          //   ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
          //   : undefined,
          // maskImage: fade
          //   ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
          //   : undefined,
        }}
      >
        {reduceMotion ? (
          <div style={{ display: "flex", gap, flexWrap: "wrap" }}>
            {items.map((item, i) => (
              <div key={i}>{renderItem(item, i)}</div>
            ))}
          </div>
        ) : (
          <motion.div
            style={{
              x,
              display: "flex",
              width: "max-content",
              willChange: "transform",
              direction: "ltr",
            }}
          >
            {sequence}
            {sequence}
          </motion.div>
        )}
      </div>

      {/* Fade overlays (works everywhere) */}
      {fade && (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: fadeSize,
              pointerEvents: "none",
              background: `linear-gradient(to right, ${fadeColor}, rgba(0,0,0,0))`,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: fadeSize,
              pointerEvents: "none",
              background: `linear-gradient(to left, ${fadeColor}, rgba(0,0,0,0))`,
            }}
          />
        </>
      )}
    </div>
  );
}
