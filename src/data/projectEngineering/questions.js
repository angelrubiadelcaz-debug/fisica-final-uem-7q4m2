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
  }
];

const topicMap = {
  "Memoria del proyecto": "Memoria del proyecto",
  "Introducción": "Memoria del proyecto",
  "Descripción del problema": "Memoria del proyecto",
  "Solución propuesta": "Memoria del proyecto",
  "Arquitectura": "Memoria del proyecto",
  "Conclusiones": "Memoria del proyecto",
  "Estado del arte": "Estado del arte",
  "Requisitos": "Requisitos",
  "Casos de uso": "Requisitos",
  "Evaluación": "Verificación y validación",
  "Pruebas": "Pruebas",
  "Licitación": "Licitación",
  "Estimación financiera": "Estimación financiera",
  "Estimación": "Estimación financiera",
  "Gestión de proyectos": "Planificación",
  "Camino crítico": "Camino crítico",
  "Defensa": "Defensa del proyecto",
};

const tagMap = {
  "Memoria del proyecto": ["proyecto", "memoria"],
  "Introducción": ["proyecto", "memoria"],
  "Descripción del problema": ["proyecto", "memoria"],
  "Solución propuesta": ["proyecto", "memoria"],
  "Arquitectura": ["proyecto", "memoria", "requisitos_no_funcionales"],
  "Conclusiones": ["proyecto", "memoria"],
  "Estado del arte": ["proyecto", "estado_del_arte"],
  "Requisitos": ["proyecto", "requisitos_funcionales", "requisitos_no_funcionales", "normativa"],
  "Casos de uso": ["proyecto", "requisitos_funcionales"],
  "Evaluación": ["proyecto", "verificacion", "validacion"],
  "Pruebas": ["proyecto", "verificacion", "validacion", "pruebas_unitarias", "pruebas_integracion", "pruebas_sistema", "compatibilidad"],
  "Licitación": ["proyecto", "licitacion", "presupuesto"],
  "Estimación financiera": ["proyecto", "presupuesto", "estimacion"],
  "Estimación": ["proyecto", "presupuesto", "estimacion"],
  "Gestión de proyectos": ["proyecto", "planificacion"],
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
    etiquetas: tagMap[subtema] || ["proyecto"],
    tags: tagMap[subtema] || ["proyecto"],
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
