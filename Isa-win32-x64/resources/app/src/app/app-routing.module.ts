import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {ProductosComponent} from './pages/productos/productos.component';
import {InicioComponent} from './pages/inicio/inicio.component';
import {FormProductComponent} from './components/form-product/form-product.component';
import { ClientComponent } from './pages/client/client.component';
import { AgregarClienteComponent }  from './pages/agregar-cliente/agregar-cliente.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { AgregarProveedoresComponent } from './pages/agregar-proveedores/agregar-proveedores.component';
import { ExistenciasComponent } from './components/existencias/existencias.component';
import { CategoryaddComponent } from './pages/categoryadd/categoryadd.component';
import { CategoryComponent } from './pages/category/category.component';
import { PresupuestoComponent } from './pages/presupuesto/presupuesto.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { GenerarfacturasComponent } from './pages/generarfacturas/generarfacturas.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { AddEmpleadosComponent } from './pages/empleados/add-empleados/add-empleados.component';
import { VentasPendComponent } from './pages/ventas/ventas-pend/ventas-pend.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'productos',
    component: ProductosComponent 
  },
  {
    path: 'productos/agregar',
    component: FormProductComponent 
  },
  {
    path: 'productos/editar/:id',
    component: EditProductComponent
  },
  {
    path: 'clientes',
    component: ClientComponent 
  },
  {
    path: 'clientes/agregar',
    component: AgregarClienteComponent 
  },
  {
    path: 'clientes/editar/:id',
    component: AgregarClienteComponent 
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent 
  },
  {
    path: 'proveedores/agregar',
    component: AgregarProveedoresComponent
  },
  {
    path: 'proveedores/editar/:id',
    component: AgregarProveedoresComponent
  },
  {
    path: 'existencias',
    component: ExistenciasComponent
  },
  {
    path: 'categorias',
    component: CategoryComponent
  },
  {
    path: 'categorias/agregar',
    component: CategoryaddComponent
  },
  {
    path: 'categorias/editar/:id',
    component: CategoryaddComponent
  },
  {
    path: 'presupuestos',
    component: PresupuestoComponent
  },
  {
    path: 'factura',
    component: GenerarfacturasComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'empleados',
    component: EmpleadosComponent
  },
  {
    path: 'empleados/agregar',
    component: AddEmpleadosComponent
  },
  {
    path: 'empleados/editar/:id',
    component: AddEmpleadosComponent
  },
  {
    path: 'ventas-pendientes',
    component: VentasPendComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
