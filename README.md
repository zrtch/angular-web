# Angular Web

## 项目结构 s

- package.json : 项目依赖和脚本配置文件，包含了项目所需的所有依赖包和可执行的命令
- angular.json : Angular 工作区配置文件，定义了项目的构建选项、环境和资产
- tsconfig.json : TypeScript 编译器配置文件，定义了 TypeScript 的编译选项
- tsconfig.app.json : 应用特定的 TypeScript 配置，继承自 tsconfig.json
- tsconfig.spec.json : 测试特定的 TypeScript 配置
- .editorconfig : 编辑器配置文件，确保不同编辑器下代码风格一致
- .gitignore : Git 忽略文件列表

## src 目录 - 源代码

- src/main.ts : 应用的主入口点，负责引导（bootstrap）Angular 应用

```ts
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

这个文件使用 bootstrapApplication 函数启动应用，传入根组件和应用配置。

- src/index.html : 应用的 HTML 入口文件，包含 <app-root> 标签，Angular 会将应用渲染到这里

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>AngularApp</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  </head>
  <body class="mat-typography">
    <app-root></app-root>
  </body>
</html>
```

- src/styles.scss : 全局样式文件，应用于整个应用

## app 目录 - 应用代码

- app.component.ts : 根组件的 TypeScript 文件，定义了组件的行为

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavigationComponent } from "./components/navigation/navigation.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-app";
}
```

- app.component.html : 根组件的 HTML 模板

```html
<main>
  <div class="app-container">
    <app-navigation></app-navigation>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  </div>
</main>
```

- app.component.scss : 根组件的样式文件
- app.routes.ts : 应用的路由配置，定义了 URL 路径与组件的映射关系

```ts
import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }, // 通配符路由，重定向到首页
];
```

## 组件目录

- components/ : 存放可复用组件

  - navigation/ : 导航组件
    - navigation.component.ts : 导航组件的 TypeScript 文件
    - navigation.component.html : 导航组件的 HTML 模板
    - navigation.component.scss : 导航组件的样式文件
    - navigation.component.spec.ts : 导航组件的测试文件

- pages/ : 存放页面级组件
  - home/ : 首页组件
    - home.component.ts : 首页组件的 TypeScript 文件
    - home.component.html : 首页组件的 HTML 模板
    - home.component.scss : 首页组件的样式文件
    - home.component.spec.ts : 首页组件的测试文件
  - about/ : 关于页面组件
    - about.component.ts : 关于页面组件的 TypeScript 文件
    - about.component.html : 关于页面组件的 HTML 模板
    - about.component.scss : 关于页面组件的样式文件
    - about.component.spec.ts : 关于页面组件的测试文件

## 添加新页面

要添加新页面，可以使用 Angular CLI 生成新组件：

```bash
ng generate component pages/contact
```

然后在 app.routes.ts 中添加路由：

```ts
import { ContactComponent } from "./pages/contact/contact.component";

export const routes: Routes = [
  // ... existing code ...
  { path: "contact", component: ContactComponent },
  // ... existing code ...
];
```

最后在导航组件中添加链接：

```ts
navLinks = [
  // ... existing code ...
  { path: "/contact", label: "联系我们", icon: "contact_support" },
];
```

## 接口请求

1. 添加服务：服务用于处理数据逻辑和与后端的通信：

```bash
ng generate service services/data
```

2. 添加模型：创建数据模型接口

```bash
mkdir -p src/app/models
```

然后创建模型文件，例如 src/app/models/user.model.ts ：

```ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```

3. 添加 HTTP 请求

首先确保已导入 HttpClientModule：

```bash
ng generate service services/api
```

在服务中实现 API 调用：

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "https://api.example.com";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
```

## 表单

1. 在组件中导入 ReactiveFormsModule
2. 创建表单：

```ts
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      message: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // 处理表单提交
    }
  }
}
```
