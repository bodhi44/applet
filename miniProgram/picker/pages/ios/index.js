// index.js
// 获取应用实例
const app = getApp()

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
  },

  onLoad() {
    let yearIndex = this.data.years.length - 1;
    let monthIndex = date.getMonth();
    let dayIndex = date.getDate();
    this.setData({
      value: [yearIndex, monthIndex, dayIndex],
    })
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      value: val,
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
  }
})
