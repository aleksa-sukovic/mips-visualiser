import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserControllerComponent } from './visualiser-controller.component';

describe('ComponentsComponent', () => {
    let component: VisualiserControllerComponent;
    let fixture: ComponentFixture<VisualiserControllerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VisualiserControllerComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VisualiserControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
