import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
  ImageUploaded = false;
  fileToUpload: File = null;
  uri = 'http://127.0.0.1:5000';
  url = '';
  uploadForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

  }
  ngOnInit() {
    /*this.createGraph();*/
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      };
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.http.post<any>(this.uri + '/upload', formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

}
