import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppShell } from '../../shared/app-shell/app-shell';

type Channel = 'whatsapp' | 'push' | 'email' | 'email-push';
type ChannelFilter = 'all' | 'whatsapp' | 'push' | 'email';

interface ReminderRow {
  icon: string;
  name: string;
  zone: string;
  responsible: string;
  responsibleAvatar?: string;
  time: string;
  frequency: string;
  channel: Channel;
  channelLabel: string;
  active: boolean;
}

@Component({
  imports: [AppShell, ReactiveFormsModule],
  selector: 'app-reminders',
  styleUrl: './reminders.scss',
  templateUrl: './reminders.html',
})
export class Reminders {
  protected readonly activeChannelFilter = signal<ChannelFilter>('all');

  protected readonly activeAlertsCount = 4;
  protected readonly deliveryRate = '98.4%';

  protected readonly reminders = signal<ReminderRow[]>([
    {
      icon: '🗑️',
      name: 'Sacar la basura',
      zone: 'Zona: Exterior & Cocina',
      responsible: 'Mateo C.',
      time: '20:30',
      frequency: 'Diario',
      channel: 'whatsapp',
      channelLabel: 'WhatsApp',
      active: true,
    },
    {
      icon: '🍽️',
      name: 'Lavar los platos de cena',
      zone: 'Zona: Fregadero',
      responsible: 'Sofía R.',
      time: '21:00',
      frequency: 'Diario',
      channel: 'push',
      channelLabel: 'Notif Push',
      active: true,
    },
    {
      icon: '🧹',
      name: 'Aspirar y fregar sala',
      zone: 'Zona: Área común',
      responsible: 'Lucía C.',
      time: '10:00',
      frequency: 'Sábados',
      channel: 'whatsapp',
      channelLabel: 'WhatsApp',
      active: true,
    },
    {
      icon: '🛒',
      name: 'Compras de supermercado',
      zone: 'Despensa semanal',
      responsible: 'Rubén C.',
      responsibleAvatar: 'https://i.pravatar.cc/64?img=12',
      time: '17:00',
      frequency: 'Viernes',
      channel: 'email-push',
      channelLabel: 'Email + Push',
      active: false,
    },
    {
      icon: '🧴',
      name: 'Desinfección de baños',
      zone: 'Zona: Planta Alta',
      responsible: 'Sofía R.',
      time: '11:00',
      frequency: 'Domingos',
      channel: 'push',
      channelLabel: 'Push app',
      active: true,
    },
  ]);

  protected readonly lowStressWindow = 'Franja de bajo estrés: 18:00 – 21:00';

  private readonly formBuilder = inject(FormBuilder);

  protected readonly channelOptions: { key: Channel; label: string; icon: string }[] = [
    { key: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { key: 'push', label: 'Push app', icon: '🔔' },
    { key: 'email', label: 'Email', icon: '✉️' },
  ];

  protected readonly form = this.formBuilder.group({
    task: ['', Validators.required],
    responsible: ['', Validators.required],
    sendTime: ['08:00 PM', Validators.required],
    repetition: ['Diaria', Validators.required],
    channel: ['whatsapp' as Channel, Validators.required],
    message: [''],
    sendReminderBefore: [true],
  });

  protected readonly filteredReminders = computed(() => {
    const filter = this.activeChannelFilter();
    const list = this.reminders();
    if (filter === 'all') {
      return list;
    }
    if (filter === 'email') {
      return list.filter((reminder) => reminder.channel === 'email' || reminder.channel === 'email-push');
    }
    return list.filter((reminder) => reminder.channel === filter);
  });

  protected setChannelFilter(filter: ChannelFilter): void {
    this.activeChannelFilter.set(filter);
  }

  protected toggleReminder(reminder: ReminderRow): void {
    this.reminders.update((list) =>
      list.map((item) => (item === reminder ? { ...item, active: !item.active } : item)),
    );
  }

  protected removeReminder(reminder: ReminderRow): void {
    this.reminders.update((list) => list.filter((item) => item !== reminder));
  }

  protected selectChannel(channel: Channel): void {
    this.form.controls.channel.setValue(channel);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.getRawValue());
  }
}
