import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ar-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ar-view.html',
  styleUrls: ['./ar-view.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArViewComponent implements AfterViewInit {

  modeloUrl: string | null = null;
  logs: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.modeloUrl = params.get('model');
      this.log(`📦 Modelo recibido por query: ${this.modeloUrl}`);
    });
  }

  ngAfterViewInit(): void {
    // Delay to ensure a-scene exists
    setTimeout(() => this.attachModel(), 300);
  }

  private attachModel() {
    if (!this.modeloUrl) {
      this.log('⚠️ No hay modelo en la URL');
      return;
    }

    const scene: any = document.querySelector('a-scene');
    if (!scene) {
      this.log('❌ a-scene NO encontrado en el DOM');
      return;
    }

    const marker: any = scene.querySelector('a-marker');
    if (!marker) {
      this.log('❌ a-marker no existe, creando uno...');
      const m = document.createElement('a-marker');
      m.setAttribute('preset', 'hiro');
      scene.appendChild(m);
    }

    // Remove previous injected models
    scene.querySelectorAll('[data-angular-ar-model]').forEach((el: Element) => el.remove());


    const entity = document.createElement('a-entity');
    entity.setAttribute('gltf-model', `url(${this.modeloUrl})`);
    entity.setAttribute('crossorigin', 'anonymous');
    entity.setAttribute('scale', '0.5 0.5 0.5');
    entity.setAttribute('position', '0 0 0');
    entity.setAttribute('data-angular-ar-model', 'true');

    entity.addEventListener('model-loaded', () => {
      this.log('✅ Modelo cargado con éxito en A-Frame ✅');
    });

    entity.addEventListener('model-error', (e: any) => {
      this.log('❌ Error al cargar modelo en A-Frame:');
      this.log(JSON.stringify(e));
    });

    marker.appendChild(entity);
  }

  log(msg: string) {
    console.log(msg);
    this.logs.push(msg);
  }
}
 