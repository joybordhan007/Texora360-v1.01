import { api } from "@/lib/api";
import { EventList } from "./event-list";

export default async function EventsPage() {
  return <EventList initialRows={await api.events()} />;
}
