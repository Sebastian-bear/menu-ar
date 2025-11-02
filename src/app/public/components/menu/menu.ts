import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu.html', 
  styleUrls: ['./menu.css']
})

export class Menu {
  platillos: any[] = [];
  // Prefer local asset (avoids CORS issues). Keep S3 as fallback if needed.
  s3Url = 'https://menu-ar-3d-models.s3.us-east-2.amazonaws.com/menu.json';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {
  this.cargarMenu();
}



  // Función que se llama desde el template
  verEnAR(modelo: string) {
  this.router.navigate(['/ar'], { queryParams: { model: modelo } });
}


  cargarMenu() {
    this.http.get<any[]>(this.s3Url).subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos:', data);
        this.platillos = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('❌ Error cargando menú desde assets (intentando S3):', err);
        // try S3 as fallback (useful if running from a different base path)
        this.http.get<any[]>(this.s3Url).subscribe({
          next: (data) => {
            console.log('✅ Datos recibidos desde S3:', data);
            this.platillos = data;
            this.errorMessage = '';
          },
          error: (err2) => {
            console.error('❌ Error cargando menú desde S3:', err2);
            this.errorMessage = 'No se pudo cargar el menú. Revisa la consola o CORS en el servidor S3.';
          }
        });
      },
    });
}

}

