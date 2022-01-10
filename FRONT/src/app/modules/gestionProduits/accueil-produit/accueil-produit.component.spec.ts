import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilProduitComponent } from './accueil-produit.component';

describe('AccueilProduitComponent', () => {
  let component: AccueilProduitComponent;
  let fixture: ComponentFixture<AccueilProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
