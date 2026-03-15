import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCredential } from './add-credential';

describe('AddCredential', () => {
  let component: AddCredential;
  let fixture: ComponentFixture<AddCredential>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCredential]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCredential);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
