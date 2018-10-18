import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import '../../node_modules/echarts/map/js/china'
import $ from 'jquery'
export default class ZChinaMap extends Component {

    componentDidMount()
    {
        let myEchart= echarts.init(document.getElementById('iechart_chinamap'));
        let resdata=[
            {name: '北京',value: Math.round(Math.random()*1000)},
            {name: '天津',value: Math.round(Math.random()*1000)},
            {name: '上海',value: Math.round(Math.random()*1000)},
            {name: '重庆',value: Math.round(Math.random()*1000)},
            {name: '河北',value: Math.round(Math.random()*1000)},
            {name: '河南',value: Math.round(Math.random()*1000)},
            {name: '云南',value: Math.round(Math.random()*1000)},
            {name: '辽宁',value: Math.round(Math.random()*1000)},
            {name: '黑龙江',value: Math.round(Math.random()*1000)},
            {name: '湖南',value: Math.round(Math.random()*1000)},
            {name: '安徽',value: Math.round(Math.random()*1000)},
            {name: '山东',value: Math.round(Math.random()*1000)},
            {name: '新疆',value: Math.round(Math.random()*1000)},
            {name: '江苏',value: Math.round(Math.random()*1000)},
            {name: '浙江',value: Math.round(Math.random()*1000)},
            {name: '江西',value: Math.round(Math.random()*1000)},
            {name: '湖北',value: Math.round(Math.random()*1000)},
            {name: '广西',value: Math.round(Math.random()*1000)},
            {name: '甘肃',value: Math.round(Math.random()*1000)},
            {name: '山西',value: Math.round(Math.random()*1000)},
            {name: '内蒙古',value: Math.round(Math.random()*1000)},
            {name: '陕西',value: Math.round(Math.random()*1000)},
            {name: '吉林',value: Math.round(Math.random()*1000)},
            {name: '福建',value: Math.round(Math.random()*1000)},
            {name: '贵州',value: Math.round(Math.random()*1000)},
            {name: '广东',value: Math.round(Math.random()*1000)},
            {name: '青海',value: Math.round(Math.random()*1000)},
            {name: '西藏',value: Math.round(Math.random()*1000)},
            {name: '四川',value: Math.round(Math.random()*1000)},
            {name: '宁夏',value: Math.round(Math.random()*1000)},
            {name: '海南',value: Math.round(Math.random()*1000)},
            {name: '台湾',value: Math.round(Math.random()*1000)},
            {name: '香港',value: Math.round(Math.random()*1000)},
            {name: '澳门',value: Math.round(Math.random()*1000)}
        ];
        $.get("",function(data){
            resdata=data;
        });
        myEchart.setOption({

            backgroundColor: '#404a59',
            title : {
                text: '今日王卡订单来源',
                // subtext: '纯属虚构',
                left: 'center',
                textStyle:{
                    fontSize:20,
                    color:'#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            visualMap: {
                min: 0,
                max: 1000,
                left: 'left',
                top: 'bottom',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true,
                inRange: {
                    color: ['#FFFFFF','#2B32B2'] // 浅蓝     
                },
                textStyle:{
                    color:'#fff'
                }
            },
            toolbox: {
                show: true,
                orient : 'vertical',
                left: 'right',
                top: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name: '王卡订单',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        show:true,
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor:'rgba(255,255,255,1)',
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -1,
                            shadowOffsetY: -1,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#FF0000',
                            borderWidth: 1
                        }
                    },
                    data:resdata
                }
            ]
        });
    }

    render() {
        return (
            <div style={{height:"100%",width:"100%"}}>           
                <div id='iechart_chinamap' style={{height:'100%'}}></div>
            </div>
            
        )
    }
}
