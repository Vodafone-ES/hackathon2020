import { Injectable } from '@angular/core';

interface AnswerInterface {
  text: string | string[];
  value: string;
}

interface QuestionInterface {
  questions: string;
  answers: AnswerInterface[];
  exclusive?: boolean;
}


const questions = [
  {
    greetings: {
      text: '¡Claro! Te voy a hacer una serie de preguntas para conocerte mejor. ¡Comencemos!'
    }
  },
  {
    price: {
      questions: '¿Cuánto te quieres gastar?',
      answers: [
        {
          text: 'No mucho',
          value: '0'
        },
        {
          text: 'Tengo algo ahorrado',
          value: '1'
        },
        {
          text: 'No voy a escatimar',
          value: '2'
        }
      ],
      exclusive: true
    }
  },
  {
    use: {
      questions: 'Frecuencia de uso',
      answers: [
        {
          text: 'Poco',
          value: '0'
        },
        {
          text: 'Medio',
          value: '1'
        },
        {
          text: 'Hacker',
          value: '2'
        }
      ],
      exclusive: true
    }
  },
  {
    display: {
      questions: '¿Cómo te gusta la pantalla?',
      answers: [
        {
          text: 'Pequeña',
          value: '0'
        },
        {
          text: 'Grande',
          value: '2'
        },
        {
          text: 'Me da igual',
          value: '1'
        }
      ],
      exclusive: true
    }
  },
  {
    apps: {
      questions: '¿Qué tipo de apps usas en tu día a día?',
      answers: [
        {
          text: 'Gaming',
          value: 'gaming'
        },
        {
          text: 'Instagram',
          value: 'rrss1'
        },
        {
          text: 'Whatsapp',
          value: 'rrss2'
        },
        {
          text: 'Tik Tok',
          value: 'rrss3'
        },
        {
          text: 'Linkedin',
          value: 'job1'
        },
        {
          text: 'Correo',
          value: 'job2'
        },
        {
          text: 'Teams',
          value: 'job3'
        },

        {
          text: 'Netflix',
          value: 'video1'
        },
        {
          text: 'Amazon',
          value: 'video2'
        },
        {
          text: 'Vodafone TV',
          value: 'video3'
        }
      ]
    }
  },
  {
    game: {
      questions: '¿Qué tipo de juegos?',
      answers: [
        {
          text: 'CandyCrush',
          value: 'candy'
        },
        {
          text: 'Puzzle',
          value: 'puzzle'
        },
        {
          text: 'Fornite',
          value: 'fornite'
        },
        {
          text: 'LOL',
          value: 'lol'
        }
      ]
    }
  },
  {
    content: {
      questions: '¿Subes contenido?',
      answers: [
        {
          text: 'Casi nunca',
          value: '0'
        },
        {
          text: 'Alguna vez',
          value: '1'
        },
        {
          text: 'Frecuentemente',
          value: '2'
        }
      ]
    }
  },
  {
    final: {
      question: 'Estos son los 5 móviles que mejor te encajarán.\n' +
        '\n' +
        'Descarta el que no te guste o guarda el que sí '
    }
  }
];

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {

  constructor() {
  }


  async getQuestion(value): Promise<QuestionInterface> {
    const question = questions.filter((item) => Object.keys(item)[0] === value)[0];
    return await new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        // @ts-ignore
        return resolve(question);
      }, Math.random() * 10);
    });
  }

}
