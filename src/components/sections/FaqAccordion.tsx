"use client";

import { useState } from "react";

import { ChevronDownIcon } from "@/components/ui/Icons";
import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/utils";

/** Accessible multi-open FAQ with optional category filters. */
export function FaqAccordion({
  items,
  withFilters = false,
}: {
  items: FaqItem[];
  withFilters?: boolean;
}) {
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const firstKey = items[0]?.question;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(
    () => new Set(firstKey ? [firstKey] : []),
  );

  const visible = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  function toggle(question: string) {
    setOpenQuestions((current) => {
      const next = new Set(current);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });
  }

  return (
    <div>
      {withFilters && categories.length > 1 ? (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter questions by category"
        >
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
        {visible.map((item) => {
          const sourceIndex = items.findIndex((candidate) => candidate.question === item.question);
          const isOpen = openQuestions.has(item.question);
          const panelId = `faq-panel-${sourceIndex}`;
          const buttonId = `faq-button-${sourceIndex}`;

          return (
            <li key={item.question}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => toggle(item.question)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-gold"
                >
                  <span className="text-base font-medium text-fg sm:text-lg">{item.question}</span>
                  <ChevronDownIcon
                    className={cn(
                      "h-5 w-5 shrink-0 text-fg-subtle transition-transform duration-200",
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
                <p className="text-sm leading-relaxed text-fg-muted sm:text-base">{item.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
