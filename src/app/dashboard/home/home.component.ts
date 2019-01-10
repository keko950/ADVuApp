import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImpressionsService } from '../../services/impressions.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Button } from '../../models/button.model';
import { first } from 'rxjs/operators';
import { Impression } from '../../models/impression.model';
import { element } from 'protractor';
import * as moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Flag } from 'app/models/flag.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/*
          min: moment().date(0),
          max: moment().date(31),
*/
export class HomeComponent implements OnInit {
  users: User[];
  currentUser: User;
  homeButtons: Button[];
  logged = true;
  title: String = "ADVuApp";
  picker1: Date = moment().date(0).toDate();
  picker2: Date = moment().date(31).toDate();
  chartOptions = {};
  flags: Flag[];
  chartData = [
    { data: [], label: 'Impressions per day' },
  ];


  lineChartColors = [
    { // grey
      backgroundColor: 'rgba(18,19,77,0.2)',
      borderColor: '#f5a313',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',

    }
  ];
  // chartLabels = ['04/01/2014', '05/01/2014'];
  chartLabels: string[];
  res: Impression[];

  earn: number;
  impressions: number;

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.picker1 = moment(event.value).toDate();
  }

  addEvent2(event: MatDatepickerInputEvent<Date>) {
    this.picker2 = moment(event.value).toDate();
    this.loadChartOptions();
    this.loadChart();
  }

  constructor(private userService: UserService, private impressionService: ImpressionsService, private router: Router) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.impressionService = impressionService;
    this.users = [this.currentUser];
    this.loadChartOptions();
    this.loadChart();
    this.flags = [
      { loc: "ES", image: "/assets/images/flags/es.png"},
      { loc: "FR", image: "/assets/images/flags/fr.png"},
      { loc: "PT", image: "/assets/images/flags/pt.png"}
    ]
    this.homeButtons = [
      {title: 'Home', color: 'primary', link: '/home'},
      {title: 'getToken', color: 'accent', link: '/getToken'},
      {title: 'Logout', color: 'warn', link: '/login'}
    ]
  }

  private loadChartOptions() {
    this.chartOptions = {
      steppedLine: true,
      maintainAspectRatio: false,
      responsive: true,
      legend : {
        labels : {
          fontColor : '#ffffff'
        },
      },
      scales: {
        xAxes: [{
          stacked: true,
          time: {
            displayFormats: {
              day: 'MMM DD'
            },
            min: this.picker1,
            max: this.picker2,
            unit: 'day',
            unitStepSize: 5,
            scaleStepWidth : 30,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 2
            }
          },
          type: 'time',
            ticks: {
              fontColor : '#ffffff',  // x axe labels (can be hexadecimal too)
            },
            gridLines: {
              color: '#5f5e5e'  // grid line color (can be removed or changed)
            }
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            fontColor : '#ffffff',  // y axes numbers color (can be hexadecimal too)
            min: 0,
            beginAtZero: true,
          }
        }]
      }
    };
  }

  private loadChart(country: String = "") {  

    this.impressionService.getAll(this.picker1, this.picker2, country).pipe(first())
    .subscribe(
     data => {
       if (data) {
         this.res = data;
         let aux2 = data.map(a => moment(a.date).format("MM/DD/YYYY"));
         //let aux2 = aux1.map(a => a.substr(3, 2));
         let revenue = this.res.reduce((acc, item) => {
           return (acc + item.earn) ;
         }, 0);
         let ocurrences = [];
         for (let i = 0, j = aux2.length; i < j; i++) {
           ocurrences[aux2[i]] = (ocurrences[aux2[i]] || 0) + 1;
        }
         this.chartLabels = Array.from(new Set(aux2));
         this.chartLabels.forEach(element => {
           this.chartData[0].data.push(ocurrences[element]);
         });
     
         this.impressions = this.res.length;
         this.earn = parseFloat(revenue.toFixed(2));
       } else {
         this.res = [];
       }
     }
   );
    // this.chartData[0].data = ocurrences;
  }


  ngOnInit() {
  }

}
