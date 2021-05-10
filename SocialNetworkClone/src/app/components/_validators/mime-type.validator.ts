import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
    const file = control.value as File;
    const fileReader = new FileReader();
    const frObs = new Observable((observer: Observer<{[key: string]: any}>) => {
        fileReader.addEventListener("loadend", () => {
            
        });
        // This would allow to read it as MIME type
        fileReader.readAsArrayBuffer(file);
    });
};