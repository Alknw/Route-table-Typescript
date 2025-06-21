import { Component } from '@angular/core';
import { RouteTable } from './components/route-table/route-table';

@Component({
  selector: 'app-root',
  imports: [RouteTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'route-table';
}
