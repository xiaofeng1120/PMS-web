<template>
    <div class="con">
        <div class="sms_titel">
            因运营商政策限制, 发送
            <span>营销类、反动、情色、房产</span>
            等信息可能会被拦截
        </div>

        <div class="sms_info">
            <ul>
                <li>
                    <div class="div1">入住提醒</div>
                     <div>办理入住后自动发送给客人</div>
                </li>
                 <li>
                    <div class="div1">退房提醒</div>
                     <div>办理退房后自动发送给客人</div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created(){},
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="scss">
.sms_titel{
    padding: 10px;
    font-size: 16px;

    span{
        color: crimson;
    }
}

.sms_info {
    display: flex;

    ul{
        display: flex;
        margin-left: 10px;

        li{
            width: 500px;
            height: 200px;
            border: 1px solid #cccccc;
            box-shadow: 1px 1px 2px #cccccc;
            border-radius: 5px;
            margin-right: 30px;
            padding: 10px;

            .div1{
                color: darkorange;
                margin-bottom: 10px;
                font-weight: bold;
            }
        }
    }
}
</style>