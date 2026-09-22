import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type NavKey = 'dashboard' | 'calendar' | 'reports' | 'mediation';

interface NavLink {
  key: NavKey;
  label: string;
  icon: string;
  route: string | null;
}

@Component({
  imports: [RouterLink],
  selector: 'app-shell',
  styleUrl: './app-shell.scss',
  templateUrl: './app-shell.html',
})
export class AppShell {
  readonly activeNav = input<NavKey>('dashboard');
  readonly breadcrumb = input('Vista de gestión');

  protected readonly navLinks: NavLink[] = [
    { key: 'dashboard', label: 'Tablero', icon: '▦', route: '/dashboard' },
    { key: 'calendar', label: 'Calendario', icon: '📅', route: '/calendario' },
    { key: 'reports', label: 'Reportes', icon: '📊', route: '/reportes' },
    { key: 'mediation', label: 'Mediación', icon: '⚖', route: '/mediacion' },
  ];
}
