import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigateComponent } from './components/navigate/navigate.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ListClientComponent } from './pages/client/list-client/list-client.component'
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
import { ExistenciasComponent } from './components/existencias/existencias.component';
import { ExistlistComponent } from './components/existencias/existlist/existlist.component'
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
//dialogs
import { HistoryComponent } from './components/dialog/history/history.component';
import { HistoryVentasDialogComponent } from './components/dialog/history-ventas-dialog/history-ventas-dialog.component'
import { UpdatePendComponent } from './components/dialog/update-pend/update-pend.component'
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { UpdatePreComponent } from './components/dialog/update-presupuest-product/update-pre/update-pre.component' 
import { GenerarfacturasComponent } from './pages/generarfacturas/generarfacturas.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
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
import { OrderModule } from 'ngx-order-pipe';
import { ConvertBsPipe } from './pipes/bsPipes/convert-bs.pipe';
import { ConfirmFacNotaComponent } from './components/dialog/confirm-fac-nota/confirm-fac-nota.component';

@NgModule({
  declarations: [
    ConfirmFacNotaComponent,
    ExportExcelComponent,
    HistoryUserComponent,
    HistoryVentasComponent,
    AppComponent,
    UpdatePreComponent,
    ConfirmDialogComponent,
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
    ExistenciasComponent,
    ExistlistComponent,
    CategoryComponent,
    CategoryaddComponent,
    FilterProductPipe,
    ConvertBsPipe,
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
    HistoryVentasDialogComponent,
    UpdatePendComponent,
  ],
  imports: [
    OrderModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    materialModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ProductService,
    ExcelFormatsService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ConfirmFacNotaComponent,
    HistoryComponent,
    HistoryVentasComponent,
    HistoryVentasDialogComponent,
    UpdatePendComponent,
    UpdatePreComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
