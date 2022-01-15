<template>
    <div >       
        <label for=""> {{ label }}</label> <br>
        <input :placeholder="placeHolder" :type="type" v-model="valor">
    </div>
</template>
<script>
export default {
    name:"Input",
    model:{
        prop: "value",
        event:'onChange'
    },
    props:{
        label: { type: String, default: ''},
        type: { type: String, default: 'text'},
        placeHolder: { type: String, default: ''},
        value: { type: String, default: ''}
    },
    data(){
        return {
            valor: this.value
        }
    },
    watch:{
        valor(){
            this.$emit('onChange', this.valor);
        }
    }
}
</script>
<style scoped>

input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0px;
    display: inline-block;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>