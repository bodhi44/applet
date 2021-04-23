# applet
小程序组件

## picker选择器如何自定义样式：

### picker-view
#### 1、indicator-class 设置选择器中间选中框的类名，可以生效
```css
	.picker-indicator {
	  height: 80rpx;
	  background-color: #B9EFE7;
	  z-index: 0;
	}
```

#### 2、mask-style 设置蒙层的样式，
```css
	.picker-mask {
  	  background-image: linear-gradient(#ff2020,rgba(255, 255, 255, 0)),
	  linear-gradient(rgba(255, 255, 255, 0),#ff2020);
	}
```

### picker-view为选择器中间选中框圆角
```css
	.picker-view .picker-column:first-child .picker-indicator {
	  border-radius: 16rpx 0 0 16rpx;
	}

	.picker-view .picker-column:last-child .picker-indicator {
	  border-radius: 0 16rpx 16rpx 0;
	}
```

### 整体代码
#### 1、页面
```view
<view class="container">
  <view class="page-body">
    <view class="selected-date">{{year}}年{{month}}月{{day}}日</view>
    <picker-view class="picker-view" indicator-class="picker-indicator" mask-class="picker-mask" value="{{value}}" bindchange="bindChange">
      <picker-view-column class="picker-column">
          <view wx:for="{{years}}" wx:key="{{years}}" wx:key="index" class="picker-item {{ value[0] === index ? 'pick-text' : '' }}">{{item}}年</view>
      </picker-view-column>
      <picker-view-column class="picker-column">
        <view wx:for="{{months}}" wx:key="{{months}}" wx:key="index" class="picker-item {{ value[1] === index ? 'pick-text' : '' }}">{{item}}月</view>
      </picker-view-column>
      <picker-view-column class="picker-column">
        <view wx:for="{{days}}" wx:key="{{days}}" wx:key="index" class="picker-item {{ value[2] === index ? 'pick-text' : '' }}">{{item}}日</view>
      </picker-view-column>
    </picker-view>
  </view>
</view>
```

#### 2、css
```css
.page-body {
  background-color: #ff2020;
  padding: 100rpx;
  color: #000;
}

.selected-date {
  text-align: center;
  height: 200rpx;
  line-height: 200rpx;
  width: 100%;
}

.picker-view {
  width: 100%;
  height: 600rpx;
  text-align: center;
  background-color: #ff2020;
}

.picker-indicator {
  height: 80rpx;
  background-color: #B9EFE7;
  z-index: 0;
}

.picker-view .picker-column:first-child .picker-indicator {
  border-radius: 16rpx 0 0 16rpx;
}

.picker-view .picker-column:last-child .picker-indicator {
  border-radius: 0 16rpx 16rpx 0;
}

.picker-mask {
  background-image: linear-gradient(#ff2020,rgba(255, 255, 255, 0)),linear-gradient(rgba(255, 255, 255, 0),#ff2020);
}


.picker-item {
  width: 100%;
  line-height: 80rpx;
  text-align: center;
}

.picker-item.pick-text {
  font-size: 28rpx;
  font-weight: 400;
  color: #22c2bb;
  overflow: hidden;
}
```

#### 3、js
```js
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
```
