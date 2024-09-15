import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  buttonLabel = 'Save changes';

  // Cập nhật giá trị aria-label sau 3 giây
  updateAriaLabel() {
    setTimeout(() => {
      this.buttonLabel = 'Submit form';
    }, 3000);
  }

  ngOnInit() {
    this.updateAriaLabel(); // Gọi hàm khi component khởi tạo
  }
}
