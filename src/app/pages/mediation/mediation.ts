import { Component, computed, signal } from '@angular/core';
import { AppShell } from '../../shared/app-shell/app-shell';

type CaseStatus = 'mediation' | 'pending-response' | 'resolved';
type CaseFilter = 'all' | 'open' | 'resolved';

interface MediationCase {
  id: string;
  reference: string;
  openedAgo: string;
  resolvedOn?: string;
  status: CaseStatus;
  title: string;
  task: string;
  parties: string;
  partyInitials: string[];
}

interface ArgumentEntry {
  author: string;
  timestamp: string;
  tag: string;
  message: string;
}

@Component({
  imports: [AppShell],
  selector: 'app-mediation',
  styleUrl: './mediation.scss',
  templateUrl: './mediation.html',
})
export class Mediation {
  protected readonly activeFilter = signal<CaseFilter>('all');
  protected readonly selectedCaseId = signal('104');

  protected readonly resolutionRate = '94.2%';
  protected readonly averageTime = '1.8 días';

  protected readonly cases: MediationCase[] = [
    {
      id: '104',
      reference: 'SEC-2023-104',
      openedAgo: 'Hace 2 días',
      status: 'mediation',
      title: 'Turno de la cocina no realizado el domingo',
      task: 'Lavar los platos y encimeras de la cena',
      parties: 'Rubén C. (Reportante) y Sofía R. (Responsable)',
      partyInitials: ['RC', 'SR'],
    },
    {
      id: '103',
      reference: 'SEC-2023-103',
      openedAgo: 'Hace 4 días',
      status: 'pending-response',
      title: 'Frecuencia de sacar la basura acumulada',
      task: 'Sacar basura y reciclaje',
      parties: 'Sofía R. y Mateo C.',
      partyInitials: ['SR', 'MC'],
    },
    {
      id: '102',
      reference: 'SEC-2023-102',
      openedAgo: 'Resuelto el 08 Oct',
      resolvedOn: '08 Oct',
      status: 'resolved',
      title: 'Intercambio de turno: Paseo del perro por aspirado',
      task: 'Paseo de Milo y Aspirado general',
      parties: 'Mateo C. y Lucía C.',
      partyInitials: ['MC', 'LC'],
    },
  ];

  protected readonly caseCounts = {
    all: this.cases.length,
    open: this.cases.filter((c) => c.status !== 'resolved').length,
    resolved: this.cases.filter((c) => c.status === 'resolved').length,
  };

  protected readonly filteredCases = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.cases;
    }
    if (filter === 'resolved') {
      return this.cases.filter((c) => c.status === 'resolved');
    }
    return this.cases.filter((c) => c.status !== 'resolved');
  });

  protected readonly selectedCase = computed(
    () => this.cases.find((c) => c.id === this.selectedCaseId()) ?? this.cases[0],
  );

  protected readonly argumentThread: ArgumentEntry[] = [
    {
      author: 'Sofía R.',
      timestamp: 'Ayer a las 10:15',
      tag: 'Respuesta',
      message:
        'Tuve que atender una urgencia de trabajo hasta tarde el domingo. Propongo compensar el turno lavando los platos el martes y jueves de esta semana.',
    },
    {
      author: 'Rubén C.',
      timestamp: 'Ayer a las 14:30',
      tag: 'Conformidad parcial',
      message:
        'De acuerdo con el reemplazo de martes y jueves, siempre que quede registrado en el calendario oficial.',
    },
  ];

  protected setFilter(filter: CaseFilter): void {
    this.activeFilter.set(filter);
  }

  protected selectCase(id: string): void {
    this.selectedCaseId.set(id);
  }

  protected statusLabel(status: CaseStatus): string {
    switch (status) {
      case 'mediation':
        return 'En mediación';
      case 'pending-response':
        return 'Pendiente de respuesta';
      case 'resolved':
        return 'Resuelto';
    }
  }
}
