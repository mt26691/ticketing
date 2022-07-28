import { Publisher, Subjects, TicketCreatedEvent } from "@nakilabs/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

}