"use client";

import { useState } from "react";

import { ChevronDownIcon } from "@/components/ui/Icons";
import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * FAQ list with optional category filtering.
 *
 * Built on native <button> + aria-expanded rather than <details>, so the open/close
 * transition can be animated and the state is fully controllable. Multiple items can
 * be open at once — a visitor scanning for two answers should not have the first one
 * close when they open the second.
 */
export function FaqAccordion({
  items,
  withFilters = false,
}: {
  items: FaqItem[];
  withFilters?: boolean;
}) {
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  const visible = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  function toggle(index: number) {
    setOpenIndexes((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div>
      {withFilters && categories.length > 1 ? (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              activeCategory === null
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                activeCategory === category
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="divide-y divide-border border-y border-border">
        {visible.map((item, index) => {
          const isOpen = openIndexes.has(index);
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <li key={item.question}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-gold"
                >
                  <span className="text-base font-medium text-fg sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      "h-5 w-5 shrink-0 text-fg-subtle transition-transform duration-300",
                      isOpen && "rotate-180 text-gold",
                    )}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-6 pr-10"
              >
                <p className="text-sm leading-relaxed text-fg-muted sm:text-base">
                  {item.answer}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
