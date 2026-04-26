import { Injectable, inject } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { CartItem } from './cart.service';

export interface OrderData {
  customerName: string;
  customerPhone: string;
  customerCity: string;
  deliveryMethod: string;
  paymentMethod: string;
  totalAmount: number;
  cartItems: CartItem[];
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private pbService = inject(PocketbaseService);
  private readonly WHATSAPP_NUMBER = '584122329988';

  async createOrder(orderData: OrderData): Promise<any> {
    try {
      // 1. Save to PocketBase
      const record = await this.pbService.pb.collection('orders').create(orderData);
      
      // Fetch BCV Rate
      let bcvRate = null;
      try {
        const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
        if (response.ok) {
           const data = await response.json();
           bcvRate = data.promedio || data.venta || null;
        }
      } catch(e) {
        console.warn('Failed to fetch BCV rate', e);
      }
      
      // 2. Generate WhatsApp Link
      const whatsappUrl = this.generateWhatsAppLink(orderData, record.id, bcvRate);
      
      return { success: true, record, whatsappUrl };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  private generateWhatsAppLink(orderData: OrderData, orderId: string, bcvRate: number | null): string {
    const itemsList = orderData.cartItems.map(item => 
      `•  ${item.quantity} ${item.product.name}  ${item.product.sellingPrice - (item.product.discount || 0)}$`
    ).join('\n');

    let totalLine = `Total: ${orderData.totalAmount}$`;
    if (bcvRate) {
      const totalBs = (orderData.totalAmount * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      totalLine += ` -> ${totalBs} Bs.`;
    }
    
    // Extract first name
    const firstName = orderData.customerName.split(' ')[0] || orderData.customerName;

    const message = `Hola ${firstName}
Tu pedido es el ${orderId}
Esta es tu cuenta:

${itemsList}

${totalLine}

${orderData.paymentMethod}

Gracias por tu compra
Puedes ver más de nuestros productos en 
https://meliancosmetics.pockethost.io/`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodedMessage}`;
  }
}
