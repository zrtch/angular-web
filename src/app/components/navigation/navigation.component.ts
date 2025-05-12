import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  // 导航链接
  navLinks = [
    { path: '/home', label: '首页', icon: 'home' },
    { path: '/about', label: '关于', icon: 'info' },
  ];
}
