import { api } from "@/lib/api";
import { QuoteList } from "./quote-list";

export default async function QuotesPage() {
  return <QuoteList rows={await api.quotes()} />;
}
