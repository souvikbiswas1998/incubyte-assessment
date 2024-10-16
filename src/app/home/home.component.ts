import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  testData: string[] = [
    ``,
    `11`,
    `11,22`,
    `//[*][%]\n1*2%3`,
    `//;\\n1;2;4`,
    `//;\n1;2`,
    `1\n2,3`,
    `1,\n2,3`,
    `-`,
    `-11`,
    `11,-22`,
    `//[*][%]\n1*-2%-3`,
    `//;\\n1;-2;4`,
    `//;\n-1;2`,
    `1\n-2,3`,
    `1,\n2,-3`,
  ];
  testMode: boolean = false;
  input = ''
  output = '';

  add(string: string, testMode: boolean = false) {
    this.testMode = testMode;
    this.input = string.replace(/\n/g, "\\n");
    let delimiters: string[] = [];
    if (this.input == '') this.input = '0';
    if (this.input.startsWith('//')) {
      let subStr = this.input.slice(2, this.input.indexOf('\\n'));
      if (subStr.startsWith('[') && subStr.endsWith(']')) {
        subStr = subStr.slice(1, delimiters.length - 1)
        delimiters = subStr.replaceAll('][', ',').split(',');
      } else delimiters = [subStr];
      this.input = this.input.slice(this.input.indexOf('\\n') + 2)
      delimiters.forEach((deli) => this.input = this.input.replaceAll(deli, ','))
    }
    let tempArr: any[] = this.input.replaceAll('\\n', ',').split(',');
    let negativeArr = tempArr.filter(data => +data < 0);
    if (negativeArr.length > 0) {
      this.output = 'negative numbers not allowed ' + negativeArr.join(', ');
      return this.output;
    }
    let sum = tempArr.reduce((pv, cv) => {
      if (pv == '' || cv == '') return NaN;
      return (Number(pv) + Number(cv))
    })
    this.output = (isNaN(sum)) ? 'check your syntax' : sum;
    return this.output;
  }
}
