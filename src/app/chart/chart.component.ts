import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { UserRegisterDateService } from '../user-register-date.service';
import { UserService } from '../user.service';

import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  deliveredDates : any;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [ { ticks: {beginAtZero: true}
      }],
    }
  };
  barChartLabels: Label[] = [
    'Today',
    'Last Week',
    'Current Month',
    'Current Year',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: any = [{ data: [] }];


  constructor(private userService: UserService,
    private userRegisterDate: UserRegisterDateService,
    private orderService : OrderService) 
    { 
      let today = this.userRegisterDate.today();

    let sevenDays = this.userRegisterDate.sevenDays();

    let currentMonth = this.userRegisterDate.currentMonth();

    let newYear = this.userRegisterDate.currentYear();

    this.userService.getAllUsers().then((data: any) => {
      let userData = data.records.docs;

      let newdate = userData.map((obj: any) => obj.registerDate);

      // today Users Count
      let todayNewUsers = 0;
      let todayUsersList = [];
      for (let obj of newdate) {
        if (today.substring(0, 10) == obj.substring(0, 10)) {
          todayNewUsers++;
          todayUsersList.push(obj);
        }
      }
      //

      // Last Seven Days
      let sevenDaysCount = 0;
      let sevenDaysUser = [];
      for (let obj of newdate) {
        if (
          today.substring(0, 10) >= obj.substring(0, 10) &&
          sevenDays.substring(0, 10) <= obj.substring(0, 10)
        ) {
          sevenDaysCount++;
          sevenDaysUser.push(obj);
        }
      }

      //

      // Current Month User Count
      let currentMonthUser = 0;
      let monthUser = [];
      for (let month of newdate) {
        if (
          today.substring(0, 10) >= month.substring(0, 10) &&
          currentMonth.substring(0, 10) <= month.substring(0, 10)
        ) {
          currentMonthUser++;
          monthUser.push(month);
        }
      }

      //

      // Current Year User List

      let currentYearCount = 0;
      let currentYearUser = [];
      for (let year of newdate) {
        if (
          newYear.substring(0, 10) <= year.substring(0, 10) &&
          today.substring(0, 10) >= year.substring(0, 10)
        ) {
          currentYearCount++;
          currentYearUser.push(year);
        }
      }
      // alert(currentYearCount);
      // year end

      this.barChartData = [
        {
          label: 'New Users List',
          data: [
            todayNewUsers,
            sevenDaysCount,
            currentMonthUser,
            currentYearCount,
          ],
        },
      ];


    });

    this.getOrderList();
    }

  ngOnInit() {
  }


  // Price Chart start

  getOrderList() {

    let today = this.userRegisterDate.today();

    let sevenDays = this.userRegisterDate.sevenDays();

    let currentMonth = this.userRegisterDate.currentMonth();

    let newYear = this.userRegisterDate.currentYear();


    this.orderService.deliveredList().then((res: any) => {
      let row = res.records.docs;
      console.log("data",row);
      let docs = row.map((obj: any) => obj.deliveredDate);
      this.deliveredDates = docs;
      console.log("today",this.deliveredDates);
    
// today sales count
    let todaySalesCount = 0;
    let todaySalesList = [];
    for(let day of this.deliveredDates)
    {
      if(today.substring(0,10) == day.substring(0,10))
      {
        todaySalesCount++;
        todaySalesList.push(day);
      }   
    }
    // console.table(todaySalesCount);    
    // end
    
    // last week sales count

    let lastWeekSalesCount = 0;
    let lastWeekSalesList = [];
    for(let week of this.deliveredDates)
    {
      if(today.substring(0, 10) >= week.substring(0, 10) &&
      sevenDays.substring(0, 10) <= week.substring(0, 10))
      {
        lastWeekSalesCount++;
        lastWeekSalesList.push(week);
      }   
    }
    // console.table(lastWeekSalesCount);
    // end


     // last month sales count

     let lastMonthSalesCount = 0;
     let lastMonthSalesList = [];
     for(let month of this.deliveredDates)
     {
       if(today.substring(0, 10) >= month.substring(0, 10) &&
       currentMonth.substring(0, 10) <= month.substring(0, 10))
       {
        lastMonthSalesCount++;
         lastMonthSalesList.push(month);
       }   
     } 
    //  console.table(lastMonthSalesCount);
     // end


          // last month sales count

          let currentYearSalesCount = 0;
          let currentYearSalesList = [];
          for(let year of this.deliveredDates)
          {
            if(newYear.substring(0, 10) <= year.substring(0, 10) &&
            today.substring(0, 10) >= year.substring(0, 10))
            {
              currentYearSalesCount++;
             currentYearSalesList.push(year);
            }   
          }
          // console.table(currentYearSalesCount);
          // end
  });

  }



}
