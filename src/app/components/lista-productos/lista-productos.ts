import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css'
})
export class ListaProductosComponent {
  productos = input<Producto[]>([]);
  eliminarEvent = output<number>();
  editarEvent = output<Producto>();

  eliminar(id: number): void {
    this.eliminarEvent.emit(id);
  }

  editar(producto: Producto): void {
    this.editarEvent.emit(producto);
  }
}