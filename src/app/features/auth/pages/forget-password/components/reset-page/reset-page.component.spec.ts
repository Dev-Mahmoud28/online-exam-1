import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPageComponent } from './reset-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ResetPageComponent', () => {
  let component: ResetPageComponent;
  let fixture: ComponentFixture<ResetPageComponent>;
  let routerMock : {
    navigate: ReturnType<typeof vi.fn>
  }
  beforeEach(async () => {
    routerMock = {
      navigate: vi.fn()
    }
    await TestBed.configureTestingModule({
      imports: [ResetPageComponent],
      providers:[
        {provide:Router, useValue:routerMock},
        {provide: ActivatedRoute, useValue:{}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get email from local storage', ()=>{
    component.showEmail();
    expect(component.sentEmail()).toBe(localStorage.getItem('email'));
  });

  it('should navigate to back',()=>{
    component.back();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/recovery-email'])
  });

  //Template
  it('should render back button',()=>{
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
  });

  it('should render email sent', ()=>{
    component.sentEmail.set('alex@yahoo.com');
    fixture.detectChanges()
    const emailSpan = fixture.debugElement.query(By.css('span'));
    expect(emailSpan.nativeElement.textContent.trim()).toBe('alex@yahoo.com');
  })
});
