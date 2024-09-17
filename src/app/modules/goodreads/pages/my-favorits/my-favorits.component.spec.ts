import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoritsComponent } from './my-favorits.component';

describe('MyFavoritsComponent', () => {
  let component: MyFavoritsComponent;
  let fixture: ComponentFixture<MyFavoritsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFavoritsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFavoritsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
