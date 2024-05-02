import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingAuthComponent } from './seller-auth.component';

describe('SellerAuthComponent', () => {
  let component: SellingAuthComponent;
  let fixture: ComponentFixture<SellingAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellingAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
