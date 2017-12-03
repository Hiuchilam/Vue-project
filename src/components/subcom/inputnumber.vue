<template>
    <div class="subtmpl">
        <ul>
            <li @click="subtract">-</li>
            <li>{{count}}</li>
            <li @click="add">+</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 1,
            }
        },
        props: ["obj"],
        methods: {
            add() {
                this.count++;
                this.sendback();
            },
            subtract() {
                this.count--;
                if (this.count<=0) {
                    this.count=0;
                }
                this.sendback();
            },
            sendback() {
                this.$emit("msg", {
                    gid: this.obj.gid,
                    count: this.count
                });
            }
        },
        mounted() {
            this.count = this.obj.count;
        }
    }
</script>
<style scoped>
    .subtmpl ul {
        width: 120px;
    }

    .subtmpl li {
        list-style: none;
        display: inline-block;
        width: 30px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        text-align: center;
        padding: 2px;
        cursor: pointer;
    }
</style>