import type { ReactNode } from "react";

type BlogBodyProps = {
  body: string;
};

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-semibold text-neutral-950">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={`i-${key++}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function splitBlocks(body: string): string[] {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function isUnorderedList(block: string) {
  const lines = block.split("\n").filter((line) => line.trim());
  return lines.length > 0 && lines.every((line) => /^[-*]\s+/.test(line.trim()));
}

function isOrderedList(block: string) {
  const lines = block.split("\n").filter((line) => line.trim());
  return (
    lines.length > 0 && lines.every((line) => /^\d+\.\s+/.test(line.trim()))
  );
}

function isBlockquote(block: string) {
  const lines = block.split("\n").filter((line) => line.trim());
  return lines.length > 0 && lines.every((line) => /^>\s?/.test(line.trim()));
}

/**
 * Lightweight markdown for Entre Jornadas posts: headings, quotes, lists, bold/italic.
 */
export function BlogBody({ body }: BlogBodyProps) {
  const blocks = splitBlocks(body);

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {blocks.map((block, index) => {
        const key = `${index}-${block.slice(0, 40)}`;

        if (/^---+$/.test(block)) {
          return (
            <hr
              key={key}
              className="my-4 border-0 border-t border-neutral-200"
            />
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3
              key={key}
              className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 mt-4 first:mt-0"
            >
              {renderInline(block.slice(4).trim())}
            </h3>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2
              key={key}
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950 mt-8 first:mt-0"
            >
              {renderInline(block.slice(3).trim())}
            </h2>
          );
        }

        if (block.startsWith("# ")) {
          return (
            <h2
              key={key}
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950 mt-8 first:mt-0"
            >
              {renderInline(block.slice(2).trim())}
            </h2>
          );
        }

        if (isBlockquote(block)) {
          const quote = block
            .split("\n")
            .map((line) => line.replace(/^>\s?/, "").trim())
            .filter(Boolean)
            .join(" ");
          return (
            <blockquote
              key={key}
              className="border-l-4 border-accent pl-5 py-1 text-lg md:text-xl leading-relaxed text-neutral-700 italic"
            >
              {renderInline(quote)}
            </blockquote>
          );
        }

        if (isUnorderedList(block)) {
          const items = block
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => line.replace(/^[-*]\s+/, ""));
          return (
            <ul
              key={key}
              className="list-disc pl-6 space-y-2 body-lg text-pretty"
            >
              {items.map((item) => (
                <li key={item.slice(0, 48)}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (isOrderedList(block)) {
          const items = block
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => line.replace(/^\d+\.\s+/, ""));
          return (
            <ol
              key={key}
              className="list-decimal pl-6 space-y-2 body-lg text-pretty"
            >
              {items.map((item) => (
                <li key={item.slice(0, 48)}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={key} className="body-lg text-pretty">
            {renderInline(block.replace(/\n/g, " "))}
          </p>
        );
      })}
    </div>
  );
}
