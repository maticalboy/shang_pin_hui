/* 
利用mockjs来mock数据接口
*/
import Mock from 'mockjs'
import banners from './banner.json'
import floors from './floor.json'

// 提供广告位轮播数据的接口
Mock.mock('/mock/banners',{
    code: 200,
    data: banners
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floors',{
    code: 200,
    data: floors
})
