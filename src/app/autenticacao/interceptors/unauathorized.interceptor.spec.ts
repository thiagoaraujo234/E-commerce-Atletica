import { TestBed } from '@angular/core/testing';

import { UnauathorizedInterceptor } from './unauathorized.interceptor';

describe('UnauathorizedInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauathorizedInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UnauathorizedInterceptor = TestBed.inject(UnauathorizedInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
