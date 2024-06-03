import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-product-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-image-upload.component.html',
  styleUrl: './product-image-upload.component.scss'
})
export class ProductImageUploadComponent {
  _productImageUrl: SafeResourceUrl | undefined
  uploading = false

  @Input()
  set productImageUrl(url: string | null) {
    if (url) this.downloadImage(url)
  }

  @Output() upload = new EventEmitter<string>()

  constructor(
    private readonly supabase: SupabaseService,
    private readonly dom: DomSanitizer
  ) {}

  async downloadImage(path: string) {
    try {
      const { data } = await this.supabase.downloadProductImage(path)
      if (data instanceof Blob) {
        this._productImageUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data))
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message)
      }
    }
  }

  async uploadProductImage(event: any) {
    try {
      this.uploading = true
      if(!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      await this.supabase.uploadProductImage(filePath, file)
      this.upload.emit(filePath)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.uploading = false
    }
  }
}
