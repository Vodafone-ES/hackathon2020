import { Component, OnInit } from '@angular/core';

const itinerario = [
  {
    type: 'user',
    text: 'Recomiéndame un teléfono móvil',
    date: '09:52',
    check: true
  },
  {
    type: 'tobi',
    text: '¡Claro! Te voy a hacer 3 preguntas para conocerte mejor.',
    date: null,
    check: false
  },
  {
    type: 'tobi',
    text: '¿De qué tamaño te gustan?',
    date: null,
    check: false
  },
  {
    type: 'question',
    options: ['No mucho', 'Tengo algo ahorrado', 'No voy a escatimar'],
    date: null,
    check: false
  },
  {
    type: 'tobi',
    text: '¿Para qué vas a usar tu nuevo móvil?',
    date: null,
    check: false
  },
  {
    type: 'question',
    options: ['Ver videos', 'Escuchar música', 'Jugar a videojuegos', 'trabajar'],
    date: null,
    check: false
  },
  {
    type: 'tobi',
    text: `
    <p>Veo que te gustan los móviles de altas prestaciones, de tamaño pequeño y de precio medio. Además usas mucho la conexión a internet.</p>
    <p>Estos son los 5 móviles que mejor te encajarán.</p>
    <p>Descarta el que no te guste o guarda el que sí </p>`,
    date: '09:52',
    check: false
  }
];

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  price: number = null;
  multiSelector: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  handleSelector(value: number) {
    this.price = value;
  }

  handleMultiSelector(value: number) {
    if (this.multiSelector.includes(value)) {
      this.multiSelector.splice(this.multiSelector.indexOf(value), 1);
    } else {
      this.multiSelector.push(value);
    }
  }

  isActive(value: number): boolean {
    return this.multiSelector.includes(value);
  }

}
