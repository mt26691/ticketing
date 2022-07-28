import { Publisher, Subjects, TicketUpdatedEvent } from "@nakilabs/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}