"use client";

import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useEffect, type CSSProperties, type ReactNode } from "react";
import { Button } from "./button";

export function Modal({
  open,
  onClose,
  title,
  actions,
  children,
  className,
  bodyClassName,
  style,
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: CSSProperties;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 p-4 pt-[60px]" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal
        className={cn("w-full max-w-[1620px] rounded-[8px] bg-white shadow-xl", className)}
        style={style}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title !== undefined && (
          <div className="flex items-center justify-between gap-4 px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 text-[18px] font-medium text-grey-900">{title}</div>
            <div className="flex items-center gap-3">
              {actions}
              <button onClick={onClose} aria-label="Close" className="rounded p-1 text-grey-900 hover:bg-page">
                <X size={20} />
              </button>
            </div>
          </div>
        )}
        <div className={cn("px-4 pb-4", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-[493px] rounded-[8px] bg-white p-6 text-center shadow-xl">
        <p className="mb-5 text-[18px] font-medium text-grey-900">{message}</p>
        <div className="flex justify-center gap-4">
          <Button variant="danger" className="w-[100px]" onClick={onConfirm}>YES</Button>
          <Button variant="teal" className="w-[100px]" onClick={onCancel}>NO</Button>
        </div>
      </div>
    </div>
  );
}
