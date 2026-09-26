import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`⚡ WebSocket client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔌 WebSocket client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    client.join(data.room);
    return { event: 'room_joined', room: data.room };
  }

  @SubscribeMessage('send_message')
  handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string; senderId: string; content: string },
  ) {
    this.server.to(`conversation_${payload.conversationId}`).emit('new_message', payload);
    return { status: 'delivered' };
  }

  notifyBookingUpdate(bookingId: string, status: string, data: any) {
    if (this.server) {
      this.server.to(`booking_${bookingId}`).emit('booking_status_changed', {
        bookingId,
        status,
        ...data,
      });
    }
  }

  notifyDeliveryUpdate(orderId: string, deliveryStatus: string, location?: { lat: number; lng: number }) {
    if (this.server) {
      this.server.to(`delivery_${orderId}`).emit('delivery_updated', {
        orderId,
        deliveryStatus,
        location,
      });
    }
  }
}
