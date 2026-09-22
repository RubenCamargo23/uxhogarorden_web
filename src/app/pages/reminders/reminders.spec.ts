import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Reminders } from './reminders';

describe('Reminders', () => {
  let component: Reminders;
  let fixture: ComponentFixture<Reminders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reminders],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Reminders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
