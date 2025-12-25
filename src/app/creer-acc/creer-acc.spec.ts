import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerAcc } from './creer-acc';

describe('CreerAcc', () => {
  let component: CreerAcc;
  let fixture: ComponentFixture<CreerAcc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerAcc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerAcc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
