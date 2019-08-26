import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageNetModelComponent } from './image-net-model.component';

describe('ImageNetModelComponent', () => {
  let component: ImageNetModelComponent;
  let fixture: ComponentFixture<ImageNetModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageNetModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageNetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
