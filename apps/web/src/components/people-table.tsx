"use client";

import { Pagination, paginate } from "@/components/ui/pagination";
import { Table, Td, Th, THead, Tr } from "@/components/ui/table";
import type { Visitor } from "@/lib/types";
import { useState } from "react";

/** Visitors / Inquiry list table (Email · Event · Email Time · optional Inquiry date). */
export function PeopleTable({ rows, showInquiryDate = true, perPage = 25 }: { rows: Visitor[]; showInquiryDate?: boolean; perPage?: number }) {
  const [page, setPage] = useState(1);
  const { rows: visible, pages } = paginate(rows, page, perPage);
  return (
    <>
      <Table>
        <THead>
          <tr>
            <Th className="w-[50px] text-[16px]">#</Th>
            <Th>Email Address</Th>
            <Th>Event Name</Th>
            <Th>Email Time</Th>
            {showInquiryDate && <Th>Inquiry Received Date</Th>}
          </tr>
        </THead>
        <tbody>
          {visible.map((v, i) => (
            <Tr key={v.id}>
              <Td className="text-[16px]">{(page - 1) * perPage + i + 1}</Td>
              <Td><a href={`mailto:${v.email}`} className="hover:text-primary">{v.email}</a></Td>
              <Td>{v.eventName}</Td>
              <Td>{v.emailTime}</Td>
              {showInquiryDate && <Td>{v.inquiryDate}</Td>}
            </Tr>
          ))}
        </tbody>
      </Table>
      <Pagination page={page} pages={pages} onChange={setPage} />
    </>
  );
}
