import { Component, computed, signal } from '@angular/core';
import { AppShell } from '../../shared/app-shell/app-shell';

type MemberId = 'ruben' | 'sofia' | 'mateo' | 'lucia';

interface PendingTask {
  id: string;
  name: string;
  points: number;
  duration: string;
  frequency: string;
  category: string;
}

interface AssignedTask {
  id: string;
  name: string;
}

interface Member {
  id: MemberId;
  name: string;
  role: string;
  avatar: string;
  suggestedLimit: number;
  assignedTasks: AssignedTask[];
}

@Component({
  imports: [AppShell],
  selector: 'app-assignment',
  styleUrl: './assignment.scss',
  templateUrl: './assignment.html',
})
export class Assignment {
  protected readonly pendingTasks = signal<PendingTask[]>([
    { id: 't1', name: 'Descongelar y limpiar nevera', points: 8, duration: '60 min', frequency: 'Mensual', category: 'Cocina' },
    { id: 't2', name: 'Limpiar ventanas del salón', points: 5, duration: '40 min', frequency: 'Quincenal', category: 'Limpieza' },
    { id: 't3', name: 'Bañar al perro y cepillarlo', points: 6, duration: '45 min', frequency: 'Quincenal', category: 'Mascotas' },
    { id: 't4', name: 'Revisar filtros de aire', points: 4, duration: '25 min', frequency: 'Mensual', category: 'Mantenimiento' },
  ]);

  protected readonly members = signal<Member[]>([
    {
      id: 'ruben',
      name: 'Rubén C.',
      role: 'Coordinador',
      avatar: 'https://i.pravatar.cc/64?img=12',
      suggestedLimit: 22,
      assignedTasks: [
        { id: 'a1', name: 'Compras de despensa' },
        { id: 'a2', name: 'Lavar ropa blanca' },
        { id: 'a3', name: 'Organizar alacena' },
      ],
    },
    {
      id: 'sofia',
      name: 'Sofía R.',
      role: 'Miembro activo',
      avatar: 'https://i.pravatar.cc/64?img=47',
      suggestedLimit: 22,
      assignedTasks: [
        { id: 'a4', name: 'Lavar platos' },
        { id: 'a5', name: 'Cocinar cena lun-mie' },
        { id: 'a6', name: 'Desinfectar baños' },
        { id: 'a7', name: 'Planchar camisas' },
      ],
    },
    {
      id: 'mateo',
      name: 'Mateo C.',
      role: 'Hijo menor',
      avatar: 'https://i.pravatar.cc/64?img=13',
      suggestedLimit: 20,
      assignedTasks: [
        { id: 'a8', name: 'Sacar basura' },
        { id: 'a9', name: 'Pasear mascota mañana' },
        { id: 'a10', name: 'Reciclar cartón' },
      ],
    },
    {
      id: 'lucia',
      name: 'Lucía C.',
      role: 'Hija mayor',
      avatar: 'https://i.pravatar.cc/64?img=25',
      suggestedLimit: 25,
      assignedTasks: [
        { id: 'a11', name: 'Aspirar sala' },
        { id: 'a12', name: 'Regar plantas' },
        { id: 'a13', name: 'Ordenar biblioteca' },
      ],
    },
  ]);

  protected readonly taskPoints: Record<string, number> = {
    'Compras de despensa': 6,
    'Lavar ropa blanca': 5,
    'Organizar alacena': 7,
    'Lavar platos': 5,
    'Cocinar cena lun-mie': 9,
    'Desinfectar baños': 8,
    'Planchar camisas': 6,
    'Sacar basura': 3,
    'Pasear mascota mañana': 4,
    'Reciclar cartón': 5,
    'Aspirar sala': 4,
    'Regar plantas': 2,
    'Ordenar biblioteca': 4,
  };

  protected readonly draggedTaskId = signal<string | null>(null);

  protected readonly totalPendingPoints = computed(() =>
    this.pendingTasks().reduce((sum, task) => sum + task.points, 0),
  );

  protected readonly totalCyclePoints = 68;

  protected memberPoints(member: Member): number {
    return member.assignedTasks.reduce((sum, task) => sum + (this.taskPoints[task.name] ?? 0), 0);
  }

  protected memberPercentage(member: Member): number {
    return Math.round((this.memberPoints(member) / member.suggestedLimit) * 100);
  }

  protected isOverloaded(member: Member): boolean {
    return this.memberPoints(member) > member.suggestedLimit;
  }

  protected globalSharePercentage(member: Member): number {
    return Math.round((this.memberPoints(member) / this.totalCyclePoints) * 100);
  }

  protected onDragStart(taskId: string): void {
    this.draggedTaskId.set(taskId);
  }

  protected onDragEnd(): void {
    this.draggedTaskId.set(null);
  }

  protected onDropOnMember(memberId: MemberId): void {
    const taskId = this.draggedTaskId();
    if (!taskId) {
      return;
    }
    this.assignTask(taskId, memberId);
  }

  protected assignTask(taskId: string, memberId: MemberId): void {
    const task = this.pendingTasks().find((t) => t.id === taskId);
    if (!task) {
      return;
    }

    this.taskPoints[task.name] = task.points;

    this.members.update((list) =>
      list.map((member) =>
        member.id === memberId
          ? { ...member, assignedTasks: [...member.assignedTasks, { id: task.id, name: task.name }] }
          : member,
      ),
    );

    this.pendingTasks.update((list) => list.filter((t) => t.id !== taskId));
    this.draggedTaskId.set(null);
  }

  protected unassignTask(memberId: MemberId, taskId: string): void {
    this.members.update((list) =>
      list.map((member) =>
        member.id === memberId
          ? { ...member, assignedTasks: member.assignedTasks.filter((t) => t.id !== taskId) }
          : member,
      ),
    );
  }

  protected readonly overloadedMember = computed(() =>
    this.members().find((member) => this.isOverloaded(member)),
  );
}
