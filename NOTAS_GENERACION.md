# NOTAS_GENERACION

## ZIP analizado

Archivo base:

```text
/Users/bartolomerubiaavi/Angel/UEM/Fundamentos Físicos.zip
```

Se extrajeron los documentos en `materials/Fundamentos Físicos` y se genero texto buscable en `extracted_text`.

## Documentos leidos

- PDFs de Tema 1 a Tema 6.
- Materiales de parcial: `Parcial_física.pdf`, `Preguntas_Física.pdf`, `Repaso_compacto.pdf`, `Ultimo_repaso_fisica.pdf`.
- Guia final: `GUIA_ESTUDIO_EXAMEN.pdf` y `GUIA_ESTUDIO_EXAMEN.docx`.
- Imagenes JPG de ejercicios del parcial, revisadas visualmente.

Todos los PDF principales y el DOCX pudieron leerse. No habia OCR instalado, asi que las imagenes no se OCRizaron automaticamente.

## Temas detectados

- Tema 1: cinematica, dinamica, carga electrica, campo electrico, Coulomb, flujo, Gauss y simetrias.
- Tema 2: potencial, conductores, induccion, apantallamiento, capacitores, dielectricos y ruptura.
- Tema 3: corriente electrica, Ohm, Joule, resistencias, Lorentz, Ampere, solenoides, Faraday-Lenz y autoinduccion.
- Tema 4: MAS, ondas mecanicas, superposicion, batidos, ondas estacionarias, Maxwell, ondas EM, espectro y fotones.
- Tema 5: magnetismo en la materia, histeresis, optica geometrica, luz-materia, fotoelectrico, fuentes de luz y semiconductores.
- Tema 6: termodinamica, calorimetria, maquinas termicas, entropia, conduccion, conveccion, radiacion y circuitos termicos.

## Estilo imitado del parcial

- Enunciados cortos, normalmente una frase.
- Opciones breves y plausibles.
- Nivel universitario basico: reconocimiento de leyes, interpretacion fisica y calculo rapido.
- Pocas operaciones largas; predominan dependencias, unidades, signos y consecuencias directas.
- Distractores frecuentes:
  - confundir `1/r` con `1/r^2`,
  - campo frente a potencial,
  - serie/paralelo en resistencias o condensadores,
  - signos de cargas,
  - usar Celsius en lugar de Kelvin,
  - fuerza magnetica sobre cargas en reposo,
  - velocidad de onda frente a velocidad de particula,
  - dependencia cuadratica o cuarta potencia.

## Banco generado

Total: 352 preguntas.

Distribucion por tema:

- Tema 1: 54 preguntas.
- Tema 2: 54 preguntas.
- Tema 3: 56 preguntas.
- Tema 4: 64 preguntas.
- Tema 5: 63 preguntas.
- Tema 6: 61 preguntas.

Distribucion de respuestas correctas:

- A: 88
- B: 88
- C: 88
- D: 88

## Control de calidad aplicado

- Todas las preguntas tienen 4 opciones.
- Todas tienen `teoria`, `tipo`, `explicacion` y respuesta correcta.
- No hay enunciados duplicados exactos.
- La teoria no contiene frases del tipo "respuesta correcta" ni letras de opcion.
- La distribucion A/B/C/D se equilibra automaticamente.

## Partes dudosas o revisables

- Las imagenes del parcial se interpretaron visualmente, no por OCR.
- Algunas formulas de PDF perdian formato al extraerse, por eso el formulario fue normalizado manualmente con notacion simple.
- El banco prioriza el final, por eso Temas 4, 5 y 6 tienen algo mas de peso.
