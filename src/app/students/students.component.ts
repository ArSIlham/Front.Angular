import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {


  loading = false;
  list: Array<any> = [];
  modalType: String = 'add';
  id: Number | null = null;
  code: Number | null = null;
  name: String = '';
  surname: String = '';
  classNumber: number | null = null;
 

  modalAction() {
    if (this.modalType == 'add') {
      let data = {
        Number: this.code,
        FirstName: this.name,
        LastName: this.surname,
        ClassRoom: this.classNumber,
      };
  
      axios.post('https://localhost:7208/add-students', data)
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
      axios.get(`https://localhost:7208/delete-students?studentid=${this.id}`)
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
        Number: this.code,
        FirstName: this.name,
        LastName: this.surname,
        ClassRoom: this.classNumber,
      };
  
      axios.post('https://localhost:7208/edit-students', data)
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
    if (type == 'modify') {
      axios.get(`https://localhost:7208/byid-students?studentid=${this.id}`)
      .then(response => {
          console.log('Başarılı:', response);
          if (response.data) {
            this.id =response.data.id
              this.code = response.data.number
              this.name = response.data.firstName;
              this.surname = response.data.lastName;
              this.classNumber = response.data.classRoom;
          }
      })
      .catch(error => {
          console.error('Hata:', error);
          // Hata durumunda burada işlem yapabilirsiniz
      });
  }
  
    if(type == "add"){
      this.code = null;
      this.classNumber = null;
      this.name = '';
      this.surname = '';
    }
  }

  ngOnInit(): void {
    axios.get('https://localhost:7208/get-all-students')
  .then(response => {
    console.log('Başarılı:', response);
    this.list = response.data.data.map((item: { number: number; classRoom: number; firstName: string; lastName: string;id:number }) => {
      return {
        id:item.id,
        code: item.number,
        classNumber: item.classRoom,
        name: item.firstName.trim(),
        surname: item.lastName.trim()
      };
    });
  })
  .catch(error => {
    console.error('Hata:', error);
    // Hata durumunda burada işlem yapabilirsiniz
  });
  }
}
