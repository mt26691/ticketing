import { OrderCreatedEvent, OrderStatus } from "@nakilabs/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

import { OrderCreatedListener } from "../listener/order-created-listener";
const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  // fake data object
  const data: OrderCreatedEvent["data"] = {
    version: 0,
    expiresAt: new Date().toUTCString(),
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 10
    },
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("replicates the order info", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order).toBeDefined();
  expect(order!.id).toEqual(data.id);
  expect(order!.price).toEqual(data.ticket.price);
  expect(order!.status).toEqual(data.status);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
