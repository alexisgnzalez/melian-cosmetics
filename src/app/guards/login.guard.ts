import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase/supabase.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService)
  const router = inject(Router)
  console.log('guard', supabaseService.session)
  if (supabaseService.session) return true
  return router.createUrlTree(['/login'])
};
