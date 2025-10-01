import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Explore } from '../explore/explore';
import { Budget } from '../budget/budget';
import { Reservations } from '../reservations/reservations';
import { Favorites } from '../favorites/favorites';
import { Chat } from '../chat/chat';
import { Resume } from '../resume/resume';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Explore, Budget, Reservations, Favorites, Chat, Resume],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  // 🌟 CAMBIAR: El estado inicial debe ser 'explore' (para que vean productos primero)
  activeTab: string = 'explore'; 
  
  // 🌟 CAMBIAR: Datos para las tarjetas (Deberían reflejar métricas del cliente) 🌟
  cardData = [
    // Ejemplo de métricas de cliente:
    { id: 'total_spent', title: 'Gasto Total', value: '$850', detail: 'Este mes', colorClass: 'metric-primary' },
    { id: 'active_reservations', title: 'Reservas Activas', value: 3, detail: 'Pendientes de entrega', colorClass: 'metric-accent' },
    { id: 'favorite_vendors', title: 'Vendedores Favoritos', value: 4, detail: 'Para tu próxima compra', colorClass: '' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar los datos iniciales.
  }

  // Función para cambiar de pestaña al hacer clic
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
