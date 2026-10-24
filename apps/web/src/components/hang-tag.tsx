import { QRCodeSVG } from "qrcode.react";
import type { ReactNode } from "react";

// Hang tag front/back reproduced from Figma "Tag_Font" / "Tag _Back" (220×420 artboards, printed at 6×12 cm).

export type TagData = {
  name: string;
  style: string;
  image: string;
  fabric: string;
  color: string;
  finish: string;
  leadTime: string;
  origin: string;
  lastUpdate: string;
  printDate: string;
  url: string;
};

const T = "/figma/tag";

export function TagFront() {
  const values: [string, string, string][] = [
    [`${T}/ic-sustainable.svg`, "Sustainable", "Materials"],
    [`${T}/ic-ethical.svg`, "Ethical", "People"],
    [`${T}/ic-process.svg`, "Responsible", "Process"],
    [`${T}/ic-delivery.svg`, "Reliable", "Delivery"],
  ];
  const cell = ([icon, a, b]: [string, string, string]) => (
    <div key={a} className="flex flex-1 items-center gap-1.5">
      <img src={icon} alt="" className="size-4" />
      <p className="text-[10px] leading-[1.1] font-medium text-grey-700">{a}<br />{b}</p>
    </div>
  );
  return (
    <div className="hang-tag relative h-[420px] w-[220px] overflow-hidden bg-page">
      <div className="absolute top-0 left-[-11px] h-[247px] w-[242px] overflow-hidden">
        <img src={`${T}/factory.png`} alt="" className="absolute top-[-31.34%] left-0 h-[147.57%] w-[100.45%] max-w-none" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <img src={`${T}/stellar-white.png`} alt="Stellar Manufacturing" className="absolute top-[27px] left-1/2 h-12 w-[172px] -translate-x-1/2 object-contain object-bottom" />
      <div className="absolute top-[230px] left-1/2 flex w-[220px] -translate-x-1/2 items-center justify-center gap-8 bg-[rgba(19,84,134,0.2)] py-1.5 backdrop-blur-[2px]">
        <img src={`${T}/badge-1.svg`} alt="" className="size-8" />
        <div className="relative h-8 w-[34px] overflow-hidden">
          <img src={`${T}/pabl.png`} alt="" className="absolute top-0 left-0 h-full w-[449.06%] max-w-none" />
        </div>
        <div className="relative size-8 overflow-hidden rounded-full">
          <img src={`${T}/cert.png`} alt="" className="absolute top-[-6.08%] left-0 h-[106.08%] w-[242%] max-w-none" />
        </div>
      </div>
      <div className="absolute top-[293px] left-1/2 flex w-[200px] -translate-x-1/2 flex-col gap-4">
        <div className="flex gap-3">{cell(values[0])}<span className="w-px bg-black/10" />{cell(values[1])}</div>
        <div className="flex gap-4"><span className="h-px flex-1 bg-black/10" /><span className="h-px flex-1 bg-black/10" /></div>
        <div className="flex gap-3">{cell(values[2])}<span className="w-px bg-black/10" />{cell(values[3])}</div>
      </div>
      <p className="absolute top-[392px] left-1/2 -translate-x-1/2 text-[10px] leading-[1.1] font-medium text-black">stellar-mfg.com</p>
    </div>
  );
}

function Spec({ icon, label, children, className }: { icon: string; label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-start gap-0.5 ${className ?? "flex-1"}`}>
      <span className="rounded-[3px] bg-grey-100 p-0.5"><img src={icon} alt="" className="size-3" /></span>
      <div className="flex flex-col gap-0.5 leading-[1.2] font-medium">
        <span className="text-[6px] text-grey-600">{label}:</span>
        <span className="text-[8px] text-grey-800">{children}</span>
      </div>
    </div>
  );
}

export function TagBack({ data }: { data: TagData }) {
  return (
    <div className="hang-tag relative h-[420px] w-[220px] overflow-hidden bg-white">
      <div className="absolute top-[25px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 leading-[1.2] whitespace-nowrap">
        <p className="text-[12px] font-semibold text-grey-800">{data.name}</p>
        <p className="text-[10px] text-grey-700">STYLE: {data.style}</p>
      </div>
      <img src={`${T}/divider-top.svg`} alt="" className="absolute top-[48px] left-1/2 h-px w-[200px] -translate-x-1/2" />
      <div className="absolute top-[63px] left-[14px] h-[129px] w-[192px] rounded-[6px] bg-page" />
      <div className="absolute top-[65px] left-[calc(50%-0.5px)] h-[125px] w-[145px] -translate-x-1/2 overflow-hidden rounded-[8px] shadow-e1">
        <img src={data.image} alt={data.name} className="absolute top-[-9.6%] left-0 h-[116%] w-full max-w-none object-cover" />
      </div>
      <div className="absolute top-[200px] left-1/2 flex w-[190px] -translate-x-1/2 flex-col items-center gap-3.5">
        <div className="flex w-full flex-col gap-1.5">
          <Spec icon={`${T}/ic-fabric.svg`} label="Fabric" className="w-full">{data.fabric}</Spec>
          <div className="flex justify-between">
            <Spec icon={`${T}/ic-color.svg`} label="Color" className="w-[96px]">{data.color}</Spec>
            <Spec icon={`${T}/ic-finish.svg`} label="Finish">{data.finish}</Spec>
          </div>
          <div className="flex justify-between">
            <Spec icon={`${T}/ic-leadtime.svg`} label="Lead Time">{data.leadTime}</Spec>
            <Spec icon={`${T}/ic-origin.svg`} label="Origin">{data.origin}</Spec>
          </div>
          <div className="flex justify-between">
            <Spec icon={`${T}/ic-update.svg`} label="Last Update">{data.lastUpdate}</Spec>
            <Spec icon={`${T}/ic-printdate.svg`} label="Print Date">{data.printDate}</Spec>
          </div>
        </div>
        <img src={`${T}/divider-dash.svg`} alt="" className="h-px w-[190px]" />
        <div className="flex w-full items-center justify-between">
          <div className="flex size-[74px] items-center justify-center bg-white shadow-e1">
            <QRCodeSVG value={data.url} size={66} level="M" />
          </div>
          <div className="flex w-[110px] flex-col gap-[5px] text-grey-800">
            <p className="text-[10px] leading-[1.2] font-semibold">SCAN TO<br />EXPLORE MORE</p>
            <p className="w-[101px] text-[8px] leading-[1.2] font-medium">View product details price &amp; more</p>
          </div>
        </div>
      </div>
    </div>
  );
}
