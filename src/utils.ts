// import { VisibilityValues, WeatherValues, type NewDiaryEntry, type Visibility, type Weather } from "./types.js";

// const isString = (text: unknown): text is string => {
//     return typeof text === "string" || text instanceof String;
// };

// const parseComment = (commentFromRequest: unknown): string => {
//     if (!isString(commentFromRequest)) {
//         throw new Error("Incorrect or missing comment");
//     }
//     return commentFromRequest;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const parseDate = (dateFromRequest: unknown): string => {
//     if(!isString(dateFromRequest) || !isDate(dateFromRequest)) {
//         throw new Error("Incorrect date format or missing date");
//     }
//     return dateFromRequest;
// };

// const isWeather = (param: unknown): param is Weather => {
//     return typeof param === "string" && (WeatherValues as readonly string[]).includes(param);
// };

// const parseWeather = (weatherFromRequest: unknown): Weather => {
//     if(!isString(weatherFromRequest) || !isWeather(weatherFromRequest)){
//         throw new Error("Incorrect or missing Weather");
//     }
//     return weatherFromRequest;
// };

// const isVisibility = (param: unknown): param is Visibility => {
//     return typeof param === "string" && (VisibilityValues as readonly string[]).includes(param);
// };

// const parseVisibility = (visibilityFromRequest: unknown): Visibility => {
//     if(!isString(visibilityFromRequest) || !isVisibility(visibilityFromRequest)){
//         throw new Error ("Incorrect or missing Visibility");
//     }
//     return visibilityFromRequest;
// };

// const toNewDiaryEntry = (diary: unknown): NewDiaryEntry => {
//     if (!diary || typeof diary !== "object") {
//         throw new Error("Incorrect or missing data");
//     }

//     const dto = diary as NewDiaryEntry;

//     const newEntry: NewDiaryEntry = {
//         date: parseDate(dto.date),
//         weather: parseWeather(dto.weather),
//         visibility: parseVisibility(dto.visibility),
//         comment: parseComment(dto.comment),
//     };

//     return newEntry;
// };

// export default toNewDiaryEntry;

import { newDiarySchema, type NewDiaryEntry } from "./types.js";

const toNewDiaryEntry = (diary: unknown): NewDiaryEntry => {
    return newDiarySchema.parse(diary);
};

export default toNewDiaryEntry;