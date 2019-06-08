import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { materialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigateComponent } from './components/navigate/navigate.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ListClientComponent } from './components/list-client/list-client.component'
import { ProductService } from './services/product.service';

import { Navigate2Component } from './components/navigate2/navigate2.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { CardsInicioComponent } from './components/cards-inicio/cards-inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { AgregarClienteComponent } from './pages/agregar-cliente/agregar-cliente.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ListProviderComponent } from './component/list-provider/list-provider.component';
import { AgregarProveedoresComponent } from './pages/agregar-proveedores/agregar-proveedores.component';
import { FormProviderComponent } from './component/form-provider/form-provider.component';
import { ProductComponent } from './pdf/product/product.component';
import { ExistenciasComponent } from './components/existencias/existencias.component';
import { ExistlistComponent } from './components/existlist/existlist.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryaddComponent } from './pages/categoryadd/categoryadd.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { CategoryPipe } from './pipes/category.pipe';
// componentes de facturacion y presupuesto
import { PresupuestoComponent } from './pages/presupuesto/presupuesto.component';
import { LisproductPreComponent } from './pages/presupuesto/lisproduct-pre/lisproduct-pre.component';
import { AddPreComponent } from './pages/presupuesto/add-pre/add-pre.component';
import { HermanoComponent } from './pages/presupuesto/hermano/hermano.component';
import { FormFacturaComponent } from './pages/generarfacturas/PDFBs/form-factura.component'
import { NotaDEntregaComponent } from './pages/generarfacturas/PDFNota/nota-d-entrega.component';
//fin
import { HistoryComponent } from './components/dialog/history/history.component';

import { EditProductComponent } from './components/edit-product/edit-product.component';
import { GenerarfacturasComponent } from './pages/generarfacturas/generarfacturas.component';

import { PreviewFacturaComponent } from './pages/Generarfacturas/preview-factura/preview-factura.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AddEmpleadosComponent } from './pages/empleados/add-empleados/add-empleados.component';

import { VentasPendComponent } from './pages/ventas/ventas-pend/ventas-pend.component';
import { HistoryVentasComponent } from './pages/ventas/history-ventas/history-ventas.component';
import { HistoryUserComponent } from './components/history-user/history-user.component';
import { ExcelFormatsService } from './services/exportExcel/excel-formats.service';
import { ExportExcelComponent } from './components/export-excel/export-excel.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExportExcelComponent,
    HistoryUserComponent,
    HistoryVentasComponent,
    AppComponent,
    HistoryComponent,
    NavigateComponent,
    FormProductComponent,
    ListProductComponent,
    Navigate2Component,
    InicioComponent,
    MenuInicioComponent,
    CardsInicioComponent,
    ProductosComponent,
    ClientComponent,
    ListClientComponent,
    ClientFormComponent,
    AgregarClienteComponent,
    ProveedoresComponent,
    ListProviderComponent,
    AgregarProveedoresComponent,
    FormProviderComponent,
    ProductComponent,
    ExistenciasComponent,
    ExistlistComponent,
    CategoryComponent,
    CategoryaddComponent,
    FilterProductPipe,
    CategoryPipe,
    PresupuestoComponent,
    LisproductPreComponent,
    AddPreComponent,
    HermanoComponent,
    EditProductComponent,
    GenerarfacturasComponent,
    FormFacturaComponent,
    PreviewFacturaComponent,
    EmpleadosComponent,
    LoginFormComponent,
    AddEmpleadosComponent,
    NotaDEntregaComponent,
    VentasPendComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    materialModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  })
  ],
  providers: [
    ProductService,
    ExcelFormatsService
  ],
  entryComponents: [HistoryComponent,HistoryVentasComponent],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
