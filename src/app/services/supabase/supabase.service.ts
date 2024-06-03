import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router'

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

export interface Product {
  capid: string,
  name: string,
  capprice: number,
  quantity: number,
  delivery: number,
  suggestedprice: number,
  price: number,
  imageurl: string,
  discount: number,
  soldquantity: number
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp(
      { email }
    )
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  insertProduct(product: Product) {
    const insertData = {
      ...product,
      updated_at: new Date()
    }
    console.log('datiando ->', insertData)
    return this.supabase.from('products').insert(insertData);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

  uploadProductImage(filePath: string, file: File) {
    return this.supabase.storage.from('product-images').upload(filePath, file)
  }

  downloadProductImage(path: string) {
    return this.supabase.storage.from('product-images').download(path)
  }
}