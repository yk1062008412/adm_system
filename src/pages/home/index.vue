<template>
    <div>
        home页面
    </div>
</template>

<script>
import { testReq } from '@/api/test';
export default {
    name: 'Home',
    mounted() {
        this.testName()
    },
    methods: {
        testName() {
            testReq({}).then(data => {
                console.log(data);
            })
        }
    },
}
</script>