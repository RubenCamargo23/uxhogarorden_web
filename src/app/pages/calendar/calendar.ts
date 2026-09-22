import { Component, signal } from '@angular/core';
import { AppShell } from '../../shared/app-shell/app-shell';

type Assignee = 'ruben' | 'sofia' | 'mateo' | 'lucia' | 'shared';
type ViewMode = 'Mes' | 'Semana' | 'Día';

interface DayEvent {
  time?: string;
  label: string;
  assignee: Assignee;
}

interface CalendarDay {
  date: number;
  monthLabel?: string;
  isCurrentMonth: boolean;
  isToday?: boolean;
  events: DayEvent[];
  extraCount?: number;
}

interface AssigneeFilter {
  key: Assignee;
  label: string;
}

interface EquityMember {
  name: string;
  tasks: number;
  percentage: number;
  tone: Assignee;
}

@Component({
  imports: [AppShell],
  selector: 'app-calendar',
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
})
export class Calendar {
  protected readonly viewMode = signal<ViewMode>('Mes');
  protected readonly viewModes: ViewMode[] = ['Mes', 'Semana', 'Día'];
  protected readonly monthLabel = 'Octubre 2024';

  protected readonly stats = [
    { label: 'Tareas esta semana', value: '28', icon: '☑', tone: 'mint' },
    { label: 'Completadas hoy', value: '6 / 8', icon: '✓', tone: 'mint' },
    { label: 'Balance colectivo', value: '94%', icon: '⚖', tone: 'neutral' },
    { label: 'Jornada colectiva', value: 'Sáb 19 Oct', icon: '🧹', tone: 'peach' },
  ];

  protected readonly assigneeFilters: AssigneeFilter[] = [
    { key: 'ruben', label: 'Rubén C.' },
    { key: 'sofia', label: 'Sofía R.' },
    { key: 'mateo', label: 'Mateo C.' },
    { key: 'lucia', label: 'Lucía C.' },
    { key: 'shared', label: 'Tareas Compartidas' },
  ];

  protected readonly weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  protected readonly calendarDays: CalendarDay[] = [
    { date: 30, monthLabel: 'Sep', isCurrentMonth: false, events: [{ label: 'Cierre de mes', assignee: 'shared' }] },
    { date: 1, isCurrentMonth: true, events: [{ label: 'Plan de compras', assignee: 'ruben' }] },
    { date: 2, isCurrentMonth: true, events: [{ label: 'Aspirar dormitorio', assignee: 'lucia' }] },
    { date: 3, isCurrentMonth: true, events: [{ label: 'Regar jardín frontal', assignee: 'mateo' }] },
    { date: 4, isCurrentMonth: true, events: [{ label: 'Cambio de toallas', assignee: 'sofia' }] },
    { date: 5, isCurrentMonth: true, events: [{ label: 'Feria orgánica', assignee: 'shared' }] },
    { date: 6, isCurrentMonth: true, events: [{ label: 'Repaso despensa', assignee: 'ruben' }] },

    { date: 7, isCurrentMonth: true, events: [{ label: 'Sacar reciclaje', assignee: 'ruben' }] },
    { date: 8, isCurrentMonth: true, events: [{ label: 'Desinfección estufa', assignee: 'sofia' }] },
    { date: 9, isCurrentMonth: true, events: [{ label: 'Revisión filtros aire', assignee: 'mateo' }] },
    { date: 10, isCurrentMonth: true, events: [{ label: 'Baño de mascotas', assignee: 'lucia' }] },
    { date: 11, isCurrentMonth: true, events: [{ label: 'Limpieza garaje', assignee: 'mateo' }] },
    { date: 12, isCurrentMonth: true, events: [{ label: 'Poda ligera patio', assignee: 'mateo' }] },
    { date: 13, isCurrentMonth: true, events: [{ label: 'Plan de comidas', assignee: 'sofia' }] },

    {
      date: 14,
      isCurrentMonth: true,
      isToday: true,
      events: [
        { time: '08:00', label: 'Pasear mascota', assignee: 'mateo' },
        { time: '13:30', label: 'Almuerzo', assignee: 'sofia' },
        { time: '20:00', label: 'Sacar basura', assignee: 'ruben' },
      ],
      extraCount: 1,
    },
    { date: 15, isCurrentMonth: true, events: [{ label: 'Limpieza baños', assignee: 'sofia' }, { label: 'Regar plantas', assignee: 'lucia' }] },
    { date: 16, isCurrentMonth: true, events: [{ label: 'Aspirar sala', assignee: 'mateo' }, { label: 'Cocina y platos', assignee: 'sofia' }] },
    { date: 17, isCurrentMonth: true, events: [{ label: 'Lavandería general', assignee: 'lucia' }] },
    { date: 18, isCurrentMonth: true, events: [{ label: 'Compras de mercado', assignee: 'ruben' }, { label: 'Ventanas balcón', assignee: 'lucia' }] },
    { date: 19, isCurrentMonth: true, events: [{ label: 'Limpieza profunda', assignee: 'shared' }] },
    { date: 20, isCurrentMonth: true, events: [{ label: 'Organización sec.', assignee: 'shared' }] },

    { date: 21, isCurrentMonth: true, events: [{ label: 'Paseo canino & ce...', assignee: 'mateo' }] },
    { date: 22, isCurrentMonth: true, events: [{ label: 'Descongelar nevera', assignee: 'sofia' }] },
    { date: 23, isCurrentMonth: true, events: [{ label: 'Recambio sábanas', assignee: 'lucia' }] },
    { date: 24, isCurrentMonth: true, events: [{ label: 'Limpieza de horno', assignee: 'sofia' }] },
    { date: 25, isCurrentMonth: true, events: [{ label: 'Organización de do...', assignee: 'ruben' }] },
    { date: 26, isCurrentMonth: true, events: [{ label: 'Lavado de cortinas', assignee: 'lucia' }] },
    { date: 27, isCurrentMonth: true, events: [{ label: 'Revisión de cuenta...', assignee: 'ruben' }] },

    { date: 28, isCurrentMonth: true, events: [{ label: 'Aspirado exhaustiv...', assignee: 'mateo' }] },
    { date: 29, isCurrentMonth: true, events: [{ label: 'Baños secundarios', assignee: 'sofia' }] },
    { date: 30, isCurrentMonth: true, events: [{ label: 'Fregar terraza', assignee: 'lucia' }] },
    { date: 31, isCurrentMonth: true, events: [{ label: 'Inventario mensual', assignee: 'ruben' }] },
    { date: 1, monthLabel: 'Nov', isCurrentMonth: false, events: [{ label: 'Día festivo', assignee: 'shared' }] },
    { date: 2, monthLabel: 'Nov', isCurrentMonth: false, events: [{ label: 'Reunión vecinal', assignee: 'shared' }] },
    { date: 3, monthLabel: 'Nov', isCurrentMonth: false, events: [{ label: 'Descanso programa...', assignee: 'shared' }] },
  ];

  protected readonly todayEvents: DayEvent[] = [
    { time: '08:00 AM', label: 'Pasear mascota', assignee: 'mateo' },
    { time: '13:30 PM', label: 'Almuerzo familiar', assignee: 'sofia' },
    { time: '20:00 PM', label: 'Sacar basura & reciclaje', assignee: 'ruben' },
  ];

  protected readonly todayZones: Record<string, string> = {
    'Pasear mascota': 'Mateo C. • Zona: Parque / Exterior',
    'Almuerzo familiar': 'Sofía R. • Zona: Cocina principal',
    'Sacar basura & reciclaje': 'Rubén C. • Zona: Entrada de servicio',
  };

  protected readonly equityMembers: EquityMember[] = [
    { name: 'Rubén C.', tasks: 7, percentage: 28, tone: 'ruben' },
    { name: 'Sofía R.', tasks: 8, percentage: 32, tone: 'sofia' },
    { name: 'Mateo C.', tasks: 5, percentage: 20, tone: 'mateo' },
    { name: 'Lucía C.', tasks: 5, percentage: 20, tone: 'lucia' },
  ];

  protected setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  protected assigneeInitial(assignee: Assignee): string {
    switch (assignee) {
      case 'ruben':
        return 'R';
      case 'sofia':
        return 'S';
      case 'mateo':
        return 'M';
      case 'lucia':
        return 'L';
      case 'shared':
        return '⇄';
    }
  }

  protected zoneFor(label: string): string {
    return this.todayZones[label] ?? '';
  }
}
