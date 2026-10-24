"use client";

import type { Comment } from "@/lib/types";
import { ImageIcon, SendHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CommentsPanel({ initial, onClose }: { initial: Comment[]; onClose: () => void }) {
  const [comments, setComments] = useState(initial);
  const [draft, setDraft] = useState("");
  const send = () => {
    const body = draft.trim();
    if (!body) return;
    setComments([...comments, { id: crypto.randomUUID(), author: "Joybordhan Sarkar", ref: "", body, ago: "just now" }]);
    setDraft("");
  };
  return (
    <aside className="flex w-full flex-col border-l border-border bg-white lg:w-[340px]">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-[18px] font-medium text-grey-900">Comments</h3>
        <button onClick={onClose} aria-label="Close comments" className="rounded p-1 hover:bg-page"><X size={20} /></button>
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto px-4">
        {comments.map((c) => (
          <div key={c.id} className="space-y-1.5">
            <p className="flex items-center gap-2 text-[13px] font-medium text-grey-900">
              <Image src="/figma/avatar.png" alt="" width={20} height={20} className="size-5 rounded-full" />
              {c.author} {c.ref && <span className="text-primary underline">{c.ref}</span>}
            </p>
            <p className="ml-7 rounded-[4px] bg-grey-100 px-2 py-1.5 text-[11px] leading-snug text-grey-700">{c.body}</p>
            {c.image && <Image src={c.image} alt="" width={80} height={80} className="ml-7 size-20 rounded-[4px] object-cover" />}
            <p className="ml-7 flex gap-4 text-[11px] text-grey-500">
              {c.ago} <button className="hover:text-primary">Reply</button>
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-4">
        <label className="cursor-pointer text-primary" aria-label="Attach image">
          <ImageIcon size={18} />
          <input type="file" accept="image/*" className="hidden" />
        </label>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Add your comment..."
          className="h-8 flex-1 rounded-full border border-border px-3 text-[12px] outline-none focus:border-primary"
        />
        <button onClick={send} aria-label="Send" className="text-[#6c5ce7]"><SendHorizontal size={20} /></button>
      </div>
    </aside>
  );
}
