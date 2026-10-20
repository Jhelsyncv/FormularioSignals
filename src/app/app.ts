import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { FormularioComponent } from './components/formulario/formulario';
import { ListaProductosComponent } from './components/lista-productos/lista-productos';
import { Producto } from './models/producto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FormularioComponent, ListaProductosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  productos = signal<Producto[]>([]);
  productoAEditar = signal<Producto | null>(null);

  guardarProducto(producto: Producto): void {
    const existe = this.productos().some(p => p.id === producto.id);

    if (existe) {
      // Actualiza producto existente
      this.productos.update(lista =>
        lista.map(p => (p.id === producto.id ? producto : p))
      );
    } else {
      // Crea producto nuevo
      this.productos.update(lista => [...lista, producto]);
    }

    this.productoAEditar.set(null);
  }

  seleccionarParaEditar(producto: Producto): void {
    this.productoAEditar.set(producto);
  }

  cancelarEdicion(): void {
    this.productoAEditar.set(null);
  }

  eliminarProducto(id: number): void {
    this.productos.update(lista => lista.filter(p => p.id !== id));
    if (this.productoAEditar()?.id === id) {
      this.productoAEditar.set(null);
    }
  }
}