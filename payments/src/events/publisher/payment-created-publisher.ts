import { Publisher, PaymentCreatedEvent, Subjects } from "@nakilabs/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}