import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileuploaderComponent} from '../fileuploader/fileuploader.component';

export interface DialogData {
  ImageNet: string;
}
@Component({
  selector: 'app-image-net-model',
  templateUrl: './image-net-model.component.html',
  styleUrls: ['./image-net-model.component.css']
})
export class ImageNetModelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageNetModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
