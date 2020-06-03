import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import Dynamic from './../views/dynamic'
/**
 * 订单模块
 */
import ordersolt from '../views/order/ordersolt.vue'//订单路由
import order from '../views/order/order.vue'//订单首页
import leave from '../views/order/leave.vue'//今日预离客单
import advanceto from '../views/order/advanceto.vue'//今日预离客单
import owe from '../views/order/owe.vue'//今日预到客单
import hangback from '../views/order/hangback.vue'//挂退客单
import booking from '../views/order/booking.vue'//预定客单
import inlive from '../views/order/inlive.vue'//在住客单
import refundroom from '../views/order/refundroom.vue'//退房客单

/**
 * 报表模块
 */
import reportformsolt from '../views/reportform/reportformsolt.vue'//报表路由
import businessform from '../views/reportform/businessform.vue'//经营状况报表
import operatingform from '../views/reportform/operatingform.vue'//运营报表
import orderincomeform from '../views/reportform/orderincomeform.vue'//订单收入报表

/**
 * 账本模块
 */
import accountbook from '../views/accountbook/accountbook.vue'//账本

/**
 * 房间管理
 */
import room from '../views/roommanagement/room.vue'//room首页

/**
 * 酒店管理
 */
import hotelsolt from '../views/hotelmanagement/hotelsolt.vue'
import consumption from '../views/hotelmanagement/consumption.vue'//消费管理
import payment from '../views/hotelmanagement/payment.vue'//支付方式
import income from '../views/hotelmanagement/income.vue'//收入项目
import spending from '../views/hotelmanagement/spending.vue'//支出项目
import hotelconfig from '../views/hotelmanagement/hotelconfig.vue'//功能配置
import rentroom from '../views/hotelmanagement/rentroom.vue'//时租房

/**
 * 常驻客管理
 */
import longguest from '../views/longguest/longguest.vue'

/**
 * 日志管理
 */
import logsolt from '../views/logmanagement/logsolt.vue'
import operationlog from '../views/logmanagement/operationlog.vue'//操作日志
import systemlog from '../views/logmanagement/systemlog.vue'//系统日志

/**
 * 用户管理
 */
import usermanagement from '../views/usermanagement/usermanagement.vue'

/**
 * 黑名单
 */
import blacklist from '../views/blacklist/blacklist.vue'

/**
 * 智能短信
 */
import smssolt from '../views/sms/smssolt.vue'
import autosms from '../views/sms/autosms.vue'//自动短信服务

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/index',
    name: 'Index',
    component: index
  },
  {
    path: "/dynamic",//综合房态
    name: "dynamic",
    component: Dynamic
  },
  {
    path: '/ordersolt',
    name: 'ordersolt',
    component: ordersolt,
    children: [{
      path: '/',
      component: order,
    }, {
      path: 'order',
      name: 'Order',
      component: order,
    }, {
      path: 'leave',
      name: 'leave',
      component: leave
    }, {
      path: 'advanceto',
      name: 'advanceto',
      component: advanceto
    },
    {
      path: 'inlive',
      name: 'inlive',
      component: inlive
    },
    {
      path: 'owe',
      name: 'owe',
      component: owe
    }, {
      path: 'hangback',
      name: 'hangback',
      component: hangback
    }, {
      path: 'booking',
      name: 'booking',
      component: booking
    }, {
      path: 'refundroom',
      name: 'refundroom',
      component: refundroom
    }]
  },
  {
    path: '/reportformsolt',
    name: 'reportformsolt',
    component: reportformsolt,
    children: [
      {
        path: '/',
        component: businessform
      }
      , {
        path: 'businessform',
        name: 'businessform',
        component: businessform
      },
      {
        path: 'operatingform',
        name: 'operatingform',
        component: operatingform
      },
      {
        path: 'orderincomeform',
        name: 'orderincomeform',
        component: orderincomeform
      }]
  },
  {
    path: '/accountbook',
    name: 'accountbook',
    component: accountbook
  },
  {
    path: '/room',
    name: 'room',
    component: room
  },
  {
    path: '/hotelsolt',
    name: 'hotelsolt',
    component: hotelsolt,
    children: [{
      path: '/',
      component: consumption
    },
    {
      path: 'consumption',
      name: 'consumption',
      component: consumption
    },
    {
      path: 'payment',
      name: 'payment',
      component: payment
    },
    {
      path: 'income',
      name: 'income',
      component: income
    },
    {
      path: 'spending',
      name: 'spending',
      component: spending
    },
    {
      path: 'hotelconfig',
      name: 'hotelconfig',
      component: hotelconfig
    },
    {
      path: 'rentroom',
      name: 'rentroom',
      component: rentroom
    }]
  },
  {
    path: '/longguest',
    name: 'longguest',
    component: longguest
  },
  {
    path: '/logsolt',
    name: 'logsolt',
    component: logsolt,
    children: [
      {
        path: '/',
        component: operationlog
      },
      {
        path: 'operationlog',
        name: 'operationlog',
        component: operationlog
      },
      {
        path: 'systemlog',
        name: 'systemlog',
        component: systemlog
      }
    ]
  },
  {
    path: '/usermanagement',
    name: 'usermanagement',
    component: usermanagement
  },
  {
    path: '/blacklist',
    name: 'blacklist',
    component: blacklist
  },
  {
    path: '/smssolt',
    name: 'smssolt',
    component: smssolt,
    children: [
      {
        path:'/',
        name: 'autosms',
        component: autosms
      },
      {
        path:'autosms',
        name: 'autosms',
        component: autosms
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
