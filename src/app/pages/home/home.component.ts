import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatChipsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('typedElement') typedElement!: ElementRef;

  private typed!: Typed;

  ngAfterViewInit(): void {
    this.initTyped();
  }

  private initTyped(): void {
    if (this.typedElement) {
      this.typed = new Typed(this.typedElement.nativeElement, {
        strings: [
          '欢迎来到 Angular Material 演示应用！',
          '这是一个使用 Angular Material 构建的简单应用',
          '现在集成了 Typed.js 打字机效果',
          '让我们一起探索 Angular 的魅力吧！',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        loopCount: Infinity,
        showCursor: true,
        cursorChar: '|',
      });
    }
  }

  ngOnDestroy(): void {
    // 组件销毁时清理 Typed 实例
    if (this.typed) {
      this.typed.destroy();
    }
  }
}
