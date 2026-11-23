import type { Messages } from './types.ts';

export const es: Messages = {
  meta: {
    title: 'Recepcionista con IA para negocios con cita | Agendia Labs',
    description:
      'Recepcionista con IA para negocios con cita: contesta llamadas y WhatsApp a cualquier hora, da y cambia citas en tu agenda y te avisa cuando hace falta.',
    ogTitle: 'Cada llamada que no coges es una cita que pierdes | Agendia Labs',
    ogDescription:
      'Una recepcionista con IA que contesta llamadas y WhatsApp a cualquier hora y da citas en tu agenda. Tú sigues trabajando.',
    ogImageAlt: 'Agendia Labs: cada llamada que no coges es una cita que pierdes',
    ogLocale: 'es_ES',
  },
  schema: {
    description:
      'Recepcionista con IA para negocios locales que trabajan con cita: atiende llamadas y WhatsApp, da y cambia citas en la agenda y avisa al dueño cuando hace falta.',
    knowsAbout: ['Recepcionista con IA', 'Atención de llamadas', 'Reservas por WhatsApp', 'Gestión de citas', 'SEO local'],
  },
  common: {
    book: 'Reserva 15 minutos',
    step: 'Paso',
    home: 'Inicio de Agendia Labs',
    mainNav: 'Principal',
    menu: 'Menú',
    language: 'Idioma',
    skipToContent: 'Saltar al contenido',
  },
  nav: {
    how: 'Cómo funciona',
    plans: 'Planes',
    faq: 'FAQ',
  },
  hero: {
    title: 'Cada llamada que no coges es una cita que pierdes.',
    lead: 'Una recepcionista con IA que contesta llamadas y WhatsApp a cualquier hora y da citas en tu agenda. Tú sigues trabajando.',
    sectors: 'Para talleres, clínicas veterinarias, fisioterapia y cualquier negocio que trabaje con cita.',
    demoCta: 'Llama y pruébala',
    note: 'Sin compromiso · Llamada de 15 minutos',
    preview: {
      label: 'Ejemplo: una llamada fuera de horario',
      call: { title: 'Llamada atendida', detail: '21:47 · Quiere cita esta semana' },
      booked: { title: 'Cita en tu agenda', detail: 'Jueves, 9:00' },
      notice: { title: 'Aviso para ti', detail: 'Nueva cita confirmada' },
    },
  },
  problem: {
    title: '¿Te pasa esto?',
    items: {
      busy: {
        title: 'Estás con un cliente y suena el teléfono.',
        text: 'No puedes dejarlo a medias, y quien llama prueba con otro.',
      },
      closed: {
        title: 'Cierras y la gente sigue llamando.',
        text: 'A mediodía, por la noche o el fin de semana no contesta nadie.',
      },
      lateNight: {
        title: 'Contestas WhatsApps a las 11 de la noche.',
        text: 'Para no perder la cita, el trabajo se te mete en casa.',
      },
    },
    exampleLabel: 'Haz la cuenta',
    example: '3 llamadas perdidas al día. Si 1 de cada 3 era una cita de 60 €, son unos 1.200 € al mes.',
    disclaimer: 'Ejemplo ilustrativo, no una garantía.',
  },
  how: {
    title: 'Cómo funciona',
    lead: 'Tres pasos, sin que tengas que dejar lo que estás haciendo.',
    steps: {
      contact: {
        title: 'Te llaman o te escriben',
        text: 'Por teléfono o por WhatsApp, a cualquier hora.',
      },
      answer: {
        title: 'La recepcionista responde, resuelve dudas y da la cita',
        text: 'Contesta con la información de tu negocio: horarios, servicios y huecos libres.',
      },
      booked: {
        title: 'La cita aparece en tu agenda y tú recibes el aviso',
        text: 'Y si algo necesita que lo veas tú, te avisa.',
      },
    },
  },
  sectors: {
    title: 'Para negocios que trabajan con cita',
    lead: 'Elige el tuyo y mira cómo sería una conversación.',
    tabsLabel: 'Sectores',
    exampleLabel: 'Ejemplo de conversación',
    speakers: { client: 'Cliente', agent: 'Recepcionista' },
    items: {
      garages: {
        label: 'Talleres',
        pain: 'Con las manos en un motor no puedes coger el teléfono, y el cliente llama al siguiente taller.',
        conversation: [
          { from: 'client', text: 'Hola, ¿me podéis cambiar el aceite esta semana?' },
          { from: 'agent', text: 'Claro. Tengo hueco el jueves a las 9:00 o el viernes a las 12:00. ¿Cuál te viene mejor?' },
          { from: 'client', text: 'El jueves a las 9.' },
          { from: 'agent', text: 'Hecho: jueves a las 9:00, cambio de aceite. Te mando la confirmación por WhatsApp.' },
        ],
      },
      vets: {
        label: 'Clínicas veterinarias',
        pain: 'Entre consulta y consulta el teléfono no para, y en recepción no se llega a todo.',
        conversation: [
          { from: 'client', text: 'Hola, quería pedir cita para vacunar a mi perro.' },
          { from: 'agent', text: 'Perfecto. ¿Te va bien mañana a las 17:30?' },
          { from: 'client', text: 'Sí, a esa hora me va bien.' },
          { from: 'agent', text: 'Apuntado: mañana a las 17:30, vacunación. Te llegará un recordatorio antes de la cita.' },
        ],
      },
      physio: {
        label: 'Fisioterapia',
        pain: 'En mitad de una sesión no puedes parar a contestar, y los mensajes se acumulan.',
        conversation: [
          { from: 'client', text: 'Hola, ¿tenéis hueco esta semana? Me duele la espalda.' },
          { from: 'agent', text: 'Sí. Puedo darte el miércoles a las 19:00 o el jueves a las 10:00.' },
          { from: 'client', text: 'El miércoles.' },
          { from: 'agent', text: 'Reservado: miércoles a las 19:00. Te lo confirmo por WhatsApp.' },
        ],
      },
      other: {
        label: 'Otro negocio con citas',
        pain: 'Peluquerías, centros de estética, academias, despachos: si trabajas con cita, el problema es el mismo.',
        conversation: [
          { from: 'client', text: 'Hola, quería reservar una cita para el sábado.' },
          { from: 'agent', text: 'El sábado tengo libre a las 10:00 y a las 12:30.' },
          { from: 'client', text: 'A las 10, por favor.' },
          { from: 'agent', text: 'Listo: sábado a las 10:00. Te llegará la confirmación en un momento.' },
        ],
      },
    },
  },
  plans: {
    title: 'Planes',
    lead: 'Elige por dónde te llegan los clientes.',
    cta: 'Ver si encaja conmigo',
    featuredBadge: 'El más completo',
    items: {
      voice: {
        title: 'Recepcionista de voz',
        audience: 'Para quien recibe más llamadas de las que puede coger.',
        features: ['Contesta llamadas a cualquier hora', 'Da y cambia citas en tu agenda', 'Te pasa las llamadas urgentes'],
      },
      whatsapp: {
        title: 'Reservas por WhatsApp',
        audience: 'Para quien recibe muchos mensajes.',
        features: ['Responde dudas al momento', 'Da y cambia citas en tu agenda', 'Envía recordatorios antes de cada cita'],
      },
      both: {
        title: 'Voz + WhatsApp',
        audience: 'Para quien quiere tener cubiertas las llamadas y los mensajes.',
        features: ['Todo lo de la recepcionista de voz', 'Todo lo de las reservas por WhatsApp'],
      },
    },
    extra: {
      badge: 'Extra',
      title: 'Presencia digital',
      text: 'Web, ficha de Google y SEO local, para que te encuentren cuando buscan un negocio como el tuyo cerca.',
    },
    note: 'Cada negocio es distinto. Te recomendamos el plan en una llamada de 15 minutos.',
  },
  faq: {
    title: 'Preguntas frecuentes',
    intro: '¿Tienes otra duda? Escríbenos a {email}.',
    items: [
      {
        q: '¿Suena a robot?',
        a: 'Habla con una voz natural, pero es una IA y no se hace pasar por una persona. Lo mejor es que la escuches tú: en la llamada de 15 minutos te la enseñamos.',
      },
      {
        q: '¿Qué pasa si no sabe responder?',
        a: 'No se inventa la respuesta. Te pasa la llamada o te envía un aviso con los datos del cliente y lo que necesita, para que le contestes tú.',
      },
      {
        q: '¿Funciona con mi agenda actual?',
        a: 'Ahora mismo trabajamos con Google Calendar. Si usas otra agenda o un programa de tu sector, cuéntanoslo en la llamada y vemos si se puede conectar.',
      },
      {
        q: '¿Tengo que cambiar de número?',
        a: 'No. Puedes mantener tu número y desviar las llamadas a la recepcionista (por ejemplo, cuando no contestas o cuando comunica), o usar un número nuevo solo para ella. Tú eliges.',
      },
      {
        q: '¿Cuánto tarda en estar lista?',
        a: 'Depende de cada negocio, pero cuenta con un mínimo de una semana. En la llamada de 15 minutos te damos un plazo concreto.',
      },
      {
        q: '¿Qué pasa con los datos de mis clientes?',
        a: 'Se tratan conforme al RGPD y solo se usan para atender a tus clientes y gestionar sus citas. En la llamada te contamos dónde se guardan y quién tiene acceso.',
      },
      {
        q: '¿Hay permanencia?',
        a: 'No. El servicio es mensual y puedes darte de baja cuando quieras, avisando con 30 días de antelación.',
      },
    ],
  },
  booking: {
    title: 'Descubre cuántas citas estás perdiendo.',
    lead: 'Elige un hueco de 15 minutos. Vemos cómo te llegan hoy las llamadas y los mensajes, y te decimos qué plan encaja con tu negocio.',
    note: 'Sin compromiso · Llamada de 15 minutos',
    calendarTitle: 'Calendario para reservar una llamada de 15 minutos con Agendia Labs',
    formToggle: '¿Prefieres que te escribamos?',
    contactLine: '¿Prefieres hablar ya? Llámanos al {phone} o escríbenos por {whatsapp}.',
  },
  contact: {
    form: {
      title: 'Te escribimos nosotros',
      name: 'Nombre',
      company: 'Negocio',
      email: 'Email',
      phone: 'Teléfono',
      message: '¿Qué te gustaría mejorar?',
      messagePlaceholder: 'Por ejemplo: pierdo llamadas mientras atiendo y no llego a devolverlas todas',
      optional: '(opcional)',
      privacy:
        'Responsable: {owner}. Usamos tus datos solo para responder a tu solicitud y no los cedemos a terceros, salvo a los proveedores que nos prestan servicio. Puedes acceder a ellos, corregirlos o borrarlos. Más información en la {link}.',
      privacyLink: 'política de privacidad',
      sendAnother: 'Enviar otra solicitud',
    },
  },
  footer: {
    custom: { text: '¿Necesitas otra automatización a medida? {link}', link: 'Escríbenos' },
    legal: '© {year} Agendia Labs.',
  },
  legal: {
    back: 'Volver al inicio',
    updated: 'Última actualización: {date}',
    identity: { owner: 'Titular', taxId: 'NIF', address: 'Domicilio', email: 'Email', phone: 'Teléfono' },
    pages: {
      notice: {
        title: 'Aviso legal',
        description: 'Aviso legal de Agendia Labs: datos del titular y condiciones de uso de la web.',
        sections: [
          {
            heading: 'Datos del titular',
            blocks: [
              'En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), estos son los datos del titular de esta web:',
            ],
            identity: true,
          },
          {
            heading: 'Objeto',
            blocks: [
              'Esta web informa sobre los servicios de Agendia Labs: una recepcionista con IA para negocios que trabajan con cita, y servicios relacionados de presencia digital y automatización.',
            ],
          },
          {
            heading: 'Condiciones de uso',
            blocks: [
              'El acceso a la web es gratuito. Al usarla, te comprometes a hacerlo conforme a la ley y a no dañar su funcionamiento ni el de los sistemas que la sostienen.',
            ],
          },
          {
            heading: 'Propiedad intelectual',
            blocks: [
              'Los textos, el diseño y el logotipo de esta web pertenecen a su titular o se usan con permiso. No se pueden reproducir ni distribuir sin autorización, salvo para uso personal.',
            ],
          },
          {
            heading: 'Responsabilidad',
            blocks: [
              'Procuramos que la información sea correcta y esté al día, pero puede contener errores. Los ejemplos de conversaciones y de cálculos son ilustrativos y no garantizan ningún resultado.',
            ],
          },
          {
            heading: 'Contenido de terceros',
            blocks: [
              'La web carga contenido de Google: las tipografías y, cuando está activo, el calendario de reservas. Su funcionamiento depende de Google y se rige por sus propias condiciones.',
            ],
          },
          {
            heading: 'Protección de datos',
            blocks: ['Cómo tratamos tus datos personales se explica en la {privacyLink}.'],
          },
          {
            heading: 'Legislación aplicable',
            blocks: ['Este aviso legal se rige por la legislación española.'],
          },
        ],
      },
      privacy: {
        title: 'Política de privacidad',
        description: 'Cómo trata Agendia Labs los datos personales que recoge esta web.',
        sections: [
          {
            heading: 'Responsable del tratamiento',
            blocks: ['El responsable del tratamiento de tus datos es:'],
            identity: true,
          },
          {
            heading: 'Qué datos tratamos',
            blocks: [
              'Solo tratamos los datos que nos das tú:',
              [
                'Formulario de contacto: nombre, negocio, email, teléfono (opcional) y el mensaje que escribes.',
                'Reserva de llamada: los datos que introduces al reservar en el calendario, como tu nombre y tu email.',
                'Los correos y mensajes que nos envíes directamente.',
              ],
              'La web no usa cookies propias ni herramientas de analítica. Al cargar las tipografías de Google Fonts y, cuando está activo, el calendario de Google, tu navegador se conecta a servidores de Google, que reciben tu dirección IP. El servicio que aloja la web (GitHub Pages) también registra la dirección IP de las visitas por seguridad.',
            ],
          },
          {
            heading: 'Para qué los usamos',
            blocks: [
              'Para responder a tu solicitud, preparar y mantener la llamada que reserves y, si decides contratar, gestionar la relación contigo. No tomamos decisiones automatizadas sobre ti ni usamos tus datos para enviarte publicidad sin tu permiso.',
            ],
          },
          {
            heading: 'Base legal',
            blocks: [
              'Tratamos tus datos porque nos pides información o una propuesta: es la aplicación de medidas precontractuales a petición del interesado (artículo 6.1.b del RGPD). Si llegas a ser cliente, la base es el contrato.',
            ],
          },
          {
            heading: 'Cuánto tiempo los guardamos',
            blocks: [
              'Guardamos tus datos el tiempo necesario para atender tu solicitud. Si no llegas a ser cliente, los borramos en un plazo máximo de 12 meses. Si eres cliente, los guardamos mientras dure la relación y, después, durante los plazos que marque la ley.',
            ],
          },
          {
            heading: 'Con quién los compartimos',
            blocks: [
              'No vendemos ni cedemos tus datos a terceros, salvo obligación legal. Para funcionar usamos estos proveedores, que pueden tratarlos en nuestro nombre:',
              ['Google: correo, calendario y tipografías.', 'GitHub: alojamiento de la web.', 'Recepción del formulario: {formProvider}.'],
              'Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En ese caso, las transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en cláusulas contractuales tipo aprobadas por la Comisión Europea, según indica cada proveedor.',
            ],
          },
          {
            heading: 'Tus derechos',
            blocks: [
              'Puedes pedir acceso a tus datos, corregirlos, borrarlos, oponerte a su tratamiento, limitarlo o pedir su portabilidad. Escríbenos a {email} indicando qué derecho quieres ejercer.',
              'Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos ({aepd}).',
            ],
          },
          {
            heading: 'Seguridad',
            blocks: [
              'Aplicamos medidas razonables para proteger tus datos, y solo acceden a ellos las personas que los necesitan para atender tu solicitud.',
            ],
          },
          {
            heading: 'Cambios en esta política',
            blocks: ['Si cambiamos esta política, publicaremos aquí la nueva versión con su fecha de actualización.'],
          },
        ],
      },
    },
  },
  client: {
    form: {
      errors: {
        name: 'Introduce tu nombre.',
        email: 'Introduce tu email.',
        emailInvalid: 'Introduce un email válido, como nombre@negocio.com.',
        message: 'Cuéntanos brevemente qué te gustaría mejorar.',
        network: 'No se ha podido enviar tu solicitud. Inténtalo de nuevo o escríbenos a {email}.',
      },
      submit: 'Enviar',
      sending: 'Enviando...',
      sentTitle: 'Gracias, {name}.',
      sentBody: 'Te responderemos en {email}.',
      mailSubject: 'Solicitud de {name} desde la web',
    },
  },
};
