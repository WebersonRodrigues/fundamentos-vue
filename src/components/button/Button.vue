<template>
    <div>
        <button @click="callback"> {{value}}</button>
    </div>
</template>
<script>
export default {
    name:"Button",
    props:{
        value: { type: String, default: ''},
        callback: {type: Function, default: () => {}}
    }
}
</script>
<style scoped>

    button{
        width: 100%;
        background-color: var(--cor-primaria);
        color: #FFF;
        padding: 8px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover{
        background-color: var(--cor-secundaria);
    }


</style>