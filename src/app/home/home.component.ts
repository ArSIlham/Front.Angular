import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  loading = false;
  list: Array<any> = [];
  modalType: String = 'add';
  id: Number | null = null;
  code = '';
  name = '';
  classNumber = '';
  teacherName = '';
  teacherSurname = '';
  
 

  modalAction() {
    if (this.modalType == 'add') {
      let data = {
        LessonCode: this.code,
        LessonName: this.name,
        Classroom: this.classNumber,
        TeacherFirstName: this.teacherName,
        TeacherLastName: this.teacherSurname,
      };
      axios.post('https://localhost:7208/add-lesson', data)
      .then(response => {
        console.log('Başarılı:', response);
        if(response.data.httpStatusCode == 400){
          console.log('Başarılı:', response.data.message);
          
        }
      })
      .catch(error => {
        console.error('Hata:', error);
        // Hata durumunda burada işlem yapabilirsiniz
      });
      document.getElementById("exampleModalClose")?.click();
    } else if (this.modalType == 'delete') {
      axios.get(`https://localhost:7208/delete-lesson?lessonid=${this.id}`)
      .then(response => {
          
      })
      .catch(error => {
          console.error('Hata:', error);
          // Hata durumunda burada işlem yapabilirsiniz
      });
      document.getElementById("exampleModalClose")?.click();
    } else if (this.modalType == 'modify') {
      let data = {
        Id:this.id,
        LessonCode: this.code,
        LessonName: this.name,
        Classroom: this.classNumber,
        TeacherFirstName: this.teacherName,
        TeacherLastName: this.teacherSurname,
      };
      axios.post('https://localhost:7208/edit-lesson', data)
      .then(response => {
        console.log('Başarılı:', response);
        // Başarılı yanıt durumunda burada işlem yapabilirsiniz
      })
      .catch(error => {
        console.error('Hata:', error);
        // Hata durumunda burada işlem yapabilirsiniz
      });
      document.getElementById("exampleModalClose")?.click();
    } else {
      this.modalType = '';
    }
  }

  setModalType(id: Number | null, type: String) {
    this.modalType = type;
    this.id = id;
    if (type == '') {
      this.id = null;
    }
    if(type == 'modify'){
      axios.get(`https://localhost:7208/byid-lesson?lessonid=${this.id}`)
      .then(response => {
          console.log('Başarılı:', response);
          if (response.data) {
            this.id = response.data.id,
            this.code=response.data.lessonCode,
            this.name= response.data.lessonName,
            this.classNumber= response.data.classroom,
            this.teacherName= response.data.teacherFirstName,
            this.teacherSurname=response.data.teacherLastName
          }
      })
      .catch(error => {
          console.error('Hata:', error);
          // Hata durumunda burada işlem yapabilirsiniz
      });
    }else if(type == 'add') {
      this.code = '';
      this.name = '';
      this.classNumber = '';
      this.teacherName = '';
      this.teacherSurname = '';
    }
  }

  ngOnInit(): void {
    axios.get('https://localhost:7208/get-all-lesson')
  .then(response => {
    console.log('Başarılı:', response);
    this.list = response.data.data.map((item: { lessonCode: number; classroom: number; teacherFirstName: string; teacherLastName: string;lessonName: string;id:number }) => {
      return {
        id:item.id,
        code:item.lessonCode,
        name: item.lessonName,
        classNumber: item.classroom,
        teacherName: item.teacherFirstName,
        teacherSurname:item.teacherLastName
      };
    });
  })
  .catch(error => {
    console.error('Hata:', error);
    // Hata durumunda burada işlem yapabilirsiniz
  });
  }
}
