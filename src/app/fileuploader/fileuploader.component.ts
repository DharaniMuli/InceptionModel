import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ImageServiceService} from '../../services/image-service.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
   public ImageNotUploaded = true;
   public tab1_ImageNotUploaded = true;
  public tab2_ImageNotUploaded = true;
  selectedFile: ImageSnippet;

  constructor(private imageService: ImageServiceService) { }
  ngOnInit() {
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.ImageNotUploaded = false;
      this.tab1_ImageNotUploaded = false;
      this.tab2_ImageNotUploaded = false;
      debugger;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        });
    });

    reader.readAsDataURL(file);
  }

}
