import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActiveProducts } from '../active-products/active-products';
import { ProductCatalog } from '../product-catalog/product-catalog';
import { Chat } from '../chat/chat';
import { Reservations } from '../reservations/reservations';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ActiveProducts, ProductCatalog, Chat, Reservations],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  activeTab: string = 'overview'; 
  
  // Datos para las tarjetas (simulación de los datos del "Resumen")
  cardData = [
    { id: 'active_products', title: 'Productos Activos', value: 12, detail: '+2 desde ayer', colorClass: 'metric-primary' },
    { id: 'pending_reservations', title: 'Reservas Pendientes', value: 5, detail: 'Requieren confirmación', colorClass: 'metric-accent' },
    { id: 'messages', title: 'Mensajes', value: 3, detail: 'Nuevos mensajes', colorClass: '' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar los datos iniciales de las tarjetas si es necesario.
  }

  // Función para cambiar de pestaña al hacer clic
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
