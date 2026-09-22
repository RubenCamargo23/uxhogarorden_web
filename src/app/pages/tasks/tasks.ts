import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppShell } from '../../shared/app-shell/app-shell';

type Category = 'Cocina' | 'Limpieza general' | 'Ropa y lavandería' | 'Compras y víveres' | 'Mantenimiento' | 'Mascotas';
type Frequency = 'Diaria' | 'Diaria (noches)' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Ocasional' | 'Bisemanal';
type FrequencyFilter = 'Todas' | 'Diaria' | 'Semanal' | 'Quincenal' | 'Mensual' | 'Ocasional';
type EffortFilter = 'all' | 'low' | 'medium' | 'high';

interface HouseholdTask {
  name: string;
  description: string;
  category: Category;
  points: number;
  duration: string;
  frequency: Frequency;
  responsible: string;
  responsibleAvatar: string;
}

interface CategoryOption {
  name: Category;
  count: number;
}

@Component({
  imports: [FormsModule, AppShell],
  selector: 'app-tasks',
  styleUrl: './tasks.scss',
  templateUrl: './tasks.html',
})
export class Tasks {
  protected readonly searchTerm = signal('');
  protected readonly selectedCategories = signal<Set<Category>>(new Set(['Cocina', 'Limpieza general', 'Ropa y lavandería', 'Compras y víveres']));
  protected readonly frequencyFilter = signal<FrequencyFilter>('Diaria');
  protected readonly effortFilter = signal<EffortFilter>('all');
  protected readonly currentPage = signal(1);

  protected readonly pageSize = 6;

  protected readonly categoryOptions: CategoryOption[] = [
    { name: 'Cocina', count: 8 },
    { name: 'Limpieza general', count: 12 },
    { name: 'Ropa y lavandería', count: 5 },
    { name: 'Compras y víveres', count: 4 },
    { name: 'Mantenimiento', count: 3 },
    { name: 'Mascotas', count: 2 },
  ];

  protected readonly frequencyOptions: FrequencyFilter[] = [
    'Todas',
    'Diaria',
    'Semanal',
    'Quincenal',
    'Mensual',
    'Ocasional',
  ];

  protected readonly tasks: HouseholdTask[] = [
    {
      name: 'Lavar los platos y encimeras',
      description: 'Lavar platos de la cena, desinfectar la barra de la cocina.',
      category: 'Cocina',
      points: 5,
      duration: '30 min',
      frequency: 'Diaria',
      responsible: 'Sofía R.',
      responsibleAvatar: 'https://i.pravatar.cc/64?img=47',
    },
    {
      name: 'Sacar la basura y reciclaje',
      description: 'Separar contenedores de orgánico, plásticos y cartón.',
      category: 'Limpieza general',
      points: 3,
      duration: '15 min',
      frequency: 'Diaria (noches)',
      responsible: 'Mateo C.',
      responsibleAvatar: 'https://i.pravatar.cc/64?img=13',
    },
    {
      name: 'Aspirar la sala y tapetes',
      description: 'Mover mobiliario ligero, aspirar piso de madera.',
      category: 'Limpieza general',
      points: 7,
      duration: '45 min',
      frequency: 'Semanal',
      responsible: 'Lucía C.',
      responsibleAvatar: 'https://i.pravatar.cc/64?img=25',
    },
    {
      name: 'Lavar, tender y doblar ropa blanca',
      description: 'Ciclo de lavado suave, tratamiento de toallas y sábanas.',
      category: 'Ropa y lavandería',
      points: 8,
      duration: '60 min',
      frequency: 'Semanal',
      responsible: 'Rubén C.',
      responsibleAvatar: 'https://i.pravatar.cc/64?img=12',
    },
    {
      name: 'Inventario de despensa y compras',
      description: 'Auditar productos básicos en la despensa, redactar lista.',
      category: 'Compras y víveres',
      points: 6,
      duration: '90 min',
      frequency: 'Semanal',
      responsible: 'Rubén C.',
      responsibleAvatar: 'https://i.pravatar.cc/64?img=12',
    },
    {
      name: 'Regar plantas interiores y terraza',
      description: 'Comprobar humedad de sustratos en macetas del hogar.',
      category: 'Mantenimiento',
      points: 4,
      duration: '20 min',
      frequency: 'Bisemanal',
      responsible: 'Mateo C.',
      responsibleAvatar: 'https://i.pravatar.cc/64?img=13',
    },
  ];

  protected readonly totalTasks = 24;

  protected readonly filteredTasks = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.tasks;
    }
    return this.tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(term) || task.description.toLowerCase().includes(term),
    );
  });

  protected readonly totalPages = 4;

  protected readonly pages = computed(() =>
    Array.from({ length: this.totalPages }, (_, i) => i + 1),
  );

  protected toggleCategory(category: Category): void {
    this.selectedCategories.update((current) => {
      const next = new Set(current);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  protected isCategorySelected(category: Category): boolean {
    return this.selectedCategories().has(category);
  }

  protected setFrequency(frequency: FrequencyFilter): void {
    this.frequencyFilter.set(frequency);
  }

  protected setEffort(effort: EffortFilter): void {
    this.effortFilter.set(effort);
  }

  protected setPage(page: number): void {
    this.currentPage.set(page);
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategories.set(new Set());
    this.frequencyFilter.set('Todas');
    this.effortFilter.set('all');
  }

  protected pointsTone(points: number): string {
    if (points <= 3) {
      return 'low';
    }
    if (points <= 6) {
      return 'medium';
    }
    return 'high';
  }
}
