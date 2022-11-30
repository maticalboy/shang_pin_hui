<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <template v-if="startNumAndEngNum.start>1">
            <button :class="{active:pageNo==1}" @click="$emit('getPageNo',1)">1</button>
        </template>
        
        <button v-if="startNumAndEngNum.start>2">···</button>
        <!-- 中间连续 -->
        <template v-for="(page,index) in startNumAndEngNum.end" >
            <button :class="{active:pageNo==page}" @click="$emit('getPageNo',page)" :key="index" v-if="page>=startNumAndEngNum.start">{{page}}</button>
        </template>
        

        <button v-if="startNumAndEngNum.end+1<totalPages">···</button>
        <template v-if="startNumAndEngNum.end<totalPages">
            <button :class="{active:pageNo==totalPages}" @click="$emit('getPageNo',totalPages)">{{totalPages}}</button>
        </template>
        
        <button :disabled="pageNo==totalPages" @click="$emit('getPageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共{{total}}条</button>
        <!-- <div>{{startNumAndEngNum}}</div> -->
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props:["pageNo","pageSize","total","continues"],
    computed:{
        // 计算页数
        totalPages(){
            return Math.ceil(this.total/this.pageSize) 
        } ,
        // 连续页码的起始数字和结束数字
        startNumAndEngNum(){
            let start=0,end=0
            // 连续页码5也 总的数据页数小于5 不正常
            if(this.totalPages<this.continues){
                start=1
                end=this.totalPages
            }else{
                start=this.pageNo-parseInt(this.continues/2)
                    end=this.pageNo+parseInt(this.continues/2)
                // start 为0或者负数
                if(start<1){
                    start=1
                    end=this.continues
                }
                
                if(end>this.totalPages){
                    end=this.totalPages
                    start=end-this.continues+1
                }
                
                
            }
            return {start,end}
        },
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>