const COURSE_NAME = "Proyecto de Ingeniería";

const rawQuestions = [
  {
    "tema": "Proyecto de Ingeniería - Memoria del proyecto",
    "dificultad": "media",
    "pregunta": "¿Cuál de los siguientes conjuntos recoge mejor las partes esenciales de una memoria de proyecto de ingeniería?",
    "opciones": {
      "A": "Portada, resumen, índices, introducción, descripción del problema, estado del arte, solución propuesta, desarrollo, pruebas, conclusiones, bibliografía y anexos.",
      "B": "Portada, agradecimientos, fotografías, presupuesto y currículum de los autores.",
      "C": "Introducción, código fuente completo y manual de usuario únicamente.",
      "D": "Resumen, defensa oral y diapositivas."
    },
    "respuesta_correcta": "A",
    "explicacion": "Una memoria completa debe documentar el contexto, el problema, el estado del arte, la solución, el desarrollo, las pruebas, las conclusiones y los anexos necesarios."
  },
  {
    "tema": "Proyecto de Ingeniería - Memoria del proyecto",
    "dificultad": "media",
    "pregunta": "¿Por qué no puede considerarse terminado un proyecto si la memoria no está correctamente finalizada?",
    "opciones": {
      "A": "Porque la memoria sustituye al sistema desarrollado.",
      "B": "Porque la documentación forma parte del proyecto y permite evaluar qué se ha hecho y cómo se ha hecho.",
      "C": "Porque la memoria solo sirve para justificar el presupuesto.",
      "D": "Porque la memoria evita tener que realizar pruebas."
    },
    "respuesta_correcta": "B",
    "explicacion": "La memoria documenta el trabajo realizado, ordena ideas y permite evaluar el proyecto. Lo no documentado difícilmente puede valorarse."
  },
  {
    "tema": "Proyecto de Ingeniería - Introducción",
    "dificultad": "fácil",
    "pregunta": "¿Cuál es la función principal de la introducción en una memoria de proyecto?",
    "opciones": {
      "A": "Presentar el código fuente completo.",
      "B": "Explicar el tema del proyecto, su contexto, motivación y utilidad.",
      "C": "Demostrar matemáticamente todos los algoritmos usados.",
      "D": "Recoger únicamente las conclusiones finales."
    },
    "respuesta_correcta": "B",
    "explicacion": "La introducción sitúa al lector, explica el contexto del problema y motiva la necesidad de la solución propuesta."
  },
  {
    "tema": "Proyecto de Ingeniería - Descripción del problema",
    "dificultad": "media",
    "pregunta": "En la descripción del problema, ¿qué se debe evitar especialmente?",
    "opciones": {
      "A": "Usar una formulación precisa del problema.",
      "B": "Explicar el contexto del problema.",
      "C": "Dejar ambigüedades o detalles importantes sin mencionar.",
      "D": "Describir las condiciones de entrada y salida."
    },
    "respuesta_correcta": "C",
    "explicacion": "La descripción del problema debe ser completa y precisa. Si quedan ambigüedades, la solución puede quedar mal justificada."
  },
  {
    "tema": "Proyecto de Ingeniería - Estado del arte",
    "dificultad": "media",
    "pregunta": "¿Qué es el estado del arte en un proyecto de ingeniería?",
    "opciones": {
      "A": "Una lista de enlaces consultados sin análisis.",
      "B": "La descripción crítica de trabajos, tecnologías y soluciones previas relacionadas con el problema.",
      "C": "El apartado donde se coloca el presupuesto.",
      "D": "La parte donde se explican únicamente las conclusiones."
    },
    "respuesta_correcta": "B",
    "explicacion": "El estado del arte analiza qué se ha hecho antes, qué tecnologías existen y cómo se relacionan con la solución propuesta."
  },
  {
    "tema": "Proyecto de Ingeniería - Estado del arte",
    "dificultad": "alta",
    "pregunta": "¿Cuál es el error más grave al redactar un estado del arte?",
    "opciones": {
      "A": "Comparar la solución propia con soluciones previas.",
      "B": "Analizar ventajas e inconvenientes de tecnologías existentes.",
      "C": "Limitarse a citar trabajos sin explicar su relación con el proyecto.",
      "D": "Explicar tecnologías relacionadas con el problema."
    },
    "respuesta_correcta": "C",
    "explicacion": "El estado del arte no debe ser una simple recopilación de citas. Debe contextualizar críticamente la solución propuesta."
  },
  {
    "tema": "Proyecto de Ingeniería - Estado del arte",
    "dificultad": "media",
    "pregunta": "¿Qué debe incluir normalmente el estado del arte?",
    "opciones": {
      "A": "Áreas de conocimiento, tecnologías implicadas y soluciones previas relacionadas.",
      "B": "Solo el manual de usuario.",
      "C": "Solo el coste económico del proyecto.",
      "D": "Solo capturas de pantalla del sistema."
    },
    "respuesta_correcta": "A",
    "explicacion": "Debe presentar el conocimiento previo, las tecnologías usadas en el área y las soluciones existentes o similares."
  },
  {
    "tema": "Proyecto de Ingeniería - Solución propuesta",
    "dificultad": "media",
    "pregunta": "¿Qué debe quedar claro en el apartado de solución propuesta?",
    "opciones": {
      "A": "Solo quién ha participado en el proyecto.",
      "B": "Qué sistema se ha construido y cómo se ha construido.",
      "C": "Solo el diseño gráfico de la presentación.",
      "D": "Únicamente las referencias bibliográficas."
    },
    "respuesta_correcta": "B",
    "explicacion": "La solución propuesta debe explicar el producto construido y la metodología, arquitectura, requisitos y decisiones técnicas seguidas."
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "media",
    "pregunta": "¿Qué son los requisitos funcionales?",
    "opciones": {
      "A": "Restricciones legales que debe cumplir el proyecto.",
      "B": "Características estéticas de la memoria.",
      "C": "Funciones o servicios concretos que el sistema debe realizar.",
      "D": "Costes económicos del proyecto."
    },
    "respuesta_correcta": "C",
    "explicacion": "Los requisitos funcionales describen qué debe hacer el sistema: registrar usuarios, mostrar datos, generar informes, enviar alertas, etc."
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "media",
    "pregunta": "¿Cuál de los siguientes es un requisito no funcional?",
    "opciones": {
      "A": "El sistema debe permitir iniciar sesión.",
      "B": "El sistema debe registrar una nueva actividad.",
      "C": "El sistema debe responder en menos de dos segundos.",
      "D": "El sistema debe permitir borrar un usuario."
    },
    "respuesta_correcta": "C",
    "explicacion": "Los requisitos no funcionales describen condiciones de calidad: rendimiento, seguridad, usabilidad, disponibilidad, compatibilidad, escalabilidad, etc."
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "alta",
    "pregunta": "¿Cuál es la diferencia principal entre un requisito funcional y uno no funcional?",
    "opciones": {
      "A": "El funcional indica qué hace el sistema; el no funcional indica cómo debe comportarse o bajo qué condiciones.",
      "B": "El funcional siempre es legal y el no funcional siempre es económico.",
      "C": "El funcional se prueba y el no funcional no se puede probar.",
      "D": "No existe diferencia real."
    },
    "respuesta_correcta": "A",
    "explicacion": "El requisito funcional define una función del sistema. El no funcional define cualidades o restricciones sobre esa función."
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "media",
    "pregunta": "¿Qué papel tienen la normativa y las restricciones legales en la toma de requisitos?",
    "opciones": {
      "A": "No afectan al proyecto si el sistema funciona.",
      "B": "Son condiciones que pueden limitar o dirigir el diseño del sistema.",
      "C": "Solo se incluyen en la bibliografía.",
      "D": "Sustituyen a los requisitos funcionales."
    },
    "respuesta_correcta": "B",
    "explicacion": "La normativa, seguridad, privacidad, protección de datos o estándares técnicos pueden convertirse en requisitos obligatorios."
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "alta",
    "pregunta": "¿Qué significa elicitar requisitos?",
    "opciones": {
      "A": "Programar directamente sin hablar con el cliente.",
      "B": "Recoger, descubrir y aclarar necesidades de usuarios y partes interesadas.",
      "C": "Eliminar requisitos no funcionales.",
      "D": "Realizar únicamente pruebas unitarias."
    },
    "respuesta_correcta": "B",
    "explicacion": "La elicitación de requisitos consiste en obtener y clarificar necesidades mediante entrevistas, análisis documental, observación, reuniones, etc."
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "media",
    "pregunta": "¿Cuál es una consecuencia probable de una mala toma de requisitos?",
    "opciones": {
      "A": "El sistema puede funcionar técnicamente pero no resolver el problema real del usuario.",
      "B": "El proyecto siempre termina antes.",
      "C": "No hace falta realizar validación.",
      "D": "El estado del arte deja de ser necesario."
    },
    "respuesta_correcta": "A",
    "explicacion": "Si los requisitos están mal definidos, el producto puede no satisfacer la necesidad real aunque esté bien programado."
  },
  {
    "tema": "Proyecto de Ingeniería - Casos de uso",
    "dificultad": "media",
    "pregunta": "¿Para qué sirven los casos de uso en un proyecto software?",
    "opciones": {
      "A": "Para describir funcionalidades desde la interacción entre actores y sistema.",
      "B": "Para calcular únicamente el presupuesto.",
      "C": "Para sustituir todas las pruebas.",
      "D": "Para listar autores en la portada."
    },
    "respuesta_correcta": "A",
    "explicacion": "Los casos de uso ayudan a representar qué funcionalidades ofrece el sistema y cómo interactúan los usuarios con él."
  },
  {
    "tema": "Proyecto de Ingeniería - Arquitectura",
    "dificultad": "media",
    "pregunta": "En una arquitectura de tres capas, ¿cuáles son las capas habituales?",
    "opciones": {
      "A": "Entrada, proceso y salida.",
      "B": "GUI, CORE y BBDD.",
      "C": "Portada, resumen e índice.",
      "D": "Prueba, validación y defensa."
    },
    "respuesta_correcta": "B",
    "explicacion": "En los apuntes se propone una arquitectura con interfaz gráfica, núcleo lógico del sistema y base de datos."
  },
  {
    "tema": "Proyecto de Ingeniería - Arquitectura",
    "dificultad": "media",
    "pregunta": "¿Qué función cumple el CORE en la arquitectura del sistema?",
    "opciones": {
      "A": "Almacenar físicamente todos los datos.",
      "B": "Actuar como núcleo de la aplicación, concentrando la lógica e interactuando con GUI y BBDD.",
      "C": "Diseñar la portada de la memoria.",
      "D": "Sustituir la comunicación con Arduino."
    },
    "respuesta_correcta": "B",
    "explicacion": "El CORE contiene la lógica de negocio y coordina la interacción entre interfaz, base de datos y otros módulos."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué son las pruebas unitarias?",
    "opciones": {
      "A": "Pruebas realizadas sobre el sistema completo en producción.",
      "B": "Pruebas sobre módulos o unidades concretas de forma aislada.",
      "C": "Pruebas realizadas únicamente por el cliente final.",
      "D": "Pruebas destinadas solo a comprobar el presupuesto."
    },
    "respuesta_correcta": "B",
    "explicacion": "Las pruebas unitarias verifican componentes pequeños, como métodos, clases o módulos, antes de probar el sistema completo."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué comprueban las pruebas de integración?",
    "opciones": {
      "A": "Que cada módulo funcione aisladamente, sin comunicarse con otros.",
      "B": "Que los módulos funcionen correctamente al interactuar entre sí.",
      "C": "Que la memoria tenga una portada atractiva.",
      "D": "Que el presupuesto sea bajo."
    },
    "respuesta_correcta": "B",
    "explicacion": "Las pruebas de integración detectan errores en la comunicación entre módulos, interfaces, bases de datos, servicios o dispositivos."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué son las pruebas de sistema?",
    "opciones": {
      "A": "Pruebas del sistema completo ya integrado.",
      "B": "Pruebas de una única función aislada.",
      "C": "Pruebas exclusivas del documento de memoria.",
      "D": "Pruebas que solo revisan el estado del arte."
    },
    "respuesta_correcta": "A",
    "explicacion": "Las pruebas de sistema evalúan el comportamiento del producto completo frente a los requisitos definidos."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "alta",
    "pregunta": "¿Cuál es la diferencia entre verificación y validación?",
    "opciones": {
      "A": "Verificación comprueba si el producto se ha construido correctamente; validación comprueba si el producto correcto satisface la necesidad del usuario.",
      "B": "Verificación y validación son exactamente lo mismo.",
      "C": "Validación solo se aplica al código y verificación solo a la memoria.",
      "D": "Verificación es económica y validación es legal."
    },
    "respuesta_correcta": "A",
    "explicacion": "La verificación mira la conformidad con especificaciones. La validación mira si el sistema resuelve realmente el problema planteado."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué buscan las pruebas de compatibilidad?",
    "opciones": {
      "A": "Comprobar que el sistema funciona en distintos entornos, dispositivos, navegadores, sistemas operativos o configuraciones.",
      "B": "Comprobar únicamente que el código compila.",
      "C": "Sustituir las pruebas unitarias.",
      "D": "Comprobar solo el índice de la memoria."
    },
    "respuesta_correcta": "A",
    "explicacion": "La compatibilidad verifica que el sistema funciona correctamente en los entornos previstos."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué son las pruebas de caja negra?",
    "opciones": {
      "A": "Pruebas basadas en el comportamiento externo del sistema sin analizar su código interno.",
      "B": "Pruebas que solo revisan comentarios del código.",
      "C": "Pruebas que obligatoriamente usan hardware negro.",
      "D": "Pruebas que eliminan la necesidad de requisitos."
    },
    "respuesta_correcta": "A",
    "explicacion": "En caja negra se prueban entradas y salidas esperadas sin centrarse en la implementación interna."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué son las pruebas de caja blanca?",
    "opciones": {
      "A": "Pruebas que analizan la estructura interna, caminos lógicos o código del sistema.",
      "B": "Pruebas realizadas únicamente por usuarios finales.",
      "C": "Pruebas que solo comprueban la interfaz gráfica.",
      "D": "Pruebas sin relación con la implementación."
    },
    "respuesta_correcta": "A",
    "explicacion": "En caja blanca se tiene en cuenta la lógica interna del programa: condiciones, ramas, caminos y estructura del código."
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "alta",
    "pregunta": "¿Qué relación debe existir entre requisitos y pruebas?",
    "opciones": {
      "A": "Las pruebas deben comprobar que los requisitos definidos se cumplen.",
      "B": "Los requisitos se escriben después de las pruebas.",
      "C": "Las pruebas sustituyen a los requisitos.",
      "D": "No existe relación entre ambos."
    },
    "respuesta_correcta": "A",
    "explicacion": "Un buen plan de pruebas debe estar trazado frente a los requisitos para comprobar su cumplimiento."
  },
  {
    "tema": "Proyecto de Ingeniería - Evaluación",
    "dificultad": "media",
    "pregunta": "¿Qué debe aportar la evaluación/discusión de resultados en una memoria?",
    "opciones": {
      "A": "Una comprobación razonada de si los objetivos se han alcanzado.",
      "B": "Una lista de nombres de los autores.",
      "C": "Una repetición literal de la introducción.",
      "D": "Solo una captura de pantalla del sistema."
    },
    "respuesta_correcta": "A",
    "explicacion": "La evaluación conecta resultados, pruebas y objetivos para justificar si la solución propuesta es adecuada."
  },
  {
    "tema": "Proyecto de Ingeniería - Conclusiones",
    "dificultad": "media",
    "pregunta": "¿Cómo deben redactarse las conclusiones de un proyecto?",
    "opciones": {
      "A": "Basándose en resultados, pruebas y contenidos previamente expuestos.",
      "B": "Añadiendo ideas nuevas no justificadas.",
      "C": "Copiando el estado del arte.",
      "D": "Evitando mencionar objetivos."
    },
    "respuesta_correcta": "A",
    "explicacion": "Las conclusiones deben derivarse de lo documentado y probado, no de hipótesis no verificadas."
  },
  {
    "tema": "Proyecto de Ingeniería - Licitación",
    "dificultad": "media",
    "pregunta": "¿Qué es una licitación en el contexto de un proyecto?",
    "opciones": {
      "A": "Un proceso mediante el cual una entidad solicita ofertas para seleccionar proveedor o adjudicatario.",
      "B": "Una prueba unitaria del sistema.",
      "C": "Una técnica de programación orientada a objetos.",
      "D": "Una parte obligatoria del código fuente."
    },
    "respuesta_correcta": "A",
    "explicacion": "La licitación permite comparar propuestas técnicas y económicas para adjudicar un contrato o proyecto."
  },
  {
    "tema": "Proyecto de Ingeniería - Licitación",
    "dificultad": "alta",
    "pregunta": "¿Qué suelen incluir los pliegos o documentos de una licitación?",
    "opciones": {
      "A": "Objeto del contrato, requisitos, condiciones técnicas, criterios de valoración, presupuesto y plazos.",
      "B": "Únicamente el nombre del proveedor elegido.",
      "C": "Solo el código fuente del proyecto.",
      "D": "Solo capturas de pantalla de la interfaz."
    },
    "respuesta_correcta": "A",
    "explicacion": "Los pliegos definen qué se quiere contratar, bajo qué condiciones y cómo se evaluarán las ofertas."
  },
  {
    "tema": "Proyecto de Ingeniería - Licitación",
    "dificultad": "media",
    "pregunta": "En una licitación, ¿qué diferencia hay entre oferta técnica y oferta económica?",
    "opciones": {
      "A": "La técnica explica cómo se resolverá el proyecto; la económica indica el coste propuesto.",
      "B": "La técnica es el precio y la económica es el diseño UML.",
      "C": "Ambas son exactamente iguales.",
      "D": "La económica sustituye a los requisitos."
    },
    "respuesta_correcta": "A",
    "explicacion": "La oferta técnica describe la solución, metodología, equipo y medios; la económica detalla el precio."
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación",
    "dificultad": "media",
    "pregunta": "¿Qué se estima normalmente en la planificación de un proyecto?",
    "opciones": {
      "A": "Duración, esfuerzo, recursos, costes y riesgos.",
      "B": "Solo el color de la presentación.",
      "C": "Únicamente el número de páginas de la memoria.",
      "D": "Solo el nombre del proyecto."
    },
    "respuesta_correcta": "A",
    "explicacion": "La estimación permite prever tiempo, trabajo, personal, materiales, presupuesto y posibles desviaciones."
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación financiera",
    "dificultad": "media",
    "pregunta": "¿Qué debería incluir un apartado financiero básico de un proyecto?",
    "opciones": {
      "A": "Costes de personal, hardware, software, licencias, servicios, mantenimiento, contingencias y presupuesto total.",
      "B": "Solo el coste del ordenador usado.",
      "C": "Solo el precio final sin explicación.",
      "D": "Solo los beneficios futuros sin costes."
    },
    "respuesta_correcta": "A",
    "explicacion": "El apartado financiero debe justificar los costes directos e indirectos y el presupuesto total del proyecto."
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación financiera",
    "dificultad": "alta",
    "pregunta": "¿Por qué es recomendable incluir un margen de contingencia en el presupuesto?",
    "opciones": {
      "A": "Para cubrir imprevistos, desviaciones de coste o riesgos materializados.",
      "B": "Para ocultar errores del proyecto.",
      "C": "Para evitar hacer pruebas.",
      "D": "Para eliminar la planificación temporal."
    },
    "respuesta_correcta": "A",
    "explicacion": "Todo proyecto puede sufrir desviaciones. La contingencia permite absorber riesgos sin romper inmediatamente el presupuesto."
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación financiera",
    "dificultad": "media",
    "pregunta": "¿Cuál es un coste directo en un proyecto software-hardware?",
    "opciones": {
      "A": "Horas de desarrollo del equipo.",
      "B": "La motivación personal de los alumnos.",
      "C": "La opinión subjetiva del cliente.",
      "D": "El estado del arte."
    },
    "respuesta_correcta": "A",
    "explicacion": "Los costes directos se asignan claramente al proyecto: personal, dispositivos, sensores, licencias, servidores, etc."
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación financiera",
    "dificultad": "media",
    "pregunta": "¿Qué problema puede causar una mala estimación temporal o económica?",
    "opciones": {
      "A": "Retrasos, sobrecostes, reducción de alcance o pérdida de calidad.",
      "B": "Mejora automática de la calidad.",
      "C": "Eliminación de todos los riesgos.",
      "D": "Mayor precisión en los requisitos."
    },
    "respuesta_correcta": "A",
    "explicacion": "Una mala estimación afecta a plazo, presupuesto, alcance y calidad del proyecto."
  },
  {
    "tema": "Proyecto de Ingeniería - Camino crítico",
    "dificultad": "media",
    "pregunta": "¿Qué es una tarea crítica en la planificación de un proyecto?",
    "opciones": {
      "A": "Una tarea cuyo retraso retrasa directamente la fecha final del proyecto.",
      "B": "Una tarea que no tiene importancia.",
      "C": "Una tarea que puede retrasarse indefinidamente.",
      "D": "Una tarea que no depende de ninguna otra."
    },
    "respuesta_correcta": "A",
    "explicacion": "Una tarea crítica pertenece al camino crítico y no tiene margen de retraso sin afectar al plazo final."
  },
  {
    "tema": "Proyecto de Ingeniería - Camino crítico",
    "dificultad": "alta",
    "pregunta": "¿Qué ocurre si se retrasa una tarea que está en el camino crítico?",
    "opciones": {
      "A": "Normalmente se retrasa la duración total del proyecto si no se toman medidas correctivas.",
      "B": "No afecta nunca al proyecto.",
      "C": "Reduce automáticamente el presupuesto.",
      "D": "Elimina dependencias entre tareas."
    },
    "respuesta_correcta": "A",
    "explicacion": "El camino crítico determina la duración mínima del proyecto. Si una tarea crítica se retrasa, el final del proyecto también puede retrasarse."
  },
  {
    "tema": "Proyecto de Ingeniería - Camino crítico",
    "dificultad": "alta",
    "pregunta": "¿Qué significa que una tarea tenga holgura?",
    "opciones": {
      "A": "Que puede retrasarse cierto tiempo sin retrasar la fecha final del proyecto.",
      "B": "Que es siempre una tarea crítica.",
      "C": "Que no necesita recursos.",
      "D": "Que no debe planificarse."
    },
    "respuesta_correcta": "A",
    "explicacion": "La holgura es el margen temporal disponible antes de afectar a tareas posteriores o a la fecha final."
  },
  {
    "tema": "Proyecto de Ingeniería - Camino crítico",
    "dificultad": "media",
    "pregunta": "¿Qué herramienta se usa habitualmente para representar tareas, duraciones y dependencias temporales?",
    "opciones": {
      "A": "Diagrama de Gantt.",
      "B": "Diagrama de clases únicamente.",
      "C": "Manual de usuario.",
      "D": "Bibliografía."
    },
    "respuesta_correcta": "A",
    "explicacion": "El diagrama de Gantt permite visualizar tareas, fechas, dependencias y avance del proyecto."
  },
  {
    "tema": "Proyecto de Ingeniería - Gestión de proyectos",
    "dificultad": "media",
    "pregunta": "¿Para qué sirven herramientas como Trello en un proyecto?",
    "opciones": {
      "A": "Para organizar tareas, repartir trabajo, registrar avances y facilitar la coordinación del equipo.",
      "B": "Para sustituir completamente la memoria.",
      "C": "Para compilar código Java.",
      "D": "Para diseñar circuitos electrónicos exclusivamente."
    },
    "respuesta_correcta": "A",
    "explicacion": "Trello y herramientas similares ayudan a gestionar tareas mediante tableros, tarjetas, responsables, comentarios y seguimiento."
  },
  {
    "tema": "Proyecto de Ingeniería - Gestión de proyectos",
    "dificultad": "alta",
    "pregunta": "¿Qué relación hay entre alcance, tiempo, coste y calidad?",
    "opciones": {
      "A": "Son variables relacionadas: cambiar una suele afectar a las demás.",
      "B": "Son independientes y nunca se afectan.",
      "C": "El coste nunca depende del tiempo.",
      "D": "La calidad no se ve afectada por retrasos."
    },
    "respuesta_correcta": "A",
    "explicacion": "En gestión de proyectos, una reducción de tiempo, aumento de alcance o recorte de coste puede afectar a calidad, recursos o planificación."
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "media",
    "pregunta": "¿Cuál es el objetivo principal de la defensa del proyecto?",
    "opciones": {
      "A": "Comunicar públicamente el trabajo realizado, justificar decisiones y demostrar resultados.",
      "B": "Leer literalmente toda la memoria.",
      "C": "Evitar entregar documentación.",
      "D": "Sustituir las pruebas técnicas."
    },
    "respuesta_correcta": "A",
    "explicacion": "La defensa permite exponer el problema, solución, metodología, resultados y conclusiones de forma clara y convincente."
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "media",
    "pregunta": "¿Qué debe guiar la estructura de una presentación de proyecto?",
    "opciones": {
      "A": "La metodología seguida, el problema, la solución, el desarrollo, las pruebas y los resultados.",
      "B": "Solo los gustos estéticos del grupo.",
      "C": "Únicamente la bibliografía.",
      "D": "El número de diapositivas sin importar el contenido."
    },
    "respuesta_correcta": "A",
    "explicacion": "Una buena defensa debe seguir un hilo lógico: necesidad, objetivos, solución, metodología, pruebas, resultados y conclusiones."
  },
  {
    "tema": "Proyecto de Ingeniería - Memoria del proyecto",
    "dificultad": "media",
    "pregunta": "¿Qué función cumple la memoria dentro de un proyecto de ingeniería?",
    "opciones": {
      "A": "Recoger solo los resultados finales para evitar explicar el proceso seguido.",
      "B": "Sustituir la defensa oral cuando el sistema funciona correctamente.",
      "C": "Documentar el sistema construido y las actividades realizadas para desarrollarlo.",
      "D": "Enumerar únicamente las herramientas usadas durante la implementación."
    },
    "respuesta_correcta": "C",
    "explicacion": "La memoria documenta qué se ha hecho, cómo se ha hecho y qué actividades han permitido construir el sistema.",
    "etiquetas": [
      "proyecto",
      "memoria",
      "documentacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Memoria del proyecto",
    "dificultad": "media",
    "pregunta": "¿Por qué la memoria tiene una orientación más académica aunque el proyecto se parezca a un entorno profesional?",
    "opciones": {
      "A": "Porque permite evaluar el trabajo realizado y obliga al equipo a ordenar ideas y datos.",
      "B": "Porque elimina la necesidad de demostrar el sistema ante los profesores.",
      "C": "Porque sustituye a las pruebas técnicas y a la validación experimental.",
      "D": "Porque solo interesa la forma del documento, no el contenido técnico."
    },
    "respuesta_correcta": "A",
    "explicacion": "La memoria ayuda a los profesores a evaluar el trabajo y obliga al equipo a estructurar y argumentar lo realizado.",
    "etiquetas": [
      "proyecto",
      "memoria",
      "evaluacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Memoria del proyecto",
    "dificultad": "alta",
    "pregunta": "¿Cuál de estas afirmaciones encaja mejor con la frase 'lo que no se documenta no se puede considerar en la evaluación'?",
    "opciones": {
      "A": "La defensa oral siempre tiene más peso que la memoria escrita.",
      "B": "El código entregado basta para demostrar todo el trabajo realizado.",
      "C": "Las conclusiones pueden incluir ideas que no aparezcan antes.",
      "D": "El trabajo debe quedar reflejado por escrito para poder ser valorado."
    },
    "respuesta_correcta": "D",
    "explicacion": "Si una parte del trabajo no aparece documentada, el evaluador no tiene base clara para valorarla.",
    "etiquetas": [
      "memoria",
      "evaluacion",
      "documentacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estructura de la memoria",
    "dificultad": "media",
    "pregunta": "¿Cuál de estos elementos pertenece normalmente a los apéndices de una memoria de proyecto?",
    "opciones": {
      "A": "El resumen de máximo 200 palabras.",
      "B": "El código, el manual de instalación y el manual de usuario.",
      "C": "La introducción y la motivación general.",
      "D": "La descripción informal del problema."
    },
    "respuesta_correcta": "B",
    "explicacion": "Los apéndices suelen recoger materiales complementarios como código, manuales y guías de solución de errores.",
    "etiquetas": [
      "memoria",
      "apendices",
      "manual_usuario",
      "codigo"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Introducción",
    "dificultad": "media",
    "pregunta": "En la introducción de la memoria, ¿qué debe hacerse con las tecnologías relacionadas con la solución?",
    "opciones": {
      "A": "Mencionarlas de forma informativa sin convertir la introducción en una explicación exhaustiva.",
      "B": "Explicarlas con todo detalle aunque no sean necesarias para entender el problema.",
      "C": "Evitar citarlas para que solo aparezcan en la bibliografía final.",
      "D": "Sustituir con ellas la descripción del problema y los objetivos."
    },
    "respuesta_correcta": "A",
    "explicacion": "La introducción puede mencionar técnicas o tecnologías, pero sin profundizar todavía de forma exhaustiva.",
    "etiquetas": [
      "introduccion",
      "memoria",
      "tecnologias"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Introducción",
    "dificultad": "alta",
    "pregunta": "¿Qué hilo lógico debe seguir la memoria desde la introducción hasta las conclusiones?",
    "opciones": {
      "A": "Primero mostrar resultados, después explicar el problema y finalmente elegir objetivos.",
      "B": "Primero listar herramientas, después añadir bibliografía y finalmente poner anexos.",
      "C": "Primero desarrollar teoría general, después evitar pruebas y finalmente cerrar el documento.",
      "D": "Partir de la motivación del proyecto y terminar razonando conclusiones y continuidad."
    },
    "respuesta_correcta": "D",
    "explicacion": "La memoria debe guiar al lector desde la motivación inicial hasta las conclusiones y posibles trabajos futuros.",
    "etiquetas": [
      "memoria",
      "introduccion",
      "conclusiones"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Descripción del problema",
    "dificultad": "media",
    "pregunta": "¿Qué diferencia hay entre una exposición informal y una formulación precisa del problema?",
    "opciones": {
      "A": "La informal solo puede usarse en anexos y la precisa solo en la portada.",
      "B": "La informal puede usar lenguaje libre; la precisa debe evitar ambigüedades.",
      "C": "La informal se refiere al coste y la precisa se refiere al diseño gráfico.",
      "D": "La informal se valida con pruebas y la precisa no necesita comprobarse."
    },
    "respuesta_correcta": "B",
    "explicacion": "La exposición informal puede ser menos técnica, pero la formulación precisa debe ser descriptiva, completa y no ambigua.",
    "etiquetas": [
      "descripcion_problema",
      "memoria",
      "precision"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Descripción del problema",
    "dificultad": "alta",
    "pregunta": "En una formulación formal de tipo proceso, ¿qué elementos se suelen especificar?",
    "opciones": {
      "A": "Portada, resumen, índice y bibliografía.",
      "B": "Coste, licitación, proveedor y plazo de garantía.",
      "C": "Contexto, entradas, elementos del proceso, productos y salidas.",
      "D": "Autores, profesor, aula y fecha de defensa."
    },
    "respuesta_correcta": "C",
    "explicacion": "Una formulación de proceso describe el escenario, las condiciones de entrada, el proceso, los elementos producidos y las salidas.",
    "etiquetas": [
      "descripcion_problema",
      "proceso",
      "entradas_salidas"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estado del arte",
    "dificultad": "media",
    "pregunta": "¿Cuál es el objetivo principal del estado del arte?",
    "opciones": {
      "A": "Contextualizar la solución propuesta respecto a trabajos, tecnologías y soluciones previas.",
      "B": "Presentar únicamente los costes económicos derivados de la implementación.",
      "C": "Sustituir la explicación del sistema construido por una lista de enlaces.",
      "D": "Evitar comparar el proyecto con soluciones ya existentes."
    },
    "respuesta_correcta": "A",
    "explicacion": "El estado del arte sitúa el proyecto frente a conocimientos, tecnologías y soluciones previas relacionadas.",
    "etiquetas": [
      "estado_del_arte",
      "memoria",
      "soluciones_previas"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estado del arte",
    "dificultad": "alta",
    "pregunta": "¿Qué debe hacerse con cada solución previa analizada en el estado del arte?",
    "opciones": {
      "A": "Citarla sin explicar su utilidad para no alargar la memoria.",
      "B": "Describirla solo en el plano teórico y omitir su implementación.",
      "C": "Usarla como sustituto directo de la solución propuesta.",
      "D": "Explicar cómo se relaciona con la solución propuesta y compararla críticamente."
    },
    "respuesta_correcta": "D",
    "explicacion": "No basta con citar. Hay que explicar semejanzas, diferencias, ventajas, limitaciones o relación con el sistema propuesto.",
    "etiquetas": [
      "estado_del_arte",
      "comparacion",
      "analisis_critico"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estado del arte",
    "dificultad": "media",
    "pregunta": "¿Cuál de estas opciones NO encaja bien en un estado del arte?",
    "opciones": {
      "A": "Áreas de conocimiento relacionadas con el problema.",
      "B": "Manual completo de instalación del producto terminado.",
      "C": "Tecnologías que intervienen en soluciones similares.",
      "D": "Soluciones previas de problemas relacionados."
    },
    "respuesta_correcta": "B",
    "explicacion": "El manual de instalación pertenece mejor a los anexos o documentación técnica, no al estado del arte.",
    "etiquetas": [
      "estado_del_arte",
      "memoria",
      "manual_instalacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Solución propuesta",
    "dificultad": "media",
    "pregunta": "¿Qué dos preguntas debe responder claramente el capítulo de solución propuesta?",
    "opciones": {
      "A": "Cuánto cuesta imprimir la memoria y quién diseña la portada.",
      "B": "Qué bibliografía se ha usado y qué anexos se eliminan.",
      "C": "Qué se ha construido y cómo se ha construido.",
      "D": "Qué diapositivas se usarán y quién hará la defensa."
    },
    "respuesta_correcta": "C",
    "explicacion": "La solución propuesta debe describir el sistema informático y el procedimiento seguido para construirlo.",
    "etiquetas": [
      "solucion_propuesta",
      "memoria",
      "metodologia"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Solución propuesta",
    "dificultad": "alta",
    "pregunta": "¿Cuál de estos contenidos es propio del capítulo de solución propuesta?",
    "opciones": {
      "A": "Índice de tablas y figuras sin explicación adicional.",
      "B": "Lista de profesores asistentes a la defensa.",
      "C": "Resumen de máximo 200 palabras.",
      "D": "Requisitos, casos de uso, diseño, herramientas y aseguramiento de calidad."
    },
    "respuesta_correcta": "D",
    "explicacion": "La solución propuesta puede incluir requisitos, casos de uso, diseño conceptual y detallado, herramientas, implementación y calidad.",
    "etiquetas": [
      "solucion_propuesta",
      "requisitos",
      "casos_de_uso",
      "calidad"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "media",
    "pregunta": "¿Cuál de estas opciones describe mejor un requisito de usuario?",
    "opciones": {
      "A": "Una necesidad expresada desde el punto de vista de quien usará o recibirá el sistema.",
      "B": "Una decisión interna de programación que el usuario no puede entender.",
      "C": "Una prueba técnica que se ejecuta después de cerrar la memoria.",
      "D": "Una conclusión que solo aparece al final del proyecto."
    },
    "respuesta_correcta": "A",
    "explicacion": "Los requisitos de usuario recogen necesidades o expectativas de los usuarios o interesados del sistema.",
    "etiquetas": [
      "requisitos",
      "usuario",
      "toma_requisitos"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "alta",
    "pregunta": "¿Cuál de estos ejemplos está mejor formulado como requisito funcional?",
    "opciones": {
      "A": "El sistema debe ser moderno y atractivo.",
      "B": "El sistema debe permitir consultar el histórico de mediciones.",
      "C": "El sistema debe estar disponible el mayor tiempo posible.",
      "D": "El sistema debe cumplir la normativa aplicable."
    },
    "respuesta_correcta": "B",
    "explicacion": "Un requisito funcional describe una acción concreta que el sistema debe permitir realizar.",
    "etiquetas": [
      "requisitos_funcionales",
      "historico",
      "funcionalidad"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "alta",
    "pregunta": "¿Cuál de estos ejemplos está mejor formulado como requisito no funcional?",
    "opciones": {
      "A": "El sistema debe registrar nuevos usuarios.",
      "B": "El sistema debe mostrar el panel principal.",
      "C": "El sistema debe generar alertas cuando haya incidencias.",
      "D": "El sistema debe ser compatible con los navegadores definidos en el alcance."
    },
    "respuesta_correcta": "D",
    "explicacion": "La compatibilidad es una cualidad o restricción del sistema, por tanto es un requisito no funcional.",
    "etiquetas": [
      "requisitos_no_funcionales",
      "compatibilidad",
      "alcance"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos",
    "dificultad": "media",
    "pregunta": "¿Qué problema aparece si los requisitos son incompletos?",
    "opciones": {
      "A": "Se facilita la validación porque hay menos elementos que comprobar.",
      "B": "Puede construirse una solución que no cubra necesidades importantes.",
      "C": "El estado del arte deja de ser necesario en la memoria.",
      "D": "Las pruebas unitarias sustituyen automáticamente los requisitos."
    },
    "respuesta_correcta": "B",
    "explicacion": "Si faltan requisitos importantes, el producto puede quedar técnicamente correcto pero funcionalmente insuficiente.",
    "etiquetas": [
      "requisitos",
      "errores",
      "validacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Requisitos y normativa",
    "dificultad": "media",
    "pregunta": "¿Cómo debe tratarse una obligación normativa dentro de un proyecto?",
    "opciones": {
      "A": "Como una recomendación estética que puede ignorarse si hay poco tiempo.",
      "B": "Como una conclusión opcional si el sistema ya funciona.",
      "C": "Como una restricción o requisito que condiciona la solución.",
      "D": "Como un elemento exclusivo de la bibliografía."
    },
    "respuesta_correcta": "C",
    "explicacion": "La normativa puede imponer restricciones de seguridad, privacidad, accesibilidad, compatibilidad o funcionamiento.",
    "etiquetas": [
      "normativa",
      "requisitos",
      "restricciones"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Casos de uso",
    "dificultad": "media",
    "pregunta": "¿Qué aportan los casos de uso a la especificación de requisitos?",
    "opciones": {
      "A": "Permiten sustituir la arquitectura por capturas de pantalla.",
      "B": "Describen funcionalidades mediante la interacción entre actores y sistema.",
      "C": "Sirven únicamente para calcular el presupuesto económico.",
      "D": "Eliminan la necesidad de pruebas de sistema."
    },
    "respuesta_correcta": "B",
    "explicacion": "Los casos de uso muestran cómo un actor interactúa con el sistema para lograr un objetivo funcional.",
    "etiquetas": [
      "casos_de_uso",
      "requisitos",
      "actores"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Arquitectura del sistema",
    "dificultad": "media",
    "pregunta": "¿Por qué conviene definir la arquitectura antes de desarrollar el sistema?",
    "opciones": {
      "A": "Porque evita que sea necesario documentar el proyecto.",
      "B": "Porque sustituye a los requisitos funcionales.",
      "C": "Porque permite identificar módulos, datos y comunicaciones entre partes del sistema.",
      "D": "Porque impide que haya cambios durante el desarrollo."
    },
    "respuesta_correcta": "C",
    "explicacion": "La arquitectura ayuda a organizar módulos, responsabilidades, datos y mecanismos de comunicación.",
    "etiquetas": [
      "arquitectura",
      "modulos",
      "comunicacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Arquitectura del sistema",
    "dificultad": "media",
    "pregunta": "En el proyecto descrito en la teoría, ¿qué dos grandes módulos se integran?",
    "opciones": {
      "A": "Una pasarela Arduino y un nodo central Java.",
      "B": "Una base de datos y una portada de memoria.",
      "C": "Un documento PDF y una presentación PowerPoint.",
      "D": "Un contrato de licitación y un presupuesto."
    },
    "respuesta_correcta": "A",
    "explicacion": "La teoría plantea un sistema compuesto por una pasarela implementada en Arduino y un nodo central desarrollado en Java.",
    "etiquetas": [
      "arquitectura",
      "arduino",
      "java"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Arquitectura del sistema",
    "dificultad": "alta",
    "pregunta": "¿Qué permite que la pasarela Arduino y el nodo central Java convivan dentro del mismo sistema?",
    "opciones": {
      "A": "Que ambos estén escritos obligatoriamente en el mismo lenguaje.",
      "B": "Que no intercambien datos durante la ejecución.",
      "C": "Que la memoria sustituya la comunicación técnica.",
      "D": "Que exista una forma de entenderse mediante protocolo o puerto de comunicaciones."
    },
    "respuesta_correcta": "D",
    "explicacion": "Aunque estén implementados con tecnologías distintas, pueden integrarse si existe un protocolo o mecanismo de comunicación.",
    "etiquetas": [
      "arquitectura",
      "comunicacion",
      "protocolo"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Arduino",
    "dificultad": "media",
    "pregunta": "¿Qué diferencia básica hay entre la capa hardware y la capa software en Arduino?",
    "opciones": {
      "A": "La hardware conecta periféricos; la software decide lecturas, escrituras y lógica de funcionamiento.",
      "B": "La hardware contiene la memoria de la memoria; la software contiene la portada.",
      "C": "La hardware define los casos de uso; la software calcula el presupuesto.",
      "D": "La hardware se usa en Java; la software solo se usa en la defensa."
    },
    "respuesta_correcta": "A",
    "explicacion": "La capa hardware conecta sensores o actuadores; la capa software programa qué hacer con esas entradas y salidas.",
    "etiquetas": [
      "arduino",
      "hardware",
      "software"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Nodo central Java",
    "dificultad": "media",
    "pregunta": "En la arquitectura de tres capas del módulo Java, ¿qué capa se encarga principalmente de la interacción con el usuario?",
    "opciones": {
      "A": "BBDD.",
      "B": "Puerto serie.",
      "C": "GUI.",
      "D": "Arduino."
    },
    "respuesta_correcta": "C",
    "explicacion": "La GUI es la interfaz gráfica y se encarga de la interacción directa con el usuario.",
    "etiquetas": [
      "arquitectura",
      "java",
      "gui"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Nodo central Java",
    "dificultad": "media",
    "pregunta": "¿Qué representa la capa BBDD dentro del nodo central?",
    "opciones": {
      "A": "La interfaz visual que usa el usuario final.",
      "B": "El módulo encargado de almacenar y gestionar datos persistentes.",
      "C": "El conjunto de sensores conectados a la placa Arduino.",
      "D": "El apartado de conclusiones de la memoria."
    },
    "respuesta_correcta": "B",
    "explicacion": "La capa BBDD se asocia al almacenamiento y gestión de la información persistente del sistema.",
    "etiquetas": [
      "arquitectura",
      "bbdd",
      "datos"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Nodo central Java",
    "dificultad": "alta",
    "pregunta": "¿Cuál es la función más adecuada del CORE en una arquitectura GUI-CORE-BBDD?",
    "opciones": {
      "A": "Mostrar únicamente botones y ventanas al usuario.",
      "B": "Guardar exclusivamente copias de seguridad externas.",
      "C": "Concentrar la lógica de negocio y coordinar la comunicación entre capas.",
      "D": "Sustituir los requisitos y las pruebas de validación."
    },
    "respuesta_correcta": "C",
    "explicacion": "El CORE actúa como núcleo lógico del sistema, coordinando la interfaz, los datos y las operaciones principales.",
    "etiquetas": [
      "arquitectura",
      "core",
      "logica_negocio"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué prueba sería más adecuada para comprobar una función aislada antes de integrarla con el resto del sistema?",
    "opciones": {
      "A": "Prueba de defensa.",
      "B": "Prueba unitaria.",
      "C": "Prueba de licitación.",
      "D": "Prueba de bibliografía."
    },
    "respuesta_correcta": "B",
    "explicacion": "Las pruebas unitarias se aplican a unidades concretas de código o módulos pequeños de forma aislada.",
    "etiquetas": [
      "pruebas_unitarias",
      "verificacion",
      "modulos"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "alta",
    "pregunta": "¿Qué tipo de prueba encaja mejor para comprobar que Arduino y Java intercambian correctamente los datos?",
    "opciones": {
      "A": "Prueba de portada.",
      "B": "Prueba de bibliografía.",
      "C": "Prueba de integración.",
      "D": "Prueba de resumen."
    },
    "respuesta_correcta": "C",
    "explicacion": "La prueba de integración comprueba que distintos módulos o tecnologías funcionan correctamente al comunicarse.",
    "etiquetas": [
      "pruebas_integracion",
      "arduino",
      "java",
      "comunicacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "media",
    "pregunta": "¿Qué busca una prueba de sistema?",
    "opciones": {
      "A": "Comprobar el producto completo frente a los requisitos definidos.",
      "B": "Revisar solo la ortografía de la memoria entregada.",
      "C": "Analizar únicamente una línea concreta de código.",
      "D": "Sustituir la demostración de la defensa final."
    },
    "respuesta_correcta": "A",
    "explicacion": "La prueba de sistema evalúa el comportamiento del sistema completo una vez integradas sus partes.",
    "etiquetas": [
      "pruebas_sistema",
      "requisitos",
      "validacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Pruebas",
    "dificultad": "alta",
    "pregunta": "¿Cuál de estos casos encaja mejor con una prueba de compatibilidad?",
    "opciones": {
      "A": "Ver si la introducción tiene un hilo conductor claro.",
      "B": "Comprobar si el sistema funciona en los navegadores o entornos previstos.",
      "C": "Calcular el coste total de hardware y software.",
      "D": "Comparar dos soluciones previas del estado del arte."
    },
    "respuesta_correcta": "B",
    "explicacion": "La compatibilidad comprueba que el sistema funciona en los entornos definidos: navegadores, sistemas, dispositivos o configuraciones.",
    "etiquetas": [
      "compatibilidad",
      "pruebas",
      "entornos"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Verificación y validación",
    "dificultad": "alta",
    "pregunta": "Si se comprueba que una funcionalidad cumple exactamente lo especificado en los requisitos, ¿qué actividad se está realizando principalmente?",
    "opciones": {
      "A": "Licitación.",
      "B": "Verificación.",
      "C": "Estado del arte.",
      "D": "Estimación financiera."
    },
    "respuesta_correcta": "B",
    "explicacion": "La verificación comprueba que el producto se ha construido conforme a las especificaciones.",
    "etiquetas": [
      "verificacion",
      "requisitos",
      "pruebas"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Verificación y validación",
    "dificultad": "alta",
    "pregunta": "Si se comprueba que el sistema realmente resuelve la necesidad del usuario, ¿qué actividad predomina?",
    "opciones": {
      "A": "Validación.",
      "B": "Bibliografía.",
      "C": "Gestión de cambios.",
      "D": "Diseño de portada."
    },
    "respuesta_correcta": "A",
    "explicacion": "La validación comprueba si el producto construido es adecuado para resolver el problema real.",
    "etiquetas": [
      "validacion",
      "usuario",
      "necesidad"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Calidad",
    "dificultad": "media",
    "pregunta": "¿Por qué el plan de pruebas es importante para las conclusiones?",
    "opciones": {
      "A": "Porque permite sustituir el estado del arte por resultados subjetivos.",
      "B": "Porque evita que sea necesario explicar la solución propuesta.",
      "C": "Porque aporta evidencias para razonar si los objetivos se han alcanzado.",
      "D": "Porque reduce automáticamente el presupuesto del proyecto."
    },
    "respuesta_correcta": "C",
    "explicacion": "Las conclusiones deben apoyarse en resultados documentados, y el plan de pruebas aporta evidencias objetivas.",
    "etiquetas": [
      "pruebas",
      "conclusiones",
      "calidad"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Conclusiones",
    "dificultad": "alta",
    "pregunta": "¿Cuál sería un error en el apartado de conclusiones?",
    "opciones": {
      "A": "Relacionar los resultados con los objetivos iniciales.",
      "B": "Apoyarse en los resultados del plan de pruebas.",
      "C": "Mencionar líneas futuras razonables.",
      "D": "Afirmar logros que no han sido documentados ni comprobados."
    },
    "respuesta_correcta": "D",
    "explicacion": "Las conclusiones deben basarse en contenidos previamente expuestos y comprobables.",
    "etiquetas": [
      "conclusiones",
      "memoria",
      "rigor"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Trabajos futuros",
    "dificultad": "media",
    "pregunta": "¿Qué sentido tienen los trabajos futuros en una memoria de proyecto?",
    "opciones": {
      "A": "Ocultar las limitaciones actuales del sistema.",
      "B": "Indicar posibles mejoras o ampliaciones razonables del proyecto.",
      "C": "Sustituir las conclusiones cuando no hay resultados.",
      "D": "Eliminar la necesidad de validar el sistema actual."
    },
    "respuesta_correcta": "B",
    "explicacion": "Los trabajos futuros señalan mejoras o ampliaciones posibles a partir del trabajo ya realizado.",
    "etiquetas": [
      "trabajos_futuros",
      "conclusiones",
      "mejoras"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - PBL",
    "dificultad": "media",
    "pregunta": "¿Qué caracteriza al aprendizaje basado en proyectos en esta asignatura?",
    "opciones": {
      "A": "La memorización de teoría sin aplicación práctica.",
      "B": "El desarrollo de un sistema integrando conocimientos y trabajo en equipo.",
      "C": "La eliminación de la documentación para centrarse solo en código.",
      "D": "La realización de ejercicios aislados sin relación entre sí."
    },
    "respuesta_correcta": "B",
    "explicacion": "El PBL busca aprender mediante un proyecto integrador, con aplicación práctica de conocimientos y trabajo colaborativo.",
    "etiquetas": [
      "pbl",
      "trabajo_equipo",
      "proyecto"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - PBL",
    "dificultad": "media",
    "pregunta": "¿Qué papel debe asumir el estudiante en PBL?",
    "opciones": {
      "A": "Esperar instrucciones cerradas sin buscar información adicional.",
      "B": "Delegar el aprendizaje en el profesor como experto técnico único.",
      "C": "Adoptar un papel activo, colaborativo, crítico y autónomo.",
      "D": "Limitarse a preparar la defensa final sin participar en el desarrollo."
    },
    "respuesta_correcta": "C",
    "explicacion": "En PBL el estudiante debe comprender el problema, buscar información, colaborar, analizar y participar activamente.",
    "etiquetas": [
      "pbl",
      "estudiante",
      "aprendizaje_activo"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - PBL",
    "dificultad": "alta",
    "pregunta": "Según la teoría, ¿qué rol tiene principalmente el profesor en PBL?",
    "opciones": {
      "A": "Hacer todo el trabajo técnico del grupo.",
      "B": "Actuar como guía, tutor o facilitador del proceso.",
      "C": "Evitar que los alumnos tomen decisiones.",
      "D": "Sustituir al equipo durante la defensa."
    },
    "respuesta_correcta": "B",
    "explicacion": "El profesor guía el aprendizaje, hace seguimiento, plantea preguntas y facilita el trabajo del grupo.",
    "etiquetas": [
      "pbl",
      "profesor",
      "tutoria"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - IoT",
    "dificultad": "media",
    "pregunta": "¿Qué idea describe mejor Internet de las cosas dentro del proyecto?",
    "opciones": {
      "A": "La conexión de objetos físicos capaces de recoger, enviar o procesar información.",
      "B": "Un tipo de memoria académica usada para justificar conclusiones.",
      "C": "Una técnica exclusiva para diseñar diapositivas de defensa.",
      "D": "Un método para eliminar sensores y trabajar solo con texto."
    },
    "respuesta_correcta": "A",
    "explicacion": "IoT se basa en conectar objetos físicos, sensores o dispositivos para intercambiar información y automatizar procesos.",
    "etiquetas": [
      "iot",
      "sensores",
      "automatizacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - IoT",
    "dificultad": "media",
    "pregunta": "¿Qué ventaja puede aportar IoT en procesos que antes eran manuales?",
    "opciones": {
      "A": "Aumentar la ambigüedad de los requisitos.",
      "B": "Eliminar la necesidad de arquitectura.",
      "C": "Sustituir completamente la memoria.",
      "D": "Automatizar tareas, obtener datos y reducir costes o errores."
    },
    "respuesta_correcta": "D",
    "explicacion": "IoT permite monitorizar, automatizar procesos y obtener información útil para decidir o actuar.",
    "etiquetas": [
      "iot",
      "automatizacion",
      "costes"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Gestión de proyectos",
    "dificultad": "media",
    "pregunta": "¿Para qué sirve una herramienta de gestión de proyectos como Trello?",
    "opciones": {
      "A": "Para organizar tareas, responsables, estados y seguimiento del trabajo.",
      "B": "Para reemplazar la base de datos del sistema final.",
      "C": "Para compilar programas Java sin instalar herramientas.",
      "D": "Para escribir automáticamente las conclusiones."
    },
    "respuesta_correcta": "A",
    "explicacion": "Las herramientas de gestión permiten organizar tareas, responsables, avances y coordinación del equipo.",
    "etiquetas": [
      "gestion_proyectos",
      "trello",
      "tareas"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Planificación",
    "dificultad": "media",
    "pregunta": "¿Qué información aporta un diagrama de Gantt en un proyecto?",
    "opciones": {
      "A": "La sintaxis exacta de las clases Java.",
      "B": "La estructura visual de las diapositivas finales.",
      "C": "La planificación temporal de tareas, duraciones y dependencias.",
      "D": "La comparación teórica de soluciones previas."
    },
    "respuesta_correcta": "C",
    "explicacion": "Un Gantt muestra tareas, calendario, duración, secuencia y seguimiento del trabajo.",
    "etiquetas": [
      "gantt",
      "planificacion",
      "tareas"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Camino crítico",
    "dificultad": "alta",
    "pregunta": "¿Qué identifica el camino crítico de un proyecto?",
    "opciones": {
      "A": "La ruta de tareas que determina la duración mínima total del proyecto.",
      "B": "La lista de tareas que pueden retrasarse sin ningún efecto.",
      "C": "El conjunto de requisitos no funcionales de seguridad.",
      "D": "El resumen económico de licencias y materiales."
    },
    "respuesta_correcta": "A",
    "explicacion": "El camino crítico está formado por tareas que condicionan directamente la duración total del proyecto.",
    "etiquetas": [
      "camino_critico",
      "planificacion",
      "tarea_critica"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Camino crítico",
    "dificultad": "alta",
    "pregunta": "Si una tarea crítica se retrasa y no se reajusta nada más, ¿qué consecuencia es más probable?",
    "opciones": {
      "A": "El presupuesto desaparece automáticamente.",
      "B": "Se retrasa la fecha final del proyecto.",
      "C": "La tarea deja de depender de las anteriores.",
      "D": "El sistema queda validado sin pruebas."
    },
    "respuesta_correcta": "B",
    "explicacion": "Una tarea crítica no tiene holgura; su retraso suele trasladarse al final del proyecto.",
    "etiquetas": [
      "camino_critico",
      "retraso",
      "tarea_critica"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Camino crítico",
    "dificultad": "media",
    "pregunta": "¿Qué significa que una tarea tenga holgura positiva?",
    "opciones": {
      "A": "Que debe realizarse antes que todas las tareas del proyecto.",
      "B": "Que pertenece obligatoriamente al camino crítico.",
      "C": "Que puede retrasarse cierto tiempo sin afectar al final del proyecto.",
      "D": "Que no requiere recursos ni seguimiento."
    },
    "respuesta_correcta": "C",
    "explicacion": "La holgura es el margen de retraso que una tarea puede asumir sin retrasar la fecha final.",
    "etiquetas": [
      "holgura",
      "planificacion",
      "camino_critico"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación",
    "dificultad": "media",
    "pregunta": "¿Qué elementos deben estimarse al planificar un proyecto?",
    "opciones": {
      "A": "Solo el número de diapositivas de la defensa.",
      "B": "Tiempo, esfuerzo, recursos, costes y riesgos.",
      "C": "Únicamente el color de la plantilla de presentación.",
      "D": "Solo la longitud del resumen de la memoria."
    },
    "respuesta_correcta": "B",
    "explicacion": "La estimación permite prever duración, trabajo, recursos necesarios, presupuesto y posibles desviaciones.",
    "etiquetas": [
      "estimacion",
      "planificacion",
      "riesgos"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación financiera",
    "dificultad": "media",
    "pregunta": "¿Cuál de estos conceptos encaja como coste directo del proyecto?",
    "opciones": {
      "A": "La existencia de trabajos futuros.",
      "B": "La opinión del público durante la defensa.",
      "C": "Las horas de desarrollo dedicadas por el equipo.",
      "D": "La comparación crítica del estado del arte."
    },
    "respuesta_correcta": "C",
    "explicacion": "Las horas de trabajo del equipo son un coste directo porque se pueden asociar claramente al proyecto.",
    "etiquetas": [
      "estimacion_financiera",
      "costes",
      "personal"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación financiera",
    "dificultad": "alta",
    "pregunta": "¿Por qué no basta con indicar un precio final en el apartado financiero?",
    "opciones": {
      "A": "Porque debe justificarse de dónde salen los costes y qué partidas los componen.",
      "B": "Porque el apartado financiero solo debe contener capturas de pantalla.",
      "C": "Porque el precio final pertenece únicamente al estado del arte.",
      "D": "Porque los costes no se relacionan con la planificación."
    },
    "respuesta_correcta": "A",
    "explicacion": "Un presupuesto debe desglosar y justificar partidas: personal, hardware, software, servicios, mantenimiento y contingencias.",
    "etiquetas": [
      "presupuesto",
      "estimacion_financiera",
      "costes"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Estimación financiera",
    "dificultad": "alta",
    "pregunta": "¿Qué representa una contingencia presupuestaria?",
    "opciones": {
      "A": "Una parte del código que se ejecuta al iniciar el sistema.",
      "B": "Un margen reservado para cubrir riesgos o desviaciones previstas.",
      "C": "Una técnica para no hacer pruebas de integración.",
      "D": "Un resumen de máximo 200 palabras."
    },
    "respuesta_correcta": "B",
    "explicacion": "La contingencia es un margen económico para absorber imprevistos o desviaciones razonables del proyecto.",
    "etiquetas": [
      "presupuesto",
      "contingencia",
      "riesgos"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Licitación",
    "dificultad": "media",
    "pregunta": "¿Qué es una licitación?",
    "opciones": {
      "A": "Una técnica de validación del código fuente.",
      "B": "Un proceso para solicitar y comparar ofertas antes de adjudicar un contrato.",
      "C": "Una prueba de compatibilidad con distintos navegadores.",
      "D": "Una forma de redactar las conclusiones finales."
    },
    "respuesta_correcta": "B",
    "explicacion": "Una licitación permite que una entidad reciba ofertas técnicas y económicas para elegir una propuesta.",
    "etiquetas": [
      "licitacion",
      "contrato",
      "ofertas"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Licitación",
    "dificultad": "alta",
    "pregunta": "¿Qué diferencia hay entre una oferta técnica y una oferta económica?",
    "opciones": {
      "A": "La técnica describe la solución; la económica detalla el coste.",
      "B": "La técnica contiene solo el precio; la económica contiene los casos de uso.",
      "C": "La técnica sustituye a la memoria; la económica sustituye al estado del arte.",
      "D": "No existe diferencia, ambas tienen siempre el mismo contenido."
    },
    "respuesta_correcta": "A",
    "explicacion": "La oferta técnica explica cómo se resolverá el proyecto; la económica indica el precio y las partidas de coste.",
    "etiquetas": [
      "licitacion",
      "oferta_tecnica",
      "oferta_economica"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Licitación",
    "dificultad": "media",
    "pregunta": "¿Qué suelen definir los pliegos de una licitación?",
    "opciones": {
      "A": "Solo la portada del documento final.",
      "B": "Únicamente el lenguaje de programación obligatorio.",
      "C": "Objeto, condiciones técnicas, criterios de valoración, presupuesto y plazos.",
      "D": "El resultado final de las pruebas unitarias."
    },
    "respuesta_correcta": "C",
    "explicacion": "Los pliegos fijan qué se contrata, bajo qué condiciones y cómo se valorarán las propuestas.",
    "etiquetas": [
      "licitacion",
      "pliegos",
      "criterios_valoracion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "media",
    "pregunta": "¿Cuál es el objetivo de la defensa del proyecto?",
    "opciones": {
      "A": "Leer toda la memoria para evitar preguntas posteriores.",
      "B": "Sustituir las validaciones técnicas por una exposición oral.",
      "C": "Mostrar solo las herramientas usadas durante el desarrollo.",
      "D": "Transmitir el trabajo realizado y demostrar resultados tangibles."
    },
    "respuesta_correcta": "D",
    "explicacion": "La defensa comunica de forma sintética el trabajo del grupo, sus decisiones, resultados y demostraciones.",
    "etiquetas": [
      "defensa",
      "presentacion",
      "resultados"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "media",
    "pregunta": "Antes de preparar la defensa, ¿qué paso previo recomienda la teoría?",
    "opciones": {
      "A": "Haber generado la memoria y los entregables del proyecto.",
      "B": "Eliminar los anexos para reducir el tiempo de exposición.",
      "C": "Preparar primero la música de las transiciones.",
      "D": "Evitar revisar el trabajo con el profesor."
    },
    "respuesta_correcta": "A",
    "explicacion": "La defensa debe prepararse después de tener memoria y entregables, porque se apoya en el trabajo documentado.",
    "etiquetas": [
      "defensa",
      "memoria",
      "entregables"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "alta",
    "pregunta": "¿Qué debe incluir la parte de resultados en la defensa?",
    "opciones": {
      "A": "Solo los nombres de los integrantes del grupo.",
      "B": "Validaciones, aspectos de calidad, usuarios o actores y resultados obtenidos.",
      "C": "Una explicación extensa de teoría general no aplicada al proyecto.",
      "D": "Únicamente el índice de capítulos de la memoria."
    },
    "respuesta_correcta": "B",
    "explicacion": "Los resultados deben mostrar qué se ha conseguido, cómo se ha validado y para qué usuarios o actores funciona.",
    "etiquetas": [
      "defensa",
      "resultados",
      "validacion",
      "calidad"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "media",
    "pregunta": "¿Qué recomienda la teoría sobre el diseño de diapositivas?",
    "opciones": {
      "A": "Usar colores estridentes para llamar la atención.",
      "B": "Cargar cada diapositiva con mucho texto detallado.",
      "C": "Usar esquemas, imágenes y frases clave de forma clara y concisa.",
      "D": "Añadir música y sonidos en cada transición."
    },
    "respuesta_correcta": "C",
    "explicacion": "La presentación debe ser clara, concisa y apoyarse en esquemas, imágenes y texto corto.",
    "etiquetas": [
      "defensa",
      "diapositivas",
      "presentacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "alta",
    "pregunta": "¿Por qué se recomienda usar una presentación estándar para la defensa?",
    "opciones": {
      "A": "Porque cuanto más estándar sea, menos problemas técnicos pueden aparecer al exponer.",
      "B": "Porque impide que los profesores hagan preguntas sobre el proyecto.",
      "C": "Porque sustituye la necesidad de preparar una demostración.",
      "D": "Porque permite no respetar el tiempo fijado por el coordinador."
    },
    "respuesta_correcta": "A",
    "explicacion": "Usar formatos estándar reduce problemas de compatibilidad o reproducción durante la exposición.",
    "etiquetas": [
      "defensa",
      "presentacion",
      "compatibilidad"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "media",
    "pregunta": "Según la teoría, ¿qué actitud debe evitarse durante la exposición?",
    "opciones": {
      "A": "Citar ejemplos breves.",
      "B": "Hablar de forma fluida.",
      "C": "Respetar el orden de los conceptos.",
      "D": "Leer simplemente las diapositivas."
    },
    "respuesta_correcta": "D",
    "explicacion": "La defensa debe demostrar dominio del contenido, no limitarse a leer lo que aparece en pantalla.",
    "etiquetas": [
      "defensa",
      "oratoria",
      "presentacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "alta",
    "pregunta": "¿Qué significa que la defensa debe ser acorde con la memoria?",
    "opciones": {
      "A": "Que debe explicar lo más destacado del proyecto según lo documentado.",
      "B": "Que debe repetir literalmente todos los capítulos de la memoria.",
      "C": "Que debe evitar mencionar resultados y validaciones.",
      "D": "Que debe sustituir el sistema por teoría general."
    },
    "respuesta_correcta": "A",
    "explicacion": "La defensa debe sintetizar y destacar lo importante, manteniéndose coherente con lo documentado en la memoria.",
    "etiquetas": [
      "defensa",
      "memoria",
      "coherencia"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "media",
    "pregunta": "Para una presentación de unos 15 minutos, ¿qué criterio aproximado propone la teoría?",
    "opciones": {
      "A": "Usar siempre más de cincuenta diapositivas.",
      "B": "Calcular aproximadamente una diapositiva por minuto.",
      "C": "Evitar diapositivas y hablar sin apoyo visual.",
      "D": "Dedicar todo el tiempo al estado del arte."
    },
    "respuesta_correcta": "B",
    "explicacion": "La teoría recomienda como norma general una diapositiva por minuto, con transparencias comodín al final.",
    "etiquetas": [
      "defensa",
      "diapositivas",
      "tiempo"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Defensa",
    "dificultad": "alta",
    "pregunta": "¿Qué son las transparencias comodín en una defensa?",
    "opciones": {
      "A": "Diapositivas obligatorias para leer la bibliografía completa.",
      "B": "Diapositivas extra que pueden usarse si sobra tiempo o saltarse si falta tiempo.",
      "C": "Diapositivas que sustituyen la demostración del sistema.",
      "D": "Diapositivas ocultas que eliminan preguntas del tribunal."
    },
    "respuesta_correcta": "B",
    "explicacion": "Sirven para ajustar la exposición al tiempo real: se usan si se va rápido o se omiten si se va lento.",
    "etiquetas": [
      "defensa",
      "tiempo",
      "diapositivas"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Gestión de cambios",
    "dificultad": "media",
    "pregunta": "¿Por qué conviene mencionar la gestión de configuración o gestión de cambios en la defensa?",
    "opciones": {
      "A": "Porque muestra cómo se ha organizado el desarrollo y controlado la evolución del proyecto.",
      "B": "Porque elimina la necesidad de explicar los resultados obtenidos.",
      "C": "Porque sustituye al apartado financiero de la memoria.",
      "D": "Porque solo sirve para decorar la presentación."
    },
    "respuesta_correcta": "A",
    "explicacion": "La gestión de cambios ayuda a explicar cómo se ha controlado la evolución del sistema y del trabajo del equipo.",
    "etiquetas": [
      "gestion_cambios",
      "defensa",
      "metodologia"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Alcance",
    "dificultad": "alta",
    "pregunta": "¿Qué riesgo aparece cuando el alcance del proyecto no está bien definido?",
    "opciones": {
      "A": "Que todas las tareas dejan de tener dependencias.",
      "B": "Que sea difícil estimar tiempo, coste, requisitos y validación.",
      "C": "Que el estado del arte desaparezca de la memoria.",
      "D": "Que la defensa ya no necesite estructura."
    },
    "respuesta_correcta": "B",
    "explicacion": "Sin alcance claro es difícil saber qué debe hacerse, cuánto costará, cuánto tardará y cómo se validará.",
    "etiquetas": [
      "alcance",
      "estimacion",
      "requisitos",
      "validacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Riesgos",
    "dificultad": "alta",
    "pregunta": "¿Cuál de estas situaciones representa mejor un riesgo de proyecto?",
    "opciones": {
      "A": "Una posible incompatibilidad entre módulos que podría retrasar la integración.",
      "B": "Una funcionalidad ya implementada, probada y cerrada sin incidencias.",
      "C": "Una conclusión basada en resultados documentados.",
      "D": "Una portada con los nombres correctos del grupo."
    },
    "respuesta_correcta": "A",
    "explicacion": "Un riesgo es un evento incierto que, si ocurre, puede afectar a plazo, coste, calidad o alcance.",
    "etiquetas": [
      "riesgos",
      "integracion",
      "planificacion"
    ]
  },
  {
    "tema": "Proyecto de Ingeniería - Relación entre partes",
    "dificultad": "alta",
    "pregunta": "¿Qué relación correcta existe entre requisitos, desarrollo, pruebas y conclusiones?",
    "opciones": {
      "A": "Los requisitos se escriben después de las conclusiones para justificar el resultado.",
      "B": "El desarrollo se hace sin requisitos y las pruebas solo revisan la presentación.",
      "C": "Los requisitos guían el desarrollo, las pruebas comprueban resultados y las conclusiones razonan lo obtenido.",
      "D": "Las conclusiones sustituyen a las pruebas cuando el sistema parece funcionar."
    },
    "respuesta_correcta": "C",
    "explicacion": "Un proyecto coherente conecta necesidades, construcción, verificación/validación y conclusiones justificadas.",
    "etiquetas": [
      "requisitos",
      "desarrollo",
      "pruebas",
      "conclusiones"
    ]
  }
];

const topicMap = {
  "Memoria del proyecto": "Memoria del proyecto",
  "Estructura de la memoria": "Memoria del proyecto",
  "Introducción": "Memoria del proyecto",
  "Descripción del problema": "Memoria del proyecto",
  "Solución propuesta": "Memoria del proyecto",
  "Arquitectura": "Memoria del proyecto",
  "Arquitectura del sistema": "Memoria del proyecto",
  "Arduino": "Memoria del proyecto",
  "Nodo central Java": "Memoria del proyecto",
  "Conclusiones": "Memoria del proyecto",
  "Trabajos futuros": "Memoria del proyecto",
  "Estado del arte": "Estado del arte",
  "Requisitos": "Requisitos",
  "Requisitos y normativa": "Requisitos",
  "Casos de uso": "Requisitos",
  "Evaluación": "Verificación y validación",
  "Verificación y validación": "Verificación y validación",
  "Calidad": "Verificación y validación",
  "Pruebas": "Pruebas",
  "Licitación": "Licitación",
  "Estimación financiera": "Estimación financiera",
  "Estimación": "Estimación financiera",
  "Gestión de proyectos": "Planificación",
  "PBL": "Planificación",
  "IoT": "Planificación",
  "Planificación": "Planificación",
  "Gestión de cambios": "Planificación",
  "Alcance": "Planificación",
  "Riesgos": "Planificación",
  "Relación entre partes": "Planificación",
  "Camino crítico": "Camino crítico",
  "Defensa": "Defensa del proyecto",
};

const tagMap = {
  "Memoria del proyecto": ["proyecto", "memoria"],
  "Estructura de la memoria": ["proyecto", "memoria"],
  "Introducción": ["proyecto", "memoria"],
  "Descripción del problema": ["proyecto", "memoria"],
  "Solución propuesta": ["proyecto", "memoria"],
  "Arquitectura": ["proyecto", "memoria", "requisitos_no_funcionales"],
  "Arquitectura del sistema": ["proyecto", "memoria", "requisitos_no_funcionales"],
  "Arduino": ["proyecto", "memoria", "requisitos_no_funcionales"],
  "Nodo central Java": ["proyecto", "memoria", "requisitos_no_funcionales"],
  "Conclusiones": ["proyecto", "memoria"],
  "Trabajos futuros": ["proyecto", "memoria"],
  "Estado del arte": ["proyecto", "estado_del_arte"],
  "Requisitos": ["proyecto", "requisitos_funcionales", "requisitos_no_funcionales", "normativa"],
  "Requisitos y normativa": ["proyecto", "requisitos_funcionales", "requisitos_no_funcionales", "normativa"],
  "Casos de uso": ["proyecto", "requisitos_funcionales"],
  "Evaluación": ["proyecto", "verificacion", "validacion"],
  "Verificación y validación": ["proyecto", "verificacion", "validacion"],
  "Calidad": ["proyecto", "verificacion", "validacion"],
  "Pruebas": ["proyecto", "verificacion", "validacion", "pruebas_unitarias", "pruebas_integracion", "pruebas_sistema", "compatibilidad"],
  "Licitación": ["proyecto", "licitacion", "presupuesto"],
  "Estimación financiera": ["proyecto", "presupuesto", "estimacion"],
  "Estimación": ["proyecto", "presupuesto", "estimacion"],
  "Gestión de proyectos": ["proyecto", "planificacion"],
  "PBL": ["proyecto", "planificacion"],
  "IoT": ["proyecto", "planificacion"],
  "Planificación": ["proyecto", "planificacion"],
  "Gestión de cambios": ["proyecto", "planificacion"],
  "Alcance": ["proyecto", "planificacion"],
  "Riesgos": ["proyecto", "planificacion"],
  "Relación entre partes": ["proyecto", "planificacion"],
  "Camino crítico": ["proyecto", "camino_critico", "tarea_critica"],
  "Defensa": ["proyecto", "memoria"],
};

const difficultyMap = {
  "fácil": "facil",
  "facil": "facil",
  "media": "media",
  "alta": "dificil",
  "difícil": "dificil",
  "dificil": "dificil",
};

const letterToIndex = { A: 0, B: 1, C: 2, D: 3 };

function internalTopic(rawTopic) {
  return rawTopic.replace(/^Proyecto de Ingeniería\s*-\s*/, "").trim();
}

function toQuestion(item, index) {
  const subtema = internalTopic(item.tema);
  const tema = topicMap[subtema] || subtema || COURSE_NAME;
  const respuesta = item.respuesta_correcta;
  const correcta = letterToIndex[respuesta];

  if (correcta === undefined) {
    throw new Error(`Respuesta correcta invalida en pregunta Proyecto ${index + 1}`);
  }

  const opciones = ["A", "B", "C", "D"].map((letter) => item.opciones[letter]);
  if (opciones.some((option) => !option)) {
    throw new Error(`Opciones incompletas en pregunta Proyecto ${index + 1}`);
  }

  return {
    id: `proyecto-ingenieria-${String(index + 1).padStart(3, "0")}`,
    categoria: COURSE_NAME,
    curso: COURSE_NAME,
    tema,
    subtema,
    temaOriginal: item.tema,
    dificultad: difficultyMap[item.dificultad] || item.dificultad,
    dificultadOriginal: item.dificultad,
    tipo: "teoria",
    pregunta: item.pregunta,
    enunciado: item.pregunta,
    opciones,
    opcionesPorLetra: item.opciones,
    correcta,
    respuesta_correcta: respuesta,
    respuestaCorrecta: respuesta,
    correctAnswer: correcta,
    explicacion: item.explicacion,
    teoria: item.explicacion,
    formula: "",
    etiquetas: item.etiquetas || tagMap[subtema] || ["proyecto"],
    tags: item.etiquetas || tagMap[subtema] || ["proyecto"],
    source: "Texto pegado.txt",
    sourceLabel: COURSE_NAME,
  };
}

export const questions = rawQuestions.map(toQuestion);
export const topics = [...new Set(questions.map((question) => question.tema))];
export const difficulties = ["facil", "media", "dificil"];
export const questionTypes = ["teoria"];
export const questionTotals = {
  base: questions.length,
  total: questions.length,
};
