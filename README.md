# Angular - 17

## Angular Basics:

### 1. Bootstrapping Angular Application:

- Quá trình khởi tạo và tải ứng dụng Angular được gọi là bootstrapping.
- Bắt đầu của mọi ứng dụng web: `index.html`
- Quá trình Bootstrapping (webpack bundler):
  - `ng serve` build ứng dụng nhưng lưu trên memory và `watch` ứng dụng của ta. `ng-build` thì lưu trên disk, trong thư mục `disk`.
  - Các tệp sau build:
    - `runtimes.js`: môi trường chạy của js
    - `polyfills.js` là tập lệnh polyfill để hỗ trợ nhiều trình duyệt hiện đại khác nhau.
    - `main.js` là code của ứng dụng.
    - `vendor.js` chứa các tập lệnh từ thư viện mã Angular và các thư viện bên thứ ba khác mà chúng ta đang sử dụng trong ứng dụng Angular.
    - `styles.css` là tệp chứa các kiểu CSS của ứng dụng.
  - Sau khi build thì `angular cli`sẽ tiêm vào `index.html`. Khi load file này lên trình duyệt thì ứng dụng sẽ được chạy.
  - `angular.json` là file cấu hình build của dự án. `angular-cli` sử dụng file này để build như là `webpack`.

### 2. Components:

- Decorator `@component`

  - `selector`: giá trị của nó có thể được sử dụng như một phần tử html:
    - `selector : 'tên-thẻ'` dùng như một thẻ trong html
    - `selector : '[tên-thuộc-tính]'` dùng như một thuộc tính của một thẻ. Nó sẽ là con của thẻ mà nó gắn vào.
    - `selector : '.tên-class'` dùng như một class của một thẻ. Nó sẽ là con của thẻ mà nó gắn vào.
    - `selector : '#tên-id'` dùng như một id của một thẻ. Nó sẽ là con của thẻ mà nó gắn vào.
  - `templateUrl`: chỉ định đường dẫn `view template` cho component này.
  - `styleUrls`: chỉ định đường dẫn `style component` cho component này

- <b>Global style</b> cho toàn bộ app: `src/styles.scss`. Có thể thêm `font`, `icon`

  - Dùng thư viện `bootstrap` trong angular:

    - Cách 1: sử dụng `Bootstrap CDN`

      ```html
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      ```

    - Cách 2: sử dụng `bootstrap` tích hợp cho angular.

      ```bash
      1. Install
      npm install @ng-bootstrap/ng-bootstrap

      2. Thêm NgbModule vào module. Thường là app.module.ts
      3. Sử dụng trong template.
      ```

- <b>Data binding</b> (truyền dữ liệu giữa `component` và `view-template`):

  - `Attribute binding`:
    - Cú pháp: `<element [attr.colspan]="expression"></element>`
    - Attribute (Html tĩnh): là giá trị khởi tạo và không thể thay đổi (nhưng trong Angular thì khác). Vd: `aria-*`, `colspan`, `data-*`.
  - `Property binding`:
    - Cú pháp: `<element [property]="expression"></element>`
    - Property (DOM): là giá trị hiện tại và có thể thay đổi. Vd: `value`, `disabled`, `hidden`, `checked`
  - `String interpolation`:
    - Cú pháp: `<element>{{ expression }}</element>`
    - Những propeties như `disabled`, `hidden`, `checked` không hoạt động với kiểu binding này.
  - `Event binding`:
    - Cú pháp: `<element (tên-sự-kiện) = "tên-hàm-ở-component($event)"></element>`
    - Tên sự kiện thường gặp: `click`, `dbclick`, `input`, `change` (thường dùng với thẻ `<input>`, `<select>`), `keydown`, `keyup`, `keypress` (giữ)
  - `Two-way binding`:
    - Cú pháp: `<element [(ngModel)]="propertyValue"></element>`
    - Làm sao `ngModel` biết property nào cần được đồng bộ? Thông qua loại tag Html mà `ngModel` được áp dụng.
    - Cần phải `imports` vào `modules` mà chứa component sử dụng loại binding này.
    - Tại sao không dùng thủ công bằng cách sử `Property binding` và `Event binding`? Muốn chỉ định giá trị property thủ công.

- <b>Custom binding</b> (truyền dữ liệu giữa `component cha` và `component con`)

  - `Custom Propery binding`:
    - Component cha:
      ```html
      <!-- view-template của component cha -->
      <app-child [userName]="expression"></app-child>
      ```
    - Component con:
      ```typescript
      @Input() userName:string = 'defaultValue'
      ```
  - `Custom Event binding`:

    - Component cha: lắng nghe sự kiện thông qua `event binding`

      ```html
      <!-- view-template của component cha -->
      <app-child (notify)="onNotify($event)"></app-child>
      ```

      ```typescript
      onNotify(dataFromChild: string) {
        console.log(dataFromChild)
      }
      ```

    - Component con: phát ra sự kiện thông qua `EventEmitter`.

      ```typescript
      @Output() notify: EventEmitter<string> = new EventEmitter<string>('');

      //Thường kết hợp với event binding trong component con
      sendNotification() {
        this.notify.emit('Hello from child component')
      }
      ```

  - Có thể truyền dữ liệu từ 2 component anh em:

    ```typescript
    import { Component } from "@angular/core";

    @Component({
      selector: "app-parent",
      template: `
        <app-sibling1 (sendData)="receiveData($event)"></app-sibling1>
        <app-sibling2 [receivedData]="dataFromSibling1"></app-sibling2>
      `,
    })
    export class ParentComponent {
      dataFromSibling1: string = "";

      // Nhận dữ liệu từ Sibling 1
      receiveData(data: string) {
        this.dataFromSibling1 = data;
      }
    }
    ```

### 3. Directives:

### 4. Template variable và ViewChild/ViewChildren

- Template variable:

  - Instance của phần tử `DOM`:

    ```html
    <input #templateVariable type="text"></input>
    ```

    - <i>Type là HTMLElement</i>

  - Instance của `component`:

    ```html
    <button (click)="chidComp.funcDoST()">Toggle</button>
    <br />
    <app-chid #chidComp></app-child>
    ```

    - <i>Type là component đó</i>

  - Instance của `directive`:

    ```html
    <input [(ngModel)] = "value" #templateVariable="ngModel" type="text"></input>
    <!-- Hoặc -->
    <form #myForm="ngForm">
      <!-- Form content here -->
    </form>
    ```

    - <i>Type là directive đó. Nếu không có gán cho nó là loại directive nào thì nó chỉ là instance của DOM bình thường.</i>

  - Instance của `ng-template`:

    ```html
    <div *ngIf="user.age >= 13; else noPG13">Bạn có thể xem nội dung PG-13</div>
    <ng-template #noPG13>
      <div>Bạn không thể xem nội dung PG-13</div>
    </ng-template>
    ```

    - <i>Type là ng-template đó</i>

- ViewChild/ViewChildren:
  - Link tham khảo: https://github.com/angular-vietnam/100-days-of-angular/blob/master/Day010-template-variable-viewchild-viewchildren.md
  - Dùng để lấy instance của template variable ngoài template-view:
    - Lấy instance của `component`:
      ```typescript
      @ViewChild('tên biến template') asValue: TypeComponent
      ```
    - Lấy instance của `DOM`:
      ```typescript
      @ViewChild('tên biến template') asValue: ElementRef<HTMLDivElement>
      // Là ElementRef thay vì HTMLElement như bên ngoài template.
      ```
    - Lấy instance của `Directive` nhưng có option là `static` và `read`:
      ```typescript
        @ViewChild('tên biến template', {
          read: ElementRef, // Thay vì lấy instance directive thì lấy instance DOM
          static: true, // sử dụng ở ngOnInit, False: sử dụng ở ngAfterViewInit
        }) asValue: ElementRef<HTMLFormElement>
      ```
    - Đối với ViewChildren:
      ```typescript
      @ViewChild('tên biến template') asValue: QueryList<TypeComponent>
      ```

### 5. ng-template và ngTemplateOutlet:

### 6. Template referce variable:

## Services

## Observable and RxJS

## Router and Route Guards

## TBD
