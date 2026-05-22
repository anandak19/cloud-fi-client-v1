import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginatorComponent } from '@features/dashboard/components/feature/paginator-component/paginator-component';
import { RouterCard } from '@features/dashboard/components/feature/router-card/router-card';
import { PageTitleComponent } from '@features/dashboard/components/ui/page-title-component/page-title-component';
import { IRouter, IListUserRouter, IRouterList } from '@features/dashboard/models/routers.model';
import { RoutersService } from '@features/dashboard/services/routers/routers-service';

@Component({
  selector: 'app-user-routers',
  imports: [PageTitleComponent, PaginatorComponent, RouterCard],
  templateUrl: './user-routers.html',
  styleUrl: './user-routers.scss',
})
export class UserRouters implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _routerService = inject(RoutersService);
  private _destroyRef = inject(DestroyRef);

  pageSize = signal<number>(5);
  pageIndex = signal<number>(0);
  paginatedData = signal<IRouterList[]>([]);

  routers = signal<IListUserRouter[]>([]);

  // routers: IRouter[] = [
  //   {
  //     id: 'R001',
  //     deviceName: 'TP-Link Archer C6',
  //     port: 8080,
  //     dns: '8.8.8.8',
  //     username: 'admin',
  //     callerId: 'CALLER-1001',
  //   },
  //   {
  //     id: 'R002',
  //     deviceName: 'Netgear Nighthawk AC1900',
  //     port: 9090,
  //     dns: '1.1.1.1',
  //     username: 'netuser',
  //     callerId: 'CALLER-1002',
  //   },
  //   {
  //     id: 'R003',
  //     deviceName: 'D-Link DIR-825',
  //     port: 3000,
  //     dns: '8.8.4.4',
  //     username: 'dlink-admin',
  //     callerId: 'CALLER-1003',
  //   },
  //   {
  //     id: 'R004',
  //     deviceName: 'Huawei HG8145V5',
  //     port: 5544,
  //     dns: '9.9.9.9',
  //     username: 'huawei-user',
  //     callerId: 'CALLER-1004',
  //   },
  //   {
  //     id: 'R005',
  //     deviceName: 'Cisco RV340',
  //     port: 443,
  //     dns: '208.67.222.222',
  //     username: 'cisco-admin',
  //     callerId: 'CALLER-1005',
  //   },

  //   {
  //     id: 'R006',
  //     deviceName: 'Asus RT-AX55',
  //     port: 8081,
  //     dns: '8.26.56.26',
  //     username: 'asus-admin',
  //     callerId: 'CALLER-1006',
  //   },
  //   {
  //     id: 'R007',
  //     deviceName: 'TP-Link Deco M5',
  //     port: 8000,
  //     dns: '8.20.247.20',
  //     username: 'tplink-user',
  //     callerId: 'CALLER-1007',
  //   },
  //   {
  //     id: 'R008',
  //     deviceName: 'Google Nest WiFi',
  //     port: 8888,
  //     dns: '8.8.8.8',
  //     username: 'google-home',
  //     callerId: 'CALLER-1008',
  //   },
  //   {
  //     id: 'R009',
  //     deviceName: 'Tenda AC10U',
  //     port: 6789,
  //     dns: '1.0.0.1',
  //     username: 'tenda-admin',
  //     callerId: 'CALLER-1009',
  //   },
  //   {
  //     id: 'R010',
  //     deviceName: 'Linksys WRT3200ACM',
  //     port: 9443,
  //     dns: '208.67.220.220',
  //     username: 'linksys',
  //     callerId: 'CALLER-1010',
  //   },

  //   {
  //     id: 'R011',
  //     deviceName: 'Netgear Orbi RBK50',
  //     port: 7000,
  //     dns: '9.9.9.10',
  //     username: 'orbi-user',
  //     callerId: 'CALLER-1011',
  //   },
  //   {
  //     id: 'R012',
  //     deviceName: 'MikroTik hAP ac2',
  //     port: 8728,
  //     dns: '8.8.4.4',
  //     username: 'mikrotik',
  //     callerId: 'CALLER-1012',
  //   },
  //   {
  //     id: 'R013',
  //     deviceName: 'Ubiquiti UniFi Dream Machine',
  //     port: 8443,
  //     dns: '1.1.1.1',
  //     username: 'unifi',
  //     callerId: 'CALLER-1013',
  //   },
  //   {
  //     id: 'R014',
  //     deviceName: 'D-Link DIR-615',
  //     port: 8085,
  //     dns: '9.9.9.9',
  //     username: 'dlink615',
  //     callerId: 'CALLER-1014',
  //   },
  //   {
  //     id: 'R015',
  //     deviceName: 'Xiaomi Mi Router 4A',
  //     port: 9091,
  //     dns: '8.8.8.8',
  //     username: 'mi-admin',
  //     callerId: 'CALLER-1015',
  //   },

  //   {
  //     id: 'R016',
  //     deviceName: 'TP-Link Archer AX73',
  //     port: 6060,
  //     dns: '1.0.0.1',
  //     username: 'tplink-ax',
  //     callerId: 'CALLER-1016',
  //   },
  //   {
  //     id: 'R017',
  //     deviceName: 'Netgear R7000',
  //     port: 5151,
  //     dns: '8.26.56.26',
  //     username: 'r7000-admin',
  //     callerId: 'CALLER-1017',
  //   },
  //   {
  //     id: 'R018',
  //     deviceName: 'Asus RT-AC68U',
  //     port: 8899,
  //     dns: '8.8.4.4',
  //     username: 'asus68',
  //     callerId: 'CALLER-1018',
  //   },
  //   {
  //     id: 'R019',
  //     deviceName: 'Huawei WS5200',
  //     port: 6780,
  //     dns: '9.9.9.10',
  //     username: 'hua-user',
  //     callerId: 'CALLER-1019',
  //   },
  //   {
  //     id: 'R020',
  //     deviceName: 'Cisco RV260',
  //     port: 9440,
  //     dns: '208.67.222.222',
  //     username: 'cisco260',
  //     callerId: 'CALLER-1020',
  //   },

  //   {
  //     id: 'R021',
  //     deviceName: 'Ubiquiti EdgeRouter X',
  //     port: 10001,
  //     dns: '1.1.1.1',
  //     username: 'edge-x',
  //     callerId: 'CALLER-1021',
  //   },
  //   {
  //     id: 'R022',
  //     deviceName: 'TP-Link Archer C80',
  //     port: 7777,
  //     dns: '8.8.8.8',
  //     username: 'c80-admin',
  //     callerId: 'CALLER-1022',
  //   },
  //   {
  //     id: 'R023',
  //     deviceName: 'Netgear XR500',
  //     port: 8086,
  //     dns: '9.9.9.9',
  //     username: 'xr500',
  //     callerId: 'CALLER-1023',
  //   },
  //   {
  //     id: 'R024',
  //     deviceName: 'D-Link COVR-1100',
  //     port: 8008,
  //     dns: '8.8.4.4',
  //     username: 'covr-admin',
  //     callerId: 'CALLER-1024',
  //   },
  //   {
  //     id: 'R025',
  //     deviceName: 'Xiaomi AX3000',
  //     port: 3030,
  //     dns: '1.0.0.1',
  //     username: 'xiaomi3000',
  //     callerId: 'CALLER-1025',
  //   },

  //   {
  //     id: 'R026',
  //     deviceName: 'Asus ZenWiFi AX',
  //     port: 8181,
  //     dns: '208.67.220.220',
  //     username: 'zenwifi',
  //     callerId: 'CALLER-1026',
  //   },
  //   {
  //     id: 'R027',
  //     deviceName: 'Tenda N301',
  //     port: 6065,
  //     dns: '9.9.9.10',
  //     username: 'n301-user',
  //     callerId: 'CALLER-1027',
  //   },
  //   {
  //     id: 'R028',
  //     deviceName: 'Netgear AC1200',
  //     port: 9095,
  //     dns: '8.8.8.8',
  //     username: 'ac1200',
  //     callerId: 'CALLER-1028',
  //   },
  //   {
  //     id: 'R029',
  //     deviceName: 'TP-Link MR600',
  //     port: 5500,
  //     dns: '1.1.1.1',
  //     username: 'mr600-admin',
  //     callerId: 'CALLER-1029',
  //   },
  //   {
  //     id: 'R030',
  //     deviceName: 'MikroTik hEX S',
  //     port: 8799,
  //     dns: '8.26.56.26',
  //     username: 'hex-s',
  //     callerId: 'CALLER-1030',
  //   },
  // ];

  get length() {
    return this.routers.length;
  }

  navigateSales(id: string) {
    this._router.navigate([`${id}/sales`], { relativeTo: this._activatedRoute });
  }

  navigateCollections(id: string) {
    this._router.navigate([`${id}/collections`], { relativeTo: this._activatedRoute });
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    this.paginatedData.set(
      this.routers()
        .slice(start, end)
        .map((item) => ({
          id: item.router._id,
          deviceName: item.router.deviceName,
          port: item.router.port,
          dns: item.router.dns,
          userName: item.router.userName,
          callerId: item.router.callerId || '-',
        })),
    );
  }

  getRouters() {
    this._routerService
      .getUsersRouters()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.routers.set(res);
          this.updatePaginatedData();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnInit(): void {
    // this.updatePaginatedData();
    this.getRouters();
  }
}
