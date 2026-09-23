import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Mediation } from './mediation';

describe('Mediation', () => {
  let component: Mediation;
  let fixture: ComponentFixture<Mediation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mediation],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Mediation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
