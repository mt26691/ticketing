import { Publisher, OrderCancelledEvent, Subjects } from "@nakilabs/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}