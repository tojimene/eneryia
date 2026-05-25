"use client";

import { motion } from "framer-motion";

import { getShotType } from "@/lib/video-frameworks";
import { formatTimestamp } from "@/lib/video-mock";
import { cn } from "@/lib/utils";

export function StoryboardTimeline({ storyboard, activeSceneId, onSelect }) {
  if (!storyboard) return null;

  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary/80">
            Timeline
          </p>
          <p className="text-sm font-medium text-foreground">
            {storyboard.totalSeconds}s · {storyboard.scenes.length} escenas
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="font-mono">0:00</span>
          <span>—</span>
          <span className="font-mono">{formatTimestamp(storyboard.totalSeconds)}</span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex h-9 w-full overflow-hidden rounded-lg border border-border/60 bg-card/60">
        {storyboard.scenes.map((scene, idx) => {
          const shot = getShotType(scene.shotType);
          const ratio = (scene.seconds / storyboard.totalSeconds) * 100;
          const isActive = activeSceneId === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onSelect?.(scene.id)}
              className={cn(
                "group relative h-full overflow-hidden border-r border-border/40 text-left transition-all",
                "hover:brightness-125"
              )}
              style={{
                width: `${ratio}%`,
                background: `${shot.color}${isActive ? "55" : "22"}`,
              }}
              title={`${scene.role} · ${scene.seconds}s`}
            >
              <span
                className="absolute inset-x-1 top-1 truncate font-mono text-[9px] uppercase tracking-widest"
                style={{ color: shot.color }}
              >
                {scene.role}
              </span>
              <span
                className="absolute inset-x-1 bottom-1 truncate font-mono text-[9px] text-white/60"
              >
                {scene.seconds}s
              </span>
              {isActive && (
                <motion.span
                  layoutId="timeline-cursor"
                  className="absolute inset-0 border-2 border-primary"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Ruler */}
      <div className="flex justify-between px-1 font-mono text-[9px] text-muted-foreground">
        {Array.from({ length: 6 }).map((_, i) => {
          const t = (storyboard.totalSeconds / 5) * i;
          return <span key={i}>{formatTimestamp(t)}</span>;
        })}
      </div>
    </div>
  );
}
