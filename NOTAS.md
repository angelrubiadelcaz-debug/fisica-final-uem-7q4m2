# NOTAS del analisis del ZIP

ZIP analizado: `/Users/bartolomerubiaavi/Angel/UEM/Fundamentos Físicos.zip`

## Lectura de documentos

- Se extrajeron los materiales en `materials/Fundamentos Físicos`.
- Se genero texto buscable en `extracted_text`.
- Todos los PDF principales tuvieron texto extraible con `pypdf`.
- El DOCX `Final/GUIA_ESTUDIO_EXAMEN.docx` tambien se pudo leer correctamente.
- No habia `pdftotext` ni OCR instalado en el entorno; las imagenes JPG de ejercicios del parcial se revisaron visualmente.

## Material encontrado

- Tema 1: cinematica, dinamica, carga electrica, campo electrico, Coulomb, distribuciones, simetria y ley de Gauss.
- Tema 2: potencial electrostatico, conductores, induccion, apantallamiento, capacitores, dielectricos y ruptura.
- Tema 3: corriente electrica, Ohm, resistencias, Joule, Lorentz, Ampere, solenoides, Faraday-Lenz y autoinduccion.
- Tema 4: movimiento armonico simple, ondas, superposicion, estacionarias, resonancia, ondas electromagneticas y espectro.
- Tema 5: magnetismo en la materia, interaccion luz-materia, optica geometrica, fotoelectrico, laser/LED y semiconductores.
- Tema 6: principios de termodinamica, maquinas termicas, entropia, transmision de calor, conduccion, conveccion, radiacion y circuitos termicos.

## Estilo deducido del parcial

- Enunciados normalmente cortos: una frase o un calculo directo.
- Opciones breves, con distractores de unidad, dependencia o signo.
- El parcial original usa 3 opciones; la web usa 4 opciones porque asi se pidio.
- Dificultad universitaria basica: no exige integrales largas, pero si reconocer leyes, dependencias y consecuencias fisicas.
- Proporcion aproximada observada: predominan preguntas conceptuales y de interpretacion, con calculos rapidos de una o dos formulas.
- Trampas frecuentes: `1/r` frente a `1/r^2`, signo de la carga, usar Celsius en lugar de Kelvin, confundir velocidad de onda con velocidad de particula, campo magnetico sobre carga en reposo, serie/paralelo en resistores o capacitores.

## Imagenes del parcial revisadas

- Ejercicios de campo electromagnetico con dos cargas, trabajo electrico, cables paralelos, espira junto a hilo e intensidad variable.
- Ejercicios de flujo magnetico y fem inducida con `B(t)`.
- Ejercicio con carga en campos `E` y `B` usando fuerza de Lorentz.
- Ejercicio de campo gravitatorio entre dos masas, trabajo y punto de equilibrio.
- Ejercicio de varilla movil en campo magnetico uniforme.
- Ejercicio de proton en campo electrico uniforme.
- Ejercicio de particula alfa acelerada por diferencia de potencial y posterior radio en campo magnetico.

## Banco generado

- Total: 170 preguntas.
- Tema 1: 24 preguntas.
- Tema 2: 24 preguntas.
- Tema 3: 26 preguntas.
- Tema 4: 34 preguntas.
- Tema 5: 32 preguntas.
- Tema 6: 30 preguntas.

Los temas 4, 5 y 6 tienen mas peso porque la guia del examen final indica que son el nucleo del final, con repaso puntual de temas 1-3.

## Limitaciones

- Las formulas extraidas de PDF pueden perder formato fino en algunos caracteres, por eso el formulario se rehizo manualmente con notacion simple.
- Las imagenes no se OCRizaron automaticamente; se interpretaron visualmente y se incorporaron como tipos de pregunta, no como copia literal.
- Se eligio Vite 4 para poder verificar build en este macOS de Codex; Vite 7/8 fallaba por carga de binarios nativos firmados.
