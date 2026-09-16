import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasComponent } from './diplomas.component';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb/breadcrumb.service';
import { DiplomasRes } from '../../services/diplomas/interfaces/diplomas.interface';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('DiplomasComponent', () => {
  let component: DiplomasComponent;
  let fixture: ComponentFixture<DiplomasComponent>;
  const mockRes: DiplomasRes = {
    status: true,
    code: 1,
    payload: {
      data: [
        {
          id: '1',
          title: 'Diplomas',
          description: 'string',
          image: 'string',
          immutable: false,
          createdAt: 'string',
          updatedAt: 'string',
        },
      ],
      metadata: {
        page: 1,
        limit: 10,
        total: 20,
        totalPages: 2,
      },
    },
  };

  const diplomasListMock = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    title: 'Diplomas',
    description: 'string',
    image: 'string',
    immutable: false,
    createdAt: 'string',
    updatedAt: 'string',
  }));

  let diplomaServiceMock: {
    getDiplomas: ReturnType<typeof vi.fn>;
  };

  let breadcrumbsServiceMock: {
    setItems: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    diplomaServiceMock = {
      getDiplomas: vi.fn().mockReturnValue(of(mockRes)),
    };
    breadcrumbsServiceMock = {
      setItems: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [DiplomasComponent],
      providers: [
        { provide: DiplomasService, useValue: diplomaServiceMock },
        { provide: BreadcrumbService, useValue: breadcrumbsServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiplomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDiplomas', () => {
    expect(diplomaServiceMock.getDiplomas).toHaveBeenCalled();
  });

  it('should set data to diplomas', () => {
    expect(component.diplomas()).toEqual(mockRes.payload.data);
  });

  it('should call setItems from BreadcrumbService', () => {
    const mockItems = [{ label: 'Diplomas', url: '/home/diplomas' }];
    expect(breadcrumbsServiceMock.setItems).toHaveBeenCalled();
    expect(breadcrumbsServiceMock.setItems).toHaveBeenCalledWith(mockItems);
  });

  it('should update the length of visible', () => {
    component.diplomas.set(diplomasListMock);
    component.showMore();
    expect(component.visible()).toBe(component.diplomas().length);
  });

  it('should return diplomas according to visible count',()=>{
    component.diplomas.set(diplomasListMock);
    expect(component.showedDiplomas().length).toBe(component.visible())
  });

  it('should return all diplomas after showMore()',()=>{
    component.diplomas.set(diplomasListMock)
    component.showMore()
    expect(component.showedDiplomas()).toEqual(diplomasListMock)
  });

  it('should render title & has value Diplomas',()=>{
    const titleComponent = fixture.debugElement.query(By.css('app-page-title'))
    expect(titleComponent).toBeTruthy();
    expect(titleComponent.attributes['title']).toBe("Diplomas")
  });
  it('should render 6 diplomas',()=>{
    component.diplomas.set(diplomasListMock);
    fixture.detectChanges()
    const cards = fixture.debugElement.queryAll(By.css('app-diplomas-card'));
    expect(cards.length).toBe(6);
  });

  it('should render show more button',()=>{
    component.diplomas.set(diplomasListMock)
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
  });

  it('should run showMore() when click',()=>{
    component.diplomas.set(diplomasListMock);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
    button.triggerEventHandler('click');
    expect(component.visible()).toBe(component.diplomas().length);
  })

  it('should render End of list', ()=>{
    component.diplomas.set(diplomasListMock);
    component.showMore();
    fixture.detectChanges();
    const endList = fixture.debugElement.query(By.css('.end-list'));
    expect(endList.nativeElement.textContent).toBe('End of list');
  });

  it('should be removed after click on it',()=>{
    component.diplomas.set(diplomasListMock);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    fixture.detectChanges()
    const removed = fixture.debugElement.query(By.css('button'));
    expect(removed).toBeFalsy();
  })
});
