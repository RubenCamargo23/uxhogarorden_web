import { Component, signal } from '@angular/core';
import { AppShell } from '../../shared/app-shell/app-shell';

type TaskStatus = 'in-progress' | 'pending' | 'done';
type TaskFilter = 'all' | TaskStatus;

interface Task {
  name: string;
  icon: string;
  assignee: string;
  assigneeInitials: string;
  dueDate: string;
  status: TaskStatus;
}

interface MemberLoad {
  name: string;
  tasks: number;
  percentage: number;
  level: 'high' | 'balanced' | 'light';
}

@Component({
  imports: [AppShell],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly activeFilter = signal<TaskFilter>('all');

  protected readonly stats = [
    { label: 'Tareas de hoy', value: 12, unit: 'programadas', note: '4 completadas hoy', icon: 'calendar', tone: 'mint' },
    { label: 'Pendientes', value: 7, unit: 'en cola', note: '2 prioritarias', icon: 'clock', tone: 'peach' },
    { label: 'Completadas', value: 28, unit: 'este ciclo', note: '+15% vs semana anterior', icon: 'check', tone: 'mint' },
    { label: 'Miembros del hogar', value: 4, unit: 'activos', note: 'Rubén, Sofía, Mateo, Lucía', icon: 'home', tone: 'neutral' },
  ];

  protected readonly tasks: Task[] = [
    {
      name: 'Limpieza profunda de cocina',
      icon: '🍳',
      assignee: 'Sofía R.',
      assigneeInitials: 'SR',
      dueDate: 'Hoy, 18:00',
      status: 'in-progress',
    },
    {
      name: 'Sacar reciclaje y residuos',
      icon: '🗑️',
      assignee: 'Mateo C.',
      assigneeInitials: 'MC',
      dueDate: 'Hoy, 20:00',
      status: 'pending',
    },
    {
      name: 'Comprar víveres y despensa',
      icon: '🛒',
      assignee: 'Rubén C.',
      assigneeInitials: 'RC',
      dueDate: 'Ayer',
      status: 'done',
    },
    {
      name: 'Aspirar y fregar sala',
      icon: '🧹',
      assignee: 'Lucía C.',
      assigneeInitials: 'LC',
      dueDate: 'Mañana, 11:00',
      status: 'pending',
    },
    {
      name: 'Lavar ropa y toallas',
      icon: '🧺',
      assignee: 'Sofía R.',
      assigneeInitials: 'SR',
      dueDate: 'Jueves',
      status: 'in-progress',
    },
  ];

  protected readonly memberLoad: MemberLoad[] = [
    { name: 'Rubén C.', tasks: 5, percentage: 32, level: 'balanced' },
    { name: 'Sofía R.', tasks: 6, percentage: 38, level: 'high' },
    { name: 'Mateo C.', tasks: 3, percentage: 18, level: 'balanced' },
    { name: 'Lucía C.', tasks: 2, percentage: 12, level: 'light' },
  ];

  protected readonly totalActiveTasks = 16;

  protected readonly recommendation =
    'Redistribuir 1 tarea de Sofía hacia Mateo o Lucía para lograr un balance óptimo y prevenir fatiga doméstica.';

  protected readonly upcomingMilestone = {
    day: 'SÁB',
    date: 26,
    title: 'Jornada de jardín y terraza',
    detail: 'Participación conjunta • 10:00 AM',
  };

  protected setFilter(filter: TaskFilter): void {
    this.activeFilter.set(filter);
  }

  protected filteredTasks(): Task[] {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.status === filter);
  }

  protected statusLabel(status: TaskStatus): string {
    switch (status) {
      case 'in-progress':
        return 'En curso';
      case 'pending':
        return 'Pendiente';
      case 'done':
        return 'Hecha';
    }
  }

  protected loadLevelLabel(level: MemberLoad['level']): string {
    switch (level) {
      case 'high':
        return 'Carga alta';
      case 'balanced':
        return 'Equilibrado';
      case 'light':
        return 'Carga ligera';
    }
  }
}
