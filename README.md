# Diary API | Express + Drizzle + Postgres

## Tecnologías
**Core:** Node.js & Express<br>
**Database:** PostgreSQL con Drizzle ORM<br>
**Validation:** Zod para esquemas y parseo de datos.<br>
**Tooling:** TypeScript, ESLint (Stylistic), Jiti.<br>

## Arquitectura del Proyecto
El proyecto sigue una estructura de capas para separar la lógica de negocio de la infraestructura:
- ``src/index.ts``: Punto de entrada de la aplicación y configuración de middlewares.
- ``src/routes/``: Definición de endpoints y orquestación de peticiones.
- ``src/services/``: Capa de servicios. Aquí reside la comunicación con Drizzle y la lógica de negocio.
- ``src/db/``:
    - ``db.ts``: Configuración de la conexión con el driver ``pg``.
    - ``schema.ts``: Definición de tablas y relaciones de la base de datos.
    - ``seed.ts``: Script de población inicial de datos.
- ``src/types.ts``: Fuente de verdad para tipos de TS y esquemas de Zod.
- ``src/utils.ts``: Utilidades de parseo y limpieza de datos (ej. toNewDiaryEntry).

## Comandos del proyecto
|**Comando**|**Acción**|
|---|---|
|`pnpm dev`|Inicia el servidor en modo desarrollo con `tsx watch`.|
|`pnpm push`|Sincroniza el esquema de Drizzle con la base de datos PostgreSQL.|
|`pnpm seed`|Ejecuta el script para poblar la tabla con datos iniciales.|

## Configuración y Uso
**1. Variables de Entorno**
Crea un archivo ``.env`` en la raíz (usa ``drizzle.config.ts`` como referencia) con tu ``DATABASE_URL``.

**2. Base de Datos**
Para sincronizar el esquema y los datos iniciales:
~~~bash
# Empujar cambios de esquema a la DB
pnpm push

# Poblar la base de datos (seeder)
pnpm seed
~~~

## Notas de Aprendizaje
- ``ExactOptionalPropertyTypes``: Se implementó una lógica de limpieza de objetos para manejar valores undefined en peticiones PATCH.
- ``Zod Schema Inference``: Uso de z.infer para mantener sincronizados los tipos de TypeScript con las validaciones de entrada.
- ``jiti``: Solo se usa por el ``eslint.config.ts``, si se pasa a ``.js`` no es necesario utilizarlo.
- ``dotenv``: Se puede evitar usar ``dotenv`` para no usar dpendencias extra y sustituirlo por ``process.loadEnvFile()`` en el código o como flag ``--env-file=.env`` al ejecutar el script en versiones superiores a ``Node.js v24``.
- **ValidatedFields:** El parseo del ``req.body`` con el ``partialDiaryEntrySchema`` puede pasarse a ``utils.ts`` para mayor separación de responsabilidades.

## Endpoints de la API
|**Método**|**Ruta**|**Descripción**|**Body (JSON) / Notas**|
|---|---|---|---|
|**GET**|`/api/diaries`|Obtiene todas las entradas|-|
|**GET**|`/api/diaries/:id`|Obtiene una entrada específica|-|
|**POST**|`/api/diaries`|Crea una nueva entrada|`{ date, weather, visibility, comment }`|
|**PATCH**|`/api/diaries/:id`|Actualización parcial|Admite campos opcionales. Limpia `undefined`.|
|**DELETE**|`/api/diaries/:id`|Elimina una entrada|-|

