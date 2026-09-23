import { Component, computed, signal } from '@angular/core';
import { AppShell } from '../../shared/app-shell/app-shell';

interface MemberCompliance {
  name: string;
  percentage: number;
  tone: 'primary' | 'accent' | 'muted';
}

interface WeeklyPoint {
  label: string;
  value: number;
}

interface CategoryShare {
  name: string;
  percentage: number;
  tone: 'primary' | 'accent' | 'muted' | 'danger' | 'primary-dark';
}

type TaskLogStatus = 'on-time' | 'late';

interface TaskLogEntry {
  name: string;
  categoryTone: 'primary' | 'accent';
  responsible: string;
  responsibleInitials: string;
  scheduledDate: string;
  completedDate: string;
  points: number;
  status: TaskLogStatus;
}

@Component({
  imports: [AppShell],
  selector: 'app-reports',
  styleUrl: './reports.scss',
  templateUrl: './reports.html',
})
export class Reports {
  protected readonly currentPage = signal(1);
  protected readonly pageSize = 5;
  protected readonly totalEntries = 142;

  protected readonly stats = [
    { label: 'Eficacia Global', value: '88.2%', icon: '🛡', tone: 'mint' },
    { label: 'Tareas Realizadas', value: '178', icon: '✅', tone: 'neutral' },
    { label: 'Tiempo Invertido', value: '128 hrs', icon: '⏳', tone: 'peach' },
    { label: 'Desviación Media', value: '-1.2 hrs', icon: '◔', tone: 'mint' },
  ];

  protected readonly memberCompliance: MemberCompliance[] = [
    { name: 'Rubén C.', percentage: 94, tone: 'primary' },
    { name: 'Sofía R.', percentage: 88, tone: 'accent' },
    { name: 'Mateo C.', percentage: 79, tone: 'primary' },
    { name: 'Lucía C.', percentage: 91, tone: 'muted' },
  ];

  protected readonly householdGoal = 85;
  protected readonly membersAboveGoal = '3/4';

  protected readonly weeklyTasks: WeeklyPoint[] = [
    { label: 'S38', value: 24 },
    { label: 'S39', value: 28 },
    { label: 'S40', value: 22 },
    { label: 'S41', value: 31 },
    { label: 'S42', value: 35 },
    { label: 'S43', value: 38 },
  ];

  protected readonly weeklyChange = '+12%';

  protected readonly categoryShares: CategoryShare[] = [
    { name: 'Limpieza', percentage: 40, tone: 'primary-dark' },
    { name: 'Cocina', percentage: 30, tone: 'accent' },
    { name: 'Compras', percentage: 15, tone: 'muted' },
    { name: 'Mant.', percentage: 10, tone: 'danger' },
    { name: 'Mascotas & Huerto', percentage: 5, tone: 'primary' },
  ];

  protected readonly totalHours = 128;

  protected readonly taskLog: TaskLogEntry[] = [
    {
      name: 'Limpieza profunda de cocina',
      categoryTone: 'primary',
      responsible: 'Sofía R.',
      responsibleInitials: 'SR',
      scheduledDate: '14 Oct 2024',
      completedDate: '14 Oct 2024, 19:15',
      points: 8,
      status: 'on-time',
    },
    {
      name: 'Aspirar sala y tapetes',
      categoryTone: 'primary',
      responsible: 'Lucía C.',
      responsibleInitials: 'LC',
      scheduledDate: '13 Oct 2024',
      completedDate: '13 Oct 2024, 11:30',
      points: 5,
      status: 'on-time',
    },
    {
      name: 'Sacar basura y reciclaje',
      categoryTone: 'primary',
      responsible: 'Mateo C.',
      responsibleInitials: 'MC',
      scheduledDate: '12 Oct 2024',
      completedDate: '13 Oct 2024, 07:00',
      points: 3,
      status: 'late',
    },
    {
      name: 'Lavar sábanas y toallas',
      categoryTone: 'primary',
      responsible: 'Rubén C.',
      responsibleInitials: 'RC',
      scheduledDate: '11 Oct 2024',
      completedDate: '11 Oct 2024, 16:45',
      points: 6,
      status: 'on-time',
    },
    {
      name: 'Desinfección de refrigerador',
      categoryTone: 'accent',
      responsible: 'Sofía R.',
      responsibleInitials: 'SR',
      scheduledDate: '10 Oct 2024',
      completedDate: '10 Oct 2024, 18:00',
      points: 7,
      status: 'on-time',
    },
  ];

  protected readonly totalPages = computed(() => Math.ceil(this.totalEntries / this.pageSize));

  protected readonly rangeStart = computed(() => (this.currentPage() - 1) * this.pageSize + 1);
  protected readonly rangeEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.totalEntries),
  );

  protected readonly maxWeeklyValue = Math.max(...this.weeklyTasks.map((point) => point.value));

  protected setPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);
  }

  protected sparklinePoints(): string {
    const width = 100;
    const height = 100;
    const paddingY = 15;
    const step = width / (this.weeklyTasks.length - 1);
    const min = Math.min(...this.weeklyTasks.map((point) => point.value));
    const range = this.maxWeeklyValue - min || 1;

    return this.weeklyTasks
      .map((point, index) => {
        const x = index * step;
        const y = height - paddingY - ((point.value - min) / range) * (height - paddingY * 2);
        return `${x},${y}`;
      })
      .join(' ');
  }

  protected sparklineArea(): string {
    const points = this.sparklinePoints();
    return `0,100 ${points} 100,100`;
  }

  protected pointCoordinates(index: number): { x: number; y: number } {
    const coords = this.sparklinePoints().split(' ');
    const [x, y] = coords[index].split(',').map(Number);
    return { x, y };
  }

  protected donutGradient(): string {
    let cursor = 0;
    const colors: Record<CategoryShare['tone'], string> = {
      'primary-dark': '#2f5b4f',
      accent: '#8a4a3a',
      muted: '#a8a49a',
      danger: '#c1442b',
      primary: '#3a6f60',
    };

    const segments = this.categoryShares.map((share) => {
      const start = cursor;
      const end = cursor + share.percentage;
      cursor = end;
      return `${colors[share.tone]} ${start}% ${end}%`;
    });

    return `conic-gradient(${segments.join(', ')})`;
  }
}
