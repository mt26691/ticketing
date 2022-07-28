import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
} from "@nakilabs/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  // fake data object
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  ticket.set({ orderId });
  await ticket.save();
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };
  return { listener, data, msg, ticket, orderId };
};

it("updates the tickets, publishes an event, and acks the message", async () => {
  const { listener, data, ticket, msg, orderId } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
