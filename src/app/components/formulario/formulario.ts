import { Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class FormularioComponent {
  productoAEditar = input<Producto | null>(null);
  guardarProductoEvent = output<Producto>();
  cancelarEdicionEvent = output<void>();

  // ID actual si estamos editando
  idModificando = signal<number | null>(null);

  // Signals para los campos
  nombre = signal<string>('');
  categoria = signal<string>('Electrónica');
  precio = signal<number | null>(null);
  stock = signal<number | null>(null);
  descripcion = signal<string>('');

  constructor() {
    effect(() => {
      const prod = this.productoAEditar();
      if (prod) {
        this.idModificando.set(prod.id);
        this.nombre.set(prod.nombre);
        this.categoria.set(prod.categoria);
        this.precio.set(prod.precio);
        this.stock.set(prod.stock);
        this.descripcion.set(prod.descripcion);
      } else {
        this.limpiar();
      }
    });
  }

  guardar(): void {
    if (!this.nombre() || this.precio() === null || this.stock() === null) {
      alert('Por favor complete los campos obligatorios');
      return;
    }

    const producto: Producto = {
      id: this.idModificando() ?? Date.now(),
      nombre: this.nombre(),
      categoria: this.categoria(),
      precio: Number(this.precio()),
      stock: Number(this.stock()),
      descripcion: this.descripcion()
    };

    this.guardarProductoEvent.emit(producto);
    this.limpiar();
  }

  limpiar(): void {
    this.idModificando.set(null);
    this.nombre.set('');
    this.categoria.set('Electrónica');
    this.precio.set(null);
    this.stock.set(null);
    this.descripcion.set('');
    this.cancelarEdicionEvent.emit();
  }
}