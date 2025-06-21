import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './route-table.html',
  styleUrls: ['./route-table.scss'],
})
export class RouteTable {
  routes: Route[] = [
    {
      uuid: '1',
      address: '192.168.1.1',
      mask: '255.255.255.0',
      gateway: '192.168.1.254',
      interface: 'eth0',
    },
    {
      uuid: '2',
      address: '10.0.0.1',
      mask: '255.0.0.0',
      gateway: '10.0.0.254',
      interface: 'eth1',
    },
    {
      uuid: '3',
      address: '172.16.0.1',
      mask: '255.240.0.0',
      gateway: '172.16.0.254',
      interface: 'eth2',
    },
    {
      uuid: '4',
      address: '192.168.0.10',
      mask: '255.255.255.0',
      gateway: '192.168.0.1',
      interface: 'wlan0',
    },
    {
      uuid: '5',
      address: '10.1.1.1',
      mask: '255.255.0.0',
      gateway: '10.1.1.254',
      interface: 'wlan1',
    },
    {
      uuid: '6',
      address: '172.20.0.1',
      mask: '255.255.0.0',
      gateway: '172.20.0.254',
      interface: 'br0',
    },
    {
      uuid: '7',
      address: '192.0.2.1',
      mask: '255.255.255.0',
      gateway: '192.0.2.254',
      interface: 'eth3',
    },
    {
      uuid: '8',
      address: '203.0.113.5',
      mask: '255.255.255.0',
      gateway: '203.0.113.1',
      interface: 'eth4',
    },
    {
      uuid: '9',
      address: '198.51.100.10',
      mask: '255.255.255.0',
      gateway: '198.51.100.1',
      interface: 'eth5',
    },
  ];
  interfaceNames: { [key: string]: string } = {
    eth0: 'Подключение Ethernet',
    eth1: 'Гостевая сеть',
    eth2: 'Домашняя сеть',
    eth3: 'Подключение Ethernet',
    eth4: 'Подключение Ethernet',
    eth5: 'Подключение Ethernet',
    wlan0: 'Wi-Fi 1',
    wlan1: 'Wi-Fi 2',
    br0: 'Сетевой мост',
  };

  sortKey: 'address' | 'gateway' | 'interface' | 'mask' = 'address';
  sortAsc: boolean = true;
  filterAddress = '';
  selectedRoute: Route | null = null;

  get filteredRoutes(): Route[] {
    const filtered = this.routes.filter((route) =>
      route.address.includes(this.filterAddress)
    );

    return filtered.sort((a, b) => {
      const field = this.sortKey;

      let valA: number | string;
      let valB: number | string;

      if (field === 'interface') {
        valA =
          this.interfaceNames[a.interface]?.toLowerCase() ||
          a.interface.toLowerCase();
        valB =
          this.interfaceNames[b.interface]?.toLowerCase() ||
          b.interface.toLowerCase();
      } else if (
        field === 'mask' ||
        field === 'address' ||
        field === 'gateway'
      ) {
        valA = this.ipToNumber(a[field]);
        valB = this.ipToNumber(b[field]);
      } else {
        valA = '';
        valB = '';
      }

      return (valA < valB ? -1 : 1) * (this.sortAsc ? 1 : -1);
    });
  }

  ipToNumber(ip: string): number {
    return ip
      .split('.')
      .map((octet, idx) => parseInt(octet) << ((3 - idx) * 8))
      .reduce((acc, val) => acc + val, 0);
  }

  sortRoutes(field: 'address' | 'gateway' | 'interface' | 'mask') {
    if (this.sortKey === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = field;
      this.sortAsc = true;
    }

    this.routes.sort((a, b) => {
      const valA =
        field === 'interface'
          ? this.interfaceNames[a.interface]?.toLowerCase() ||
            a.interface.toLowerCase()
          : this.ipToNumber(a[field]);

      const valB =
        field === 'interface'
          ? this.interfaceNames[b.interface]?.toLowerCase() ||
            b.interface.toLowerCase()
          : this.ipToNumber(b[field]);

      return (valA < valB ? -1 : 1) * (this.sortAsc ? 1 : -1);
    });
  }

  selectRoute(route: Route) {
    this.selectedRoute = route;
  }

  updateInterface(route: Route, newInterface: string) {
    route.interface = newInterface;
  }

  removeRoute(routeToDelete: Route) {
    this.routes = this.routes.filter(
      (route) => route.uuid !== routeToDelete.uuid
    );
  }
}
