import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PedidoComponent } from './components/pedido/pedido.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'pedidos', component:PedidoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
