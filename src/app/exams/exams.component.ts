import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
})
export class ExamsComponent implements OnInit {
  loading = false;
  list: Array<any> = [];
  modalType: String = 'add';
  id: Number | null = null;
  code: Number | null = null;
  studentCode:  Number | null = null;
  examDate: Time | null | undefined;
  grade: number | null = null;
  


  modalAction() {
    if (this.modalType == 'add') {
      let data = {
        LessonCode: this.code,
        StudentNumber: this.studentCode,
        ExamDate: this.examDate,
        Score: this.grade,
       
      };
      axios.post('https://localhost:7208/add-exam', data)
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
      axios.get(`https://localhost:7208/delete-exam?examid=${this.id}`)
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
        StudentNumber: this.studentCode,
        ExamDate: this.examDate,
        Score: this.grade,
    
      };
      axios.post('https://localhost:7208/edit-exam', data)
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
      axios.get(`https://localhost:7208/byid-exam?examid=${this.id}`)
      .then(response => {
          console.log('Başarılı:', response);
          if (response.data) {
            this.id = response.data.id,
            this.studentCode=response.data.studentNumber,
            this.examDate= response.data.examDate,
            this.grade= response.data.score
          }
      })
      .catch(error => {
          console.error('Hata:', error);
          // Hata durumunda burada işlem yapabilirsiniz
      });
    }
    if(type == "add"){
      this.code = null;
      this.studentCode = null;
      this.examDate = null;
      this.grade = null;
    }
  }

  ngOnInit(): void {
    axios.get('https://localhost:7208/get-all-exam')
  .then(response => {
    console.log('Başarılı:', response);
    this.list = response.data.data.map((item: { lessonCode: string; studentNumber: number; examDate: Time; score: number; id:number }) => {
      return {
        id : item.id,
        code:item.lessonCode,
        studentCode:item.studentNumber,
        examDate: item.examDate,
        grade: item.score
      };
    });
  })
  .catch(error => {
    console.error('Hata:', error);
    // Hata durumunda burada işlem yapabilirsiniz
  });
  }
}
