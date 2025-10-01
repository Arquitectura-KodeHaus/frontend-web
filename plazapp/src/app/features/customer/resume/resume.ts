import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume {
  cardData = [
    // Ejemplo de métricas de cliente (ajusta estos datos a los reales)
    { id: 'total_spent', title: 'Gasto Total', value: '$850', detail: 'Este mes', colorClass: 'metric-primary' },
    { id: 'active_reservations', title: 'Reservas Activas', value: 3, detail: 'Pendientes de entrega', colorClass: 'metric-accent' },
    { id: 'favorite_vendors', title: 'Vendedores Favoritos', value: 4, detail: 'Para tu próxima compra', colorClass: '' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar los datos reales de las tarjetas
  }

}
