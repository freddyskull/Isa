import { NgModule } from '@angular/core';

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


@NgModule({
    declarations: [
        UpdatePreComponent,
        ConfirmDialogComponent,
        HistoryComponent,
        EditProductComponent,
        GenerarfacturasComponent,
        PreviewFacturaComponent,
        EmpleadosComponent,
        LoginFormComponent,
        AddEmpleadosComponent,
        HistoryVentasDialogComponent,
        UpdatePendComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
        HistoryComponent,
        HistoryVentasDialogComponent,
        UpdatePendComponent,
        UpdatePreComponent
      ]

})

export class ComponentsModule { }
